'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

export default function AIContentPage() {
  const [pageData] = useState({
    hero: {
      title: "AI Content",
      description: "Creamos videos híbridos que combinan tomas reales e inteligencia artificial para alcanzar tus objetivos de negocio: vender, posicionar o captar leads."
    },
    services: [
      {
        id: 1,
        title: "Guiones de alto engagement",
        description: "Modelos de AI entrenados en formatos virales para ganchos potentes, ritmo dinámico y storytelling que convierte.",
        icon: "🎬"
      },
      {
        id: 2,
        title: "Producción híbrida",
        description: "Integramos tu material real con personajes, escenarios y b-roll generados por AI, sin necesidad de actores ni locaciones.",
        icon: "🔗"
      },
      {
        id: 3,
        title: "Voz y sonido AI",
        description: "Locuciones naturales y efectos diseñados por AI adaptados al tono y estilo de tu marca.",
        icon: "🔊"
      },
      {
        id: 4,
        title: "Videos para pauta publicitaria",
        description: "(Infocomercial, comparativo, error-solución).",
        icon: "📺"
      },
      {
        id: 5,
        title: "Contenido orgánico",
        description: "estilo UGC o podcast para confianza y comunidad.",
        icon: "🌱"
      },
      {
        id: 6,
        title: "Videos de producto 100% IA",
        description: "donde solo el producto es real y todo el entorno es simulado.",
        icon: "🛍️"
      }
    ],
    process: [
      {
        id: 1,
        title: "Analizamos",
        description: "Competencia y audiencia para definir objetivos y disparadores emocionales."
      },
      {
        id: 2,
        title: "Desarrollamos",
        description: "Creamos guiones, personajes y b-roll con AI, y ensamblamos tu material real en una producción cohesiva."
      },
      {
        id: 3,
        title: "Monitoreamos",
        description: "Medimos engagement y conversiones, ajustamos formatos y escalamos resultados de forma continua."
      }
    ],
    cta: {
      title: "Convierte tu producto,",
      subtitle: "tus fotos y cada",
      description: "elemento visual en",
      highlight: "oportunidades",
      highlight2: "de negocio",
      final: "con AI Content."
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
              AI Content
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-[#030B46] pt-8 pb-6">
        <div className="container mx-auto px-6">
          {/* Imagen de la mujer */}
          <div className="flex justify-start mb-6">
            <Image
              src="/img-haicontent.png"
              alt="Mujer sonriendo con camisa de mezclilla"
              width={300}
              height={400}
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>

      {/* Sección unificada: Texto introductorio + Servicios */}
      <div className="bg-[#0042FF] py-6">
        <div className="container mx-auto px-6">
          {/* Texto introductorio */}
          <div className="mb-6">
            <p className="text-white text-base leading-relaxed mb-4">
              {pageData.hero.description}
            </p>
            <div className="flex items-center space-x-3">
              <h2 className="text-white text-lg font-semibold">¿Qué entregamos?</h2>
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">💬</span>
              </div>
            </div>
          </div>

          {/* Tarjetas de servicios */}
          <div className="space-y-4">
            {pageData.services.slice(0, 3).map((service, index) => (
              <div key={service.id} className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 relative overflow-hidden">
                {/* Efectos de fondo según el servicio */}
                {index === 0 && (
                  <div className="absolute top-2 right-2 opacity-20">
                    <span className="text-4xl">📹</span>
                  </div>
                )}
                {index === 1 && (
                  <div className="absolute top-2 right-2 opacity-20">
                    <span className="text-4xl">🔗</span>
                  </div>
                )}
                {index === 2 && (
                  <div className="absolute top-2 right-2 opacity-20">
                    <span className="text-4xl">🔊</span>
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
                  <h3 className="text-[#FFEA1F] text-lg font-bold mb-3">{pageData.services[5].title}</h3>
                  <p className="text-white text-base leading-relaxed">{pageData.services[5].description}</p>
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
            <h3 className="text-white font-poppins font-normal text-2xl leading-[124%] tracking-[0%] mb-2">
              {pageData.cta.subtitle}
            </h3>
            <h4 className="text-white font-poppins font-normal text-2xl leading-[124%] tracking-[0%] mb-3">
              {pageData.cta.description}
            </h4>
            <h5 className="text-3xl font-bold mb-3">
              <span className="bg-[#FFEA1F] text-[#0042FF] px-3 py-1 rounded-full font-poppins font-bold text-3xl leading-[100%] tracking-[0%]">
                {pageData.cta.highlight}
              </span>
            </h5>
            <h6 className="text-white font-poppins font-bold text-5xl leading-[104%] tracking-[0%] mb-2">
              {pageData.cta.highlight2}
            </h6>
            <p className="text-white font-poppins font-normal text-4xl leading-[120%] tracking-[0%]">
              {pageData.cta.final}
            </p>
          </div>
        </div>
      </div>
      
      {/* Botón flotante de WhatsApp */}
      <FloatingWhatsApp />
    </div>
  )
}
