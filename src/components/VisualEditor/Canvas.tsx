'use client'

import { EditorElement } from './types'
import { FiTrash2 } from 'react-icons/fi'
import DynamicPageContent from './DynamicPageContent'

interface CanvasProps {
  elements: EditorElement[]
  selectedElement: EditorElement | null
  viewport: 'desktop' | 'tablet' | 'mobile'
  pageId?: string
  onSelectElement: (element: EditorElement) => void
  onUpdateElement: (elementId: string, updates: Partial<EditorElement>) => void
  onDeleteElement: (elementId: string) => void
  onHtmlElementSelect?: (element: HTMLElement) => void
  onElementUpdate?: (update: {
    elementId: string
    content: string
    type: string
    className: string
  }) => void
}

export default function Canvas({
  elements,
  selectedElement,
  viewport,
  pageId,
  onSelectElement,
  onUpdateElement,
  onDeleteElement,
  onHtmlElementSelect,
  onElementUpdate
}: CanvasProps) {
  const getViewportClass = () => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-sm mx-auto'
      case 'tablet':
        return 'max-w-2xl mx-auto'
      default:
        return 'max-w-4xl mx-auto'
    }
  }

  const renderElement = (element: EditorElement): React.JSX.Element => {
    const isSelected = selectedElement?.id === element.id

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation()
      onSelectElement(element)
    }

    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation()
      onDeleteElement(element.id)
    }

    const elementProps = {
      className: `${element.props.className || ''} ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`,
      style: element.props.style,
      onClick: handleClick
    }

    switch (element.type) {
      case 'container':
        return (
          <div key={element.id} {...elementProps} className={`${elementProps.className} ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2 relative' : 'relative'}`}>
            {element.children?.map(renderElement)}
            {isSelected && (
              <div className="absolute -top-2 -right-2 flex space-x-1 z-50">
                <button
                  onClick={handleDelete}
                  className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  title="Eliminar"
                >
                  <FiTrash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )

      case 'heading':
        return (
          <div key={element.id} className="relative">
            <h1 {...elementProps} className={`${elementProps.className} ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}>
              {element.props.content || 'Título'}
            </h1>
            {isSelected && (
              <div className="absolute -top-2 -right-2 flex space-x-1 z-50">
                <button
                  onClick={handleDelete}
                  className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  title="Eliminar"
                >
                  <FiTrash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )

      case 'paragraph':
        return (
          <div key={element.id} className="relative">
            <p {...elementProps} className={`${elementProps.className} ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}>
              {element.props.content || 'Párrafo'}
            </p>
            {isSelected && (
              <div className="absolute -top-2 -right-2 flex space-x-1 z-50">
                <button
                  onClick={handleDelete}
                  className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  title="Eliminar"
                >
                  <FiTrash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )

      case 'button':
        return (
          <div key={element.id} className="relative">
            <button {...elementProps}>
              {element.props.content || 'Botón'}
            </button>
            {isSelected && (
              <div className="absolute -top-2 -right-2 flex space-x-1">
                <button
                  onClick={handleDelete}
                  className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  title="Eliminar"
                >
                  <FiTrash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )

      case 'image':
        return (
          <div key={element.id} className="relative">
            <div {...elementProps} className="w-64 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Imagen</span>
            </div>
            {isSelected && (
              <div className="absolute -top-2 -right-2 flex space-x-1">
                <button
                  onClick={handleDelete}
                  className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  title="Eliminar"
                >
                  <FiTrash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )

      case 'page-preview':
        return (
          <div key={element.id} {...elementProps} className={`${elementProps.className} ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}>
            <DynamicPageContent pageId={pageId || ''} />
          </div>
        )

      case 'heading':
        return (
          <div key={element.id} className="relative">
            <h1 
              {...elementProps} 
              className={`${elementProps.className} ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
              data-element-id={element.id}
            >
              {element.props.content || 'Título'}
            </h1>
            {isSelected && (
              <div className="absolute -top-2 -right-2 flex space-x-1 z-50">
                <button
                  onClick={handleDelete}
                  className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  title="Eliminar"
                >
                  <FiTrash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )

      case 'span':
        return (
          <div key={element.id} className="relative">
            <span 
              {...elementProps} 
              className={`${elementProps.className} ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
              data-element-id={element.id}
            >
              {element.props.content || 'Texto'}
            </span>
            {isSelected && (
              <div className="absolute -top-2 -right-2 flex space-x-1 z-50">
                <button
                  onClick={handleDelete}
                  className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  title="Eliminar"
                >
                  <FiTrash2 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        )

      default:
        return <div key={element.id}>Elemento no reconocido</div>
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Canvas Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Canvas</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {viewport} - {elements.length} elementos
            </span>
          </div>
          {selectedElement && (
            <div className="text-xs text-gray-500">
              Seleccionado: {selectedElement.type}
            </div>
          )}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 bg-gray-50 p-4 overflow-auto">
        <div className={`${getViewportClass()} bg-white shadow-lg rounded-lg`}>
          {/* Contenido de la página */}
          <div 
            className="w-full bg-white overflow-y-auto" 
            style={{ height: '600px' }}
            onClick={(e) => {
              const target = e.target as HTMLElement
              if (target && target !== e.currentTarget) {
                // Remover selección previa
                document.querySelectorAll('.editor-selected').forEach(el => {
                  el.classList.remove('editor-selected')
                })
                
                // Agregar selección al elemento actual
                target.classList.add('editor-selected')
                
                // Notificar al componente padre sobre la selección
                if (onHtmlElementSelect) {
                  onHtmlElementSelect(target)
                }
              }
            }}
            onDoubleClick={(e) => {
              const target = e.target as HTMLElement
              if (target && target !== e.currentTarget) {
                // Hacer el elemento editable
                target.contentEditable = 'true'
                target.focus()
                
                // Seleccionar todo el texto
                const range = document.createRange()
                range.selectNodeContents(target)
                const selection = window.getSelection()
                if (selection) {
                  selection.removeAllRanges()
                  selection.addRange(range)
                }
                
                // Agregar eventos para sincronización en tiempo real
                const handleInput = () => {
                  if (onHtmlElementSelect) {
                    onHtmlElementSelect(target)
                  }
                }
                
                const handleBlur = () => {
                  target.contentEditable = 'false'
                  target.removeEventListener('input', handleInput)
                  target.removeEventListener('blur', handleBlur)
                  
                  // Capturar el cambio y notificar al editor
                  if (onHtmlElementSelect) {
                    onHtmlElementSelect(target)
                  }
                  
                  // Notificar al editor sobre el cambio de contenido
                  const newContent = target.textContent || ''
                  console.log('📝 Contenido editado:', newContent)
                  
                  // Notificar al editor sobre el cambio
                  if (onElementUpdate) {
                    onElementUpdate({
                      elementId: target.dataset.elementId || 'unknown',
                      content: newContent,
                      type: target.tagName.toLowerCase(),
                      className: target.className
                    })
                  }
                }
                
                target.addEventListener('input', handleInput)
                target.addEventListener('blur', handleBlur)
              }
            }}
                      >
            {pageId === '2' || pageId === 'estrategias' ? (
              <div className="min-h-screen bg-[#0a0a1a] relative overflow-x-hidden">
                {/* Fixed background layer */}
                <div className="fixed inset-0 pointer-events-none">
                  {/* Background geometric shapes - more subtle and angular */}
                  <div className="absolute inset-0">
                    {/* Subtle geometric patterns */}
                    <div className="absolute top-16 left-8 w-16 h-16 bg-[#0043ff]/20 rotate-45 blur-sm"></div>
                    <div className="absolute top-32 right-12 w-12 h-12 bg-[#0043ff]/15 -rotate-12 blur-sm"></div>
                    <div className="absolute top-64 left-20 w-8 h-8 bg-[#0043ff]/25 rotate-90 blur-sm"></div>
                    <div className="absolute top-80 right-8 w-10 h-10 bg-[#0043ff]/18 -rotate-45 blur-sm"></div>
                    
                    {/* Middle section shapes */}
                    <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-[#0043ff]/20 rotate-30 blur-sm"></div>
                    <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-[#0043ff]/15 -rotate-60 blur-sm"></div>
                    
                    {/* Bottom section shapes */}
                    <div className="absolute bottom-32 left-12 w-14 h-14 bg-[#0043ff]/22 rotate-15 blur-sm"></div>
                    <div className="absolute bottom-20 right-16 w-10 h-10 bg-[#0043ff]/18 -rotate-30 blur-sm"></div>
                    <div className="absolute bottom-48 left-1/3 w-8 h-8 bg-[#0043ff]/25 rotate-45 blur-sm"></div>
                  </div>

                  {/* Very subtle lighting effects */}
                  <div className="absolute inset-0">
                    <div className="absolute top-24 left-16 w-4 h-4 bg-[#0043ff]/30 rounded-full blur-sm"></div>
                    <div className="absolute top-56 right-20 w-3 h-3 bg-[#0043ff]/25 rounded-full blur-sm"></div>
                    <div className="absolute bottom-36 left-28 w-5 h-5 bg-[#0043ff]/20 rounded-full blur-sm"></div>
                  </div>
                </div>

                {/* Scrollable content */}
                <div className="relative z-10">
                  {/* Top tilted banner */}
                  <div className="relative bg-[#0043ff] h-32 transform skew-y-1 flex items-center justify-between px-6 mt-16">
                    <div className="bg-[#0a0a1a]/10 backdrop-blur-sm border border-white/30 rounded-lg p-2 transform -skew-y-1 ml-1 z-20 -mt-36">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                      </svg>
                    </div>
                    <div className="text-left transform skew-y-1 -ml-16">
                      <h1 className="text-[35px] font-black text-white leading-[119%] tracking-[0%]">
                        Estrategias
                      </h1>
                      <h2 className="text-[35px] font-black text-white leading-[119%] tracking-[0%]">
                        de Crecimiento
                      </h2>
                    </div>
                    <div className="w-6 h-6 bg-[#FFEA1F] rounded-full border-2 border-white transform -skew-y-1"></div>
                  </div>

                  {/* Main content */}
                  <div className="px-6 py-4">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-white text-center mb-3" data-element-id="title-1">
                      Elevamos tu negocio con un motor{' '}
                      <span className="relative inline-block mx-2">
                        <span className="relative z-10 text-[#FFEA1F] font-bold" data-element-id="span-360">
                          {elements.find(el => el.id === 'span-360')?.props.content || '360°'}
                        </span>
                        <svg 
                          className="absolute inset-0 w-full h-full" 
                          viewBox="0 0 100 100"
                          style={{ width: '3em', height: '2.5em', top: '-0.5em', left: '-0.75em' }}
                        >
                          <ellipse 
                            cx="50" 
                            cy="50" 
                            rx="45" 
                            ry="30" 
                            fill="none" 
                            stroke="#0043ff" 
                            strokeWidth="3"
                            className="draw-animation"
                          />
                        </svg>
                      </span>
                      :
                    </h1>

                    {/* Intro text */}
                    <div className="mb-6">
                      <p className="text-white text-sm leading-relaxed text-center max-w-2xl mx-auto" data-element-id="intro-text">
                        {elements.find(el => el.id === 'intro-text')?.props.content || 'Desarrollamos el marco estratégico para tu proyecto, que servirá como hoja de ruta para el éxito.'}
                      </p>
                    </div>

                    {/* Laptop section */}
                    <div className="relative mb-6">
                      <div className="relative z-10">
                        <img
                          src="/vector-fon.svg"
                          alt="Digital Growth Agency"
                          className="w-full max-w-xs mx-auto"
                        />
                      </div>
                    </div>

                    {/* What we deliver section */}
                    <div className="mt-8">
                      <div className="bg-[#0043ff] rounded-full px-6 py-2 mb-4">
                        <h2 className="text-white font-semibold text-center text-sm">¿Qué entregamos?</h2>
                      </div>

                      <div className="space-y-3 max-w-4xl mx-auto">
                        <ServiceItem 
                          icon={
                            <svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6.72809 19C6.72809 25.9697 12.378 31.6196 19.3477 31.6196C26.3175 31.6196 31.9674 25.9697 31.9674 19C31.9674 12.0303 26.3175 6.38037 19.3477 6.38037C12.378 6.38037 6.72809 12.0303 6.72809 19Z" fill="#FFEA1F"/>
                              <path d="M19.35 36.35C28.9321 36.35 36.7 28.5822 36.7 19C36.7 9.41788 28.9321 1.65002 19.35 1.65002C9.76786 1.65002 2 9.41788 2 19C2 28.5822 9.76786 36.35 19.35 36.35Z" stroke="#FFEA1F" strokeWidth="2.74947" strokeMiterlimit="10"/>
                            </svg>
                          }
                          title="Research"
                          description="Fase de investigación de mercado, publico objetivo , competidores y referentes."
                        />
                        <ServiceItem 
                          icon={
                            <svg width="38" height="46" viewBox="0 0 38 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M37.1201 9.44595C37.1201 14.2083 28.8099 18.0672 18.56 18.0672C8.31016 18.0672 0 14.2061 0 9.44595C0 4.68585 8.30787 0.824707 18.56 0.824707C28.8122 0.824707 37.1201 4.68585 37.1201 9.44595Z" fill="#FFEA1F"/>
                              <path d="M37.1201 22.9348C37.1201 27.6972 28.8099 31.5561 18.56 31.5561C8.31016 31.5561 0 27.6949 0 22.9348C0 18.1747 8.31016 14.3136 18.56 14.3136C28.8099 14.3136 37.1201 18.1747 37.1201 22.9348Z" fill="#FFEA1F"/>
                              <path d="M37.1201 36.554C37.1201 41.3164 28.8099 45.1752 18.56 45.1752C8.31016 45.1752 0 41.3141 0 36.554C0 31.7939 8.31016 27.9327 18.56 27.9327C28.8099 27.9327 37.1201 31.7939 37.1201 36.554Z" fill="#FFEA1F"/>
                            </svg>
                          }
                          title="Plan estratégico 360°"
                          description="Comunicaciones, contenidos, publicidad y áreas comerciales integradas."
                        />
                        <ServiceItem 
                          icon={
                            <svg width="34" height="38" viewBox="0 0 34 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M33.3207 37.3988H0V17.2627C0 8.06044 7.45926 0.601196 16.6615 0.601196C25.8638 0.601196 33.323 8.06044 33.323 17.2627V37.3988H33.3207Z" fill="#FFEA1F"/>
                            </svg>
                          }
                          title="Plan de implementación"
                          description="Capacitamos a tu equipo in-house en la estrategia o lo hacemos por ti."
                        />
                        <ServiceItem 
                          icon={
                            <svg width="33" height="38" viewBox="0 0 33 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0.00228964 0.466309C0.00228964 9.54732 7.36317 16.9082 16.4442 16.9082C25.5252 16.9082 32.8861 9.54732 32.8861 0.466309H0H0.00228964Z" fill="#FFEA1F"/>
                              <path d="M0.00228964 37.5338C0.00228964 28.4528 7.36317 21.0919 16.4442 21.0919C25.5252 21.0919 32.8861 28.4528 32.8861 37.5338H0H0.00228964Z" fill="#FFEA1F"/>
                            </svg>
                          }
                          title="Sesión de seguimiento"
                          description="Analizamos la ejecución de la estrategia y generamos ajustes si los requiere."
                        />
                      </div>
                    </div>

                    {/* Process steps */}
                    <div className="bg-[#0043FF] rounded-t-3xl p-6 pb-32 mb-0 -mx-6 mt-8 relative">
                      {/* Background asterisks */}
                      <div className="absolute top-0 right-0 opacity-30">
                        <svg width="179" height="242" viewBox="0 0 179 242" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M39.7989 211.549L14.3235 176.826C12.2757 174.033 12.8755 170.11 15.6684 168.063L58.6318 136.544L5.96416 128.455C2.54096 127.93 0.191809 124.726 0.720696 121.306L6.30837 84.9278C6.83319 81.5046 10.0368 79.1555 13.4575 79.6844L66.1252 87.7732L34.606 44.8098C32.5582 42.0169 33.158 38.0943 35.9509 36.0465L65.6191 14.2771C68.4119 12.2293 72.3345 12.8291 74.3823 15.6219L105.901 58.5854L113.99 5.91774C114.515 2.49454 117.719 0.145398 121.139 0.674285L157.517 6.26196C160.94 6.78678 163.29 9.99034 162.761 13.4111L154.672 66.0787L197.635 34.5596C200.428 32.5118 204.351 33.1116 206.399 35.9045L228.168 65.5726C230.216 68.3655 229.616 72.2881 226.823 74.3359L183.86 105.855L236.527 113.944C239.95 114.469 242.3 117.672 241.771 121.093L236.181 157.464C235.657 160.887 232.453 163.237 229.032 162.708L176.365 154.619L207.884 197.582C209.932 200.375 209.332 204.298 206.539 206.346L176.871 228.115C174.078 230.163 170.155 229.563 168.107 226.77L136.588 183.807L128.499 236.474C127.975 239.898 124.771 242.247 121.35 241.718L84.9792 236.128C81.556 235.604 79.2068 232.4 79.7357 228.979L87.8246 176.312L39.8038 211.541L39.7989 211.549Z" fill="#0033C4"/>
                        </svg>
                      </div>
                      <div className="absolute bottom-0 left-0 opacity-25">
                        <svg width="189" height="291" viewBox="0 0 189 291" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M-76.303 276.646L-109.683 231.149C-112.367 227.489 -111.581 222.349 -107.921 219.666L-51.6261 178.367L-120.637 167.768C-125.122 167.08 -128.2 162.882 -127.507 158.4L-120.186 110.734C-119.498 106.249 -115.3 103.171 -110.818 103.864L-41.8076 114.463L-83.1071 58.1675C-85.7904 54.508 -85.0045 49.3682 -81.345 46.685L-42.4707 18.1605C-38.8112 15.4773 -33.6714 16.2631 -30.9881 19.9226L10.3114 76.2178L20.9103 7.20718C21.598 2.72175 25.7956 -0.356334 30.2778 0.336667L77.9437 7.65822C82.4291 8.34589 85.5072 12.5435 84.8142 17.0257L74.2154 86.0363L130.51 44.7367C134.17 42.0535 139.31 42.8393 141.993 46.4989L170.517 85.3732C173.201 89.0327 172.415 94.1725 168.755 96.8557L112.46 138.155L181.471 148.754C185.956 149.442 189.034 153.639 188.341 158.122L181.018 205.779C180.33 210.264 176.132 213.343 171.65 212.65L102.64 202.051L143.939 258.346C146.622 262.005 145.837 267.145 142.177 269.828L103.303 298.353C99.6432 301.036 94.5034 300.25 91.8202 296.591L50.5206 240.296L39.9217 309.306C39.234 313.792 35.0364 316.87 30.5542 316.177L-17.1031 308.853C-21.5885 308.165 -24.6666 303.968 -23.9736 299.486L-13.3747 230.475L-76.2965 276.636L-76.303 276.646Z" fill="#0033C4"/>
                        </svg>
                      </div>
                      
                      <div className="space-y-8 relative z-10">
                        <div className="transform rotate-1 ml-4">
                          <ProcessStep 
                            title="Diagnóstico inicial"
                            description="Analizamos tu proyecto, mercado y audiencia para trazar metas claras."
                          />
                        </div>
                        <div className="transform -rotate-2 mr-6">
                          <ProcessStep 
                            title="Diseño e implementación"
                            description="Creamos tu estrategia omnicanal y activamos campañas, contenidos y automatizaciones."
                          />
                        </div>
                        <div className="transform rotate-3 ml-8">
                          <ProcessStep 
                            title="Empoderamiento interno"
                            description="Formamos a tu equipo para que lidere la ejecución con autonomía."
                          />
                        </div>
                        <div className="transform -rotate-1 mr-4">
                          <ProcessStep 
                            title="Optimización 24/7"
                            description="Monitoreamos resultados, ajustamos tácticas y escalamos tu crecimiento."
                          />
                        </div>
                      </div>
                    </div>

                    {/* Final CTA */}
                    <div className="bg-[#030B46] rounded-t-3xl p-8 -mx-6 mb-0 -mt-8 relative z-20">
                      <div className="text-left">
                        {/* Main headline block */}
                        <div className="mb-0">
                          <div className="text-white font-medium text-[43.75px] leading-[97%] tracking-[0%] mb-3">
                            Eleva tu proyecto con una estrategia que{' '}
                            <span className="text-[#FFEA1F] relative inline-block font-extrabold text-[49px]">
                              convierte
                              <div className="absolute bottom-[-2mm] left-0 right-0 h-1.5 bg-[#0043ff] rounded-full"></div>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <DynamicPageContent pageId={pageId || ''} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Service item component
function ServiceItem({ icon, title, description }: { icon: string | React.ReactElement; title: string; description: string }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
        {typeof icon === 'string' ? <span className="text-xs">{icon}</span> : icon}
      </div>
      <div>
        <h3 className="text-[#FFEA1F] font-semibold mb-0.5 text-sm">{title}</h3>
        <p className="text-white text-xs leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

// Process step component
function ProcessStep({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg w-full">
      <h3 className="bg-[#FFEA1F] text-[#0a0a1a] font-bold px-4 py-2 rounded-full mb-3 text-sm inline-block">{title}:</h3>
      <p className="text-white text-sm leading-relaxed">{description}</p>
    </div>
  )
}
