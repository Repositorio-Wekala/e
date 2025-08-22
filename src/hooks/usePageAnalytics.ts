import { useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { analyticsAPI } from '@/lib/supabase'

interface UsePageAnalyticsOptions {
  trackPageViews?: boolean
  trackClicks?: boolean
  trackConversions?: boolean
  trackEdits?: boolean
}

export function usePageAnalytics(options: UsePageAnalyticsOptions = {}) {
  const pathname = usePathname()
  const {
    trackPageViews = true,
    trackClicks = true,
    trackConversions = true,
    trackEdits = true
  } = options

  // Generar ID de sesión único
  const getSessionId = useCallback(() => {
    if (typeof window === 'undefined') return null
    
    let sessionId = localStorage.getItem('analytics_session_id')
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('analytics_session_id', sessionId)
    }
    return sessionId
  }, [])

  // Crear sesión al cargar la página
  useEffect(() => {
    if (!trackPageViews || typeof window === 'undefined') return

    const sessionId = getSessionId()
    if (!sessionId) return

    const createSession = async () => {
      try {
        await analyticsAPI.createSession({
          session_id: sessionId,
          user_agent: navigator.userAgent,
          page_url: pathname,
          referrer: document.referrer || undefined
        })
      } catch (error) {
        console.error('Error creating analytics session:', error)
      }
    }

    createSession()
  }, [pathname, trackPageViews, getSessionId])

  // Track page view
  useEffect(() => {
    if (!trackPageViews || typeof window === 'undefined') return

    const sessionId = getSessionId()
    if (!sessionId) return

    const trackPageView = async () => {
      try {
        await analyticsAPI.trackEvent({
          session_id: sessionId,
          event_type: 'page_view',
          page_url: pathname,
          element_text: document.title
        })
      } catch (error) {
        console.error('Error tracking page view:', error)
      }
    }

    // Pequeño delay para asegurar que la sesión se haya creado
    const timeoutId = setTimeout(trackPageView, 100)
    return () => clearTimeout(timeoutId)
  }, [pathname, trackPageViews, getSessionId])

  // Track clicks
  const trackClick = useCallback(async (elementType: string, elementText: string, pageUrl?: string) => {
    if (!trackClicks) return

    const sessionId = getSessionId()
    if (!sessionId) return

    try {
      await analyticsAPI.trackEvent({
        session_id: sessionId,
        event_type: 'click',
        page_url: pageUrl || pathname,
        element_text: elementText,
        metadata: { element_type: elementType }
      })
    } catch (error) {
      console.error('Error tracking click:', error)
    }
  }, [pathname, trackClicks, getSessionId])

  // Track conversions
  const trackConversion = useCallback(async (conversionType: string, value?: number, pageUrl?: string) => {
    if (!trackConversions) return

    const sessionId = getSessionId()
    if (!sessionId) return

    try {
      await analyticsAPI.trackEvent({
        session_id: sessionId,
        event_type: 'conversion',
        page_url: pageUrl || pathname,
        element_text: conversionType,
        metadata: { value, conversion_type: conversionType }
      })
    } catch (error) {
      console.error('Error tracking conversion:', error)
    }
  }, [pathname, trackConversions, getSessionId])

  // Track edits
  const trackEdit = useCallback(async (editType: string, pageUrl?: string) => {
    if (!trackEdits) return

    const sessionId = getSessionId()
    if (!sessionId) return

    try {
      await analyticsAPI.trackEvent({
        session_id: sessionId,
        event_type: 'edit_save',
        page_url: pageUrl || pathname,
        element_text: editType,
        metadata: { edit_type: editType }
      })
    } catch (error) {
      console.error('Error tracking edit:', error)
    }
  }, [pathname, trackEdits, getSessionId])

  // Actualizar duración de sesión al salir
  useEffect(() => {
    if (typeof window === 'undefined') return

    const sessionId = getSessionId()
    if (!sessionId) return

    const startTime = Date.now()

    const handleBeforeUnload = async () => {
      try {
        const duration = Math.floor((Date.now() - startTime) / 1000)
        await analyticsAPI.updateSessionDuration(sessionId, duration)
      } catch (error) {
        // Silenciar errores de analytics al cerrar la página
        console.warn('Analytics error on page unload:', error)
      }
    }

    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'hidden') {
        try {
          const duration = Math.floor((Date.now() - startTime) / 1000)
          await analyticsAPI.updateSessionDuration(sessionId, duration)
        } catch (error) {
          // Silenciar errores de analytics al cambiar visibilidad
          console.warn('Analytics error on visibility change:', error)
        }
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [getSessionId])

  return {
    trackClick,
    trackConversion,
    trackEdit
  }
}
