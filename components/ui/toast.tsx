"use client"

import * as React from "react"

interface ToastProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  variant?: "default" | "destructive"
  className?: string
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
}

type ToastActionElement = React.ReactElement

export const Toast: React.FC<ToastProps> = ({
  open,
  variant = "default",
  className,
  title,
  description,
  children,
}) => {
  return (
    <div 
      className={`toast ${variant === "destructive" ? "toast-destructive" : ""} ${className || ""}`}
      role="alert"
      aria-live="assertive"
      data-state={open ? "open" : "closed"}
    >
      {title && <div className="toast-title">{title}</div>}
      {description && <div className="toast-description">{description}</div>}
      {children}
    </div>
  )
}

export interface ToastActionProps {
  className?: string
  children?: React.ReactNode
  altText?: string
}

export const ToastAction: React.FC<ToastActionProps> = ({
  className,
  children,
  altText,
}) => {
  return (
    <button 
      className={`toast-action ${className || ""}`}
      aria-label={altText}
    >
      {children}
    </button>
  )
}

export type { ToastProps, ToastActionElement } 