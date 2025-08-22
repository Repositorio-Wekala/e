import { useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface UseAutoLogoutOptions {
  timeoutMinutes?: number
  onLogout?: () => void
  enabled?: boolean
}

export const useAutoLogout = ({
  timeoutMinutes = 60, // 1 hora por defecto
  onLogout,
  enabled = true
}: UseAutoLogoutOptions = {}) => {
  const router = useRouter()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastActivityRef = useRef<number>(Date.now())

  // Función para resetear el timer
  const resetTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (enabled) {
      timeoutRef.current = setTimeout(async () => {
        console.log('🕐 Sesión expirada por inactividad')
        
        // Cerrar sesión en Supabase
        try {
          await supabase.auth.signOut()
          console.log('✅ Sesión cerrada en Supabase')
        } catch (error) {
          console.error('❌ Error cerrando sesión:', error)
        }

        // Ejecutar callback personalizado si existe
        if (onLogout) {
          onLogout()
        }

        // Redirigir al login
        router.push('/acceso-dashboard')
      }, timeoutMinutes * 60 * 1000) // Convertir minutos a milisegundos
    }

    lastActivityRef.current = Date.now()
  }, [timeoutMinutes, enabled, onLogout, router])

  // Función para registrar actividad
  const registerActivity = useCallback(() => {
    lastActivityRef.current = Date.now()
    resetTimer()
  }, [resetTimer])

  // Eventos que indican actividad del usuario
  useEffect(() => {
    if (!enabled) return

    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
      'focus'
    ]

    const handleActivity = () => {
      registerActivity()
    }

    // Agregar event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true)
    })

    // Iniciar el timer
    resetTimer()

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true)
      })
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [enabled, registerActivity, resetTimer])

  // Función para obtener el tiempo restante
  const getTimeRemaining = useCallback(() => {
    const now = Date.now()
    const lastActivity = lastActivityRef.current
    const elapsed = now - lastActivity
    const remaining = (timeoutMinutes * 60 * 1000) - elapsed
    
    return Math.max(0, Math.floor(remaining / 1000)) // Retorna segundos restantes
  }, [timeoutMinutes])

  // Función para extender manualmente la sesión
  const extendSession = useCallback(() => {
    registerActivity()
  }, [registerActivity])

  // Función para deshabilitar temporalmente el auto-logout
  const pauseAutoLogout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  // Función para reanudar el auto-logout
  const resumeAutoLogout = useCallback(() => {
    resetTimer()
  }, [resetTimer])

  return {
    getTimeRemaining,
    extendSession,
    pauseAutoLogout,
    resumeAutoLogout,
    lastActivity: lastActivityRef.current
  }
}
