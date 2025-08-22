'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FiEdit3, FiSave, FiX, FiEye, FiSettings, FiUsers, FiTrendingUp, FiMonitor, FiHome, FiBarChart, FiFileText, FiImage, FiPlus, FiTrash2, FiMove, FiLogOut, FiClock } from 'react-icons/fi'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { supabase, homeButtonsAPI, servicesAPI, processStepsAPI, pagesAPI, testConnection, type HomeButton, analyticsAPI } from '@/lib/supabase'
import VisualEditor from '@/components/VisualEditor/VisualEditor'
import { useAutoLogout } from '@/hooks/useAutoLogout'
import SessionTimer from '@/components/SessionTimer'
import { useToast } from '@/components/Toast'

export default function AdminPanel() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isClient, setIsClient] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { showToast, ToastContainer } = useToast()

  // Filtrar errores de extensiones del navegador
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const originalError = console.error
      console.error = (...args: any[]) => {
        const message = args[0]
        if (typeof message === 'string' && message.includes('runtime.lastError')) {
          return // No mostrar errores de extensiones
        }
        originalError.apply(console, args)
      }
    }
  }, [])

  // Auto-logout después de 1 hora de inactividad
  const { getTimeRemaining, extendSession, pauseAutoLogout, resumeAutoLogout } = useAutoLogout({
    timeoutMinutes: 60, // 1 hora
    onLogout: () => {
      console.log('🔄 Redirigiendo al login por inactividad')
      // El hook ya maneja la redirección automáticamente
    },
    enabled: true
  })
  
  // Estado para mostrar/ocultar el timer
  const [showSessionTimer, setShowSessionTimer] = useState(true)

  // Efecto para manejar la hidratación
  useEffect(() => {
    setIsClient(true)
    const path = window.location.pathname
    if (path === '/admin') {
      setActiveTab('dashboard')
    } else {
      const section = path.split('/admin/')[1]
      setActiveTab(section || 'dashboard')
    }
  }, [])
  const [isEditing, setIsEditing] = useState(false)
  const [showVisualEditor, setShowVisualEditor] = useState(false)
  const [editingPageId, setEditingPageId] = useState<string | null>(null)
  const [pages, setPages] = useState<any[]>([])
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  

  const [loading, setLoading] = useState(true)
  // Cargar métricas de analytics
  const loadAnalyticsData = async () => {
    try {
      const todayMetrics = await analyticsAPI.getTodayMetrics()
      setAnalyticsData(todayMetrics)
    } catch (error) {
      console.error('Error cargando analytics:', error)
      // Usar datos por defecto si hay error
      setAnalyticsData({
        total_visits: 0,
        unique_visitors: 0,
        total_page_views: 0,
        total_conversions: 0,
        total_edits: 0,
        avg_session_duration: 0,
        bounce_rate: 0
      })
    }
  }

  // Cargar datos desde Supabase
  const loadData = async () => {
    try {
      console.log('🚀 Iniciando carga de datos...')
      setLoading(true)
      
      // Cargar botones de la página principal
      const buttons = await homeButtonsAPI.getAll()
      setContent(prev => ({
        ...prev,
        homeButtons: buttons.map(btn => ({ ...btn, isEditing: false }))
      }))
      
      // Cargar servicios
      const services = await servicesAPI.getAll()
      setContent(prev => ({
        ...prev,
        services: services
      }))
      
      // Cargar pasos del proceso
      const processSteps = await processStepsAPI.getAll()
      setContent(prev => ({
        ...prev,
        process: processSteps
      }))
      
      // Cargar páginas
      console.log('🔄 Cargando páginas...')
      try {
        const pagesData = await pagesAPI.getAll()
        console.log('📄 Páginas cargadas:', pagesData)
        
        // Filtrar páginas no deseadas (2 y 5)
        const filteredPages = pagesData.filter(page => 
          page.slug !== '/2' && page.slug !== '/5'
        )
        
        const processedPages = filteredPages.map(page => ({
          ...page,
          lastModified: new Date(page.updated_at).toLocaleDateString(),
          editable: !page.is_system_page
        }))
        
        setPages(processedPages)
        console.log('✅ Páginas procesadas y guardadas en estado (filtradas)')
        console.log('📊 Total de páginas:', processedPages.length)
        console.log('📊 Páginas editables:', processedPages.filter(p => p.editable).length)
        console.log('📊 Páginas del sistema:', processedPages.filter(p => !p.editable).length)
        console.log('📄 Páginas editables:', processedPages.filter(p => p.editable).map(p => p.name))
        console.log('🔒 Páginas del sistema:', processedPages.filter(p => !p.editable).map(p => p.name))

      } catch (pagesError) {
        console.error('❌ Error específico cargando páginas:', pagesError)
        setPages([]) // Establecer array vacío en caso de error
      }
      
    } catch (error) {
      console.error('Error cargando datos:', error)
    } finally {
      console.log('🏁 Finalizando carga de datos...')
      setLoading(false)
      console.log('✅ Carga de datos completada')
    }
  }

  // Cargar datos al montar el componente
  useEffect(() => {
    if (isClient) {
      // Probar conexión primero
      testConnection().then(isConnected => {
        if (isConnected) {
          loadData()
          loadAnalyticsData() // Cargar métricas de analytics
        } else {
          console.error('No se pudo conectar a Supabase')
          alert('Error de conexión con la base de datos')
        }
      })
    }
  }, [isClient])

  // Efecto para forzar re-render del timer cada segundo
  useEffect(() => {
    if (showSessionTimer) {
      const interval = setInterval(() => {
        // Forzar re-render del componente SessionTimer
        setShowSessionTimer(prev => prev)
      }, 1000)

      return () => clearInterval(interval)
    }
    }, [showSessionTimer])

  // Función para manejar logout manual
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Error al cerrar sesión:', error)
      } else {
        if (isClient) {
          localStorage.removeItem('adminActiveTab')
        }
        router.push('/acceso-dashboard')
      }
    } catch (error) {
      console.error('Error inesperado:', error)
    }
  }

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    if (isClient) {
      localStorage.setItem('adminActiveTab', tabId)
      // Cambiar la URL sin recargar la página
      const newUrl = tabId === 'dashboard' ? '/admin' : `/admin/${tabId}`
      window.history.pushState({}, '', newUrl)
      // Actualizar el título de la página
      document.title = `Admin - ${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`
    }
  }

  const addNewPage = async () => {
    try {
      const newPage = await pagesAPI.create({
        name: 'Nueva Página',
        slug: `/pagina-${Date.now()}`,
        content: {},
        status: 'draft',
        is_system_page: false
      })
      
      setPages(prev => [...prev, {
        ...newPage,
        lastModified: new Date(newPage.updated_at).toLocaleDateString(),
        editable: true
      }])
    } catch (error) {
      console.error('Error creando página:', error)
    }
  }

  const deletePage = async (id: number) => {
    try {
      const pageToDelete = pages.find(page => page.id === id)
      if (pageToDelete && pageToDelete.editable) {
        await pagesAPI.delete(id)
        setPages(pages.filter(page => page.id !== id))
      }
    } catch (error) {
      console.error('Error eliminando página:', error)
    }
  }



  const openVisualEditor = (pageId: string) => {
    setEditingPageId(pageId)
    setShowVisualEditor(true)
    // Pausar auto-logout cuando está editando
    pauseAutoLogout()
  }

  const closeVisualEditor = () => {
    setShowVisualEditor(false)
    setEditingPageId(null)
    // Reanudar auto-logout cuando sale del editor
    resumeAutoLogout()
  }
  
  // Estado para el contenido editable
  const [content, setContent] = useState({
    homeButtons: [] as any[],
    services: [] as any[],
    process: [] as any[]
  })

  const handleSave = () => {
    // Aquí iría la lógica para guardar en la base de datos
    console.log('Guardando contenido:', content)
    setIsEditing(false)
  }

  const addButton = async () => {
    try {
      console.log('🔄 Iniciando creación de nuevo botón...')
      console.log('📊 Botones actuales:', content.homeButtons.length)
      
      const newButton = await homeButtonsAPI.create({
        text: "Nuevo Botón",
        href: "#",
        icon: "🔗",
        color: "blue",
        order_index: content.homeButtons.length + 1,
        is_active: true
      })
      
      console.log('✅ Botón creado exitosamente:', newButton)
      
      setContent({
        ...content,
        homeButtons: [...content.homeButtons, { ...newButton, isEditing: false }]
      })
      
      console.log('✅ Estado actualizado con nuevo botón')
      showToast('✅ Botón creado exitosamente', 'success')
    } catch (error) {
      console.error('❌ Error creando botón:', error)
      showToast(`❌ Error al crear botón: ${error instanceof Error ? error.message : 'Error desconocido'}`, 'error')
    }
  }

  const removeButton = async (id: number) => {
    try {
      await homeButtonsAPI.delete(id)
      setContent({
        ...content,
        homeButtons: content.homeButtons.filter(button => button.id !== id)
      })
    } catch (error) {
      console.error('Error eliminando botón:', error)
    }
  }

  const updateButton = async (id: number, field: string, value: string) => {
    try {
      console.log(`Actualizando botón ${id}, campo: ${field}, valor: ${value}`)
      
      // Solo actualizar en Supabase si el campo existe en la base de datos Y NO es durante la edición
      const validFields = ['text', 'href', 'icon', 'order_index', 'is_active']
      
      if (validFields.includes(field)) {
        // Buscar el botón actual
        const currentButton = content.homeButtons.find(btn => btn.id === id)
        
        // Si el botón está en modo de edición, solo actualizar el estado local
        if (currentButton && currentButton.isEditing) {
          setContent({
            ...content,
            homeButtons: content.homeButtons.map(button => 
              button.id === id ? { ...button, [field]: value } : button
            )
          })
        } else {
          // Si no está en modo de edición, actualizar en la base de datos
          const updatedButton = await homeButtonsAPI.update(id, { [field]: value })
          console.log('Botón actualizado en DB:', updatedButton)
          
          setContent({
            ...content,
            homeButtons: content.homeButtons.map(button => 
              button.id === id ? { ...updatedButton, isEditing: false } : button
            )
          })
        }
      } else {
        // Para campos locales como 'isEditing', solo actualizar el estado
        setContent({
          ...content,
          homeButtons: content.homeButtons.map(button => 
            button.id === id ? { ...button, [field]: value } : button
          )
        })
      }
    } catch (error) {
      console.error('Error actualizando botón:', error)
      // Mostrar error al usuario
      showToast(`❌ Error al actualizar: ${error instanceof Error ? error.message : 'Error desconocido'}`, 'error')
    }
  }

  // Función para guardar los cambios de un botón en la base de datos
  const saveButtonChanges = async (buttonId: number) => {
    try {
      const button = content.homeButtons.find(btn => btn.id === buttonId)
      if (!button) return

      console.log('💾 Guardando cambios para botón:', buttonId)
      const updatedButton = await homeButtonsAPI.update(buttonId, {
        text: button.text,
        href: button.href,
        icon: button.icon
      })
      
      // Cerrar modo edición
      setContent({
        ...content,
        homeButtons: content.homeButtons.map(btn => 
          btn.id === buttonId ? { ...updatedButton, isEditing: false } : btn
        )
      })
      
      showToast('✅ Cambios guardados exitosamente', 'success')
    } catch (error) {
      console.error('❌ Error guardando:', error)
      showToast('❌ Error al guardar los cambios', 'error')
    }
  }

  // Función para actualizar el orden de los botones después del drag and drop
  const updateButtonOrder = async (newOrder: any[]) => {
    try {
      console.log('🔄 Actualizando orden de botones...')
      
      // Actualizar el estado local primero
      setContent({
        ...content,
        homeButtons: newOrder
      })
      
      // Actualizar el order_index de cada botón en la base de datos
      const updatePromises = newOrder.map((button, index) => 
        homeButtonsAPI.update(button.id, { order_index: index + 1 })
      )
      
      await Promise.all(updatePromises)
      console.log('✅ Orden de botones actualizado exitosamente')
      showToast('✅ Orden de botones actualizado exitosamente', 'success')
    } catch (error) {
      console.error('❌ Error actualizando orden de botones:', error)
      showToast('❌ Error al actualizar el orden de los botones', 'error')
    }
  }

  const stats = [
    { 
      label: 'Visitas Hoy', 
      value: analyticsData?.total_visits?.toLocaleString() || '0', 
      change: '+12%', 
      icon: FiBarChart 
    },
    { 
      label: 'Conversiones', 
      value: analyticsData?.total_conversions?.toString() || '0', 
      change: '+8%', 
      icon: FiTrendingUp 
    },
    { 
      label: 'Páginas Editadas', 
      value: analyticsData?.total_edits?.toString() || '0', 
      change: '+3', 
      icon: FiFileText 
    },
    { 
      label: 'Páginas Vistas', 
      value: analyticsData?.total_page_views?.toLocaleString() || '0', 
      change: '+2', 
      icon: FiImage 
    }
  ]

  // Evitar renderizado hasta que el cliente esté listo
  if (!isClient || loading) {
  return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando datos...</p>
        </div>
      </div>
    )
  }

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation - Fixed */}
      <nav className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-30 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <FiSettings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
                  <p className="text-sm text-gray-500">Estrategias de Crecimiento</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Online</span>
              </div>
              <button
                onClick={async () => {
                  console.log('🧪 Probando conexión...')
                  const isConnected = await testConnection()
                  alert(isConnected ? '✅ Conexión exitosa' : '❌ Error de conexión')
                }}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                title="Probar conexión"
              >
                <FiSettings className="w-4 h-4" />
                <span>Probar DB</span>
              </button>

              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">A</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                title="Cerrar sesión"
              >
                <FiLogOut className="w-4 h-4" />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>
        </div>
      </nav>



      <div className="flex">
        {/* Sidebar - Fixed */}
        <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen fixed left-0 top-16 z-20">
          <div className="p-6">

            <nav className="space-y-2">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: FiHome },
                { id: 'home', label: 'Página Principal', icon: FiHome },
                { id: 'visual-builder', label: 'Constructor Visual', icon: FiSettings }
              ].map((tab) => (
              <button
                  key={tab.id}
                  onClick={() => {
                    handleTabChange(tab.id)
                    // Cerrar el menú móvil después de hacer clic
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Session Timer en la barra lateral */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Sesión</span>
              <button
                onClick={() => setShowSessionTimer(!showSessionTimer)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title={showSessionTimer ? "Ocultar timer" : "Mostrar timer"}
              >
                <FiClock className="w-4 h-4" />
              </button>
            </div>
            
            {showSessionTimer && (
              <SessionTimer
                timeRemaining={getTimeRemaining()}
                onExtend={extendSession}
                onLogout={handleLogout}
              />
            )}
          </div>
        </div>
        

      </div>

        {/* Main Content - With left margin for fixed sidebar */}
        <div className="flex-1 bg-gray-50 ml-64 pt-16">
          <div className="p-8">
            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                          <stat.icon className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="mt-4 flex items-center">
                        <span className="text-sm font-medium text-green-600">{stat.change}</span>
                        <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Métricas Detalladas */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                  {/* Gráfico de Visitas */}
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">Visitas por Día</h3>
                      <select className="text-xs sm:text-sm border border-gray-300 rounded-lg px-2 sm:px-3 py-1">
                        <option>Últimos 7 días</option>
                        <option>Últimos 14 días</option>
                        <option>Últimos 30 días</option>
                      </select>
                    </div>
                    <div className="h-48 sm:h-64 flex items-end justify-between space-x-1 sm:space-x-2">
                      {[12, 19, 15, 25, 22, 30, 28].map((value, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center">
                          <div 
                            className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-500"
                            style={{ height: `${(value / 30) * 200}px` }}
                          ></div>
                          <span className="text-xs text-gray-500 mt-1 sm:mt-2">{['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'][index]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Páginas Más Visitadas */}
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Páginas Más Visitadas</h3>
                    <div className="space-y-4">
                      {[
                        { name: 'Página Principal', visits: 45, percentage: 35 },
                        { name: 'Estrategias', visits: 32, percentage: 25 },
                        { name: 'Consultoría', visits: 28, percentage: 22 },
                        { name: 'Ads', visits: 15, percentage: 12 },
                        { name: 'Desarrollo', visits: 8, percentage: 6 }
                      ].map((page, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs sm:text-sm font-medium text-gray-700">{page.name}</span>
                              <span className="text-xs sm:text-sm text-gray-500">{page.visits} visitas</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${page.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Métricas Adicionales */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">Tiempo Promedio</h3>
                      <FiClock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">2:45</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">minutos por sesión</p>
                  </div>

                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">Tasa de Rebote</h3>
                      <FiTrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">23%</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">menor que el mes anterior</p>
                  </div>

                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">Fuentes de Tráfico</h3>
                      <FiUsers className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Directo</span>
                        <span className="font-medium">45%</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Social</span>
                        <span className="font-medium">35%</span>
                      </div>
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Búsqueda</span>
                        <span className="font-medium">20%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Home Editor */}
            {activeTab === 'home' && (
              <HomeEditor 
                buttons={content.homeButtons}
                addButton={addButton}
                removeButton={removeButton}
                updateButton={updateButton}
                saveButtonChanges={saveButtonChanges}
                updateButtonOrder={updateButtonOrder}
                content={content}
                setContent={setContent}
                showToast={showToast}
              />
            )}

            {/* Content Area - Solo mostrar cuando no es home */}
            {activeTab !== 'home' && (
              <>
                {activeTab === 'visual-builder' && (
                  <VisualBuilder 
                    pages={pages.filter(page => page.editable)}
                    allPages={pages} // Pasar todas las páginas para debugging
                    addNewPage={addNewPage}
                    deletePage={deletePage}
                    openVisualEditor={openVisualEditor}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

    </div>

    {/* Visual Editor Modal */}
    {showVisualEditor && editingPageId && (
      <VisualEditor
        pageId={editingPageId}
        onClose={closeVisualEditor}
      />
    )}

    {/* Toast Container */}
    <ToastContainer />
  </>
  )
}





// Componente de botón arrastrable
function SortableButton({ button, index, updateButton, removeButton, saveButtonChanges }: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: button.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md cursor-move"
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white text-sm font-bold">{index + 1}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiMove className="w-4 h-4 text-gray-400" />
            <div>
              <span className="text-sm font-semibold text-gray-700">Botón {index + 1}</span>
              <p className="text-xs text-gray-500">{button.text}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {button.isEditing ? (
            <button
              onClick={() => saveButtonChanges(button.id)}
              className="text-green-500 hover:text-green-700 transition-colors p-2 rounded-lg hover:bg-green-50"
              title="Guardar cambios"
            >
              <FiSave className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                console.log('🔄 Activando modo edición para botón:', button.id)
                updateButton(button.id, 'isEditing', true)
              }}
              className="text-blue-500 hover:text-blue-700 transition-colors p-2 rounded-lg hover:bg-blue-50"
              title="Editar botón"
            >
              <FiEdit3 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => removeButton(button.id)}
            className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-lg hover:bg-red-50"
            title="Eliminar botón"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {button.isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Icono</label>
            <input
              type="text"
              value={button.icon || ''}
              onChange={(e) => updateButton(button.id, 'icon', e.target.value)}
              placeholder="Emoji o icono"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Texto del Botón</label>
            <input
              type="text"
              value={button.text || ''}
              onChange={(e) => updateButton(button.id, 'text', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Enlace URL</label>
            <input
              type="text"
              value={button.href || ''}
              onChange={(e) => updateButton(button.id, 'href', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-600">
          <p><strong>Icono:</strong> {button.icon || 'Sin icono'}</p>
          <p><strong>Texto:</strong> {button.text || 'Sin texto'}</p>
          <p><strong>URL:</strong> {button.href || 'Sin URL'}</p>
        </div>
      )}
    </div>
  )
}

// Componente de edición del home
function HomeEditor({ buttons, addButton, removeButton, updateButton, saveButtonChanges, updateButtonOrder, content, setContent, showToast }: any) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = buttons.findIndex((button: any) => button.id === active.id)
      const newIndex = buttons.findIndex((button: any) => button.id === over?.id)
      
      const newOrder = arrayMove(buttons, oldIndex, newIndex)
      updateButtonOrder(newOrder)
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header de la sección */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gestión de Botones</h2>
            <p className="text-gray-600 mt-1">Edita y personaliza los botones de tu página principal</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {/* Panel de edición - Sin limitación */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Configuración de Botones</h3>
              <p className="text-gray-500 text-sm mt-1">Personaliza cada botón individualmente</p>
            </div>
            <button
              onClick={addButton}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg flex items-center space-x-2 transition-all shadow-lg font-medium"
            >
              <FiPlus className="w-4 h-4" />
              <span>Nuevo Botón</span>
            </button>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={buttons.map((button: any) => button.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-6">
                {buttons.map((button: any, index: number) => (
                  <SortableButton
                    key={button.id}
                    button={button}
                    index={index}
                    updateButton={updateButton}
                    removeButton={removeButton}
                    saveButtonChanges={saveButtonChanges}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>

        {/* Vista previa en tiempo real - Altura limitada */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 h-fit">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900">Vista Previa</h3>
            <p className="text-gray-500 text-sm mt-1">Visualización en tiempo real de los cambios</p>
          </div>
          
          {/* Simulación de móvil con iframe */}
          <div className="mx-auto w-80 h-[700px] bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl p-2 shadow-2xl">
            <div className="w-full h-full bg-white rounded-2xl overflow-hidden shadow-inner">
              <iframe 
                src="/" 
                className="w-full h-full border-0"
                title="Vista previa de la página principal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente Constructor Visual
function VisualBuilder({ pages, allPages, addNewPage, deletePage, openVisualEditor }: any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Constructor Visual</h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Gestiona todas las páginas de tu sitio web 
            <span className="ml-2 text-blue-600">
              ({pages.length} editables de {allPages.length} total)
            </span>
          </p>
        </div>
        <button
          onClick={addNewPage}
          className="px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg flex items-center space-x-2 transition-all shadow-lg font-medium text-sm sm:text-base"
        >
          <FiPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Nueva Página</span>
          <span className="sm:hidden">Nueva</span>
        </button>
      </div>

      {/* Vista de tabla para desktop */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Página</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">URL</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Estado</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Última Modificación</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pages.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                        <p>Cargando páginas...</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  pages.map((page: any) => (
                  <tr key={page.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FiFileText className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900">{page.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-700">{page.slug}</code>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        page.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {page.status === 'published' ? 'Publicada' : 'Borrador'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {page.lastModified}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        {page.editable && (
                          <button
                            onClick={() => openVisualEditor(page.id.toString())}
                            className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded hover:bg-blue-50"
                            title="Editar página"
                          >
                            <FiEdit3 className="w-4 h-4" />
                          </button>
                        )}
                        {page.editable && (
                          <button
                            onClick={() => deletePage(page.id)}
                            className="text-red-600 hover:text-red-800 transition-colors p-1 rounded hover:bg-red-50"
                            title="Eliminar página"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        )}
                        {!page.editable && (
                          <span className="text-gray-400 text-sm">No editable</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Vista de tarjetas para móviles */}
      <div className="lg:hidden space-y-4">
        {pages.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500">
            <div className="flex flex-col items-center space-y-2">
              <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              <p>Cargando páginas...</p>
            </div>
          </div>
        ) : (
          pages.map((page: any) => (
            <div key={page.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiFileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{page.name}</h4>
                    <p className="text-xs text-gray-500">{page.lastModified}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  page.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {page.status === 'published' ? 'Publicada' : 'Borrador'}
                </span>
              </div>
              
              <div className="mb-3">
                <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700 break-all">{page.slug}</code>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {page.editable && (
                    <button
                      onClick={() => openVisualEditor(page.id.toString())}
                      className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded hover:bg-blue-50"
                      title="Editar página"
                    >
                      <FiEdit3 className="w-4 h-4" />
                    </button>
                  )}
                  {page.editable && (
                    <button
                      onClick={() => deletePage(page.id)}
                      className="text-red-600 hover:text-red-800 transition-colors p-2 rounded hover:bg-red-50"
                      title="Eliminar página"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  )}
                  {!page.editable && (
                    <span className="text-gray-400 text-xs">No editable</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
