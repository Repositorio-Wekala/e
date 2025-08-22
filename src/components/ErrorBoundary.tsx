'use client'

import { useEffect } from 'react'

export function ErrorHandler() {
  useEffect(() => {
    // Suprimir errores de runtime.lastError
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('runtime.lastError') || 
          event.message.includes('message port closed')) {
        event.preventDefault()
        return false
      }
    }

    // Suprimir errores de console.error relacionados con runtime.lastError y analytics
    const originalConsoleError = console.error
    console.error = function(...args: any[]) {
      const message = args.join(' ')
      if (message.includes('runtime.lastError') || 
          message.includes('message port closed') ||
          message.includes('Error updating session duration') ||
          message.includes('Analytics error')) {
        return // No mostrar estos errores
      }
      originalConsoleError.apply(console, args)
    }

    // Suprimir errores de unhandledrejection relacionados con runtime.lastError
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason && typeof event.reason === 'string' && 
          (event.reason.includes('runtime.lastError') || 
           event.reason.includes('message port closed'))) {
        event.preventDefault()
        return false
      }
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      console.error = originalConsoleError
    }
  }, [])

  return null
}
