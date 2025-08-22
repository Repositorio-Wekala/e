'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useSupabase } from '@/hooks/useSupabase'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface SupabaseContextType {
  user: User | null
  session: Session | null
  loading: boolean
  supabase: typeof supabase
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

export function SupabaseProvider({ children }: { children: ReactNode }) {
  try {
    const supabaseData = useSupabase()

    return (
      <SupabaseContext.Provider value={supabaseData}>
        {children}
      </SupabaseContext.Provider>
    )
  } catch (error) {
    // Si hay un error de configuración, mostrar un mensaje informativo
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Configuración Requerida
          </h2>
          <p className="text-gray-600 mb-4">
            Para usar esta aplicación, necesitas configurar Supabase.
          </p>
          <div className="bg-gray-50 p-4 rounded text-sm">
            <p className="font-semibold mb-2">Pasos para configurar:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700">
              <li>Crea un archivo <code>.env.local</code> en la raíz del proyecto</li>
              <li>Agrega tus credenciales de Supabase</li>
              <li>Reinicia el servidor de desarrollo</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export function useSupabaseContext() {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error('useSupabaseContext must be used within a SupabaseProvider')
  }
  return context
}
