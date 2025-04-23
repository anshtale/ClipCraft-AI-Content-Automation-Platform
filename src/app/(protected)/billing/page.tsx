'use client'

import { Info, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { api } from "@/trpc/react"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createCheckoutSession } from "@/server/stripe";

function Billing() {
    const session = useSession();
    const user = session.data?.user;
    const router = useRouter()
    const updateUserCredits = api.project.updateCredits.useMutation();
    const [creditsToBuy,setCreditsToBuy] = useState<number[]>([100]);

    const creditsToBuyAmount = creditsToBuy[0]!
    const price = Number((0.6 * (creditsToBuyAmount)).toFixed(2));

    return (
        <div>
            <h1 className="text-xl font-semibold">
                Billing
            </h1>
            <div className="h-2"></div>
            <p className="text-sm text-gray-500">You currently have {user?.credits} credits left</p>
            <div className="h-2"></div>
            <div className="bg-blue-50 px-4 py-2 rounded-md border border-blue-200 text-green-700">
                <div className="flex items-center gap-2">
                    <Info className="size-4"></Info>
                    <p className="text-sm">Each credit allows you to create 1 video</p>
                </div>
            </div>
            <div className="h-4"></div>
            <Slider defaultValue={[5]} max={1000} min={5} step={5} onValueChange={value=>setCreditsToBuy(value)} value={creditsToBuy}>

            </Slider>
            <div className="h-4"></div>
            <Button className = "hover:cursor-pointer" onClick={()=>{
                createCheckoutSession(creditsToBuyAmount)
            }}>
                Buy {creditsToBuyAmount} credits for ${price}
            </Button>
        </div>
    )
}

export default Billing