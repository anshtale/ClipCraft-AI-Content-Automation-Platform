import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { useVideoDataStore } from '@/store'
import React from 'react'

function VideoDetails() {

    const videoData = useVideoDataStore((state) => state.videoData)

    const duration = useVideoDataStore((state) => state.durationInFrames);

    if (!videoData) return null;

    return (
        
            <Card className="flex-grow">
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-center">
                        <CardTitle>Video Details</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="script" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="script">Script</TabsTrigger>
                            <TabsTrigger value="style">Style</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="script" className="space-y-4 pt-4">
                            <Textarea
                                value={videoData.script || "dfgfddffgfdfdfdgfd"}
                                className="min-h-[180px] resize-none font-medium leading-relaxed"
                                readOnly
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Word count: {videoData.script?.split(/\s+/).filter(Boolean).length || 0}</span>
                            </div>
                        </TabsContent>

                        <TabsContent value="style" className="pt-4">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <div className="text-sm font-medium">Video Style</div>
                                        <div className="flex gap-2">
                                            <Badge>{videoData.videoStyle || "Cartoon"}</Badge>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-sm font-medium">Aspect Ratio</div>
                                        <div className="flex gap-2">
                                            <Badge variant="outline">16:9</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>


        
    )
}

export default VideoDetails