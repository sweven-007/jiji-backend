
CREATE TABLE resources (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    title text NOT NULL,
    type text CHECK (type IN ('ppt', 'video', 'pdf')),
    url text NOT NULL
);


CREATE TABLE queries (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT now(),
    query_text text NOT NULL,
    response_text text NOT NULL
);


ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE queries ENABLE ROW LEVEL SECURITY;


CREATE POLICY "Enable read access for all users" 
ON resources FOR SELECT 
USING (true);


CREATE POLICY "Enable insert for all users" 
ON queries FOR INSERT 
WITH CHECK (true);