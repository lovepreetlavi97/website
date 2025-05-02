"use client"

import { useToast } from "@/hooks/use-toast"
import { Toast } from "./toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="toaster-container">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            title={title}
            description={description}
          >
            {action}
          </Toast>
        )
      })}
    </div>
  )
} 