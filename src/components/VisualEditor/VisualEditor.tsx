'use client'

import { useState, useRef, useEffect } from 'react'
import { FiSave, FiEye, FiSmartphone, FiTablet, FiMonitor, FiRotateCcw, FiRotateCw, FiX } from 'react-icons/fi'
import ElementSidebar from './ElementSidebar'
import PropertyPanel from './PropertyPanel'
import Canvas from './Canvas'
import { EditorElement, EditorState } from './types'
import { editableContentAPI, pagesAPI } from '../../lib/supabase'
import { useAnalytics } from '../../hooks/useAnalytics'

interface VisualEditorProps {
  pageId: string
  onClose: () => void
}

export default function VisualEditor({ pageId, onClose }: VisualEditorProps) {
  const { trackEditSave } = useAnalytics()
  
  const [editorState, setEditorState] = useState<EditorState>({
    elements: [],
    selectedElement: null,
    history: [],
    historyIndex: -1,
    viewport: 'desktop'
  })
  const [selectedHtmlElement, setSelectedHtmlElement] = useState<HTMLElement | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  // Cargar contenido inicial
  useEffect(() => {
    loadPageContent()
  }, [pageId])

  const loadPageContent = async () => {
    setIsLoading(true)
    try {
      console.log('📂 Cargando contenido de la página:', pageId)

      // Verificar conexión a Supabase primero
      const { testConnection } = await import('../../lib/supabase')
      const isConnected = await testConnection()
      
      if (!isConnected) {
        throw new Error('No se pudo conectar a Supabase. Verifica las variables de entorno.')
      }

      // Determinar el slug correcto para la página
      let pageSlug = `/${pageId}`
      if (pageId === '2') {
        pageSlug = '/estrategias'
      }
      
      // Intentar obtener la página
      let page
      try {
        page = await pagesAPI.getBySlug(pageSlug)
        console.log('✅ Página encontrada:', page)
      } catch (error) {
        console.log('Página no encontrada, creando nueva...')
        try {
          const pageName = pageId === '2' ? 'Estrategias de Crecimiento' : `Página ${pageId}`
          page = await pagesAPI.create({
            name: pageName,
            slug: pageSlug,
            content: {},
            status: 'published',
            is_system_page: false
          })
          console.log('✅ Nueva página creada:', page)
        } catch (createError) {
          console.error('❌ Error creando página:', createError)
          throw new Error(`No se pudo crear la página: ${createError instanceof Error ? createError.message : 'Error desconocido'}`)
        }
      }

      // Cargar contenido editable de la página
      let editableContents: any[] = []
      try {
        editableContents = await editableContentAPI.getByPageId(page.id)
        console.log('✅ Contenido editable cargado:', editableContents)
      } catch (contentError) {
        console.log('No hay contenido editable, usando contenido por defecto')
      }
      
      // Convertir contenido editable a elementos del editor
      let elements: EditorElement[] = editableContents.map(content => ({
        id: content.element_id,
        type: content.content_type,
        props: {
          content: content.content,
          style: content.styles,
          className: ''
        }
      }))

      // Si no hay contenido guardado o solo hay page-preview vacío, crear elementos para el contenido hardcodeado
      if (elements.length === 0 || (elements.length === 1 && elements[0].type === 'page-preview')) {
        console.log('🔄 Creando elementos por defecto para estrategias...')
        // Crear elementos para el contenido de estrategias
        elements = [
          {
            id: 'title-1',
            type: 'heading',
            props: {
              content: 'Elevamos tu negocio con un motor 360° :',
              className: 'text-2xl font-bold text-white text-center mb-3'
            }
          },
          {
            id: 'span-360',
            type: 'span',
            props: {
              content: '360°',
              className: 'relative z-10 text-[#FFEA1F] font-bold'
            }
          },
          {
            id: 'intro-text',
            type: 'paragraph',
            props: {
              content: 'Desarrollamos el marco estratégico para tu proyecto, que servirá como hoja de ruta para el éxito.',
              className: 'text-white text-sm leading-relaxed text-center max-w-2xl mx-auto'
            }
          }
        ]
        console.log('✅ Elementos por defecto creados:', elements)
      }

      console.log('✅ Contenido final cargado:', elements)
      setEditorState((prev: EditorState) => ({
        ...prev,
        elements: elements,
        history: [elements],
        historyIndex: 0
      }))
    } catch (error) {
      console.error('❌ Error loading page content:', error)
      console.error('Detalles del error:', {
        message: error instanceof Error ? error.message : 'Error desconocido',
        stack: error instanceof Error ? error.stack : undefined
      })
      
      // En caso de error, usar elementos por defecto
      const defaultElements: EditorElement[] = [
        {
          id: 'title-1',
          type: 'heading',
          props: {
            content: 'Elevamos tu negocio con un motor 360° :',
            className: 'text-2xl font-bold text-white text-center mb-3'
          }
        },
        {
          id: 'span-360',
          type: 'span',
          props: {
            content: '360°',
            className: 'relative z-10 text-[#FFEA1F] font-bold'
          }
        },
        {
          id: 'intro-text',
          type: 'paragraph',
          props: {
            content: 'Desarrollamos el marco estratégico para tu proyecto, que servirá como hoja de ruta para el éxito.',
            className: 'text-white text-sm leading-relaxed text-center max-w-2xl mx-auto'
          }
        }
      ]
      setEditorState((prev: EditorState) => ({
        ...prev,
        elements: defaultElements,
        history: [defaultElements],
        historyIndex: 0
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const addElement = (elementType: string) => {
    const newElement: EditorElement = {
      id: Date.now().toString(),
      type: elementType,
      props: getDefaultProps(elementType),
      children: []
    }

    const newElements = [...editorState.elements, newElement]
    updateHistory(newElements)
    setEditorState((prev: EditorState) => ({
      ...prev,
      elements: newElements,
      selectedElement: newElement
    }))
  }

  const getDefaultProps = (type: string) => {
    switch (type) {
      case 'heading':
        return {
          className: 'text-2xl font-bold text-gray-900',
          content: 'Nuevo título'
        }
      case 'paragraph':
        return {
          className: 'text-gray-600 leading-relaxed',
          content: 'Nuevo párrafo'
        }
      case 'button':
        return {
          className: 'bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors',
          content: 'Nuevo botón'
        }
      case 'container':
        return {
          className: 'bg-white p-6 rounded-lg shadow-md',
          style: { minHeight: '100px' }
        }
      default:
        return {}
    }
  }

  const updateElement = (elementId: string, updates: Partial<EditorElement>) => {
    const updateElementRecursive = (elements: EditorElement[]): EditorElement[] => {
      return elements.map(element => {
        if (element.id === elementId) {
          return { ...element, ...updates }
        }
        if (element.children) {
          return { ...element, children: updateElementRecursive(element.children) }
        }
        return element
      })
    }

    const newElements = updateElementRecursive(editorState.elements)
    updateHistory(newElements)
    setEditorState((prev: EditorState) => ({
      ...prev,
      elements: newElements,
      selectedElement: prev.selectedElement?.id === elementId 
        ? { ...prev.selectedElement, ...updates }
        : prev.selectedElement
    }))
  }

  const deleteElement = (elementId: string) => {
    const deleteElementRecursive = (elements: EditorElement[]): EditorElement[] => {
      return elements.filter(element => {
        if (element.id === elementId) {
          return false
        }
        if (element.children) {
          element.children = deleteElementRecursive(element.children)
        }
        return true
      })
    }

    const newElements = deleteElementRecursive(editorState.elements)
    updateHistory(newElements)
    setEditorState((prev: EditorState) => ({
      ...prev,
      elements: newElements,
      selectedElement: prev.selectedElement?.id === elementId ? null : prev.selectedElement
    }))
  }

  const updateHistory = (newElements: EditorElement[]) => {
    const newHistory = [...editorState.history.slice(0, editorState.historyIndex + 1), newElements]
    setEditorState(prev => ({
      ...prev,
      history: newHistory,
      historyIndex: newHistory.length - 1
    }))
  }

  const undo = () => {
    if (editorState.historyIndex > 0) {
      const newIndex = editorState.historyIndex - 1
      setEditorState(prev => ({
        ...prev,
        elements: prev.history[newIndex],
        historyIndex: newIndex
      }))
    }
  }

  const redo = () => {
    if (editorState.historyIndex < editorState.history.length - 1) {
      const newIndex = editorState.historyIndex + 1
      setEditorState(prev => ({
        ...prev,
        elements: prev.history[newIndex],
        historyIndex: newIndex
      }))
    }
  }

  const savePage = async () => {
    setIsLoading(true)
    try {
      console.log('💾 Guardando página:', pageId)
      console.log('Elementos a guardar:', editorState.elements)

      // Probar conexión primero
      const { testConnection } = await import('../../lib/supabase')
      const isConnected = await testConnection()
      
      if (!isConnected) {
        throw new Error('No se pudo conectar a Supabase')
      }

      // Determinar el slug correcto para la página
      let pageSlug = `/${pageId}`
      if (pageId === '2') {
        pageSlug = '/estrategias'
      }
      
      // Primero, obtener o crear la página
      let page
      try {
        page = await pagesAPI.getBySlug(pageSlug)
        console.log('✅ Página encontrada:', page)
      } catch (error) {
        console.log('Página no encontrada, creando nueva...')
        // Si la página no existe, la creamos
        const pageName = pageId === '2' ? 'Estrategias de Crecimiento' : `Página ${pageId}`
        page = await pagesAPI.create({
          name: pageName,
          slug: pageSlug,
          content: {},
          status: 'published',
          is_system_page: false
        })
        console.log('✅ Nueva página creada:', page)
      }

      // Eliminar contenido existente de la página
      console.log('🗑️ Eliminando contenido existente...')
      await editableContentAPI.deleteByPageId(page.id)
      console.log('✅ Contenido existente eliminado')

      // Guardar cada elemento como contenido editable
      console.log('💾 Guardando elementos...')
      for (let i = 0; i < editorState.elements.length; i++) {
        const element = editorState.elements[i]
        console.log(`Guardando elemento ${i + 1}/${editorState.elements.length}:`, element)
        
        const savedElement = await editableContentAPI.create({
          page_id: page.id,
          element_id: element.id,
          content_type: element.type,
          content: element.props.content || '',
          styles: element.props.style || {},
          order_index: i
        })
        console.log('✅ Elemento guardado:', savedElement)
      }

      console.log('✅ Página guardada exitosamente!')
      
      // Trackear edición guardada
      trackEditSave(`/admin/visual-builder`, {
        pageId,
        elementsCount: editorState.elements.length,
        elements: editorState.elements.map(el => ({ id: el.id, type: el.type }))
      })
      
      alert('Página guardada exitosamente!')
    } catch (error) {
      console.error('❌ Error saving page:', error)
      console.error('Detalles del error:', {
        message: error instanceof Error ? error.message : 'Error desconocido',
        stack: error instanceof Error ? error.stack : undefined
      })
      alert(`Error al guardar la página: ${error instanceof Error ? error.message : 'Error desconocido'}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Función para manejar la selección de elementos HTML
  const handleHtmlElementSelect = (element: HTMLElement) => {
    setSelectedHtmlElement(element)
    console.log('Elemento HTML seleccionado:', element)
  }

  // Función para manejar actualizaciones de elementos desde el Canvas
  const handleElementUpdate = (update: {
    elementId: string
    content: string
    type: string
    className: string
  }) => {
    console.log('🔄 Actualizando elemento:', update)
    
    // Buscar el elemento en el estado del editor
    const elementIndex = editorState.elements.findIndex(el => el.id === update.elementId)
    
    if (elementIndex !== -1) {
      // Actualizar el elemento
      const updatedElements = [...editorState.elements]
      updatedElements[elementIndex] = {
        ...updatedElements[elementIndex],
        props: {
          ...updatedElements[elementIndex].props,
          content: update.content
        }
      }
      
      // Actualizar el estado del editor
      setEditorState(prev => ({
        ...prev,
        elements: updatedElements,
        history: [...prev.history.slice(0, prev.historyIndex + 1), updatedElements],
        historyIndex: prev.historyIndex + 1
      }))
      
      console.log('✅ Elemento actualizado en el estado del editor')
    } else {
      console.log('❌ Elemento no encontrado:', update.elementId)
    }
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando editor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-gray-100 flex flex-col z-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">Editor Visual</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setEditorState(prev => ({ ...prev, viewport: 'desktop' }))}
              className={`p-2 rounded-lg ${editorState.viewport === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              title="Desktop"
            >
              <FiMonitor className="w-5 h-5" />
            </button>
            <button
              onClick={() => setEditorState(prev => ({ ...prev, viewport: 'tablet' }))}
              className={`p-2 rounded-lg ${editorState.viewport === 'tablet' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              title="Tablet"
            >
              <FiTablet className="w-5 h-5" />
            </button>
            <button
              onClick={() => setEditorState(prev => ({ ...prev, viewport: 'mobile' }))}
              className={`p-2 rounded-lg ${editorState.viewport === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              title="Mobile"
            >
              <FiSmartphone className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={undo}
            disabled={editorState.historyIndex <= 0}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
            title="Deshacer"
          >
            <FiRotateCcw className="w-5 h-5" />
          </button>
          <button
            onClick={redo}
            disabled={editorState.historyIndex >= editorState.history.length - 1}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
            title="Rehacer"
          >
            <FiRotateCw className="w-5 h-5" />
          </button>
          <button
            onClick={savePage}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center space-x-2 disabled:opacity-50"
          >
            <FiSave className="w-4 h-4" />
            <span>{isLoading ? 'Guardando...' : 'Guardar'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            title="Cerrar"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <ElementSidebar onAddElement={addElement} />

        {/* Canvas */}
        <div className="flex-1 flex flex-col">
          <Canvas
            elements={editorState.elements}
            selectedElement={editorState.selectedElement}
            viewport={editorState.viewport}
            pageId={pageId}
            onSelectElement={(element) => setEditorState(prev => ({ ...prev, selectedElement: element }))}
            onUpdateElement={updateElement}
            onDeleteElement={deleteElement}
            onHtmlElementSelect={handleHtmlElementSelect}
            onElementUpdate={handleElementUpdate}
          />
        </div>

        {/* Property Panel */}
        <PropertyPanel
          selectedElement={editorState.selectedElement}
          selectedHtmlElement={selectedHtmlElement}
          onUpdateElement={updateElement}
        />
      </div>
    </div>
  )
}
