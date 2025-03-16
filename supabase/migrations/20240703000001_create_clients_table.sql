-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  country TEXT,
  company TEXT,
  industry TEXT,
  notes TEXT,
  status TEXT DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id),
  assigned_to UUID REFERENCES users(id)
);

-- Enable row level security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view clients
DROP POLICY IF EXISTS "Users can view clients" ON clients;
CREATE POLICY "Users can view clients"
  ON clients FOR SELECT
  USING (true);

-- Create policy for users to insert clients
DROP POLICY IF EXISTS "Users can insert clients" ON clients;
CREATE POLICY "Users can insert clients"
  ON clients FOR INSERT
  WITH CHECK (true);

-- Create policy for users to update clients
DROP POLICY IF EXISTS "Users can update clients" ON clients;
CREATE POLICY "Users can update clients"
  ON clients FOR UPDATE
  USING (true);

-- Create policy for users to delete clients
DROP POLICY IF EXISTS "Users can delete clients" ON clients;
CREATE POLICY "Users can delete clients"
  ON clients FOR DELETE
  USING (true);

-- Enable realtime for clients table
alter publication supabase_realtime add table clients;
