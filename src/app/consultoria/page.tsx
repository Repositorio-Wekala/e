'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'

export default function ConsultoriaEstrategicaPage() {
  const [isEditing, setIsEditing] = useState(false)

  const pageData = {
    sections: [
      {
        id: 'hero',
        content: {
          title: 'Consultoría estratégica',
          question: '¿Buscas asesoría de alto impacto para llevar tu negocio al siguiente nivel?',
          description: 'Nuestra consultoría te brinda el respaldo de expertos que trabajan contigo para identificar oportunidades, optimizar procesos y diseñar estrategias a medida que garantizan resultados.',
          image: '/daniel.png' as string,
          whatsappIcon: '/whatsapp.svg' as string
        }
      },
      {
        id: 'services',
        content: {
          title: '¿Qué entregamos?',
          items: [
            {
              id: 1,
              title: 'Diagnóstico Integral',
              description: 'Evaluación de tu modelo de negocio, operaciones y mercado.',
              icon: '/flecha-derecha.svg'
            },
            {
              id: 2,
              title: 'Identificación de oportunidades',
              description: 'Detección de brechas y áreas de alto potencial de crecimiento.',
              icon: '/flecha-izquierda.svg'
            },
            {
              id: 3,
              title: 'Optimización de procesos',
              description: 'Rediseño de flujos y prácticas para ganar eficiencia y reducir costos.',
              icon: '/flecha-derecha.svg'
            },
            {
              id: 4,
              title: 'Estrategia personalizada',
              description: 'Plan de acción alineada a tus objetivos comerciales y recursos.',
              icon: '/flecha-izquierda.svg'
            },
            {
              id: 5,
              title: 'Acompañamiento en la ejecución',
              description: 'Capacitación, seguimiento y ajustes continuos para asegurar el éxito.',
              icon: '/flecha-derecha.svg'
            }
          ]
        }
      },
      {
        id: 'process',
        content: {
          title: 'Nuestro Proceso',
          steps: [
            {
              id: 1,
              title: 'Auditamos y analizamos',
              description: 'tu situación actual, KPIs y retos clave.',
              icon: '+'
            },
            {
              id: 2,
              title: 'Diseñamos y Creamos un plan',
              description: 'estratégico con tácticas, cronograma y responsables.'
            },
            {
              id: 3,
              title: 'Acompañamos e Implementamos la estrategia,',
              description: 'medimos resultados y ajustamos para maximizar el impacto.'
            }
          ]
        }
      },
      {
        id: 'cta',
        content: {
          title: 'Convierte cada consejo en una oportunidad: transforma tu negocio con estrategia y acción.',
          highlight1: 'en una oportunidad:',
          highlight2: 'estrategia y acción.'
        }
      }
    ]
  }

  return (
    <div className="min-h-screen bg-[#091844] relative overflow-x-hidden">
      {/* Hero Section */}
      <div className="px-6 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/" className="bg-[#fbbf24] rounded-lg p-2 inline-block">
            <svg className="w-6 h-6 text-[#091844]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </Link>
        </div>

        <section className="relative z-10">
          {/* Yellow Gear */}
          <div className="absolute top-8 left-0">
            <Image
              src="/asterisco amarillo.svg"
              alt="Gear amarillo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </div>

          {/* Blue Gear */}
          <div className="absolute top-16 right-4">
            <Image
              src="/asteriscoazul.svg"
              alt="Gear azul"
              width={60}
              height={60}
              className="w-15 h-15"
            />
          </div>

          {/* Main Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white">
              {pageData.sections[0].content.title}
            </h1>
          </div>

          {/* Person Image */}
          <div className="relative mb-8 flex justify-center">
            <div className="relative w-64 h-80">
              <Image
                src={pageData.sections[0].content.image || '/daniel.png'}
                alt="Consultor estratégico"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Information Block */}
          <div className="bg-[#0042FF] rounded-2xl p-6 mb-8 relative">
            <h2 className="text-2xl font-bold text-white mb-4">
              {pageData.sections[0].content.question}
            </h2>
            <div className="flex items-start">
              <p className="text-white text-lg leading-relaxed flex-1 pr-16">
                {pageData.sections[0].content.description}
              </p>
              <div className="absolute top-6 right-6">
                <Image
                  src={pageData.sections[0].content.whatsappIcon || '/whatsapp.svg'}
                  alt="WhatsApp"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Services Section */}
      <section className="px-6 py-8 bg-[#091844] relative overflow-hidden">
        <div className="relative z-10">
          {/* Section Title */}
          <div className="text-center mb-8">
            <div className="bg-[#0042FF] text-white px-8 py-4 rounded-full inline-block shadow-lg">
              <h2 className="text-2xl font-bold">
                {pageData.sections[1].content.title}
              </h2>
            </div>
          </div>

          {/* Service Items */}
          <div className="space-y-6">
            {pageData.sections[1].content.items?.map((item, index) => (
              <div key={item.id} className="flex items-center space-x-4">
                {/* Icon */}
                <div className={`flex-shrink-0 ${index % 2 === 1 ? 'order-2' : 'order-1'}`}>
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={52}
                    height={46}
                    className="w-13 h-12"
                  />
                </div>
                
                {/* Text Container */}
                <div className={`flex-1 ${index % 2 === 1 ? 'order-1' : 'order-2'}`}>
                  <div className="bg-[#0042FF] rounded-2xl p-4">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-6 py-8 bg-[#030B46] relative overflow-hidden">
        <div className="relative z-10">
          {/* Section Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">
              {pageData.sections[2].content.title}
            </h2>
          </div>

          {/* Process Steps */}
          <div className="space-y-6">
            {pageData.sections[2].content.steps?.map((step, index) => (
              <div key={step.id} className="glassmorphism-card bg-white/8 backdrop-blur-[18px] rounded-2xl p-6 relative group shadow-2xl">
                <div className="flex items-start space-x-4">
                  {step.icon && (
                    <div className="flex-shrink-0">
                      <div className="bg-[#0042FF] rounded-lg p-2 w-10 h-10 flex items-center justify-center">
                        <span className="text-white font-bold text-xl">{step.icon}</span>
                      </div>
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">
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
      </section>

      {/* CTA Section */}
      <section className="px-6 py-12 bg-[#0042FF] rounded-t-[32px] -mt-8 z-10 relative">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white leading-relaxed">
            {pageData.sections[3].content.title.split('en una oportunidad:')[0]}
            <span className="text-[#fbbf24]">en una oportunidad:</span>
            {pageData.sections[3].content.title.split('en una oportunidad:')[1].split('estrategia y acción.')[0]}
            <span className="text-[#fbbf24]">estrategia y acción.</span>
          </h2>
        </div>
      </section>
      
      {/* Botón flotante de WhatsApp */}
      <FloatingWhatsApp />
    </div>
  )
}
