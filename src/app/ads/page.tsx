'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

export default function AdsPage() {
  const [isEditing, setIsEditing] = useState(false)

  const pageData = {
    sections: [
      {
        id: 1,
        type: 'hero',
        content: {
          title: 'Ad managment',
          description: 'Logra resultados reales: más ventas, leads de calidad y mayor reconocimiento de marca con campañas publicitarias diseñadas para impactar.',
          image: '/img-adsh.png'
        }
      },
      {
        id: 2,
        type: 'services',
        content: {
          title: '¿Qué entregamos?',
          items: [
            {
              id: 1,
              title: 'Publicidad Multicanal',
              description: 'Anuncios optimizados en Facebook, Instagram, Google y YouTube, creados con AI para maximizar tu alcance.'
            },
            {
              id: 2,
              title: 'Generación y Nutrición de Leads',
              description: 'Atraemos clientes potenciales, los "calentamos" con secuencias estratégicas y los movemos por tu embudo.'
            },
            {
              id: 3,
              title: 'Estrategias de Recompra y Cross-Sell',
              description: 'Diseñamos flujos de postventa que fidelizan y fomentan compras recurrentes.'
            },
            {
              id: 4,
              title: 'Segmentación Avanzada',
              description: 'Públicos a medida: demográficos, basados en intereses o en tu propia base de datos.'
            },
            {
              id: 5,
              title: 'Posicionamiento de Marca',
              description: 'Construimos presencia sólida a través de campañas corporativas, lanzamientos de productos y eventos.'
            },
            {
              id: 6,
              title: 'Insights Corporativos',
              description: 'Encuestas, estudios de comportamiento y análisis de bases de datos para afinar cada mensaje.'
            }
          ]
        }
      },

      {
        id: 4,
        type: 'cta',
        content: {
          title: 'Convierte tu inversión publicitaria',
          subtitle: 'en resultados medibles y sostenibles.'
        }
      }
    ]
  }

  return (
    <div className="min-h-screen bg-[#0042FF] text-white">

      {/* Header with Blue Banner */}
              <div className="relative bg-[#0043ff] h-16 md:h-20 lg:h-24 transform skew-y-1 flex items-center justify-between px-6 md:px-12 lg:px-16 mt-16">
                  <Link href="/" className="bg-[#0a0a1a]/10 backdrop-blur-sm border border-white/30 rounded-lg p-2 transform -skew-y-1 ml-1 z-20 -mt-20">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </Link>
                  <div className="text-left transform skew-y-0.5 -ml-16 md:-ml-8 lg:-ml-4">
            <h1 className="text-[35px] md:text-[45px] lg:text-[55px] font-black text-white leading-[119%] tracking-[0%]">
              Ads management
            </h1>
          </div>
        
      </div>

      {/* Main content */}
      <div className="px-6 md:px-12 lg:px-16 bg-[#091844]">
        <section className="relative z-10">
          {/* Phone Image */}
          <div className="relative mb-8 flex justify-center">
            <div className="relative w-64 h-96">
              <Image
                src={pageData.sections[0].content.image}
                alt="Smartphone con anuncio"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Information Block */}
          <div className="bg-[#0042FF] rounded-t-[32px] p-8 relative -mx-6 pb-8">
            <p className="text-white text-lg leading-relaxed">
              {pageData.sections[0].content.description}
            </p>
          </div>
        </section>
      </div>

      {/* Services Section */}
      <section className="px-6 pb-24 bg-[#0042FF] relative overflow-hidden -mt-8">
        {/* Background Vector */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/vector-f-ads.svg"
            alt=""
            width={362}
            height={1187}
            className="w-full h-full object-cover opacity-60"
            style={{ objectPosition: 'center', filter: 'brightness(1.5) saturate(0.8) hue-rotate(200deg)' }}
            style={{ objectPosition: 'center' }}
          />
        </div>
        <div className="relative z-10">
          {/* Section Title */}
          <div className="text-center mb-8 pt-8">
            <div className="group relative isolate overflow-hidden rounded-full bg-white/20 supports-[backdrop-filter]:bg-white/10 supports-[backdrop-filter]:backdrop-blur-xl ring-1 ring-inset ring-white/15 px-8 py-4 inline-block shadow-lg transition-shadow hover:shadow-xl">
              {/* Reflejo diagonal */}
              <div className="pointer-events-none absolute -top-12 -left-12 h-24 w-[150%] rotate-[20deg] bg-gradient-to-r from-white/30 via-white/5 to-transparent opacity-20 transition-opacity duration-500 group-hover:opacity-30"></div>
              
              {/* Flares */}
              <div className="pointer-events-none absolute -top-5 -left-5 h-20 w-20 rounded-full opacity-20 bg-[radial-gradient(circle_at_center,white,transparent_60%)]"></div>
              <div className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full opacity-15 bg-[radial-gradient(circle_at_center,white,transparent_65%)]"></div>
              
              {/* Relieves */}
              <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_1px_0_rgba(255,255,255,0.25)]"></div>
              <div className="pointer-events-none absolute inset-0 [box-shadow:inset_0_-20px_40px_rgba(0,0,0,0.15)]"></div>
              
              <h2 className="text-2xl font-bold text-[#FFEA1F] relative z-10">
                {pageData.sections[1].content.title}
              </h2>
            </div>
          </div>

          {/* Service Items */}
          <div className="space-y-8 md:space-y-10 lg:space-y-12 relative z-10 max-w-6xl mx-auto">
            <div className="transform rotate-1 ml-4">
              <div className="glassmorphism-card rounded-2xl p-6">
                <h3 className="text-[#FFEA1F] text-lg font-bold mb-3">
                  {pageData.sections[1].content.items[0].title}
                </h3>
                <p className="text-white text-base leading-relaxed">
                  {pageData.sections[1].content.items[0].description}
                </p>
              </div>
            </div>
            <div className="transform -rotate-2 mr-6">
              <div className="glassmorphism-card rounded-2xl p-6">
                <h3 className="text-[#FFEA1F] text-lg font-bold mb-3">
                  {pageData.sections[1].content.items[1].title}
                </h3>
                <p className="text-white text-base leading-relaxed">
                  {pageData.sections[1].content.items[1].description}
                </p>
              </div>
            </div>
            <div className="transform rotate-3 ml-8">
              <div className="glassmorphism-card rounded-2xl p-6">
                <h3 className="text-[#FFEA1F] text-lg font-bold mb-3">
                  {pageData.sections[1].content.items[2].title}
                </h3>
                <p className="text-white text-base leading-relaxed">
                  {pageData.sections[1].content.items[2].description}
                </p>
              </div>
            </div>
            <div className="transform -rotate-1 mr-4">
              <div className="glassmorphism-card rounded-2xl p-6">
                <h3 className="text-[#FFEA1F] text-lg font-bold mb-3">
                  {pageData.sections[1].content.items[3].title}
                </h3>
                <p className="text-white text-base leading-relaxed">
                  {pageData.sections[1].content.items[3].description}
                </p>
              </div>
            </div>
            <div className="transform rotate-2 ml-6">
              <div className="glassmorphism-card rounded-2xl p-6">
                <h3 className="text-[#FFEA1F] text-lg font-bold mb-3">
                  {pageData.sections[1].content.items[4].title}
                </h3>
                <p className="text-white text-base leading-relaxed">
                  {pageData.sections[1].content.items[4].description}
                </p>
              </div>
            </div>
            <div className="transform -rotate-3 mr-8">
              <div className="glassmorphism-card rounded-2xl p-6">
                <h3 className="text-[#FFEA1F] text-lg font-bold mb-3">
                  {pageData.sections[1].content.items[5].title}
                </h3>
                <p className="text-white text-base leading-relaxed">
                  {pageData.sections[1].content.items[5].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="px-6 py-12 bg-[#030B46] rounded-t-[32px] -mt-8 z-10 relative">
        <div className="text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Convierte tu
            <br />
            <span className="text-[#FFEA1F] text-5xl md:text-6xl">
              inversión
            </span>
            <br />
            publicitaria
          </h2>
          <p className="text-xl text-white">
            en resultados medibles
            <br />
            y sostenibles.
          </p>
        </div>
      </section>
      
      {/* Botón flotante de WhatsApp */}
      <FloatingWhatsApp />
    </div>
  )
}
