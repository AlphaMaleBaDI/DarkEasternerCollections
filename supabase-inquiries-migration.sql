-- Create Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT,
  items JSONB NOT NULL,
  status TEXT DEFAULT 'pending',
  source TEXT DEFAULT 'whatsapp',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Drop old policies
DROP POLICY IF EXISTS "Anyone can insert inquiries" ON inquiries;
DROP POLICY IF EXISTS "Authenticated users can view inquiries" ON inquiries;
DROP POLICY IF EXISTS "Authenticated users can update inquiries" ON inquiries;
DROP POLICY IF EXISTS "Authenticated users can delete inquiries" ON inquiries;
DROP POLICY IF EXISTS "Admins can view inquiries" ON inquiries;
DROP POLICY IF EXISTS "Admins can update inquiries" ON inquiries;
DROP POLICY IF EXISTS "Admins can delete inquiries" ON inquiries;

-- Public insert (customers can submit inquiry)
CREATE POLICY "Anyone can insert inquiries"
ON inquiries
FOR INSERT
WITH CHECK (true);

-- Restricted read
CREATE POLICY "Authenticated users can view inquiries"
ON inquiries
FOR SELECT
USING (auth.role() = 'authenticated');

-- Restricted update
CREATE POLICY "Authenticated users can update inquiries"
ON inquiries
FOR UPDATE
USING (auth.role() = 'authenticated');

-- Restricted delete
CREATE POLICY "Authenticated users can delete inquiries"
ON inquiries
FOR DELETE
USING (auth.role() = 'authenticated');
