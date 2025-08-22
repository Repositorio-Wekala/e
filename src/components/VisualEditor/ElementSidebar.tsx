'use client'

import { FiType, FiSquare, FiImage, FiMousePointer, FiLayers, FiGrid, FiBox, FiPlay } from 'react-icons/fi'

interface ElementSidebarProps {
  onAddElement: (elementType: string) => void
}

const elementCategories = [
  {
    name: 'Básicos',
    elements: [
      { type: 'container', label: 'Contenedor', icon: FiBox },
      { type: 'heading', label: 'Título', icon: FiType },
      { type: 'paragraph', label: 'Párrafo', icon: FiType },
      { type: 'button', label: 'Botón', icon: FiMousePointer },
    ]
  },
  {
    name: 'Layout',
    elements: [
      { type: 'grid', label: 'Grid', icon: FiGrid },
      { type: 'flex', label: 'Flex', icon: FiLayers },
    ]
  },
  {
    name: 'Medios',
    elements: [
      { type: 'image', label: 'Imagen', icon: FiImage },
      { type: 'video', label: 'Video', icon: FiPlay },
    ]
  }
]

export default function ElementSidebar({ onAddElement }: ElementSidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Elementos</h2>
        <p className="text-sm text-gray-600">Arrastra elementos al canvas</p>
      </div>

      {/* Elements List */}
      <div className="flex-1 overflow-y-auto p-4 max-h-[calc(100vh-200px)]">
        {elementCategories.map((category) => (
          <div key={category.name} className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">
              {category.name}
            </h3>
            <div className="space-y-2">
              {category.elements.map((element) => (
                <button
                  key={element.type}
                  onClick={() => onAddElement(element.type)}
                  className="w-full flex items-center space-x-3 p-3 text-left rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <element.icon className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                    {element.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          <p>💡 Tip: Haz clic en un elemento para agregarlo</p>
        </div>
      </div>
    </div>
  )
}
