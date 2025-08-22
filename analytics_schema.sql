-- =====================================================
-- ESQUEMA DE ANALYTICS PARA PROYECTO E-ME
-- =====================================================

-- =====================================================
-- TABLA: SESIONES DE USUARIO
-- =====================================================
CREATE TABLE IF NOT EXISTS user_sessions (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) UNIQUE NOT NULL,
  user_agent TEXT,
  ip_address INET,
  page_url VARCHAR(500) NOT NULL,
  referrer VARCHAR(500),
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER DEFAULT 0,
  is_bounce BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLA: EVENTOS DE PÁGINA
-- =====================================================
CREATE TABLE IF NOT EXISTS page_events (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  event_type VARCHAR(50) NOT NULL, -- 'page_view', 'click', 'conversion', 'edit_save'
  page_url VARCHAR(500) NOT NULL,
  element_id VARCHAR(255),
  element_text TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLA: MÉTRICAS DIARIAS (agregadas)
-- =====================================================
CREATE TABLE IF NOT EXISTS daily_metrics (
  id SERIAL PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  total_visits INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  total_page_views INTEGER DEFAULT 0,
  total_conversions INTEGER DEFAULT 0,
  total_edits INTEGER DEFAULT 0,
  avg_session_duration DECIMAL(10,2) DEFAULT 0,
  bounce_rate DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLA: MÉTRICAS POR PÁGINA
-- =====================================================
CREATE TABLE IF NOT EXISTS page_metrics (
  id SERIAL PRIMARY KEY,
  page_url VARCHAR(500) NOT NULL,
  date DATE NOT NULL,
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  avg_time_on_page DECIMAL(10,2) DEFAULT 0,
  bounce_rate DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(page_url, date)
);

-- =====================================================
-- TABLA: FUENTES DE TRÁFICO
-- =====================================================
CREATE TABLE IF NOT EXISTS traffic_sources (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  source VARCHAR(100) NOT NULL, -- 'direct', 'social', 'search', 'referral'
  visits INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(date, source)
);

-- =====================================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- =====================================================

-- Índices para user_sessions
CREATE INDEX IF NOT EXISTS idx_user_sessions_session_id ON user_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_started_at ON user_sessions(started_at);
CREATE INDEX IF NOT EXISTS idx_user_sessions_date ON user_sessions(DATE(started_at));

-- Índices para page_events
CREATE INDEX IF NOT EXISTS idx_page_events_session_id ON page_events(session_id);
CREATE INDEX IF NOT EXISTS idx_page_events_event_type ON page_events(event_type);
CREATE INDEX IF NOT EXISTS idx_page_events_created_at ON page_events(created_at);
CREATE INDEX IF NOT EXISTS idx_page_events_date ON page_events(DATE(created_at));

-- Índices para daily_metrics
CREATE INDEX IF NOT EXISTS idx_daily_metrics_date ON daily_metrics(date);

-- Índices para page_metrics
CREATE INDEX IF NOT EXISTS idx_page_metrics_page_url ON page_metrics(page_url);
CREATE INDEX IF NOT EXISTS idx_page_metrics_date ON page_metrics(date);
CREATE INDEX IF NOT EXISTS idx_page_metrics_url_date ON page_metrics(page_url, date);

-- Índices para traffic_sources
CREATE INDEX IF NOT EXISTS idx_traffic_sources_date ON traffic_sources(date);
CREATE INDEX IF NOT EXISTS idx_traffic_sources_source ON traffic_sources(source);

-- =====================================================
-- FUNCIONES PARA ACTUALIZAR MÉTRICAS
-- =====================================================

-- Función para actualizar métricas diarias
CREATE OR REPLACE FUNCTION update_daily_metrics()
RETURNS TRIGGER AS $$
BEGIN
  -- Insertar o actualizar métricas del día
  INSERT INTO daily_metrics (
    date, 
    total_visits, 
    unique_visitors, 
    total_page_views, 
    total_conversions,
    total_edits,
    avg_session_duration,
    bounce_rate
  )
  VALUES (
    DATE(NEW.created_at),
    (SELECT COUNT(DISTINCT session_id) FROM user_sessions WHERE DATE(started_at) = DATE(NEW.created_at)),
    (SELECT COUNT(DISTINCT ip_address) FROM user_sessions WHERE DATE(started_at) = DATE(NEW.created_at)),
    (SELECT COUNT(*) FROM page_events WHERE event_type = 'page_view' AND DATE(created_at) = DATE(NEW.created_at)),
    (SELECT COUNT(*) FROM page_events WHERE event_type = 'conversion' AND DATE(created_at) = DATE(NEW.created_at)),
    (SELECT COUNT(*) FROM page_events WHERE event_type = 'edit_save' AND DATE(created_at) = DATE(NEW.created_at)),
    (SELECT COALESCE(AVG(duration_seconds), 0) FROM user_sessions WHERE DATE(started_at) = DATE(NEW.created_at)),
    (SELECT COALESCE(
      (COUNT(*) FILTER (WHERE is_bounce = true) * 100.0 / COUNT(*)), 0
    ) FROM user_sessions WHERE DATE(started_at) = DATE(NEW.created_at))
  )
  ON CONFLICT (date) DO UPDATE SET
    total_visits = EXCLUDED.total_visits,
    unique_visitors = EXCLUDED.unique_visitors,
    total_page_views = EXCLUDED.total_page_views,
    total_conversions = EXCLUDED.total_conversions,
    total_edits = EXCLUDED.total_edits,
    avg_session_duration = EXCLUDED.avg_session_duration,
    bounce_rate = EXCLUDED.bounce_rate,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Función para actualizar métricas por página
CREATE OR REPLACE FUNCTION update_page_metrics()
RETURNS TRIGGER AS $$
BEGIN
  -- Insertar o actualizar métricas de la página
  INSERT INTO page_metrics (
    page_url,
    date,
    page_views,
    unique_visitors,
    avg_time_on_page,
    bounce_rate
  )
  VALUES (
    NEW.page_url,
    DATE(NEW.created_at),
    (SELECT COUNT(*) FROM page_events WHERE page_url = NEW.page_url AND event_type = 'page_view' AND DATE(created_at) = DATE(NEW.created_at)),
    (SELECT COUNT(DISTINCT session_id) FROM page_events WHERE page_url = NEW.page_url AND event_type = 'page_view' AND DATE(created_at) = DATE(NEW.created_at)),
    0, -- TODO: Calcular tiempo promedio en página
    0  -- TODO: Calcular tasa de rebote por página
  )
  ON CONFLICT (page_url, date) DO UPDATE SET
    page_views = EXCLUDED.page_views,
    unique_visitors = EXCLUDED.unique_visitors,
    updated_at = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGERS PARA ACTUALIZACIÓN AUTOMÁTICA
-- =====================================================

-- Trigger para actualizar métricas diarias cuando se crea una sesión
DROP TRIGGER IF EXISTS trigger_update_daily_metrics_session ON user_sessions;
CREATE TRIGGER trigger_update_daily_metrics_session
  AFTER INSERT ON user_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_daily_metrics();

-- Trigger para actualizar métricas diarias cuando se crea un evento
DROP TRIGGER IF EXISTS trigger_update_daily_metrics_event ON page_events;
CREATE TRIGGER trigger_update_daily_metrics_event
  AFTER INSERT ON page_events
  FOR EACH ROW
  EXECUTE FUNCTION update_daily_metrics();

-- Trigger para actualizar métricas por página cuando se crea un evento
DROP TRIGGER IF EXISTS trigger_update_page_metrics ON page_events;
CREATE TRIGGER trigger_update_page_metrics
  AFTER INSERT ON page_events
  FOR EACH ROW
  EXECUTE FUNCTION update_page_metrics();

-- =====================================================
-- POLÍTICAS DE SEGURIDAD (RLS)
-- =====================================================

-- Habilitar RLS en todas las tablas de analytics
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE traffic_sources ENABLE ROW LEVEL SECURITY;

-- Políticas para lectura de analytics (solo admins)
DROP POLICY IF EXISTS "Admin analytics read access" ON user_sessions;
CREATE POLICY "Admin analytics read access" ON user_sessions FOR SELECT USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admin analytics read access" ON page_events;
CREATE POLICY "Admin analytics read access" ON page_events FOR SELECT USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admin analytics read access" ON daily_metrics;
CREATE POLICY "Admin analytics read access" ON daily_metrics FOR SELECT USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admin analytics read access" ON page_metrics;
CREATE POLICY "Admin analytics read access" ON page_metrics FOR SELECT USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admin analytics read access" ON traffic_sources;
CREATE POLICY "Admin analytics read access" ON traffic_sources FOR SELECT USING (auth.role() = 'authenticated');

-- Políticas para escritura de analytics (público para tracking)
DROP POLICY IF EXISTS "Public analytics write access" ON user_sessions;
CREATE POLICY "Public analytics write access" ON user_sessions FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Public analytics write access" ON page_events;
CREATE POLICY "Public analytics write access" ON page_events FOR INSERT WITH CHECK (true);

-- Políticas para actualización de analytics (solo admins)
DROP POLICY IF EXISTS "Admin analytics update access" ON user_sessions;
CREATE POLICY "Admin analytics update access" ON user_sessions FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admin analytics update access" ON daily_metrics;
CREATE POLICY "Admin analytics update access" ON daily_metrics FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admin analytics update access" ON page_metrics;
CREATE POLICY "Admin analytics update access" ON page_metrics FOR UPDATE USING (auth.role() = 'authenticated');
DROP POLICY IF EXISTS "Admin analytics update access" ON traffic_sources;
CREATE POLICY "Admin analytics update access" ON traffic_sources FOR UPDATE USING (auth.role() = 'authenticated');

-- =====================================================
-- DATOS DE EJEMPLO PARA PRUEBAS
-- =====================================================

-- Insertar algunas sesiones de ejemplo para hoy
INSERT INTO user_sessions (session_id, page_url, ip_address, is_bounce) VALUES
  ('session_1_' || EXTRACT(EPOCH FROM NOW())::TEXT, '/', '192.168.1.1', false),
  ('session_2_' || EXTRACT(EPOCH FROM NOW())::TEXT, '/estrategias', '192.168.1.2', false),
  ('session_3_' || EXTRACT(EPOCH FROM NOW())::TEXT, '/consultoria', '192.168.1.3', true),
  ('session_4_' || EXTRACT(EPOCH FROM NOW())::TEXT, '/ads', '192.168.1.4', false),
  ('session_5_' || EXTRACT(EPOCH FROM NOW())::TEXT, '/', '192.168.1.5', false);

-- Insertar eventos de ejemplo
INSERT INTO page_events (session_id, event_type, page_url, element_text) VALUES
  ('session_1_' || EXTRACT(EPOCH FROM NOW())::TEXT, 'page_view', '/', 'Página Principal'),
  ('session_1_' || EXTRACT(EPOCH FROM NOW())::TEXT, 'click', '/', 'Estrategias de Crecimiento'),
  ('session_2_' || EXTRACT(EPOCH FROM NOW())::TEXT, 'page_view', '/estrategias', 'Estrategias'),
  ('session_2_' || EXTRACT(EPOCH FROM NOW())::TEXT, 'conversion', '/estrategias', 'Formulario de contacto'),
  ('session_3_' || EXTRACT(EPOCH FROM NOW())::TEXT, 'page_view', '/consultoria', 'Consultoría'),
  ('session_4_' || EXTRACT(EPOCH FROM NOW())::TEXT, 'page_view', '/ads', 'Ads'),
  ('session_4_' || EXTRACT(EPOCH FROM NOW())::TEXT, 'click', '/ads', 'Solicitar cotización'),
  ('session_5_' || EXTRACT(EPOCH FROM NOW())::TEXT, 'page_view', '/', 'Página Principal'),
  ('session_5_' || EXTRACT(EPOCH FROM NOW())::TEXT, 'edit_save', '/', 'Guardar cambios');

-- =====================================================
-- COMENTARIOS PARA DOCUMENTACIÓN
-- =====================================================

COMMENT ON TABLE user_sessions IS 'Sesiones de usuario para tracking de analytics';
COMMENT ON TABLE page_events IS 'Eventos de página (page_view, click, conversion, etc.)';
COMMENT ON TABLE daily_metrics IS 'Métricas agregadas por día';
COMMENT ON TABLE page_metrics IS 'Métricas por página específica';
COMMENT ON TABLE traffic_sources IS 'Fuentes de tráfico y su rendimiento';

-- =====================================================
-- FIN DEL ESQUEMA DE ANALYTICS
-- =====================================================
