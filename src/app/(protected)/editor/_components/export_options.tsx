import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function ExportOptions() {
    return (
        <div className="mx-2 grid p-2 grid-cols-2 gap-4">
            <Card className="cursor-pointer border-2 border-primary">
                <CardHeader className="">
                    <CardTitle className="text-base">Standard Quality</CardTitle>
                    <CardDescription>720p • MP4 • H.264</CardDescription>
                </CardHeader>
                <CardContent>
                    <Badge>Recommended</Badge>
                    <div className="mt-2 text-sm text-muted-foreground">Best for social media and web sharing</div>
                </CardContent>
            </Card>
            <Card className="relative cursor-pointer">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">High Quality</CardTitle>
                    <CardDescription>1080p • MP4 • H.264</CardDescription>
                </CardHeader>
                <CardContent >
                    <div className="absolute bottom-7 text-sm text-muted-foreground">Best for presentations and professional use</div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ExportOptions