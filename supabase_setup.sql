-- Supabase SQL Schema for Ilanthoodhu Admin Dashboard

-- 1. Create Tables

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

-- Gallery Table
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    file_name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Settings Table (Key-Value store or single row)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_name TEXT DEFAULT 'Ilanthoodhu',
    contact_email TEXT DEFAULT 'illanthoodhu32@gmail.com',
    site_description TEXT DEFAULT 'Ilanthoodhu student literary magazine official website.',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);


-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;


-- 3. Create RLS Policies

-- For Notices: Anyone can read, only authenticated users (admins) can modify
CREATE POLICY "Allow public read access for notices" ON public.notices FOR SELECT USING (true);
CREATE POLICY "Allow admin insert for notices" ON public.notices FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin update for notices" ON public.notices FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin delete for notices" ON public.notices FOR DELETE USING (auth.role() = 'authenticated');

-- For Articles: Anyone can read, only authenticated users (admins) can modify
CREATE POLICY "Allow public read access for articles" ON public.articles FOR SELECT USING (true);
CREATE POLICY "Allow admin insert for articles" ON public.articles FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin update for articles" ON public.articles FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin delete for articles" ON public.articles FOR DELETE USING (auth.role() = 'authenticated');

-- For Gallery: Anyone can read, only authenticated users (admins) can modify
CREATE POLICY "Allow public read access for gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Allow admin insert for gallery" ON public.gallery FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin update for gallery" ON public.gallery FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin delete for gallery" ON public.gallery FOR DELETE USING (auth.role() = 'authenticated');

-- For Settings: Anyone can read, only authenticated users (admins) can modify
CREATE POLICY "Allow public read access for settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow admin insert for settings" ON public.site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow admin update for settings" ON public.site_settings FOR UPDATE USING (auth.role() = 'authenticated');


-- 4. Set up Realtime (Optional, if you want real-time dashboard updates)
alter publication supabase_realtime add table notices;
alter publication supabase_realtime add table articles;
alter publication supabase_realtime add table gallery;


-- 5. Insert Default Settings Row
INSERT INTO public.site_settings (site_name, contact_email, site_description)
VALUES ('Ilanthoodhu', 'illanthoodhu32@gmail.com', 'Ilanthoodhu student literary magazine official website.')
ON CONFLICT DO NOTHING;
