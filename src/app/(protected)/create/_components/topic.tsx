'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from '@/components/ui/textarea'
import { suggestion } from '@/lib/suggestions'
import type { CreateVideoForm } from '@/lib/custom_types/createForm'

import React, { useState } from 'react'
import { SparkleIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

function Topic() {
    const { control, setValue, watch } = useFormContext<CreateVideoForm>();
    

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
                <p className='text-sm text-gray-600'>Select Topic for your video </p>

                <Tabs defaultValue="suggestion" className="w-full mt-2">
                    <TabsList>
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
                </Tabs>
            </div>
            <Button className='mt-3' size={'sm'}>
                <SparkleIcon />
                Generate Script
            </Button>
        </div>
    )
}

export default Topic