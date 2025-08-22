-- =====================================================
-- ESQUEMA DE BASE DE DATOS PARA PROYECTO E-ME
-- =====================================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLA: USUARIOS (para autenticación)
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLA: BOTONES DE LA PÁGINA PRINCIPAL
-- =====================================================
CREATE TABLE IF NOT EXISTS home_buttons (
  id SERIAL PRIMARY KEY,
  text VARCHAR(255) NOT NULL,
  href VARCHAR(500) NOT NULL,
  icon VARCHAR(50) NOT NULL,
  color VARCHAR(50) NOT NULL DEFAULT 'blue',
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLA: SERVICIOS
-- =====================================================
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(50) NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLA: PROCESOS/PASOS
-- =====================================================
CREATE TABLE IF NOT EXISTS process_steps (
  id SERIAL PRIMARY KEY,
  step_number VARCHAR(10) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLA: PÁGINAS DEL SITIO
-- =====================================================
CREATE TABLE IF NOT EXISTS pages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content JSONB,
  status VARCHAR(50) DEFAULT 'draft',
  is_system_page BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLA: CONTENIDO EDITABLE (para el editor visual)
-- =====================================================
CREATE TABLE IF NOT EXISTS editable_content (
  id SERIAL PRIMARY KEY,
  page_id INTEGER REFERENCES pages(id) ON DELETE CASCADE,
  element_id VARCHAR(255) NOT NULL,
  content_type VARCHAR(50) NOT NULL, -- 'text', 'image', 'link', etc.
  content TEXT,
  styles JSONB,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLA: CONFIGURACIÓN DEL SITIO
-- =====================================================
CREATE TABLE IF NOT EXISTS site_config (
  id SERIAL PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLA: ESTADÍSTICAS Y MÉTRICAS
-- =====================================================
CREATE TABLE IF NOT EXISTS analytics (
  id SERIAL PRIMARY KEY,
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INSERTAR DATOS INICIALES
-- =====================================================

-- Insertar botones de la página principal
INSERT INTO home_buttons (text, href, icon, color, order_index) VALUES
  ('Estrategias de Crecimiento', '/estrategias', '🚀', 'blue', 1),
  ('AchieveApex: AI & Automatizaciones Inteligentes', '#', '🤖', 'purple', 2),
  ('Desarrollo de Software Personalizado', '#', '💻', 'green', 3),
  ('Landing pages con AI', '#', '🎯', 'orange', 4),
  ('Marketing digital', '#', '📈', 'red', 5),
  ('AI Content', '#', '✍️', 'pink', 6),
  ('Ad managment', '#', '📊', 'yellow', 7),
  ('Branding', '#', '🎨', 'indigo', 8),
  ('Consultoría', '#', '💼', 'teal', 9);

-- Insertar servicios
INSERT INTO services (title, description, icon, order_index) VALUES
  ('Estrategias de Crecimiento', 'Desarrollamos estrategias personalizadas que impulsan el crecimiento de tu negocio.', '🚀', 1),
  ('Desarrollo de Software', 'Creamos soluciones tecnológicas a medida para optimizar tus procesos.', '💻', 2),
  ('Marketing Digital', 'Implementamos estrategias de marketing digital efectivas y medibles.', '📈', 3);

-- Insertar pasos del proceso
INSERT INTO process_steps (step_number, title, description, order_index) VALUES
  ('01', 'Análisis', 'Evaluamos tu negocio y objetivos para crear una estrategia personalizada.', 1),
  ('02', 'Estrategia', 'Desarrollamos un plan detallado con acciones específicas y métricas claras.', 2),
  ('03', 'Implementación', 'Ejecutamos la estrategia con seguimiento continuo y optimizaciones.', 3);

-- Insertar páginas del sistema
INSERT INTO pages (name, slug, status, is_system_page) VALUES
  ('Página Principal', '/', 'published', true),
  ('Estrategias', '/estrategias', 'published', true),
  ('Admin', '/admin', 'published', true),
  ('Acceso Dashboard', '/acceso-dashboard', 'published', true);

-- Insertar configuración inicial del sitio
INSERT INTO site_config (key, value, description) VALUES
  ('site_title', 'esme - Estrategia que escala', 'Título principal del sitio'),
  ('site_description', 'Estrategia que escala. Tecnología que optimiza. Resultados que venden.', 'Descripción del sitio'),
  ('contact_email', 'info@e-me.co', 'Email de contacto'),
  ('whatsapp_number', '+573001234567', 'Número de WhatsApp para contacto');

-- =====================================================
-- CREAR ÍNDICES PARA OPTIMIZACIÓN
-- =====================================================

-- Índices para home_buttons
CREATE INDEX idx_home_buttons_order ON home_buttons(order_index);
CREATE INDEX idx_home_buttons_active ON home_buttons(is_active);

-- Índices para services
CREATE INDEX idx_services_order ON services(order_index);
CREATE INDEX idx_services_active ON services(is_active);

-- Índices para process_steps
CREATE INDEX idx_process_steps_order ON process_steps(order_index);
CREATE INDEX idx_process_steps_active ON process_steps(is_active);

-- Índices para pages
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_status ON pages(status);
CREATE INDEX idx_pages_system ON pages(is_system_page);

-- Índices para editable_content
CREATE INDEX idx_editable_content_page ON editable_content(page_id);
CREATE INDEX idx_editable_content_element ON editable_content(element_id);

-- Índices para analytics
CREATE INDEX idx_analytics_date ON analytics(date);

-- =====================================================
-- FUNCIONES Y TRIGGERS
-- =====================================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_home_buttons_updated_at BEFORE UPDATE ON home_buttons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_process_steps_updated_at BEFORE UPDATE ON process_steps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_editable_content_updated_at BEFORE UPDATE ON editable_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_config_updated_at BEFORE UPDATE ON site_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- POLÍTICAS DE SEGURIDAD (RLS - Row Level Security)
-- =====================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE home_buttons ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE editable_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Políticas para lectura pública (contenido del sitio)
CREATE POLICY "Public read access" ON home_buttons FOR SELECT USING (true);
CREATE POLICY "Public read access" ON services FOR SELECT USING (true);
CREATE POLICY "Public read access" ON process_steps FOR SELECT USING (true);
CREATE POLICY "Public read access" ON pages FOR SELECT USING (true);
CREATE POLICY "Public read access" ON site_config FOR SELECT USING (true);

-- Políticas para administradores (CRUD completo)
CREATE POLICY "Admin full access" ON home_buttons FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON process_steps FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON pages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON editable_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access" ON site_config FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para analytics (solo lectura para admins)
CREATE POLICY "Admin read access" ON analytics FOR SELECT USING (auth.role() = 'authenticated');

-- =====================================================
-- COMENTARIOS PARA DOCUMENTACIÓN
-- =====================================================

COMMENT ON TABLE users IS 'Tabla de usuarios del sistema de administración';
COMMENT ON TABLE home_buttons IS 'Botones de la página principal del sitio';
COMMENT ON TABLE services IS 'Servicios ofrecidos por la empresa';
COMMENT ON TABLE process_steps IS 'Pasos del proceso de trabajo';
COMMENT ON TABLE pages IS 'Páginas del sitio web';
COMMENT ON TABLE editable_content IS 'Contenido editable para el editor visual';
COMMENT ON TABLE site_config IS 'Configuración general del sitio';
COMMENT ON TABLE analytics IS 'Estadísticas y métricas del sitio';

-- =====================================================
-- FIN DEL ESQUEMA
-- =====================================================
