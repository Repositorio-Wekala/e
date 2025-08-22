'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

export default function SEOLocalGeoAIPage() {
  const [pageData] = useState({
    hero: {
      title: "SEO Local y GEO con AI",
      subtitle: "Optimizamos tu negocio para que aparezca primero en Google y lo conectamos con las personas correctas en la ubicación exacta donde quieres vender.",
      description: "Investigación automática de keywords geolocalizadas y detección de zonas de alta demanda."
    },
    services: [
      {
        id: 1,
        title: "Optimización on-page",
        description: "Meta títulos, descripciones y contenido con términos relevantes de tu región."
      },
      {
        id: 2,
        title: "Ajuste dinámico de pujas",
        description: "Presupuesto por ubicación en Google, Meta y otras plataformas."
      },
      {
        id: 3,
        title: "Anuncios personalizados",
        description: "Para cada barrio, ciudad o región, impulsados por AI."
      },
      {
        id: 4,
        title: "Perfil de Google Business",
        description: "Maps optimizado para destacar en búsquedas locales."
      },
      {
        id: 5,
        title: "Landing pages geo-adaptadas",
        description: "Enlaces regionales que aumentan tu visibilidad y generan leads cualificados."
      }
    ],
    cta: {
      title: "Pon tu negocio en el mapa con AI."
    }
  })

  return (
    <div className="min-h-screen bg-[#030B46]">
      {/* Espacio superior */}
      <div className="bg-[#091844] h-16"></div>
      
      {/* Top tilted banner */}
      <div className="relative bg-[#0042FF] h-20 md:h-24 lg:h-28 transform skew-y-1 flex items-center px-6 md:px-12 lg:px-16">
        <Link href="/" className="bg-[#0a0a1a]/10 backdrop-blur-sm border border-white/30 rounded-lg p-2 transform -skew-y-1 ml-1 z-20 -mt-24">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </Link>
        <div className="flex-1 flex justify-center">
          <div className="text-center transform skew-y-1 -ml-8 md:-ml-12 lg:-ml-16">
            <h1 className="text-[35px] md:text-[45px] lg:text-[55px] font-black text-white leading-[119%] tracking-[0%]">
              SEO Local y GEO con AI
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-[#030B46] pt-8 pb-6">
        <div className="container mx-auto px-6">
          {/* Imagen representativa */}
          <div className="flex justify-start mb-6">
            <div className="relative">
              <Image
                src="/globe.svg"
                alt="Globo mundial con SEO"
                width={300}
                height={300}
                className="rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sección unificada: Texto introductorio + Servicios */}
      <div className="bg-[#0042FF] py-6">
        <div className="container mx-auto px-6">
          {/* Texto introductorio */}
          <div className="mb-6">
            <p className="text-white text-base leading-relaxed mb-4">
              {pageData.hero.subtitle}
            </p>
            <div className="flex items-center space-x-3">
              <h2 className="text-white text-lg font-semibold">¿Qué entregamos?</h2>
              <div className="w-6 h-6 bg-[#FFEA1F] rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-[#0042FF]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Tarjetas de servicios */}
          <div className="space-y-4">
            {pageData.services.slice(0, 3).map((service, index) => (
              <div key={service.id} className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 relative overflow-hidden">
                {/* Efectos de fondo según el servicio */}
                {index === 0 && (
                  <div className="absolute top-4 right-4 opacity-10">
                    <svg className="w-12 h-12 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    </svg>
                  </div>
                )}
                {index === 1 && (
                  <div className="absolute top-4 right-4 opacity-10">
                    <svg className="w-12 h-12 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                  </div>
                )}
                {index === 2 && (
                  <div className="absolute top-4 right-4 opacity-10">
                    <svg className="w-12 h-12 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                )}
                
                <div className="relative z-10">
                  <h3 className="text-[#FFEA1F] text-lg font-bold mb-2">{service.title}</h3>
                  <p className="text-white text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Segunda sección de servicios con efectos glassmorphism */}
      <div className="bg-[#030B46] py-20 relative overflow-hidden">
        {/* Vector de línea de fondo */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/Vector Linea.svg"
            alt=""
            width={377}
            height={740}
            className="absolute right-0 top-0 w-full h-full object-cover opacity-70"
          />
        </div>

        <div className="relative z-10">
          {/* Header de sección con glassmorphism */}
          <div className="group relative isolate overflow-hidden rounded-full bg-white/20 supports-[backdrop-filter]:bg-white/10 supports-[backdrop-filter]:backdrop-blur-xl ring-1 ring-inset ring-white/15 px-6 py-3 mb-8 inline-block mx-auto">
            {/* Diagonal reflection */}
            <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-[200%] rotate-[20deg] bg-gradient-to-r from-white/30 via-white/5 to-transparent opacity-20 transition-opacity duration-500 group-hover:opacity-30"></div>
            
            {/* Flares */}
            <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full opacity-25 bg-[radial-gradient(circle_at_center,white,transparent_60%)]"></div>
            <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full opacity-20 bg-[radial-gradient(circle_at_center,white,transparent_65%)]"></div>
            
            {/* Reliefs */}
            <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.25)]"></div>
            <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_-40px_80px_rgba(0,0,0,0.15)]"></div>

            <div className="relative z-10 text-center">
              <h2 className="text-white text-lg font-semibold">¿Qué entregamos?</h2>
            </div>
          </div>

          {/* Tarjetas de servicios con glassmorphism inclinadas */}
          <div className="space-y-8 md:space-y-10 lg:space-y-12 relative z-10">
            <div className="transform rotate-1 -ml-4 md:-ml-6 lg:-ml-8">
              <div className="group relative isolate overflow-hidden rounded-2xl bg-white/20 supports-[backdrop-filter]:bg-white/10 supports-[backdrop-filter]:backdrop-blur-xl ring-1 ring-inset ring-white/15 p-8 transition-shadow hover:shadow-lg">
                {/* Diagonal reflection */}
                <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-[200%] rotate-[20deg] bg-gradient-to-r from-white/30 via-white/5 to-transparent opacity-20 transition-opacity duration-500 group-hover:opacity-30"></div>
                
                {/* Flares */}
                <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full opacity-25 bg-[radial-gradient(circle_at_center,white,transparent_60%)]"></div>
                <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full opacity-20 bg-[radial-gradient(circle_at_center,white,transparent_65%)]"></div>
                
                {/* Reliefs */}
                <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.25)]"></div>
                <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_-40px_80px_rgba(0,0,0,0.15)]"></div>

                <div className="relative z-10">
                  <h3 className="text-[#FFEA1F] text-lg font-bold mb-3">{pageData.services[3].title}</h3>
                  <p className="text-white text-base leading-relaxed">{pageData.services[3].description}</p>
                </div>
              </div>
            </div>
            
            <div className="transform -rotate-2 mr-4 md:mr-6 lg:mr-8">
              <div className="group relative isolate overflow-hidden rounded-2xl bg-white/20 supports-[backdrop-filter]:bg-white/10 supports-[backdrop-filter]:backdrop-blur-xl ring-1 ring-inset ring-white/15 p-8 transition-shadow hover:shadow-lg">
                {/* Diagonal reflection */}
                <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-[200%] rotate-[20deg] bg-gradient-to-r from-white/30 via-white/5 to-transparent opacity-20 transition-opacity duration-500 group-hover:opacity-30"></div>
                
                {/* Flares */}
                <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full opacity-25 bg-[radial-gradient(circle_at_center,white,transparent_60%)]"></div>
                <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full opacity-20 bg-[radial-gradient(circle_at_center,white,transparent_65%)]"></div>
                
                {/* Reliefs */}
                <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.25)]"></div>
                <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_-40px_80px_rgba(0,0,0,0.15)]"></div>

                <div className="relative z-10">
                  <h3 className="text-[#FFEA1F] text-lg font-bold mb-3">{pageData.services[4].title}</h3>
                  <p className="text-white text-base leading-relaxed">{pageData.services[4].description}</p>
                </div>
              </div>
            </div>
            
            <div className="transform rotate-3 -ml-6 md:-ml-8 lg:-ml-10">
              <div className="group relative isolate overflow-hidden rounded-2xl bg-white/20 supports-[backdrop-filter]:bg-white/10 supports-[backdrop-filter]:backdrop-blur-xl ring-1 ring-inset ring-white/15 p-8 transition-shadow hover:shadow-lg">
                {/* Diagonal reflection */}
                <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-[200%] rotate-[20deg] bg-gradient-to-r from-white/30 via-white/5 to-transparent opacity-20 transition-opacity duration-500 group-hover:opacity-30"></div>
                
                {/* Flares */}
                <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full opacity-25 bg-[radial-gradient(circle_at_center,white,transparent_60%)]"></div>
                <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full opacity-20 bg-[radial-gradient(circle_at_center,white,transparent_65%)]"></div>
                
                {/* Reliefs */}
                <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.25)]"></div>
                <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_-40px_80px_rgba(0,0,0,0.15)]"></div>

                <div className="relative z-10">
                  <h3 className="text-[#FFEA1F] text-lg font-bold mb-3">{pageData.services[4].title}</h3>
                  <p className="text-white text-base leading-relaxed">{pageData.services[4].description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Casos de Éxito */}
      <div className="bg-[#030B46] py-16">
        <div className="container mx-auto px-6">
          {/* Header de casos de éxito */}
          <div className="bg-[#0042FF] rounded-full p-4 mb-6 max-w-md mx-auto">
            <h2 className="text-white text-lg font-semibold text-center">Casos de éxito</h2>
          </div>

          {/* Área de contenido tipo reel */}
          <div className="bg-white rounded-2xl p-4 mb-6 aspect-[9/16] max-w-sm mx-auto relative overflow-hidden">
            <div className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">Reel de caso de éxito</p>
                <p className="text-gray-400 text-sm mt-2">Formato vertical 9:16</p>
              </div>
            </div>
            
            {/* Indicadores de navegación tipo reel */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            </div>
          </div>

          {/* Botones de navegación */}
          <div className="flex justify-center space-x-4">
            <button className="w-12 h-12 bg-[#0043FF] rounded-full flex items-center justify-center hover:bg-[#0038CC] transition-colors">
              <Image
                src="/atras.svg"
                alt="Anterior"
                width={22}
                height={39}
                className="w-6 h-6"
              />
            </button>
            <button className="w-12 h-12 bg-[#0043FF] rounded-full flex items-center justify-center hover:bg-[#0038CC] transition-colors">
              <Image
                src="/siguiente.svg"
                alt="Siguiente"
                width={22}
                height={39}
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="bg-[#091842] py-12 rounded-t-[32px] -mt-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-left">
            <h2 className="text-white font-poppins font-normal text-2xl leading-[124%] tracking-[0%] mb-2">
              {pageData.cta.title}
            </h2>
          </div>
        </div>
      </div>
      
      {/* Botón flotante de WhatsApp */}
      <FloatingWhatsApp />
    </div>
  )
}
