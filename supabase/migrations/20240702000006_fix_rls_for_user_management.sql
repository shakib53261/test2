-- First, let's disable RLS on the users table to allow all operations
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Drop any existing policies that might be causing issues
DROP POLICY IF EXISTS "Public insert access" ON users;
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

-- Create a policy that allows all operations for now (we can refine this later)
CREATE POLICY "Allow all operations on users"
ON users FOR ALL
USING (true)
WITH CHECK (true);

-- Make sure the table exists in the realtime publication
-- (This is commented out because it's already in the publication)
-- alter publication supabase_realtime add table users;