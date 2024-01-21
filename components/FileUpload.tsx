"use client"

import Image from "next/image"
import { UploadDropzone } from "@/lib/uploadthing"
import "@uploadthing/react/styles.css"
import { FileIcon, X } from "lucide-react"

interface FileUploadProps {
  endpoint: "serverImage" | "messageFile"
  value: string
  onChange: (url?: string) => void
}
const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
  const fileType = value.split(".").pop()
  if (value && fileType !== "pdf" && endpoint === "serverImage") {
    return (
      <div className="relative size-20">
        <Image fill src={value} sizes="50vw" alt="uploaded image" className="object-cover object-center rounded-full bg-muted" />
        <button
          className="absolute top-0 right-0 p-1 text-white rounded-full shadow-sm bg-rose-500"
          type="button"
          onClick={() => onChange("")}>
          <X className="size-4" />
        </button>
      </div>
    )
  }
  if (value && fileType !== "pdf" && endpoint === "messageFile") {
    return (
      <div className="relative h-40 w-60 sm:h-60 sm:w-80">
        <Image fill src={value} sizes="100vw" alt="uploaded image" className="object-cover object-center rounded-md" />
        <button
          className="absolute p-1 text-white rounded-full shadow-sm -top-2 -right-2 bg-rose-500"
          type="button"
          onClick={() => onChange("")}>
          <X className="size-4" />
        </button>
      </div>
    )
  }
  if (value && fileType === "pdf" && endpoint === "messageFile") {
    return (
      <div className="relative flex flex-col items-center justify-center rounded-md size-40 bg-main/10">
        <FileIcon className="text-gray-300 size-20 fill-theme-secondary" />
        <div className="w-full">
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full ml-2 text-sm truncate text-theme-foreground hover:underline">
            {value}
          </a>
        </div>
        <button
          className="absolute p-1 text-white rounded-full shadow-sm -top-2 -right-2 bg-rose-500"
          type="button"
          onClick={() => onChange("")}>
          <X className="size-4" />
        </button>
      </div>
    )
  }

  return (
    <UploadDropzone
      className="dark:border-foreground"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(err) => console.log(err)}
    />
  )
}
export default FileUpload
