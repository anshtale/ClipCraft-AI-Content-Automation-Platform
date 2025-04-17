"use client"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import Spinner from './spinner'

import { api } from '@/trpc/react'
import { useVideoDataStore } from '@/store'
import { toast } from 'sonner'
import LinearProgress  from '@mui/material/LinearProgress';

import type { LinearProgressProps } from "@mui/material/LinearProgress"
import { Box } from '@mui/material'
import LinearProgressWithLabel from './linearProgressWithLabel'

function ExportOptions() {
    const completeVideoData = useVideoDataStore((state) => state.videoData)
    const [renderId, setRenderId] = useState<string | null>(null);
    const [bucketName, setBucketName] = useState<string | null>(null);
    const captionStyle = useVideoDataStore((state) => state.captionStyle);
    const [currentStatus, setCurrentStatus] = useState<string>('')
    const [progress, setProgress] = useState<number>(0)
    const [outputUrl, setOutputUrl] = useState<string>("");

    const [isExporting, setIsExporting] = useState(false)
    const [exportQuality, setExportQuality] = useState('STD')

    const videoData = {
        videoData: {
            audioUrl: completeVideoData?.audioUrl || "",
            images: completeVideoData?.images,
            captionJson: completeVideoData?.captionJson
        }
    }

    const render = api.project.renderVideo.useMutation();

    const { data } = api.project.getRenderProgress.useQuery({
        renderId: renderId!,
        bucketName: bucketName!
    }, {
        enabled: !!renderId && !!bucketName && isExporting,
        refetchInterval: isExporting ? 100 : false,
        refetchIntervalInBackground: true,
    })

    console.log(data?.progress);

    const handleExport = async () => {
        console.log('triggered')
        setCurrentStatus('');
        setOutputUrl("");

        if (exportQuality === 'HQ') {
            return toast.error('Please upgrade to pro membership!');
        }

        setIsExporting(true);

        try {
            const response = await render.mutateAsync({
                videoData: videoData.videoData,
                captionStyle,
            });
            toast.success("Rendering started!");
            setRenderId(response.renderId);
            setBucketName(response.bucketName);
        } catch (error) {
            toast.error(`Failed to render the video`);
            setIsExporting(false);
        }
    }

    useEffect(() => {
        if (!data) return;
        if (data.type === 'progress') {
            setProgress((data.progress || 0) * 100);
        } else if (data && data.type === 'done' && data.url) {
            toast.success("Rendered Successfully!");
            setOutputUrl(data.url);
            console.log(data.url);
            setIsExporting(false);
            setRenderId(null);
            setBucketName(null);
            setProgress(0);
        } else if(data.type === "error") {
            toast.error("Error occurred while rendering the video!");
            setIsExporting(false);
            setRenderId(null);
            setBucketName(null);
            setProgress(0);
        }
    }, [data,setRenderId, setBucketName,setIsExporting,setProgress,setOutputUrl])

    return (
        <>
            <div className={cn("mx-2 grid p-2 grid-cols-2 gap-4 items-stretch", isExporting && "pointer-events-none opacity-60")}>
                <Card
                    onClick={() => setExportQuality('STD')}
                    className={cn(
                        "h-full cursor-pointer flex flex-col justify-between",
                        exportQuality === 'STD' && "border-2 border-primary"
                    )}
                >
                    <CardHeader>
                        <CardTitle className="text-base">Standard Quality</CardTitle>
                        <CardDescription>720p • MP4 • H.264</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Badge>Recommended</Badge>
                        <div className="mt-2 text-sm text-muted-foreground">
                            Best for social media and web sharing
                        </div>
                    </CardContent>
                </Card>
                {/* Pro Badge */}
                <Card
                    onClick={() => setExportQuality('HQ')}
                    className={cn(
                        "h-full cursor-pointer flex flex-col justify-between relative",
                        exportQuality === 'HQ' && "border-2 border-primary"
                    )}
                >
                    {/* Pro Badge INSIDE the card, absolutely positioned */}

                    <span className="absolute -top-[15px] right-[40px] z-10">
                        <Badge className="bg-white text-black px-2 py-0.5 rounded-full shadow border border-white text-xs font-semibold">
                            Pro
                        </Badge>
                    </span>

                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">High Quality</CardTitle>
                        <CardDescription>1080p • MP4 • H.264</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mt-2 text-sm text-muted-foreground">
                            Best for presentations and professional use
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="m-4">
                {!isExporting && <Button className="w-full" onClick={() => handleExport()}
                    disabled={isExporting}>
                    Start Export
                </Button>}
                {isExporting && 
                    <div>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgressWithLabel value={progress} />
                        </Box>
                        <div className='flex p-2 w-full items-center justify-center'>
                            <span className='animate-[slide-up_1s_ease-out] text-sm text-gray-500'>Rendering may take 5-10mins depending upon video length

                            </span>
                        </div>
                    </div>
                }

            </div>
        </>
    )
}

export default ExportOptions