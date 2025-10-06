import React from "react"
import { ToastProvider } from "./toast"

export function Toaster() {
  return React.createElement(ToastProvider, { children: null })
}