'use client'
import { Button } from "@/components/ui/button"
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
import { Flame, Gem, Home, LucideFileVideo, Search, Wallet } from "lucide-react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
  
const MenuItems = [
  {
    title: "Home",
    url: '/dashboard',
    icon: Home
  },
  {
    title: "Create New Video",
    url: '/create',
    icon: LucideFileVideo
  },
  {
    title: "Explore",
    url: '/explore',
    icon: Search
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
                <h2 className="font-bold text-2xl">Video Gen</h2>
              </div>
              <h2 className="text-lg text-gray-400 text-center mt-3">AI Short video generator</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <div className="mx-5 mt-4">
                  <Link href={'/create'}>
                    <Button className = "w-full">+ Create New Video</Button>
                  </Link>
                </div>
                <SidebarMenu>
                    {MenuItems.map((menu,index)=>{
                      return (
                      <SidebarMenuItem key={index} className="mt-3">
                        <SidebarMenuButton isActive = {path === menu.url }className="p-5">
                          <Link href= {menu.url} className="flex items-center gap-4 p-3">
                            <menu.icon/>
                            <span className="text-sm">{menu.title}</span>
                          </Link>

                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )})}
                </SidebarMenu>
              </SidebarGroupContent>

            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-5 border rounded-lg mb-6 bg-gray-900">
              <div className="flex items-center justify-between">
                <Gem className="text-gray-400"/>
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
  