-- =====================================================
-- ANALYTICS SIMPLE PARA SUPABASE
-- =====================================================

-- Crear tabla de sesiones
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

-- Crear tabla de eventos
CREATE TABLE IF NOT EXISTS page_events (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    page_url VARCHAR(500) NOT NULL,
    element_id VARCHAR(255),
    element_text TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de métricas diarias
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

-- Crear índices básicos
CREATE INDEX IF NOT EXISTS idx_user_sessions_session_id ON user_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_page_events_session_id ON page_events(session_id);
CREATE INDEX IF NOT EXISTS idx_page_events_event_type ON page_events(event_type);
CREATE INDEX IF NOT EXISTS idx_daily_metrics_date ON daily_metrics(date);

-- Habilitar RLS
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;

-- Políticas para lectura (solo admins)
CREATE POLICY "Admin analytics read access" ON user_sessions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin analytics read access" ON page_events FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin analytics read access" ON daily_metrics FOR SELECT USING (auth.role() = 'authenticated');

-- Políticas para escritura (público)
CREATE POLICY "Public analytics write access" ON user_sessions FOR INSERT WITH CHECK (true);
CREATE POLICY "Public analytics write access" ON page_events FOR INSERT WITH CHECK (true);

-- Insertar datos de ejemplo
INSERT INTO user_sessions (session_id, page_url, ip_address, is_bounce) VALUES
  ('session_1_' || EXTRACT(EPOCH FROM NOW())::TEXT, '/', '192.168.1.1', false),
  ('session_2_' || EXTRACT(EPOCH FROM NOW())::TEXT, '/estrategias', '192.168.1.2', false),
  ('session_3_' || EXTRACT(EPOCH FROM NOW())::TEXT, '/consultoria', '192.168.1.3', true),
  ('session_4_' || EXTRACT(EPOCH FROM NOW())::TEXT, '/ads', '192.168.1.4', false),
  ('session_5_' || EXTRACT(EPOCH FROM NOW())::TEXT, '/', '192.168.1.5', false);

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

-- Insertar métricas de hoy (solo si no existe)
INSERT INTO daily_metrics (date, total_visits, unique_visitors, total_page_views, total_conversions, total_edits, avg_session_duration, bounce_rate) VALUES
  (CURRENT_DATE, 5, 5, 9, 1, 1, 120.5, 20.0)
ON CONFLICT (date) DO NOTHING;
