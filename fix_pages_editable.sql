-- =====================================================
-- CORRECCIÓN DE PÁGINAS EDITABLES
-- =====================================================

-- Verificar el estado actual de las páginas
SELECT id, name, slug, is_system_page, status FROM pages ORDER BY id;

-- Actualizar la página de Estrategias para que sea editable
UPDATE pages 
SET is_system_page = false 
WHERE slug = '/estrategias';

-- Verificar el resultado
SELECT id, name, slug, is_system_page, status FROM pages ORDER BY id;

-- Comentario: 
-- - Página Principal (/) = is_system_page = true (se edita en su módulo)
-- - Estrategias (/estrategias) = is_system_page = false (editable en Constructor Visual)
-- - Admin (/admin) = is_system_page = true (página del sistema)
-- - Acceso Dashboard (/acceso-dashboard) = is_system_page = true (página del sistema)
