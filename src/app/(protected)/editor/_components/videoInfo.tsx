"use client"

import { useState } from "react"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useVideoDataStore } from "@/store"
import ThreeDotsMenu from "./three_dots_menu"
import BackArrow from "./back_arrow"
import Export from "./export"
import VideoDetails from "./videoDetails"
import Link from "next/link"
import { useQueryClient } from "@tanstack/react-query"

export default function VideoInfo() {
  const videoData = useVideoDataStore((state) => state.videoData)

  const duration = useVideoDataStore((state)=>state.durationInFrames);

  const [isExporting, setIsExporting] = useState(false)
  
  const handleExport = async() => {
    setIsExporting(true)
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)
    }, 2000)
  }

  if (!videoData) return null

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header with back button and actions */}
      <div className=" flex items-center justify-between">
        <Link href={'/dashboard'}>
          <Button variant="ghost" className="hover:cursor-pointer gap-2" size="sm">
            <BackArrow/>
            Back to Projects
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <ThreeDotsMenu/>
        </div>
      </div>

      {/* Project Title */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">{videoData.title || "Untitled Project"}</h1>
          <Badge variant="outline" className="ml-2">
            {videoData.videoStyle || "Default Style"}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-3.5 w-3.5" />
          <span>Last edited 2 hours ago • </span>
          <span className="ml-1">Duration: {duration}</span>
        </div>
      </div>

      {/* Main Content */}
      <VideoDetails/>
      {/* Export Options */}
      <Export/>
    </div>
  )
}
