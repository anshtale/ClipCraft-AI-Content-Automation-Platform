import type { CreateVideoForm } from "@/lib/custom_types/createForm";
import { useFormContext } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area"


const voiceOptions = [
    {
        "value" : "am_onyx",
        "name" : "Onyx (Male)"
    },
    {
        "value" : "am_michael",
        "name" : "Michael (Male)"
    },
    {
        "value" : "am_liam",
        "name" : "Liam (Male)"
    },
    {
        "value" : "am_fenrir",
        "name" : "Fenrir (Male)"
    },
    {
        "value" : "am_eric",
        "name" : "Eric (Male)"
    },
    {
        "value" : "am_echo",
        "name" : "Echo (Male)"
    },
    {
        "value" : "af_sky",
        "name" : "Sky (Female)"
    },
    {
        "value" : "af_sarah",
        "name" : "Sarah (Female)"
    },
    {
        "value" : "am_adam",
        "name" : "Adam (Male)"
    },
    {
        "value" : "hf_alpha",
        "name" : "Alpha (Female)"
    }
]
function VoiceOptions() {
    const { control, setValue, watch, trigger } = useFormContext<CreateVideoForm>();
    return (
        <div className="mt-5">
            <h2>Video Voice</h2>
            <p className="text-sm text-gray-400">
                Select voice for the video
            </p>
            <ScrollArea className="h-[200px] p-4 w-full">
                <div className="grid grid-cols-2 gap-3">
                    {voiceOptions.map((option,index)=>{
                        return (
                            <h2 className={`cursor-pointer p-3 dark:bg-slate-900 dark:border-white rounded-lg hover:border
                            ${option.value === watch('videoStyle') && "border"}`} 
                            key={index} 
                            onClick={()=>setValue('voiceStyle',option.value)}
                            >
                                {option.name}
                            </h2>
                        )
                    })}

                </div>
            </ScrollArea>

        </div>
    )
}

export default VoiceOptions