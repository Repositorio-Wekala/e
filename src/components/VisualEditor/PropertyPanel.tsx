'use client'

import { EditorElement } from './types'
import { FiType, FiDroplet, FiGrid, FiSettings, FiImage, FiLink } from 'react-icons/fi'
import { useState, useEffect } from 'react'

interface PropertyPanelProps {
  selectedElement: EditorElement | null
  selectedHtmlElement: HTMLElement | null
  onUpdateElement: (elementId: string, updates: Partial<EditorElement>) => void
}

export default function PropertyPanel({ selectedElement, selectedHtmlElement, onUpdateElement }: PropertyPanelProps) {
  const [elementContent, setElementContent] = useState<string>('')
  const [elementHtml, setElementHtml] = useState<string>('')

  // Actualizar el estado local cuando cambie el elemento seleccionado
  useEffect(() => {
    if (selectedHtmlElement) {
      setElementContent(selectedHtmlElement.textContent || '')
      setElementHtml(selectedHtmlElement.outerHTML || '')
    } else {
      setElementContent('')
      setElementHtml('')
    }
  }, [selectedHtmlElement])

  // Función para forzar actualización del estado desde el elemento
  const forceUpdateFromElement = () => {
    if (selectedHtmlElement) {
      setElementContent(selectedHtmlElement.textContent || '')
      setElementHtml(selectedHtmlElement.outerHTML || '')
    }
  }

  // Actualizar estado cada vez que cambie el elemento seleccionado
  useEffect(() => {
    forceUpdateFromElement()
  }, [selectedHtmlElement])

  // Escuchar cambios en el elemento seleccionado
  useEffect(() => {
    if (!selectedHtmlElement) return

    const interval = setInterval(() => {
      if (selectedHtmlElement) {
        const currentText = selectedHtmlElement.textContent || ''
        const currentHtml = selectedHtmlElement.outerHTML || ''
        
        if (currentText !== elementContent || currentHtml !== elementHtml) {
          setElementContent(currentText)
          setElementHtml(currentHtml)
        }
      }
    }, 100) // Verificar cada 100ms

    return () => clearInterval(interval)
  }, [selectedHtmlElement, elementContent, elementHtml])

  if (!selectedElement && !selectedHtmlElement) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Propiedades</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiSettings className="w-6 h-6" />
            </div>
            <p className="text-sm">Selecciona un elemento para editar sus propiedades</p>
          </div>
        </div>
      </div>
    )
  }

  const updateStyle = (style: React.CSSProperties) => {
    if (selectedElement && selectedElement.props) {
      onUpdateElement(selectedElement.id, {
        props: { ...selectedElement.props, style: { ...selectedElement.props.style, ...style } }
      })
    }
    if (selectedHtmlElement) {
      Object.assign(selectedHtmlElement.style, style)
    }
  }

  const updateContent = (content: string) => {
    if (selectedHtmlElement) {
      // Actualizar el contenido del elemento directamente
      selectedHtmlElement.textContent = content
      
      // Actualizar el estado local
      setElementContent(content)
      setElementHtml(selectedHtmlElement.outerHTML || '')
    }
    
    if (selectedElement && selectedElement.props) {
      onUpdateElement(selectedElement.id, {
        props: { ...selectedElement.props, content }
      })
    }
  }

  const updateHtml = (html: string) => {
    setElementHtml(html)
    
    if (selectedHtmlElement && selectedHtmlElement.parentNode) {
      try {
        // Crear un nuevo elemento con el HTML
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = html
        const newElement = tempDiv.firstElementChild as HTMLElement
        
        if (newElement) {
          // Preservar la clase de selección
          newElement.classList.add('editor-selected')
          
          // Reemplazar el elemento
          selectedHtmlElement.parentNode.replaceChild(newElement, selectedHtmlElement)
          
          // Actualizar el contenido
          setElementContent(newElement.textContent || '')
        }
      } catch (error) {
        console.error('Error al actualizar HTML:', error)
      }
    }
  }

  const updateClassName = (className: string) => {
    if (selectedElement && selectedElement.props) {
      onUpdateElement(selectedElement.id, {
        props: { ...selectedElement.props, className }
      })
    }
    if (selectedHtmlElement) {
      selectedHtmlElement.className = className
      // Actualizar el HTML después del cambio
      setElementHtml(selectedHtmlElement.outerHTML || '')
    }
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Propiedades</h2>
        <p className="text-sm text-gray-600 capitalize">
          {selectedElement && selectedElement.type ? selectedElement.type : selectedHtmlElement ? selectedHtmlElement.tagName.toLowerCase() : ''}
        </p>
        {selectedHtmlElement && (
          <div className="mt-2 text-xs text-gray-500">
            <p>Doble clic en cualquier texto para editarlo directamente</p>
            <p>Clase: {selectedHtmlElement.className || 'Sin clase'}</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)]">
        <div className="p-4 space-y-6">
          {/* Content Section - Para cualquier elemento de texto */}
          {selectedHtmlElement && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <FiType className="w-4 h-4 text-gray-600" />
                <h3 className="text-sm font-medium text-gray-900">Contenido del Elemento</h3>
              </div>
              
              {/* Text Content */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-gray-700">
                    Texto actual
                  </label>
                  <button
                    onClick={forceUpdateFromElement}
                    className="text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    Actualizar
                  </button>
                </div>
                <textarea
                  value={elementContent}
                  onChange={(e) => updateContent(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Escribe el contenido..."
                />
              </div>

              {/* HTML Content */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  HTML del elemento
                </label>
                <textarea
                  value={elementHtml}
                  onChange={(e) => updateHtml(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="HTML del elemento..."
                />
              </div>

              {/* Element Info */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="text-xs font-medium text-gray-700 mb-2">Información del elemento</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <p><strong>Tag:</strong> {selectedHtmlElement.tagName}</p>
                  <p><strong>Clase:</strong> {selectedHtmlElement.className || 'Sin clase'}</p>
                  <p><strong>ID:</strong> {selectedHtmlElement.id || 'Sin ID'}</p>
                  <p><strong>Texto:</strong> {selectedHtmlElement.textContent?.substring(0, 50) || 'Sin texto'}...</p>
                </div>
              </div>
            </div>
          )}

          {/* Image Section */}
          {((selectedElement && selectedElement.props && selectedElement.type === 'image') || 
            (selectedHtmlElement && selectedHtmlElement.tagName === 'IMG')) && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <FiImage className="w-4 h-4 text-gray-600" />
                <h3 className="text-sm font-medium text-gray-900">Imagen</h3>
              </div>
              
              {/* Current Image Preview */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-700">Imagen Actual</label>
                <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  {selectedHtmlElement && selectedHtmlElement.tagName === 'IMG' ? (
                    <img 
                      src={selectedHtmlElement.getAttribute('src') || ''} 
                      alt="Preview" 
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">Sin imagen</span>
                  )}
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  URL de la imagen
                </label>
                <input
                  type="text"
                  value={selectedHtmlElement && selectedHtmlElement.tagName === 'IMG' ? (selectedHtmlElement.getAttribute('src') || '') : ''}
                  onChange={(e) => {
                    if (selectedHtmlElement && selectedHtmlElement.tagName === 'IMG') {
                      selectedHtmlElement.setAttribute('src', e.target.value)
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>

              {/* Alt Text */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Texto alternativo
                </label>
                <input
                  type="text"
                  value={selectedHtmlElement && selectedHtmlElement.tagName === 'IMG' ? (selectedHtmlElement.getAttribute('alt') || '') : ''}
                  onChange={(e) => {
                    if (selectedHtmlElement && selectedHtmlElement.tagName === 'IMG') {
                      selectedHtmlElement.setAttribute('alt', e.target.value)
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Descripción de la imagen"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Subir nueva imagen
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file && selectedHtmlElement && selectedHtmlElement.tagName === 'IMG') {
                      const reader = new FileReader()
                      reader.onload = (event) => {
                        if (event.target?.result) {
                          selectedHtmlElement.setAttribute('src', event.target.result as string)
                        }
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>
          )}

          {/* Link Section */}
          {((selectedElement && selectedElement.props && selectedElement.type === 'link') || 
            (selectedHtmlElement && selectedHtmlElement.tagName === 'A')) && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <FiLink className="w-4 h-4 text-gray-600" />
                <h3 className="text-sm font-medium text-gray-900">Enlace</h3>
              </div>
              
              {/* Link URL */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  URL del enlace
                </label>
                <input
                  type="text"
                  value={selectedHtmlElement && selectedHtmlElement.tagName === 'A' ? (selectedHtmlElement.getAttribute('href') || '') : ''}
                  onChange={(e) => {
                    if (selectedHtmlElement && selectedHtmlElement.tagName === 'A') {
                      selectedHtmlElement.setAttribute('href', e.target.value)
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="https://ejemplo.com"
                />
              </div>

              {/* Link Text */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Texto del enlace
                </label>
                <input
                  type="text"
                  value={selectedHtmlElement && selectedHtmlElement.tagName === 'A' ? (selectedHtmlElement.textContent || '') : ''}
                  onChange={(e) => {
                    if (selectedHtmlElement && selectedHtmlElement.tagName === 'A') {
                      selectedHtmlElement.textContent = e.target.value
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="Texto del enlace"
                />
              </div>

              {/* Target */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Abrir en
                </label>
                <select
                  value={selectedHtmlElement && selectedHtmlElement.tagName === 'A' ? (selectedHtmlElement.getAttribute('target') || '_self') : '_self'}
                  onChange={(e) => {
                    if (selectedHtmlElement && selectedHtmlElement.tagName === 'A') {
                      selectedHtmlElement.setAttribute('target', e.target.value)
                    }
                  }}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="_self">Misma ventana</option>
                  <option value="_blank">Nueva ventana</option>
                </select>
              </div>
            </div>
          )}

          {/* Styling Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <FiDroplet className="w-4 h-4 text-gray-600" />
              <h3 className="text-sm font-medium text-gray-900">Estilos</h3>
            </div>
            
            {/* Text Color */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Color de texto
              </label>
              <input
                type="color"
                value="#000000"
                onChange={(e) => updateStyle({ color: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
            </div>

            {/* Background Color */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Color de fondo
              </label>
              <input
                type="color"
                value="#ffffff"
                onChange={(e) => updateStyle({ backgroundColor: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Tamaño de fuente
              </label>
              <select
                onChange={(e) => updateStyle({ fontSize: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="12px">12px</option>
                <option value="14px">14px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="20px">20px</option>
                <option value="24px">24px</option>
                <option value="32px">32px</option>
                <option value="48px">48px</option>
              </select>
            </div>

            {/* Font Weight */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Peso de fuente
              </label>
              <select
                onChange={(e) => updateStyle({ fontWeight: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              >
                <option value="normal">Normal</option>
                <option value="medium">Medium</option>
                <option value="semibold">Semibold</option>
                <option value="bold">Bold</option>
                <option value="extrabold">Extra Bold</option>
              </select>
            </div>
          </div>

          {/* Layout Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <FiGrid className="w-4 h-4 text-gray-600" />
              <h3 className="text-sm font-medium text-gray-900">Layout</h3>
            </div>
            
            {/* Padding */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Padding
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Top"
                  onChange={(e) => updateStyle({ paddingTop: `${e.target.value}px` })}
                  className="p-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="number"
                  placeholder="Bottom"
                  onChange={(e) => updateStyle({ paddingBottom: `${e.target.value}px` })}
                  className="p-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="number"
                  placeholder="Left"
                  onChange={(e) => updateStyle({ paddingLeft: `${e.target.value}px` })}
                  className="p-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="number"
                  placeholder="Right"
                  onChange={(e) => updateStyle({ paddingRight: `${e.target.value}px` })}
                  className="p-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            {/* Margin */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Margin
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Top"
                  onChange={(e) => updateStyle({ marginTop: `${e.target.value}px` })}
                  className="p-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="number"
                  placeholder="Bottom"
                  onChange={(e) => updateStyle({ marginBottom: `${e.target.value}px` })}
                  className="p-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="number"
                  placeholder="Left"
                  onChange={(e) => updateStyle({ marginLeft: `${e.target.value}px` })}
                  className="p-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="number"
                  placeholder="Right"
                  onChange={(e) => updateStyle({ marginRight: `${e.target.value}px` })}
                  className="p-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            {/* Border Radius */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Border Radius
              </label>
              <input
                type="number"
                placeholder="0"
                onChange={(e) => updateStyle({ borderRadius: `${e.target.value}px` })}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>

          {/* Advanced Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <FiSettings className="w-4 h-4 text-gray-600" />
              <h3 className="text-sm font-medium text-gray-900">Avanzado</h3>
            </div>
            
            {/* Custom Classes */}
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Clases CSS
              </label>
              <input
                type="text"
                value={selectedElement && selectedElement.props ? (selectedElement.props.className || '') : (selectedHtmlElement ? selectedHtmlElement.className || '' : '')}
                onChange={(e) => updateClassName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                placeholder="bg-blue-500 text-white p-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
