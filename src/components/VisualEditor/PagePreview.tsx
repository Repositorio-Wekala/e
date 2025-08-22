'use client'

import { useState, useEffect } from 'react'

interface PagePreviewProps {
  pageId: string
  onElementSelect?: (element: HTMLElement) => void
}

export default function PagePreview({ pageId, onElementSelect }: PagePreviewProps) {
  const [pageContent, setPageContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPageContent()
  }, [pageId])

  const loadPageContent = async () => {
    setIsLoading(true)
    try {
      // Determinar la URL de la página basándose en el pageId
      let pageUrl = '/'
      if (pageId === '2' || pageId === 'estrategias') {
        pageUrl = '/estrategias'
      } else if (pageId === '1' || pageId === 'home') {
        pageUrl = '/'
      }

      // Hacer fetch del contenido de la página
      const response = await fetch(pageUrl)
      const html = await response.text()
      
      // Extraer solo el contenido del body
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      const bodyContent = doc.body.innerHTML
      
      setPageContent(bodyContent)
    } catch (error) {
      console.error('Error loading page content:', error)
      // Fallback: mostrar contenido de ejemplo
      setPageContent(`
        <div class="min-h-screen bg-[#0a0a1a] relative overflow-x-hidden">
          <div class="relative z-10">
            <div class="relative bg-[#0043ff] h-32 transform skew-y-1 flex items-center justify-between px-6 mt-16">
              <div class="text-left transform skew-y-1 -ml-16">
                <h1 class="text-[35px] font-black text-white font-['Poppins'] leading-[119%] tracking-[0%]">
                  Estrategias
                </h1>
                <h2 class="text-[35px] font-black text-white font-['Poppins'] leading-[119%] tracking-[0%]">
                  de Crecimiento
                </h2>
              </div>
            </div>
            <div class="px-6 py-4">
              <h1 class="text-2xl font-bold text-white text-center mb-3">
                Elevamos tu negocio con un motor{' '}
                <span class="relative inline-block mx-1">
                  <span class="relative z-10 text-[#FFEA1F] font-bold">360°</span>
                  <svg 
                    class="absolute inset-0 w-full h-full" 
                    viewBox="0 0 100 100"
                    style="width: 3em; height: 2.5em; top: -0.5em; left: -0.75em;"
                  >
                    <ellipse 
                      cx="50" 
                      cy="50" 
                      rx="45" 
                      ry="30" 
                      fill="none" 
                      stroke="#0043ff" 
                      stroke-width="3"
                      class="draw-animation"
                    />
                  </svg>
                </span>
                :
              </h1>
              <p class="text-white text-sm leading-relaxed text-center mb-6">
                Desarrollamos el marco estratégico para tu proyecto, que servirá como hoja de ruta para el éxito.
              </p>
              <div class="bg-[#0043ff] rounded-full px-6 py-2 mb-4">
                <h2 class="text-white font-semibold text-center text-sm">¿Qué entregamos?</h2>
              </div>
              <div class="bg-[#030B46] rounded-t-3xl p-8 -mx-6 mb-0">
                <div class="text-left">
                  <div class="text-white font-medium text-[43.75px] leading-[97%] tracking-[0%] mb-3 font-['Poppins']">
                    Eleva tu proyecto con una estrategia que{' '}
                    <span class="text-[#FFEA1F] relative inline-block font-extrabold text-[49px]">
                      convierte
                      <div class="absolute bottom-[-2mm] left-0 right-0 h-1.5 bg-[#0043ff] rounded-full"></div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `)
    } finally {
      setIsLoading(false)
    }
  }

  const handleElementClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Agregar clase de selección al elemento clickeado
    const target = e.target as HTMLElement
    if (target && target !== e.currentTarget) {
      // Remover selección previa
      document.querySelectorAll('.editor-selected').forEach(el => {
        el.classList.remove('editor-selected')
      })
      
      // Agregar selección al elemento actual
      target.classList.add('editor-selected')
      
      // Notificar al componente padre sobre la selección
      if (onElementSelect) {
        onElementSelect(target)
      }
      
      console.log('Elemento seleccionado:', target)
    }
  }

  // Función para hacer elementos editables al hacer doble clic
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
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
        // Notificar cambios inmediatamente
        if (onElementSelect) {
          onElementSelect(target)
        }
      }
      
      const handleKeyUp = () => {
        // Notificar cambios inmediatamente
        if (onElementSelect) {
          onElementSelect(target)
        }
      }
      
      const handleBlur = () => {
        target.contentEditable = 'false'
        target.removeEventListener('input', handleInput)
        target.removeEventListener('keyup', handleKeyUp)
        target.removeEventListener('blur', handleBlur)
        
        // Notificar cambios finales
        if (onElementSelect) {
          onElementSelect(target)
        }
      }
      
      target.addEventListener('input', handleInput)
      target.addEventListener('keyup', handleKeyUp)
      target.addEventListener('blur', handleBlur)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div 
      className="w-full h-full overflow-auto"
      onClick={handleElementClick}
      onDoubleClick={handleDoubleClick}
      dangerouslySetInnerHTML={{ __html: pageContent }}
    />
  )
}
