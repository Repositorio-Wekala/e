import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Suprimir errores de extensiones del navegador
  onDemandEntries: {
    // Período de tiempo en ms que una página debe estar inactiva antes de ser eliminada
    maxInactiveAge: 25 * 1000,
    // Número de páginas que deben mantenerse simultáneamente sin ser eliminadas
    pagesBufferLength: 2,
  },
  // Configuración para desarrollo
  webpack: (config, { dev }) => {
    if (dev) {
      // Suprimir errores de extensiones en desarrollo
      config.infrastructureLogging = {
        level: 'error',
      }
    }
    return config
  },
}

export default nextConfig
