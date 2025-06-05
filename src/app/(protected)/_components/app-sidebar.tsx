'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Flame, Gem, Home, LucideFileVideo, Search, Wallet } from "lucide-react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
// import { UploadDropzone } from "@/utils/uploadthing"; // Removed UploadDropzone import
import { FileIcon, PlusIcon, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button"
import { SheetClose } from "@/components/ui/sheet";

const MenuItems = [
  {
    title: "Home",
    url: '/dashboard',
    icon: Home
  },  
  {
    title: "Billing",
    url: '/billing',
    icon: Wallet
  },
]

export function AppSidebar() {
  const session = useSession();
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarHeader>
        <div>
          <div className="flex items-center gap-3 w-full justify-center mt-5">
            {/* <Image src={'/logo.svg'} alt = 'logo' width={40} height={40}/> */}
            <h2 className="font-bold text-2xl">ClipCraft</h2>
          </div>
          <h2 className="text-lg text-gray-400 text-center mt-3">Your AI Video Studio.</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="mx-5 mt-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="w-full">+ Create New Video</Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="max-w-full w-full rounded-lg p-6">
                  <SheetHeader>
                    <SheetTitle className="text-2xl font-bold">Create New Video</SheetTitle>
                    <SheetDescription>
                      Choose how you want to create your video.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col justify-between md:flex-row gap-4 py-4 items-start">
                    {/* <div className="flex flex-col w-full flex-1" >
                      <h3 className="mb-4 text-xl font-bold">Generate video from your script</h3>
                      <Link href={'/create'}>
                        
                      </Link>
                    </div> */}
                    <div className="flex flex-1 flex-col items-center">
                      <h3 className="mb-4 text-xl font-bold">Generate video from your script</h3>
                      <div className="w-full">
                        <SheetClose asChild>
                          <Link href={'/create'}>
                          
                          <Button
                            variant="outline"
                            className="flex h-48 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition-colors hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:cursor-pointer"
                          >
                            <FileIcon className="mb-2 h-12 w-12 text-gray-400" />
                            <span className="text-lg font-semibold">Start with a script</span>
                            <span className="text-sm text-gray-500">AI will generate the video for you</span>
                          </Button>
                          </Link>
                        </SheetClose>
                      </div>
                    </div>
                    <div className="flex items-center justify-center text-xl font-bold md:h-48 text-muted-foreground">OR</div>
                    <div className="flex flex-1 flex-col items-center">
                      <h3 className="mb-4 text-xl font-bold">Upload your existing video</h3>
                      <SheetClose asChild>
                        <label
                          htmlFor="file-upload"
                          className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-6 text-center transition-colors hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800"
                        >
                          <PlusIcon className="mb-2 h-12 w-12 text-gray-400 opacity-50" />
                          <span className="text-lg font-semibold">Drag & drop or click to upload</span>
                          <span className="text-sm text-gray-500">MP4, MOV, AVI, or WebM</span>
                          {/* <input id="file-upload" type="file" className="sr-only" accept="video/*" /> */}
                        </label>
                      </SheetClose>
                      <span className="text-sm m-1 text-gray-500 text-wrap">{"Feature currently paused: My personal AWS transcribe credits have run out"}</span>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <SidebarMenu>
              {MenuItems.map((menu, index) => {
                return (
                  <SidebarMenuItem key={index} className="mt-3">
                    <SidebarMenuButton isActive={path === menu.url} className="p-5">
                      <Link href={menu.url} className="flex items-center gap-4 p-3">
                        <menu.icon />
                        <span className="text-sm">{menu.title}</span>
                      </Link>

                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-5 border rounded-lg mb-6 bg-gray-900">
          <div className="flex items-center justify-between">
            <Gem className="text-gray-400" />
            <h2 className="text-gray-400">{session.data?.user.credits} Credits left</h2>
          </div>
          <Button className="w-full mt-3">
            <Link href={'/billing'}>
              Buy More Credits
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
