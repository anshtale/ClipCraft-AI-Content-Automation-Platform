const { createClient } = require("@deepgram/sdk");
import { inngest } from "./client";
import { StartSpeechSynthesisTaskCommand, PollyClient, OutputFormat, VoiceId, type Voice, type SynthesisTask, GetSpeechSynthesisTaskCommand, TextType } from "@aws-sdk/client-polly";
import {generateImagePrompts} from "../lib/gemini"
import axios from "axios"
import { api } from "@/trpc/react";
import { db } from "@/server/db";

// Get the original event type
type InngestEvent = {
    name: string;
    ts?: number | undefined;
    id?: string | undefined;
    data?: VideoData;
    user?: any;
    v?: string | undefined;
};

type VideoData = {
    title: string,
    topic: string,
    videoStyle: string,
    voiceStyle: string,
    captionStyle: {
        name: string,
        style: string
    },
    script: string,
    videoId: string
}

const pollyClient = new PollyClient({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
});

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

const ImagePromptScript : string = `Generate Image prompt of {style} with all details for each scene for 30 seconds video : script : {script}

- Do not give camera angle image prompt
-Follow the following schema and return JSON data (Max 4-5 Images)- [
    {   imagePrompt:'',
        sceneContent: '<ScriptContent>'    
    }
]`

// export const helloWorld = inngest.createFunction(
//     { id: "hello-world" },
//     { event: "test/hello.world" },
//     async ({ event, step }) => {
//         await step.sleep("wait-a-moment", "1s");
//         return { message: `Hello ${event.data.email}!` };
//     },
// );

export const generateVideoData = inngest.createFunction(
    { id: "generate-video-data" },
    { event: "generate-video-data" },

    async ({ event, step }: {
        event: InngestEvent
        step: any
    }) => {
        const params = {
            OutputFormat: OutputFormat.MP3 as OutputFormat,
            OutputS3BucketName: process.env.AWS_BUCKET_NAME!,
            Text: event.data?.script || "",
            TextType: "text" as TextType,
            VoiceId: VoiceId.Joey,
            SampleRate: "22050"
        }

        // const trpc = createTRPCProxyClient<AppRouter>({
        //     links: [
        //       httpBatchLink({
        //         url: `${process.env.NEXTAUTH_URL}/api/trpc`,
        //         headers: () => ({
        //             authorization: event.data?.token || '',
        //         }),
        //         transformer: superjson
        //       }),
        //     ],
        // });


        const synthTask: SynthesisTask | undefined = await step.run("start-synthesis-task", async () => {
            try {
                const command = new StartSpeechSynthesisTaskCommand(params);

                const response = await pollyClient.send(command);

                return response.SynthesisTask;

            } catch (e) {
                throw new Error("Failed to create synthesis task");
            }
        })

        if (!synthTask) {
            throw new Error("Failed to create synthesis task");
        }

        //generated audioFile
        const generatedAudioFile: SynthesisTask = await step.run("poll-task-completion", async () => {
            const taskId = synthTask.TaskId;
            let taskStatus = synthTask.TaskStatus;

            let attempts = 0;
            const maxAttempts = 10; // Maximum polling attempts
            let taskDetails: SynthesisTask | undefined = synthTask;

            while (taskStatus !== "completed" && taskStatus !== "failed" && attempts < maxAttempts) {

                const delay = Math.min(30000, Math.pow(2, attempts) * 1000 + Math.random() * 1000);

                await new Promise(resolve => setTimeout(resolve, delay));

                const getTaskCommand = new GetSpeechSynthesisTaskCommand({
                    TaskId: taskId
                });

                const response = await pollyClient.send(getTaskCommand);

                taskDetails = response.SynthesisTask;

                if (!taskDetails) {
                    throw new Error("Failed to fetch the audio");
                }

                taskStatus = taskDetails.TaskStatus;

                attempts++;
            }

            if (taskStatus !== "completed") {
                throw new Error(`Speech synthesis failed or timed out. Status: ${taskStatus}`);
            }
            console.log(taskDetails);
            return taskDetails;
        });

        // generate captions
        const captions = await step.run("generate-captions",
            async () => 
            {
                const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
                    {
                        url: generatedAudioFile.OutputUri,
                    },
                    {
                        model: "nova-3",
                        smart_format: true,
                    }

                )

                if(error) throw error

                return result.results?.channels[0]?.alternatives[0]?.words;
            }
        )

        //generate images prompt from script
        const getImagePrompts = await step.run(
            "generateImagePrompts",
            async()=>{
                const prompt = ImagePromptScript.replace('{style}',event.data?.videoStyle || " ").replace('{script}',event.data?.script || " ")

                try{
                    const response = await generateImagePrompts.sendMessage(prompt);

                    const imagePrompts = response.response.text();
                    const jsonMatch = imagePrompts.match(/\[[\s\S]*\]/);

                    const jsonString = jsonMatch ? jsonMatch[0] : imagePrompts;

                    const JSON_image_prompts = await JSON.parse(jsonString);
                    
                    return JSON_image_prompts;
                }catch(e){
                    console.log(e)
                    return " "
                }
            }
        )

        //generate images using AI
        const generateImages = await step.run("generate-images",
            async()=>{
                let images = [];
                images = await Promise.all(
                    getImagePrompts.map(async(el:any)=>{
                        const BASE_URL='https://aigurulab.tech';

                        const result =  await axios.post(BASE_URL+'/api/generate-image',
                                {
                                    width: 1024,
                                    height: 1024,
                                    input: el?.imagePrompt,
                                    model: 'sdxl',
                                    aspectRatio:"1:1"
                                },
                                {
                                headers: {
                                    'x-api-key': process.env.IMAGE_GENERATOR_API_KEY,
                                    'Content-Type': 'application/json',
                                },
                        })
                        return result.data.image;
                    })
                )

                return images;
            }
        )

        //save all data to db
        const updateDB = await step.run("update-DB",
            async () => {
                const response = await db.videoData.update({
                    where:{
                        id : event.data?.videoId
                      },data:{
                        audioUrl : "",
                        images : [],
                        captionJson : []
                      }
                })

                return response
            }
        )
    }
)