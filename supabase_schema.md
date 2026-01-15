```sql
CREATE TABLE public.articles (
    id UUID DEFAULT gen_random_uuid() NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    CONSTRAINT articles_pkey PRIMARY KEY (id)
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.articles
FOR SELECT USING (TRUE);

CREATE POLICY "Enable insert for authenticated users only" ON public.articles
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for users based on id" ON public.articles
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for users based on id" ON public.articles
FOR DELETE USING (auth.role() = 'authenticated');

-- Function to update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update 'updated_at' on each update
CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```