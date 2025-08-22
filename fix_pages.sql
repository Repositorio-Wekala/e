-- =====================================================
-- SCRIPT PARA VERIFICAR Y CORREGIR PÁGINAS
-- =====================================================

-- Verificar qué páginas existen actualmente
SELECT 
    id,
    name,
    slug,
    status,
    is_system_page,
    created_at,
    updated_at
FROM pages 
ORDER BY created_at;

-- Insertar páginas que faltan (solo si no existen)
INSERT INTO pages (name, slug, status, is_system_page) VALUES
  ('Página Principal', '/', 'published', true),
  ('Estrategias', '/estrategias', 'published', true),
  ('Admin', '/admin', 'published', true),
  ('Acceso Dashboard', '/acceso-dashboard', 'published', true),
  ('Achieve Apex AI', '/achieve-apex-ai', 'published', false),
  ('Consultoría', '/consultoria', 'published', false),
  ('Ads', '/ads', 'published', false),
  ('Desarrollo', '/desarrollo', 'published', false),
  ('Desarrollo de Software', '/desarrollo-de-software', 'published', false),
  ('AI Content', '/ai-content', 'published', false)
ON CONFLICT (slug) DO NOTHING;

-- Actualizar páginas existentes para asegurar que tengan el estado correcto
UPDATE pages SET 
    is_system_page = true,
    status = 'published'
WHERE slug IN ('/', '/estrategias', '/admin', '/acceso-dashboard');

UPDATE pages SET 
    is_system_page = false,
    status = 'published'
WHERE slug IN ('/achieve-apex-ai', '/consultoria', '/ads', '/desarrollo', '/desarrollo-de-software', '/ai-content');

-- Verificar el resultado final
SELECT 
    id,
    name,
    slug,
    status,
    is_system_page,
    CASE 
        WHEN is_system_page = true THEN 'Sistema (no editable)'
        ELSE 'Personalizada (editable)'
    END as tipo_pagina
FROM pages 
ORDER BY is_system_page DESC, name;
