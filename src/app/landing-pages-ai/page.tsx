'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

export default function LandingPagesAIPage() {
  const [pageData] = useState({
    hero: {
      title: "Landing pages con AI",
      phoneContent: "Reduce hasta un 90% del precio de tu factura de energía en el hogar con paneles solares",
      ctaButton: "¡Ver tu cotización!"
    },
    intro: {
      text: "No más páginas bonitas que no venden: diseñamos ofertas tan claras y poderosas que tu landing trabaja por ti, convirtiendo visitas en clientes desde el primer clic."
    },
    services: [
      {
        id: 1,
        title: "Estructura Estratégica",
        highlight: "Estratégica",
        description: "Mensajes organizados paso a paso para guiar al usuario hacia la decisión."
      },
      {
        id: 2,
        title: "Copy persuasivo",
        highlight: "persuasivo",
        description: "Títulos y textos basados en insights reales, disparadores emocionales y principios de persuasión."
      },
      {
        id: 3,
        title: "Oferta irresistible",
        highlight: "irresistible",
        description: "Propuesta comercial alineada a las necesidades de tu cliente ideal."
      },
      {
        id: 4,
        title: "Diseño enfocado en performance",
        highlight: "enfocado en performance",
        description: "UX/UI limpio, secciones optimizadas y llamadas a la acción imposibles de ignorar."
      },
      {
        id: 5,
        title: "IA + Agilidad",
        highlight: "Agilidad",
        description: "Textos, visuales y montaje acelerados con AI para entregar tu landing en solo 2 semanas."
      }
    ],
    process: [
      {
        id: 1,
        title: "Auditamos",
        description: "Investigación profunda de tu producto, mercado y perfil de cliente para definir disparadores."
      },
      {
        id: 2,
        title: "Desarrollamos",
        description: "Creamos estructura, copy, diseño y oferta comercial con AI, garantizando calidad estratégica."
      },
      {
        id: 3,
        title: "Monitorizamos",
        description: "Analizamos métricas clave, ajustamos detalles y optimizamos conversiones en tiempo real."
      }
    ],
    cta: {
      title: "Convierte cada visita",
      subtitle: "en venta",
      description: "Sin perseguir leads: tu landing actúa por ti."
    }
  })

  return (
    <div className="min-h-screen bg-[#030B46]">
      {/* Espacio superior */}
      <div className="bg-[#091844] h-16"></div>
      
      {/* Top Bar (Header) */}
      <div className="bg-[#091844] py-6 px-6">
        <div className="flex items-center">
          <Link href="/" className="mr-4">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-white">
            Landing pages con <span className="text-[#FFEA1F]">AI</span>
          </h1>
        </div>
      </div>

      {/* Hero Section - Phone Mockup */}
      <div className="bg-[#030B46] pt-8 pb-6">
        <div className="container mx-auto px-6">
          {/* Phone Mockup */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Phone frame */}
              <div className="w-80 h-[500px] bg-black rounded-[40px] p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[32px] p-6 relative overflow-hidden">
                  {/* Phone content */}
                  <div className="text-center">
                    <p className="text-gray-800 text-lg font-medium leading-relaxed mb-6">
                      {pageData.hero.phoneContent}
                    </p>
                    <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                      {pageData.hero.ctaButton}
                    </button>
                  </div>
                  
                  {/* WhatsApp icon floating */}
                  <div className="absolute bottom-6 right-6">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Down arrow */}
          <div className="flex justify-center">
            <svg className="w-8 h-8 text-white animate-bounce" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Introductory Text Section */}
      <div className="bg-[#0042FF] py-6 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="relative">
            <p className="text-white text-base leading-relaxed mb-4 pr-16">
              {pageData.intro.text}
            </p>
            
            {/* WhatsApp icon floating */}
            <div className="absolute top-0 right-0">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ¿Qué entregamos? Section */}
      <div className="bg-[#0042FF] py-6">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-[#1E40FF] text-white px-8 py-4 rounded-full inline-block">
              <h2 className="text-2xl font-bold">
                ¿Qué entregamos?
              </h2>
            </div>
          </div>

          {/* Service Cards */}
          <div className="space-y-6">
            {pageData.services.map((service, index) => (
              <div key={service.id} className="relative">
                <div className={`transform ${index % 2 === 0 ? 'rotate-1 -ml-4' : '-rotate-2 mr-4'} bg-[#030B46] rounded-2xl p-6 shadow-lg relative overflow-hidden`}>
                  {/* Folded corner effect */}
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-[#0042FF]"></div>
                  
                  <h3 className="text-lg font-bold mb-3">
                    {service.title.split(service.highlight)[0]}
                    <span className="text-[#FFEA1F]">{service.highlight}</span>
                    {service.title.split(service.highlight)[1]}
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-[#030B46] py-16">
        <div className="container mx-auto px-6">
          {/* Process Cards */}
          <div className="space-y-6">
            {pageData.process.map((step, index) => (
              <div key={step.id} className="bg-[#0042FF] rounded-2xl p-6 relative">
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#FFEA1F] rounded-lg flex items-center justify-center">
                      {index === 0 && (
                        <svg className="w-6 h-6 text-[#0042FF]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                      )}
                      {index === 1 && (
                        <svg className="w-6 h-6 text-[#0042FF]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      )}
                      {index === 2 && (
                        <svg className="w-6 h-6 text-[#0042FF]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-[#FFEA1F] text-lg font-bold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-white text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-[#030B46] py-12 rounded-t-[32px] -mt-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-2">
              {pageData.cta.title}
              <div className="w-48 h-1 bg-[#0042FF] mx-auto my-2"></div>
            </h2>
            <h3 className="text-5xl font-bold text-[#FFEA1F] mb-4">
              {pageData.cta.subtitle}
            </h3>
            <p className="text-white text-lg">
              {pageData.cta.description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Botón flotante de WhatsApp */}
      <FloatingWhatsApp />
    </div>
  )
}
