import { useFormContext } from "react-hook-form";
import type { CreateVideoForm } from "@/lib/custom_types/createForm";
import Image from "next/image";
import { options } from "@/lib/caption-styles";


function Captions() {
    const { setValue, watch } = useFormContext<CreateVideoForm>();
    return (
        <div>
            <h2>Caption Style</h2>
            <p className="text-sm m-1 text-gray-400">
                Select caption style
            </p>

            <div className="flex flex-wrap gap-4">
                {options.map((option,index)=>{
                    return(
                        <div onClick= {()=>{setValue('captionStyle',option)}}
                        className = {`p-2 hover:border border-gray-300 bg-slate-900 cursor-pointer rounded-lg ${watch('captionStyle').name === option.name && "border"}`} key={index}>
                            <div className="flex items-center justify-center aspect-[1/1] w-25 h-25">
                                <img src={option.image} alt={option.name} className="w-full h-full object-contain"/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Captions