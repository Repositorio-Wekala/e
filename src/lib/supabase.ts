import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validar que las variables de entorno estén definidas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variables de entorno de Supabase no encontradas:')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Definida' : '❌ No definida')
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Definida' : '❌ No definida')
  throw new Error('Variables de entorno de Supabase no configuradas. Revisa tu archivo .env.local')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Tipos para TypeScript
export interface HomeButton {
  id: number
  text: string
  href: string
  icon: string
  color: string
  order_index: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Service {
  id: number
  title: string
  description: string
  icon: string
  order_index: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ProcessStep {
  id: number
  step_number: string
  title: string
  description: string
  order_index: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Page {
  id: number
  name: string
  slug: string
  content: any
  status: string
  is_system_page: boolean
  created_at: string
  updated_at: string
}

// Función de prueba para verificar conexión
export const testConnection = async () => {
  try {
    console.log('🔍 Probando conexión a Supabase...')
    console.log('URL:', supabaseUrl)
    console.log('Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 10)}...` : 'No definida')
    
    // Probar conexión básica
    const { data: testData, error: testError } = await supabase
      .from('home_buttons')
      .select('id, text')
      .limit(1)
    
    if (testError) {
      console.error('❌ Error en consulta de prueba:', testError)
      console.error('Código:', testError.code)
      console.error('Mensaje:', testError.message)
      console.error('Detalles:', testError.details)
      return false
    }
    
    console.log('✅ Conexión básica exitosa a Supabase')
    console.log('Datos de prueba:', testData)
    
    // Probar acceso a pages
    const { data: pagesData, error: pagesError } = await supabase
      .from('pages')
      .select('id, name, slug')
      .limit(1)
    
    if (pagesError) {
      console.error('❌ Error accediendo a pages:', pagesError)
      return false
    }
    
    console.log('✅ Acceso a pages exitoso:', pagesData)
    
    // Probar acceso a editable_content
    const { data: contentData, error: contentError } = await supabase
      .from('editable_content')
      .select('id, element_id, content_type')
      .limit(1)
    
    if (contentError) {
      console.error('❌ Error accediendo a editable_content:', contentError)
      return false
    }
    
    console.log('✅ Acceso a editable_content exitoso:', contentData)
    
    return true
  } catch (error) {
    console.error('❌ Error de conexión:', error)
    return false
  }
}

// Funciones para home_buttons
export const homeButtonsAPI = {
  // Obtener todos los botones
  async getAll() {
    const { data, error } = await supabase
      .from('home_buttons')
      .select('*')
      .order('order_index')
    
    if (error) throw error
    return data as HomeButton[]
  },

  // Crear nuevo botón
  async create(button: Omit<HomeButton, 'id' | 'created_at' | 'updated_at'>) {
    console.log('🔄 Creando botón con datos:', button)
    
    try {
      const { data, error } = await supabase
        .from('home_buttons')
        .insert(button)
        .select()
        .single()
      
      if (error) {
        console.error('❌ Error de Supabase al crear botón:', error)
        console.error('Código:', error.code)
        console.error('Mensaje:', error.message)
        console.error('Detalles:', error.details)
        throw new Error(`Error de Supabase: ${error.message} (${error.code})`)
      }
      
      console.log('✅ Botón creado exitosamente en DB:', data)
      return data as HomeButton
    } catch (error) {
      console.error('❌ Error inesperado al crear botón:', error)
      throw error
    }
  },

  // Actualizar botón
  async update(id: number, updates: Partial<HomeButton>) {
    console.log('🔄 Actualizando botón:', id, 'con datos:', updates)
    
    try {
      const { data, error } = await supabase
        .from('home_buttons')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      
      if (error) {
        console.error('❌ Error de Supabase al actualizar:', error)
        console.error('Código:', error.code)
        console.error('Mensaje:', error.message)
        console.error('Detalles:', error.details)
        throw new Error(`Error de Supabase: ${error.message} (${error.code})`)
      }
      
      console.log('✅ Botón actualizado exitosamente:', data)
      return data as HomeButton
    } catch (error) {
      console.error('❌ Error inesperado al actualizar:', error)
      throw error
    }
  },

  // Eliminar botón
  async delete(id: number) {
    const { error } = await supabase
      .from('home_buttons')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  },

  // Actualizar múltiples botones
  async updateMultiple(buttons: HomeButton[]) {
    const { data, error } = await supabase
      .from('home_buttons')
      .upsert(buttons)
      .select()
    
    if (error) throw error
    return data as HomeButton[]
  }
}

// Funciones para services
export const servicesAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('order_index')
    
    if (error) throw error
    return data as Service[]
  },

  async update(id: number, updates: Partial<Service>) {
    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Service
  }
}

// Funciones para process_steps
export const processStepsAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('process_steps')
      .select('*')
      .order('order_index')
    
    if (error) throw error
    return data as ProcessStep[]
  },

  async update(id: number, updates: Partial<ProcessStep>) {
    const { data, error } = await supabase
      .from('process_steps')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as ProcessStep[]
  }
}

