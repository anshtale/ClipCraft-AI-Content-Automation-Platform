import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import Spinner from './spinner'

function ExportOptions() {

    
    const [isExporting, setIsExporting] = useState(false)
    const [exportQuality,setExportQuality] = useState('STD')

    const handleExport = () => {
        setIsExporting(true)
        // Simulate export process
        setTimeout(() => {
            setIsExporting(false)
        }, 2000)
    }

    return (
        <div>
            <div className="mx-2 grid p-2 grid-cols-2 gap-4">
                <Card onClick={() => setExportQuality('STD')} className={cn("cursor-pointer", exportQuality === 'STD' && "border-2 border-primary")}>
                    <CardHeader className="">
                        <CardTitle className="text-base">Standard Quality</CardTitle>
                        <CardDescription>720p • MP4 • H.264</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Badge>Recommended</Badge>
                        <div className="mt-2 text-sm text-muted-foreground">Best for social media and web sharing</div>
                    </CardContent>
                </Card>
                <Card className={cn("relative cursor-pointer", exportQuality === 'HQ' && "border-2 border-primary")} onClick={() => setExportQuality('HQ')} >
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">High Quality</CardTitle>
                        <CardDescription>1080p • MP4 • H.264</CardDescription>
                    </CardHeader>
                    <CardContent >
                        <div className="absolute bottom-7 text-sm text-muted-foreground">Best for presentations and professional use</div>
                    </CardContent>
                </Card>
            </div>
            <div className="m-4">
                <Button className="w-full" onClick={handleExport}
                    disabled={isExporting}>
                    {isExporting ? (
                        <>
                            <Spinner />
                            Processing...
                        </>
                    ) : (
                        "Start Export"
                    )}
                </Button>
            </div>
        </div>
    )
}

export default ExportOptions