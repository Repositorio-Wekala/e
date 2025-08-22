'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import VisualEditor from '@/components/VisualEditor/VisualEditor';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function AchieveApexPage() {
  const [isEditing, setIsEditing] = useState(false);

  const pageData = {
    id: 'achieve-apex-ai',
    title: 'Achieve Apex.ai',
    sections: [
      {
        id: 'hero',
        type: 'hero',
        content: {
          title: 'Automatizaciones Inteligentes',
          subtitle: 'La solución todo en uno que combina inteligencia artificial y flujos automatizados para liberar tu tiempo, optimizar recursos y convertir cada conversación en ventas.',
          ctaText: '¿Qué entregamos?',
          image: '/mujer-cabello.png',
          logo: '/logo-achieve.svg'
        }
      },
      {
        id: 'features',
        type: 'features',
        content: {
          title: '¿Qué entregamos?',
          cards: [
            {
              id: 'agentes-virtuales',
              title: 'Agentes Virtuales con Personalidad de Marca',
              description: 'Asistentes AI 24/7 en WhatsApp, Instagram y email que responden al instante, califican leads, agendan citas y hablan el idioma de tu negocio.',
              icon: '/agentes-virtuales.svg'
            },
            {
              id: 'comunicaciones',
              title: 'Comunicaciones Personalizadas',
              description: 'Mensajes automáticos en el canal correcto adaptados al tono y necesidades de cada cliente.',
              icon: '/comunicaciones.svg'
            },
            {
              id: 'integraciones',
              title: 'Integración Total',
              description: 'Conecta CRM, agendas, ERPs, inventarios, Make, Zapier y tus APIs para un ecosistema sin fisuras y con trazabilidad completa.',
              icon: '/integraciones.svg'
            },
            {
              id: 'analisis',
              title: 'Análisis Predictivo & BI',
              description: 'Dashboards en tiempo real que anticipan tendencias, miden conversiones y alimentan la toma de decisiones.',
              icon: '/analisis.svg'
            },
            {
              id: 'flujos',
              title: 'Flujos Automatizados a Prueba de Errores',
              description: 'Detectamos tareas repetitivas y diseñamos procesos que liberan a tu equipo de la rutina y minimizan fallos.',
              icon: '/flujos.svg'
            }
          ]
        }
      },
      {
        id: 'process',
        type: 'process',
        content: {
          title: 'Nuestro Proceso',
          steps: [
            {
              id: 'auditamos',
              title: 'Auditamos',
              description: 'Mapeamos tu operación y ciclo de ventas para detectar cuellos de botella y oportunidades de AI.'
            },
            {
              id: 'desarrollamos',
              title: 'Desarrollamos',
              description: 'Configuramos el agente, diseñamos flujos automatizados y entrenamos modelos predictivos, integrando cada pieza en tu stack.'
            },
            {
              id: 'monitoreamos',
              title: 'Monitoreamos',
              description: 'Medimos engagement, ajustamos algoritmos y escalamos resultados para un crecimiento continuo.'
            }
          ]
        }
      },
      {
        id: 'cta',
        type: 'cta',
        content: {
          title: 'Multiplica tu capacidad de atención,',
          subtitle: 'convierte conversaciones en conversiones y escala sin contratar más personal. Te convertimos en una empresa AI-FIRST.'
        }
      }
    ]
  };

  if (isEditing) {
    return <VisualEditor pageId="achieve-apex-ai" onClose={() => setIsEditing(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#0f172a] relative overflow-x-hidden">


      {/* Blue Background Section */}
      <div className="bg-[#0042FF]">
        {/* Back Button */}
        <div className="px-6 py-8">
          <Link href="/" className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg p-2 inline-block">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="px-6 py-8 relative z-10">
          {/* Image */}
          <div className="relative mb-8">
            <div className="relative h-64">
              <Image
                src="/mujer-cabello.png"
                alt="Mujer con headset trabajando"
                fill
                className="object-cover rounded-2xl"
              />
              {/* Navigation dots */}
              <div className="absolute top-4 left-4 bg-[#0f172a] rounded-lg p-2">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>
              {/* Logo */}
              <div className="absolute -bottom-8 -right-4">
                <Image
                  src="/logo-achieve.svg"
                  alt="Achieve Apex"
                  width={180}
                  height={60}
                  className=""
                />
              </div>
            </div>
          </div>

          {/* Hero Text */}
          <div className="text-left mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 mt-16">
              Automatizaciones Inteligentes
            </h1>
            <p className="text-white text-lg mb-12 leading-relaxed">
              La solución todo en uno que combina inteligencia artificial y flujos automatizados para liberar tu tiempo, optimizar recursos y convertir cada conversación en ventas.
            </p>
          </div>
        </section>
      </div>

      {/* Features Section */}
      <section className="px-6 py-8 pb-32 bg-gradient-to-br from-[#071638] to-[#0C1C47] relative overflow-hidden rounded-t-[32px] -mt-8 z-10">
        {/* Light effects */}
        <div className="absolute inset-0 bg-gradient-radial from-[#0043FF]/60 via-[#0043FF]/30 to-transparent"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0043FF]/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#0043FF]/55 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0043FF]/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-[#1E40FF]/60 rounded-full blur-2xl"></div>
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-[#3B82F6]/50 rounded-full blur-2xl"></div>
        <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="bg-[#0042FF] text-white px-8 py-4 rounded-full inline-block">
            <h2 className="text-2xl font-bold">
              ¿Qué entregamos?
            </h2>
          </div>
        </div>
        <div className="space-y-6">
          {pageData.sections[1].content.cards.map((card, index) => (
            <div key={card.id} className="glassmorphism-card bg-white/8 backdrop-blur-[18px] rounded-[18px] p-6 relative group shadow-2xl">
              {/* Outer glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1E40FF]/15 to-[#3B82F6]/10 rounded-[18px] blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              
              {/* Icon positioned outside the card */}
              <div className={`absolute top-1/2 transform -translate-y-1/2 ${index % 2 === 1 ? '-right-2' : '-left-2'}`}>
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={80}
                  height={80}
                  className="w-20 h-20"
                />
              </div>
              
              <div className={`${index % 2 === 1 ? 'pr-24' : 'pl-24'}`}>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="px-6 py-12 bg-[#030B46] rounded-t-[32px] -mt-8 z-10 relative">
        <div className="text-left">
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-[#fbbf24]">Multiplica tu</span>
            <div className="w-48 h-1 bg-[#1E40FF] my-2"></div>
            <span className="text-white">capacidad</span>
            <br />
            <span className="text-white">de atención,</span>
          </h2>
          <p className="text-white text-lg leading-relaxed">
            convierte conversaciones en conversaciones y escala sin contratar más personal. Te convertimos en una empresa <strong>AI-FIRST.</strong>
          </p>
        </div>
      </section>
      
      {/* Botón flotante de WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
}
