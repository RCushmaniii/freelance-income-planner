'use client'

import * as React from "react"
import { Info } from "lucide-react"
import { cn } from "@/lib/utils"

interface TooltipProps {
  text: string
  className?: string
}

const Tooltip = ({ text, className }: TooltipProps) => {
  return (
    <div className={cn("group relative inline-block ml-2 cursor-help", className)}>
      <Info size={14} className="text-muted hover:text-foreground transition-colors" />
      <div className="invisible group-hover:visible absolute z-10 w-48 p-2 mt-1 text-xs text-white bg-gray-800 dark:bg-gray-900 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity left-1/2 transform -translate-x-1/2">
        {text}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-2 h-2 bg-gray-800 dark:bg-gray-900 rotate-45" />
      </div>
    </div>
  )
}

export { Tooltip }
