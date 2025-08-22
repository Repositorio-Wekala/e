'use client'

import { useEffect, useState } from 'react'
import { editableContentAPI, pagesAPI, EditableContent } from '../../lib/supabase'

interface DynamicPageContentProps {
  pageId: string
}

export default function DynamicPageContent({ pageId }: DynamicPageContentProps) {
  const [content, setContent] = useState<EditableContent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadContent()
  }, [pageId])

  const loadContent = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log('🔄 Cargando contenido para página:', pageId)

      // Validar que pageId no esté vacío
      if (!pageId) {
        throw new Error('ID de página no proporcionado')
      }

      // Obtener la página
      const page = await pagesAPI.getBySlug(`/${pageId}`)
      console.log('📄 Página encontrada:', page)
      
      if (!page) {
        throw new Error(`Página con slug /${pageId} no encontrada`)
      }
      
      // Obtener contenido editable
      const editableContents = await editableContentAPI.getByPageId(page.id)
      console.log('📝 Contenido editable encontrado:', editableContents)
      
      setContent(editableContents || [])
    } catch (error) {
      console.error('❌ Error loading dynamic content:', error)
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido al cargar el contenido'
      setError(`Error al cargar el contenido: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  const renderElement = (element: EditableContent) => {
    const style = element.styles || {}
    
    switch (element.content_type) {
      case 'heading':
        return (
          <h1 
            key={element.id}
            style={style}
            className="text-2xl font-bold text-gray-900"
          >
            {element.content}
          </h1>
        )
      
      case 'paragraph':
        return (
          <p 
            key={element.id}
            style={style}
            className="text-gray-600 leading-relaxed"
          >
            {element.content}
          </p>
        )
      
      case 'button':
        return (
          <button 
            key={element.id}
            style={style}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {element.content}
          </button>
        )
      
      case 'container':
        return (
          <div 
            key={element.id}
            style={style}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            {/* Aquí podrías renderizar elementos hijos si los tuvieras */}
          </div>
        )
      
      case 'image':
        return (
          <div key={element.id} style={style}>
            <img 
              src={element.content} 
              alt="Imagen"
              className="w-64 h-48 object-cover rounded-lg"
            />
          </div>
        )
      
      default:
        return (
          <div key={element.id} style={style}>
            {element.content}
          </div>
        )
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando contenido...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={loadContent}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  if (content.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No hay contenido para mostrar</p>
          <p className="text-sm text-gray-500">Usa el editor visual para agregar contenido</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6">
        {content.map(renderElement)}
      </div>
    </div>
  )
}


