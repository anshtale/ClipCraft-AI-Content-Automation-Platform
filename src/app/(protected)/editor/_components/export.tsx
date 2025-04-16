import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Download } from "lucide-react"
import { useState } from "react"
import Spinner from "./spinner"
import ExportOptions from "./export_options"

function Export() {

    const [isExporting, setIsExporting] = useState(false)

    const handleExport = () => {
        setIsExporting(true)
        // Simulate export process
        setTimeout(() => {
            setIsExporting(false)
        }, 2000)
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="w-full flex items-center gap-2" size="lg">
                    <Download className="h-4 w-4" />
                    Export & Download
                </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[400px]">
                <SheetHeader>
                    <SheetTitle>Export Video</SheetTitle>
                    <SheetDescription>Choose your export format and quality settings</SheetDescription>
                </SheetHeader>
                <div className="grid gap-2">
                    <ExportOptions/>
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
            </SheetContent>
        </Sheet>
    )
}

export default Export