"use client"
import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import Topic from "./_components/topic"
import { createVideoSchema, type CreateVideoForm } from "@/lib/custom_types/createForm"
import { zodResolver } from "@hookform/resolvers/zod"
import VideoStyle from "./_components/videoStyle"
import VoiceOptions from "./_components/voiceOptions"
import Captions from "./_components/captions"
import { Button } from "@/components/ui/button"
import { Loader2Icon, WandSparkles } from "lucide-react"
import Preview from "./_components/preview"
import { toast } from "sonner"
import { api } from "@/trpc/react"
import { watch } from "fs"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


function CreatePage() {
  const router = useRouter()
  const session = useSession();

  if(!session.data) return;

  const generateVideoData = api.project.generateVideoData.useMutation();

  const createVideoData = api.project.createVideoData.useMutation();

  const methods = useForm<CreateVideoForm>({
    resolver: zodResolver(createVideoSchema),
    defaultValues: {
      title: "",
      topic: "",
      videoStyle: "Cinematic",
      voiceStyle: "am_onyx",
      captionStyle: {
        name: 'Supreme',
        style: 'text-white text-3xl font-bold italic drop-shadow-lg tracking-wide px-3 py-1 rounded-lg'
      },
      script: ""
    }
  })


  const generateVideo = async() => {
    console.log("triggered")
    const validForm = await methods.trigger("script");

    const currentCredits = session.data.user.credits;

    if(currentCredits <= 0){
      toast.error("You don't have enough credits to generate a video");
      return;
    }

    console.log(validForm)

    if(!validForm){
      toast.error("Enter all the required fields to generate video!");
      return;
    }

    const {title,topic,videoStyle,voiceStyle,script,captionStyle,} = methods.getValues();

    const values = methods.getValues();

    const videoData = await createVideoData.mutateAsync({
        title,
        topic,
        script,
        videoStyle,
        voiceStyle,
        caption: captionStyle,
    },{
      onSuccess:(data)=>{
        router.refresh();
        toast.success('Project Created!')
      },
      onError: (e)=>{
        toast.error(`Error while creating project - ${e.message}`);
      }
    })
    
    const response = (generateVideoData.mutate({
      title,
      topic,
      script,
      videoStyle,
      voiceStyle,
      caption: captionStyle,
      videoId:videoData.id,
    },{
      onSuccess: (data) => {
        console.log(data)
        toast.success('Generating your video!')
      },
      onError:(e)=>{
        toast.error('Error in generating your video')
      }
    }))
  }

  return (
    <div>

      <h2 className="text-3xl">Create New Video</h2>
      
      <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
        <div className="col-span-2 p-7 border rounded-xl mt-8 h-[72vh] overflow-auto">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(generateVideo)}>
              <div>
                <Topic />
                <VideoStyle />
                <VoiceOptions />
                <Captions />

                <Button disabled = {generateVideoData.isPending || createVideoData.isPending} className="hover:cursor-pointer w-full mt-5 flex items-center justify-center" type="submit">
                  {generateVideoData.isPending || createVideoData.isPending && <Loader2Icon className='animate-spin'/>}
                  <WandSparkles />
                  Generate Video
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
        <div className="mt-8">
          <Preview methods={methods} />
        </div>
      </div>
      
    </div>
  )
}

export default CreatePage 