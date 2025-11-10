"use client"

import * as React from "react"
import { Upload, FileJson } from "lucide-react"
import { cn } from "../../lib/utils"

interface FileUploadProps {
  onFileSelect: (file: File) => void
  accept?: string
  disabled?: boolean
  className?: string
  maxSizeMB?: number
}

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  ({ onFileSelect, accept = ".json", disabled = false, className, maxSizeMB }, ref) => {
    const [isDragging, setIsDragging] = React.useState(false)
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!disabled) {
        setIsDragging(true)
      }
    }

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
    }

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      if (disabled) return

      const files = e.dataTransfer.files
      if (files && files.length > 0) {
        const file = files[0]
        onFileSelect(file)
      }
    }

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        const file = files[0]
        onFileSelect(file)
      }
      // Reset input value so the same file can be selected again
      e.target.value = ''
    }

    const handleClick = () => {
      if (!disabled) {
        fileInputRef.current?.click()
      }
    }

    return (
      <div
        ref={ref}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={cn(
          "relative flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 transition-all cursor-pointer",
          isDragging
            ? "border-primary bg-primary/10 scale-[1.02]"
            : "border-border hover:border-primary/50 hover:bg-secondary/50",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled}
        />
        
        <div className={cn(
          "rounded-full p-4 transition-colors",
          isDragging ? "bg-primary/20" : "bg-secondary"
        )}>
          {isDragging ? (
            <FileJson className="w-8 h-8 text-primary" />
          ) : (
            <Upload className="w-8 h-8 text-muted-foreground" />
          )}
        </div>

        <div className="text-center space-y-1">
          <p className="text-sm font-medium">
            {isDragging ? (
              <span className="text-primary">Drop your file here</span>
            ) : (
              <>
                <span className="text-primary">Click to upload</span>
                <span className="text-muted-foreground"> or drag and drop</span>
              </>
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            JSON files only
            {maxSizeMB && ` • Max ${maxSizeMB}MB`}
          </p>
        </div>
      </div>
    )
  }
)

FileUpload.displayName = "FileUpload"

