'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { handleSupabaseError } from '@/utils/supabase-helpers'

export default function AccesoDashboardPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(handleSupabaseError(error))
      } else if (data.user) {
        router.push('/admin')
      }
    } catch (err) {
      setError('Error inesperado. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] relative overflow-x-hidden">
      {/* Fixed background layer */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Background geometric shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#0043ff]/30 to-[#0043ff]/15 rounded-full blur-2xl"></div>
          <div className="absolute top-40 right-8 w-24 h-24 bg-gradient-to-br from-[#0043ff]/40 to-[#0043ff]/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-40 left-16 w-20 h-20 bg-gradient-to-br from-[#0043ff]/25 to-[#0043ff]/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-br from-[#0043ff]/50 to-[#0043ff]/25 rounded-full blur-2xl"></div>
        </div>

        {/* Additional lighting effects */}
        <div className="absolute inset-0">
          <div className="absolute top-32 left-20 w-8 h-8 bg-[#0043ff]/60 rounded-full blur-sm"></div>
          <div className="absolute top-48 right-16 w-6 h-6 bg-[#0043ff]/70 rounded-full blur-sm"></div>
          <div className="absolute bottom-32 left-24 w-10 h-10 bg-[#0043ff]/50 rounded-full blur-md"></div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="relative z-10">
        {/* Login Container */}
        <div className="flex items-center justify-center min-h-screen px-6 py-12">
          <div className="w-full max-w-lg">
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <div className="mb-6">
                <Image
                  src="/Logo e-me.svg"
                  alt="E-me Logo"
                  width={120}
                  height={60}
                  className="mx-auto"
                />
              </div>
              <h1 className="text-white text-2xl font-bold mb-2">Acceso Dashboard</h1>
              <p className="text-gray-400 text-sm">Ingresa tus credenciales para continuar</p>
            </div>

            {/* Form */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <form onSubmit={handleLogin} className="space-y-6">
                                  <div>
                    <label htmlFor="email" className="block text-white text-sm font-semibold mb-3">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0043ff] focus:border-transparent transition-all duration-300 hover:bg-white/15"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-white text-sm font-semibold mb-3">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0043ff] focus:border-transparent transition-all duration-300 hover:bg-white/15"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#0043ff] to-[#0043ff]/80 hover:from-[#0043ff]/90 hover:to-[#0043ff]/70 disabled:from-[#0043ff]/50 disabled:to-[#0043ff]/30 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0043ff] focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-[1.02] disabled:transform-none"
                >
                  {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>
              </form>
            </div>

            <div className="text-center mt-6">
              <p className="text-gray-400 text-sm">
                ¿Problemas para acceder?{' '}
                <a href="#" className="text-[#0043ff] hover:text-[#0043ff]/80 transition-colors">
                  Contacta soporte
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