// Funciones para pages
export const pagesAPI = {
  async getAll() {
    console.log('🔍 pagesAPI.getAll() - Iniciando consulta...')
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('❌ Error en pagesAPI.getAll():', error)
      throw error
    }
    
    console.log('✅ pagesAPI.getAll() - Datos obtenidos:', data)
    return data as Page[]
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    return data as Page
  },

  async create(page: Omit<Page, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('pages')
      .insert(page)
      .select()
      .single()
    
    if (error) throw error
    return data as Page
  },

  async update(id: number, updates: Partial<Page>) {
    const { data, error } = await supabase
      .from('pages')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Page
  },

  async delete(id: number) {
    const { error } = await supabase
      .from('pages')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}

// Funciones para site_config
export const siteConfigAPI = {
  async get(key: string) {
    const { data, error } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', key)
      .single()
    
    if (error) throw error
    return data?.value
  },

  async set(key: string, value: string, description?: string) {
    const { data, error } = await supabase
      .from('site_config')
      .upsert({ key, value, description })
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Tipos para editable_content
export interface EditableContent {
  id: number
  page_id: number
  element_id: string
  content_type: string
  content: string
  styles: any
  order_index: number
  created_at: string
  updated_at: string
}

// Funciones para editable_content
export const editableContentAPI = {
  async getByPageId(pageId: number) {
    const { data, error } = await supabase
      .from('editable_content')
      .select('*')
      .eq('page_id', pageId)
      .order('order_index')
    
    if (error) throw error
    return data as EditableContent[]
  },

  async create(content: Omit<EditableContent, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('editable_content')
      .insert(content)
      .select()
      .single()
    
    if (error) throw error
    return data as EditableContent
  },

  async update(id: number, updates: Partial<EditableContent>) {
    const { data, error } = await supabase
      .from('editable_content')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as EditableContent
  },

  async delete(id: number) {
    const { error } = await supabase
      .from('editable_content')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  },

  async updateMultiple(contents: EditableContent[]) {
    const { data, error } = await supabase
      .from('editable_content')
      .upsert(contents)
      .select()
    
    if (error) throw error
    return data as EditableContent[]
  },

  async deleteByPageId(pageId: number) {
    const { error } = await supabase
      .from('editable_content')
      .delete()
      .eq('page_id', pageId)
    
    if (error) throw error
    return true
  }
}

// Analytics APIs
export const analyticsAPI = {
  // Crear nueva sesión
  createSession: async (sessionData: {
    session_id: string
    user_agent?: string
    ip_address?: string
    page_url: string
    referrer?: string
  }) => {
    try {
      const { data, error } = await supabase
        .from('user_sessions')
        .insert([sessionData])
        .select()
      
      if (error) throw error
      return data?.[0]
    } catch (error) {
      console.error('Error creating session:', error)
      return null
    }
  },

  // Registrar evento de página
  trackEvent: async (eventData: {
    session_id: string
    event_type: 'page_view' | 'click' | 'conversion' | 'edit_save'
    page_url: string
    element_id?: string
    element_text?: string
    metadata?: any
  }) => {
    try {
      const { data, error } = await supabase
        .from('page_events')
        .insert([eventData])
        .select()
      
      if (error) throw error
      return data?.[0]
    } catch (error) {
      console.error('Error tracking event:', error)
      return null
    }
  },

  // Obtener métricas del día actual
  getTodayMetrics: async () => {
    try {
      const { data, error } = await supabase
        .from('daily_metrics')
        .select('*')
        .eq('date', new Date().toISOString().split('T')[0])
        .single()
      
      if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows found
      return data || {
        total_visits: 0,
        unique_visitors: 0,
        total_page_views: 0,
        total_conversions: 0,
        total_edits: 0,
        avg_session_duration: 0,
        bounce_rate: 0
      }
    } catch (error) {
      console.error('Error getting today metrics:', error)
      return {
        total_visits: 0,
        unique_visitors: 0,
        total_page_views: 0,
        total_conversions: 0,
        total_edits: 0,
        avg_session_duration: 0,
        bounce_rate: 0
      }
    }
  },

  // Obtener métricas de los últimos 7 días
  getWeeklyMetrics: async () => {
    try {
      const { data, error } = await supabase
        .from('daily_metrics')
        .select('*')
        .gte('date', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
        .order('date', { ascending: true })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error getting weekly metrics:', error)
      return []
    }
  },

  // Actualizar duración de sesión
  updateSessionDuration: async (sessionId: string, durationSeconds: number) => {
    try {
      // Verificar que sessionId sea válido
      if (!sessionId || typeof sessionId !== 'string') {
        console.warn('Invalid session ID for duration update:', sessionId)
        return false
      }

      const { error } = await supabase
        .from('user_sessions')
        .update({ 
          duration_seconds: durationSeconds,
          ended_at: new Date().toISOString(),
          is_bounce: false
        })
        .eq('session_id', sessionId)
      
      if (error) {
        console.warn('Supabase error updating session duration:', error)
        return false
      }
      return true
    } catch (error) {
      console.warn('Error updating session duration:', error)
      return false
    }
  }
}
