import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, PenLine, Share2 } from 'lucide-react'
import React from 'react'

function ThreeDotsMenu() {
  return (
    <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="hover:cursor-pointer" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='bg-m'>
                <Share2 className="mr-2 h-4 w-4" />  <span className='text-muted-foreground text-sm'>
                Share Project {"(coming soon!)"}
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:cursor-pointer text-destructive">Delete Project</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
  )
}

export default ThreeDotsMenu