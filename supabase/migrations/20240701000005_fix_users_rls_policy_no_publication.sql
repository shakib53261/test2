-- Drop any existing policies on the users table
DROP POLICY IF EXISTS "Public insert access" ON users;

-- Create a policy that allows inserting into the users table during sign-up
CREATE POLICY "Public insert access"
ON users FOR INSERT
WITH CHECK (true);

-- Make sure RLS is enabled on the users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Add a policy for users to select their own data
DROP POLICY IF EXISTS "Users can view own data" ON users;
CREATE POLICY "Users can view own data"
ON users FOR SELECT
USING (auth.uid() = id);

-- Add a policy for users to update their own data
DROP POLICY IF EXISTS "Users can update own data" ON users;
CREATE POLICY "Users can update own data"
ON users FOR UPDATE
USING (auth.uid() = id);