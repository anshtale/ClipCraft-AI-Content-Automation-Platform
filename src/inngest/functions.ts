import type { CreateVideoForm } from "@/lib/custom_types/createForm";
import { inngest } from "./client";
import { StartSpeechSynthesisTaskCommand, PollyClient, OutputFormat, VoiceId, type Voice, type SynthesisTask, GetSpeechSynthesisTaskCommand } from "@aws-sdk/client-polly";

  
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
    captionStyle:{
        name:string,
        style:string
    },
    script:string
}

const pollyClient = new PollyClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
});

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { message: `Hello ${event.data.email}!` };
    },
);

export const generateVideoData = inngest.createFunction(
    { id: "generate-video-data"},
    { event: "generate-video-data" },
    
    async ({ event, step } : {
        event: InngestEvent
        step:any
    }) => {
            const params = {
                OutputFormat: OutputFormat.MP3,
                OutputS3BucketName:process.env.AWS_BUCKET_NAME,
                Text: event.data?.script,
                TextType: "text",
                VoiceId: event.data?.voiceStyle || "Aditi",
                SampleRate: "22050"
            }

            const voiceStyle = (event.data?.voiceStyle || 'Aditi') as VoiceId

            const synthTask : SynthesisTask | undefined = await step.run("start-synthesis-task", async () => {
                try{
                    const command = new StartSpeechSynthesisTaskCommand({
                        OutputFormat: "mp3",
                        OutputS3BucketName: process.env.AWS_BUCKET_NAME,
                        Text: event.data?.script || "",
                        TextType: "text",
                        VoiceId: voiceStyle,
                        SampleRate: "24000"
                    });
                    
                    const response = await pollyClient.send(command);
    
                    return response.SynthesisTask;

                }catch(e){
                    throw new Error("Failed to create synthesis task");
                }
            })

            if(!synthTask){
                throw new Error("Failed to create synthesis task");
            }

            const generatedAudioFile : SynthesisTask = await step.run("poll-task-completion", async () => {
                const taskId = synthTask.TaskId;
                let taskStatus = synthTask.TaskStatus;

                let attempts = 0;
                const maxAttempts = 15; // Maximum polling attempts
                let taskDetails : SynthesisTask | undefined= synthTask;
                
                while (taskStatus !== "completed" && taskStatus !== "failed" && attempts < maxAttempts) {

                    const delay = Math.min(30000, Math.pow(2, attempts) * 1000 + Math.random() * 1000);

                    await new Promise(resolve => setTimeout(resolve, delay));
                    
                    const getTaskCommand = new GetSpeechSynthesisTaskCommand({
                    TaskId: taskId
                    });
                    
                    const response = await pollyClient.send(getTaskCommand);

                    taskDetails = response.SynthesisTask;

                    if(!taskDetails){
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




            //generate captions
    
            //generate images prompt from script
    
            //generate images using AI
    
            //save all data to db
        }
)