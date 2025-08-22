'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { homeButtonsAPI, type HomeButton } from '@/lib/supabase'
import { useAnalytics } from '@/hooks/useAnalytics'
import { usePageAnalytics } from '@/hooks/usePageAnalytics'

export default function Home() {
  const [buttons, setButtons] = useState<HomeButton[]>([])
  const [loading, setLoading] = useState(true)
  
  // Analytics tracking
  const { usePageTracking, trackClick } = useAnalytics()
  const { trackClick: trackPageClick } = usePageAnalytics()
  usePageTracking('/')

  useEffect(() => {
    const loadButtons = async () => {
      try {
        const data = await homeButtonsAPI.getAll()
        setButtons(data.filter(btn => btn.is_active))
      } catch (error) {
        console.error('Error cargando botones:', error)
      } finally {
        setLoading(false)
      }
    }

    loadButtons()
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a1a] relative overflow-x-hidden">
      {/* Fixed background layer */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Background geometric shapes - more vibrant gradients */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#0043ff]/40 to-[#0043ff]/20 rounded-full blur-2xl"></div>
          <div className="absolute top-40 right-8 w-24 h-24 bg-gradient-to-br from-[#0043ff]/50 to-[#0043ff]/25 rounded-full blur-xl"></div>
          <div className="absolute bottom-40 left-16 w-20 h-20 bg-gradient-to-br from-[#0043ff]/35 to-[#0043ff]/15 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-br from-[#0043ff]/60 to-[#0043ff]/30 rounded-full blur-2xl"></div>
          <div className="absolute top-60 left-1/4 w-16 h-16 bg-gradient-to-br from-[#0043ff]/30 to-[#0043ff]/10 rounded-full blur-lg"></div>
          <div className="absolute bottom-60 right-1/4 w-12 h-12 bg-gradient-to-br from-[#0043ff]/40 to-[#0043ff]/20 rounded-full blur-lg"></div>
        </div>

        {/* Additional lighting effects with #0043ff - more vibrant */}
        <div className="absolute inset-0">
          <div className="absolute top-32 left-20 w-8 h-8 bg-[#0043ff]/80 rounded-full blur-sm"></div>
          <div className="absolute top-48 right-16 w-6 h-6 bg-[#0043ff]/90 rounded-full blur-sm"></div>
          <div className="absolute bottom-32 left-24 w-10 h-10 bg-[#0043ff]/70 rounded-full blur-md"></div>
          <div className="absolute bottom-48 right-12 w-8 h-8 bg-[#0043ff]/85 rounded-full blur-sm"></div>
          <div className="absolute top-80 left-1/3 w-4 h-4 bg-[#0043ff]/95 rounded-full blur-xs"></div>
          <div className="absolute bottom-80 right-1/3 w-5 h-5 bg-[#0043ff]/75 rounded-full blur-sm"></div>
        </div>

        {/* Asterisco SVG - right side, bottom position */}
        <div className="absolute inset-0">
          <Image
            src="/Asterisco.svg"
            alt=""
            width={112}
            height={112}
            className="fixed right-2 bottom-20 w-16 h-auto opacity-90"
          />
        </div>

        {/* Vector Linea SVG - right side */}
        <div className="absolute inset-0">
          <Image
            src="/Vector Linea.svg"
            alt=""
            width={377}
            height={740}
            className="absolute right-0 top-0 w-full h-full object-cover opacity-80"
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-8">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/Logo e-me.svg"
            alt="e-me Logo"
            width={185}
            height={34}
            className="w-48 h-auto"
            priority
          />
        </div>

        {/* Tagline */}
        <div className="text-center mb-8 text-white">
          <p className="text-xl mb-1">Estrategia que escala.</p>
          <p className="text-xl mb-1">Tecnología que optimiza.</p>
          <p className="text-2xl font-bold">Resultados que venden.</p>
        </div>

        {/* Service links - super transparent glass effect */}
        <div className="w-full max-w-sm space-y-4 mb-10">
          {loading ? (
            <div className="text-center text-white/60">
              <div className="animate-spin w-6 h-6 border-2 border-white/30 border-t-white rounded-full mx-auto mb-2"></div>
              <p>Cargando...</p>
            </div>
          ) : (
            buttons.map((button) => (
              <LinkButton 
                key={button.id}
                href={button.href} 
                text={button.text}
                icon={button.icon}
                color={button.color}
              />
            ))
          )}
        </div>

        {/* Contact button - WhatsApp green circle */}
        <div className="flex justify-center">
          <button 
            onClick={() => {
              trackPageClick('whatsapp-button', 'Contacto WhatsApp', '/')
              // Abrir WhatsApp
              window.open('https://wa.me/573001234567?text=Hola,%20me%20interesa%20tus%20servicios', '_blank')
            }}
            className="w-16 h-16 bg-[#25d366] text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:bg-[#22c55e] hover:shadow-xl relative overflow-hidden group"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// Link button component - super transparent glass effect
function LinkButton({ href, text, icon, color }: { href: string; text: string; icon?: string; color?: string }) {
  const { trackClick } = useAnalytics()
  const { trackClick: trackPageClick } = usePageAnalytics()
  
  const handleClick = () => {
    trackClick('home-button', text, '/')
    trackPageClick('home-button', text, '/')
  }
  
  return (
    <a
      href={href}
      onClick={handleClick}
      className="block w-full bg-white/8 backdrop-blur-2xl border border-white/20 text-white font-medium py-4 px-6 rounded-full text-center hover:bg-white/12 transition-all duration-200 shadow-xl flex items-center justify-center space-x-2"
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span>{text}</span>
    </a>
  )
}
