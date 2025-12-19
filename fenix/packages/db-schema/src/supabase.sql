-- Enable PostGIS for future map features (Optional but good for bleeding edge)
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. Beneficiarios (Source of Truth: Carga Masiva Excel)
CREATE TABLE public.beneficiaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    excel_id TEXT UNIQUE NOT NULL, -- ID from the Excel row (NIUP or internal code)
    full_name TEXT NOT NULL,
    document_id TEXT NOT NULL,
    group_type TEXT NOT NULL, -- 'Gestante', 'Lactante', 'Niño 1-3'
    zone TEXT NOT NULL,
    center_name TEXT NOT NULL,
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Entregas (Delivery Orders)
CREATE TABLE public.deliveries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    beneficiary_id UUID REFERENCES public.beneficiaries(id) NOT NULL,
    campaign_month TEXT NOT NULL, -- 'JULIO-2025'
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'delivered', 'synced'
    
    -- Evidence
    evidence_photo_url TEXT,
    gps_lat DOUBLE PRECISION,
    gps_lng DOUBLE PRECISION,
    delivery_date TIMESTAMPTZ,
    
    -- Sync Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Row Level Security (RLS) Policies
ALTER TABLE public.beneficiaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deliveries ENABLE ROW LEVEL SECURITY;

-- Allow read access to authenticated users
CREATE POLICY "Allow read access" ON public.beneficiaries FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow read access" ON public.deliveries FOR SELECT USING (auth.role() = 'authenticated');

-- Allow insert/update for deliveries (Synced from App)
CREATE POLICY "Allow insert deliveries" ON public.deliveries FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow update deliveries" ON public.deliveries FOR UPDATE USING (auth.role() = 'authenticated');
