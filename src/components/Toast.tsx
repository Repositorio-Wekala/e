'use client'

import { useState, useEffect } from 'react'
import { FiCheck, FiX, FiAlertCircle, FiInfo } from 'react-icons/fi'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
  onClose: () => void
}

export default function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Mostrar el toast con animación
    const showTimer = setTimeout(() => setIsVisible(true), 100)
    
    // Ocultar automáticamente después del tiempo especificado
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Esperar a que termine la animación
    }, duration)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheck className="w-5 h-5" />
      case 'error':
        return <FiX className="w-5 h-5" />
      case 'warning':
        return <FiAlertCircle className="w-5 h-5" />
      case 'info':
        return <FiInfo className="w-5 h-5" />
      default:
        return <FiCheck className="w-5 h-5" />
    }
  }

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800 shadow-green-100'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800 shadow-red-100'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800 shadow-yellow-100'
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800 shadow-blue-100'
      default:
        return 'bg-green-50 border-green-200 text-green-800 shadow-green-100'
    }
  }

  const getIconStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-600'
      case 'error':
        return 'bg-red-100 text-red-600'
      case 'warning':
        return 'bg-yellow-100 text-yellow-600'
      case 'info':
        return 'bg-blue-100 text-blue-600'
      default:
        return 'bg-green-100 text-green-600'
    }
  }

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 max-w-sm w-full
        transform transition-all duration-300 ease-out
        ${isVisible ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'}
      `}
    >
      <div className={`
        flex items-center space-x-3 p-4 rounded-xl border-2 shadow-lg
        ${getStyles()}
        backdrop-blur-sm
      `}>
        <div className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
          ${getIconStyles()}
        `}>
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          className="flex-shrink-0 w-6 h-6 rounded-full bg-white/50 hover:bg-white/80 transition-colors flex items-center justify-center"
        >
          <FiX className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}

// Hook para usar toasts
export function useToast() {
  const [toasts, setToasts] = useState<Array<{
    id: string
    message: string
    type: 'success' | 'error' | 'info' | 'warning'
    duration?: number
  }>>([])

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success', duration?: number) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { id, message, type, duration }])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const ToastContainer = () => (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-2">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )

  return { showToast, ToastContainer }
}
