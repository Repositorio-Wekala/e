-- =====================================================
-- CORRECCIÓN DE POLÍTICAS DE SEGURIDAD (RLS)
-- =====================================================

-- Primero, deshabilitar RLS temporalmente para testing
ALTER TABLE home_buttons DISABLE ROW LEVEL SECURITY;
ALTER TABLE services DISABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps DISABLE ROW LEVEL SECURITY;
ALTER TABLE pages DISABLE ROW LEVEL SECURITY;
ALTER TABLE editable_content DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_config DISABLE ROW LEVEL SECURITY;

-- O si prefieres mantener RLS, usar estas políticas más permisivas:

-- Eliminar políticas existentes
DROP POLICY IF EXISTS "Public read access" ON home_buttons;
DROP POLICY IF EXISTS "Admin full access" ON home_buttons;

-- Crear políticas más permisivas para testing
CREATE POLICY "Allow all operations" ON home_buttons FOR ALL USING (true) WITH CHECK (true);

-- Hacer lo mismo para las otras tablas
DROP POLICY IF EXISTS "Public read access" ON services;
DROP POLICY IF EXISTS "Admin full access" ON services;
CREATE POLICY "Allow all operations" ON services FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read access" ON process_steps;
DROP POLICY IF EXISTS "Admin full access" ON process_steps;
CREATE POLICY "Allow all operations" ON process_steps FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read access" ON pages;
DROP POLICY IF EXISTS "Admin full access" ON pages;
CREATE POLICY "Allow all operations" ON pages FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read access" ON editable_content;
DROP POLICY IF EXISTS "Admin full access" ON editable_content;
CREATE POLICY "Allow all operations" ON editable_content FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public read access" ON site_config;
DROP POLICY IF EXISTS "Admin full access" ON site_config;
CREATE POLICY "Allow all operations" ON site_config FOR ALL USING (true) WITH CHECK (true);

-- Verificar que las políticas se aplicaron correctamente
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename IN ('home_buttons', 'services', 'process_steps', 'pages', 'editable_content', 'site_config');
