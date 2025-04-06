'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from '@/components/ui/textarea'
import { suggestion } from '@/lib/suggestions'
import type { CreateVideoForm, Response, Script } from '@/lib/custom_types/createForm'

import React, { useState } from 'react'
import { Loader2Icon, SparkleIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { api } from '@/trpc/react'
import { toast } from 'sonner'

function Topic() {
    const { control, setValue, watch, trigger } = useFormContext<CreateVideoForm>();
    
    const [scripts, setScripts] = useState<Script[]>([])
    const getScript = api.project.getScript.useMutation();
    
    const [selectedIndex,setSelectedIndex] = useState<number | null>(null);

    const handleScriptClick = async()=>{
        const isValid = await trigger(['title', 'topic'])

        if(isValid){
            const topic = watch('topic')
            getScript.mutate({topic},{
                onSuccess: async(data) => {
                    const JSON_scripts:Response= await JSON.parse(data);
                    
                    setScripts(JSON_scripts.scripts)
                    toast.success('Scripts generated successfully!')
                },
                onError:(e)=>{
                    toast.error('Failed to generate scripts')
                }
            })
        }   
    }

    return (
        <div>
            <FormField
                control={control}
                name='title'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className='mb-1'>
                            Project Title
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder='Enter project  title' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />


            <div className='mt-5'>
                <h2>Video Topic</h2>
                <p className='text-sm text-gray-600'>Select topic for your video </p>

                <Tabs defaultValue="suggestion" className="w-full mt-2">
                    <FormField
                        control={control}
                        name='topic'
                        render = {({field})=>(
                            <FormItem>
                                <TabsList>
                                    <TabsTrigger value="suggestion">Suggestions</TabsTrigger>
                                    <TabsTrigger value="your_topic">Your topic</TabsTrigger>
                                </TabsList>
                                <TabsContent value="suggestion">
                                    <div>
                                        {suggestion.map((s, index) => {
                                            return (
                                                <FormControl key={index}>
                                                    <Button onClick={() => {
                                                        setValue('topic', s, {
                                                            shouldDirty: true,
                                                            shouldValidate: true
                                                        })
                                                    }} className={`m-1 text-sm text-gray-400 ${watch('topic') === s && 'bg-gray-500 text-white'}`}  variant={'outline'}>{s}</Button>
                                                </FormControl>
                                            )
                                        })}
                                        <FormMessage/>
                                    </div>
                                </TabsContent>
                                <TabsContent value="your_topic">
                                    <FormField
                                        control={control}
                                        name='topic'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Enter your own topic
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder='Enter your topic/script' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TabsContent>
                            </FormItem>    
                        )}
                    />
                    {/* <TabsList>
                        <TabsTrigger value="suggestion">Suggestions</TabsTrigger>
                        <TabsTrigger value="your_topic">Your topic</TabsTrigger>
                    </TabsList>
                    <TabsContent value="suggestion">
                        <div>
                            {suggestion.map((s, index) => {
                                return (
                                    <Button onClick={() => {
                                        setValue('topic', s, {
                                            shouldDirty: true,
                                            shouldValidate: true
                                        })
                                    }} className={`m-1 text-sm text-gray-400 ${watch('topic') === s && 'bg-gray-500 text-white'}`} key={index} variant={'outline'}>{s}</Button>
                                )
                            })}
                        </div>
                    </TabsContent>
                    <TabsContent value="your_topic">
                        <FormField
                            control={control}
                            name='topic'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Enter your own topic
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea placeholder='Enter your topic/script' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </TabsContent>
                 */}
                 </Tabs>

                {scripts?.length > 0 && 
                <div className='mt-3'>
                    <h2>Select the script</h2>
                    <div className='grid grid-cols-2 gap-5 mt-1'>
                        {
                            scripts.map((script, index) => {
                                return ( 
                                <div onClick= {()=>{
                                    setValue('script',script.content)
                                    setSelectedIndex(index)
                                }}className = {`"p-3 border rounded-lg cursor-pointer ${selectedIndex === index && 'border-white bg-secondary'}"`}
                                key={index}>
                                    <h2 className='p-3 text-sm text-gray-300'>{script.content}</h2>
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
                }
            </div>
            {scripts.length === 0 && <Button disabled = {getScript.isPending} onClick = {()=>handleScriptClick()} className='mt-3' size={'sm'}>
                {getScript.isPending && <Loader2Icon className='animate-spin'/>}
                <SparkleIcon />
                Generate Script
            </Button>}
        </div>
    )
}

export default Topic