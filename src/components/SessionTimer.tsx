import { useState, useEffect } from 'react'
import { FiClock, FiRefreshCw, FiLogOut } from 'react-icons/fi'

interface SessionTimerProps {
  timeRemaining: number // tiempo en segundos
  onExtend: () => void
  onLogout: () => void
}

export default function SessionTimer({ timeRemaining, onExtend, onLogout }: SessionTimerProps) {
  const [timeLeft, setTimeLeft] = useState(timeRemaining)
  const [isWarning, setIsWarning] = useState(false)

  // Actualizar el tiempo restante cada segundo
  useEffect(() => {
    setTimeLeft(timeRemaining)
  }, [timeRemaining])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1
        // Mostrar advertencia cuando queden menos de 5 minutos
        setIsWarning(newTime <= 300)
        return newTime
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Formatear tiempo en formato MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Calcular porcentaje de tiempo restante (asumiendo 1 hora = 3600 segundos)
  const timePercentage = Math.max(0, (timeLeft / 3600) * 100)

  // Determinar color basado en el tiempo restante
  const getTimeColor = () => {
    if (timeLeft <= 300) return 'text-red-600' // 5 minutos o menos
    if (timeLeft <= 900) return 'text-orange-600' // 15 minutos o menos
    return 'text-gray-700'
  }

  const getProgressColor = () => {
    if (timeLeft <= 300) return 'bg-red-500' // 5 minutos o menos
    if (timeLeft <= 900) return 'bg-orange-500' // 15 minutos o menos
    return 'bg-blue-500'
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      {/* Header del timer */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <FiClock className={`w-4 h-4 ${getTimeColor()}`} />
          <span className="text-sm font-medium text-gray-700">Sesión activa</span>
        </div>
        {isWarning && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-red-600 font-medium">¡Sesión expirando!</span>
          </div>
        )}
      </div>

      {/* Timer principal */}
      <div className="text-center mb-4">
        <div className={`text-2xl font-bold ${getTimeColor()} mb-1`}>
          {formatTime(timeLeft)}
        </div>
        <div className="text-xs text-gray-500">
          {timeLeft > 0 ? 'Tiempo restante' : 'Sesión expirada'}
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
          style={{ width: `${timePercentage}%` }}
        ></div>
      </div>

      {/* Botones de acción */}
      <div className="flex space-x-2">
        <button
          onClick={onExtend}
          className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors duration-200"
          title="Extender sesión"
        >
          <FiRefreshCw className="w-4 h-4" />
          <span>Extender</span>
        </button>
        
        <button
          onClick={onLogout}
          className="flex items-center justify-center px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded-lg transition-colors duration-200"
          title="Cerrar sesión"
        >
          <FiLogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Mensaje de advertencia */}
      {isWarning && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-xs text-red-700 text-center">
            Tu sesión expirará pronto. Haz clic en "Extender" para continuar.
          </p>
        </div>
      )}
    </div>
  )
}
