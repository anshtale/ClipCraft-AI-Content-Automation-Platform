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
import { WandSparkles } from "lucide-react"
import Preview from "./_components/preview"


function CreatePage() {
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


  const handleSubmit = () => {
    console.log(methods.getValues())
  }

  return (
    <div>

      <h2 className="text-3xl">Create New Video</h2>
      
      <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
        <div className="col-span-2 p-7 border rounded-xl mt-8 h-[72vh] overflow-auto">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <div>
                <Topic />
                <VideoStyle />
                <VoiceOptions />
                <Captions />

                <Button className="w-full mt-5 flex items-center justify-center" type="submit">
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