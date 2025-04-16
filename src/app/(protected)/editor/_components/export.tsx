import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Download } from "lucide-react"
import ExportOptions from "./export_options"

function Export() {

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
                    <ExportOptions />
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default Export