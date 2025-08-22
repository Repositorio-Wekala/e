# Linktree EME

Estrategia que escala. Tecnología que optimiza. Resultados que venden.

## Configuración de Supabase

Para configurar Supabase en este proyecto:

1. **Crea un archivo `.env.local`** en la raíz del proyecto con las siguientes variables:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_clave_de_servicio_de_supabase
```

2. **Obtén las credenciales de Supabase:**
   - Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
   - Settings > API
   - Copia la URL del proyecto y la anon key
   - Para la service role key, ve a Settings > API > Project API keys

3. **Instala las dependencias:**
```bash
npm install
```

4. **Ejecuta el proyecto:**
```bash
npm run dev
```

## Estructura de Supabase

El proyecto incluye:

- `src/lib/supabase.ts` - Cliente principal de Supabase
- `src/lib/supabase-admin.ts` - Cliente de administración para operaciones del servidor
- `src/hooks/useSupabase.ts` - Hook personalizado para autenticación
- `src/components/SupabaseProvider.tsx` - Provider de contexto para Supabase

## Uso

Para usar Supabase en cualquier componente:

```tsx
import { useSupabaseContext } from '@/components/SupabaseProvider'

export default function MiComponente() {
  const { user, session, loading, supabase } = useSupabaseContext()
  
  // Tu código aquí
}
```
# e
