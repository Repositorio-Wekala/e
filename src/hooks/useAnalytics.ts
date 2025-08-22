import { useEffect } from 'react'

interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
  timestamp?: number
}

export function useAnalytics() {
  // Función para enviar eventos a analytics
  const sendEvent = (event: AnalyticsEvent) => {
    // Por ahora solo loggeamos los eventos
    // Aquí se puede integrar con Google Analytics, Mixpanel, etc.
    console.log('Analytics Event:', event)
    
    // Ejemplo de integración con Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.event, event.properties)
    }
  }

  // Hook para tracking de páginas
  const usePageTracking = (pagePath: string) => {
    useEffect(() => {
      const event: AnalyticsEvent = {
        event: 'page_view',
        properties: {
          page_path: pagePath,
          page_title: document.title
        },
        timestamp: Date.now()
      }
      
      sendEvent(event)
    }, [pagePath])
  }

  // Función para tracking de clicks
  const trackClick = (elementType: string, elementName: string, pagePath: string) => {
    const event: AnalyticsEvent = {
      event: 'click',
      properties: {
        element_type: elementType,
        element_name: elementName,
        page_path: pagePath
      },
      timestamp: Date.now()
    }
    
    sendEvent(event)
  }

  // Función para tracking de conversiones
  const trackConversion = (conversionType: string, value?: number) => {
    const event: AnalyticsEvent = {
      event: 'conversion',
      properties: {
        conversion_type: conversionType,
        value: value
      },
      timestamp: Date.now()
    }
    
    sendEvent(event)
  }

  return {
    usePageTracking,
    trackClick,
    trackConversion,
    sendEvent
  }
}
