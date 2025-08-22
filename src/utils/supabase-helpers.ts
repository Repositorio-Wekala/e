import { supabase } from '@/lib/supabase'

// Helper para subir archivos a Supabase Storage
export async function uploadFile(
  bucket: string,
  path: string,
  file: File
): Promise<{ data: any; error: any }> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    })
  
  return { data, error }
}

// Helper para obtener URL pública de un archivo
export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  
  return data.publicUrl
}

// Helper para eliminar archivo
export async function deleteFile(
  bucket: string,
  path: string
): Promise<{ data: any; error: any }> {
  const { data, error } = await supabase.storage
    .from(bucket)
    .remove([path])
  
  return { data, error }
}

// Helper para manejar errores de Supabase
export function handleSupabaseError(error: any): string {
  if (error?.message) {
    return error.message
  }
  
  if (error?.error_description) {
    return error.error_description
  }
  
  return 'Ha ocurrido un error inesperado'
}

// Helper para validar email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
