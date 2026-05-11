-- =========================================================
-- ILANTHOODHU MASTER DATABASE SETUP
-- =========================================================
-- Run this in your Supabase SQL Editor to set up everything.

-- 1. UTILS: Automatic Updated At Function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. TABLES

-- Notices Table
CREATE TABLE IF NOT EXISTS public.notices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Blog / Articles Table
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    author TEXT,
    category TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Gallery Table (Metadata)
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    file_name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_name TEXT DEFAULT 'Ilanthoodhu',
    contact_email TEXT DEFAULT 'illanthoodhu32@gmail.com',
    site_description TEXT DEFAULT 'Ilanthoodhu student literary magazine official website.',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. TRIGGERS (Auto-update the updated_at column)
CREATE TRIGGER set_notices_updated_at BEFORE UPDATE ON public.notices FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_articles_updated_at BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER set_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 4. ENABLE RLS
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 5. POLICIES (Access Control)

-- Public can read everything
CREATE POLICY "Public Read Notices" ON public.notices FOR SELECT USING (true);
CREATE POLICY "Public Read Articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON public.site_settings FOR SELECT USING (true);

-- Only authenticated Admins can write
CREATE POLICY "Admin All Notices" ON public.notices FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Articles" ON public.articles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Gallery" ON public.gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');

-- 6. STORAGE SETUP (For Image Uploads)
-- Create a 'gallery' bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
-- 1. Allow public to view images
CREATE POLICY "Public View Gallery Images" ON storage.objects FOR SELECT USING (bucket_id = 'gallery');

-- 2. Allow authenticated users to upload/delete images
CREATE POLICY "Admin Upload Gallery Images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'authenticated');
CREATE POLICY "Admin Delete Gallery Images" ON storage.objects FOR DELETE USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

-- 7. INITIAL DATA
INSERT INTO public.site_settings (site_name, contact_email, site_description)
VALUES ('Ilanthoodhu', 'illanthoodhu32@gmail.com', 'Ilanthoodhu student literary magazine official website.')
ON CONFLICT DO NOTHING;
