export default function TestPage() {
  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          ¡Tailwind CSS está funcionando!
        </h1>
        <p className="text-gray-700">
          Si ves este texto en blanco con fondo rojo, Tailwind está funcionando correctamente.
        </p>
        <div className="mt-4 p-4 bg-blue-100 rounded">
          <p className="text-blue-800">
            Esta es una prueba de que las clases de Tailwind se están aplicando.
          </p>
        </div>
      </div>
    </div>
  )
}
