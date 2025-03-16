-- Disable RLS on the users table to allow the dashboard to work properly
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Drop any existing policies that might be causing issues
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Admins can manage all users" ON users;

-- Create a simple policy that allows all operations
CREATE POLICY "Allow all operations on users"
ON users FOR ALL
USING (true)
WITH CHECK (true);
