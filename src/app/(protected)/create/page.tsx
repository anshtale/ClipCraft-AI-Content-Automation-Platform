"use client"
import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import Topic from "./_components/topic"
import { createVideoSchema, type CreateVideoForm } from "@/lib/custom_types/createForm"
import { zodResolver } from "@hookform/resolvers/zod"
import VideoStyle from "./_components/videoStyle"
import VoiceOptions from "./_components/voiceOptions"

function CreatePage() {
  const methods = useForm<CreateVideoForm>({
    resolver: zodResolver(createVideoSchema),
    defaultValues:{
      title: "",
      topic: "",
      videoStyle: "Realistic",
      voiceStyle: ""
    }
  })

  const handleSubmit = () =>{
    console.log(methods.getValues())
  }
  
  return (
    <div>
        <h2 className="text-3xl">Create New Video</h2>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="col-span-2 p-7 border rounded-xl mt-8 h-[72vh] overflow-auto">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleSubmit)}>
                <div>
                  <Topic />
                  <VideoStyle/>
                  <VoiceOptions/>
                </div>
              </form>
            </FormProvider>
          </div>
          <div>
            {/* {Preview Component} */}
          </div>
        </div>
    </div>
  )
}

export default CreatePage 