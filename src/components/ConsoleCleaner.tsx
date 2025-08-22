'use client'

import { useEffect } from 'react'

export default function ConsoleCleaner() {
  useEffect(() => {
    // Limpiar errores de extensiones del navegador
    const originalError = console.error
    const originalWarn = console.warn

    console.error = (...args: any[]) => {
      const message = args[0]
      if (typeof message === 'string' && (
        message.includes('runtime.lastError') ||
        message.includes('The message port closed') ||
        message.includes('Extension context invalidated')
      )) {
        return // No mostrar errores de extensiones
      }
      originalError.apply(console, args)
    }

    console.warn = (...args: any[]) => {
      const message = args[0]
      if (typeof message === 'string' && (
        message.includes('runtime.lastError') ||
        message.includes('The message port closed') ||
        message.includes('Extension context invalidated')
      )) {
        return // No mostrar warnings de extensiones
      }
      originalWarn.apply(console, args)
    }

    // Limpiar al desmontar
    return () => {
      console.error = originalError
      console.warn = originalWarn
    }
  }, [])

  return null // Este componente no renderiza nada
}
