import * as React from "react"

interface ToastContextType {
  toasts: Array<{
    id: string
    title?: string
    description?: string
    variant?: 'default' | 'destructive'
  }>
  toast: (props: {
    title?: string
    description?: string
    variant?: 'default' | 'destructive'
  }) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastContextType['toasts']>([])

  const toast = React.useCallback((props: {
    title?: string
    description?: string
    variant?: 'default' | 'destructive'
  }) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { id, ...props }])
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 5000)
  }, [])

  return React.createElement(
    ToastContext.Provider,
    { value: { toasts, toast } },
    children,
    React.createElement(ToastViewport)
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}

function ToastViewport() {
  const { toasts } = useToast()

  return React.createElement(
    'div',
    { className: "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]" },
    toasts.map((toast) =>
      React.createElement(
        'div',
        {
          key: toast.id,
          className: `group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all ${
            toast.variant === 'destructive' 
              ? "border-red-500 bg-red-900 text-red-100" 
              : "border-slate-600 bg-slate-800 text-white"
          }`
        },
        React.createElement(
          'div',
          { className: "grid gap-1" },
          toast.title && React.createElement('div', { className: "text-sm font-semibold" }, toast.title),
          toast.description && React.createElement('div', { className: "text-sm opacity-90" }, toast.description)
        ),
        React.createElement(
          'button',
          {
            onClick: () => {
              // Remove toast logic would go here
            },
            className: "absolute right-2 top-2 rounded-md p-1 text-white/50 opacity-0 transition-opacity hover:text-white focus:opacity-100 group-hover:opacity-100"
          },
          '×'
        )
      )
    )
  )
}