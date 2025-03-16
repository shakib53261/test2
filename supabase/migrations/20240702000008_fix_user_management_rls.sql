-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own data" ON users;
DROP POLICY IF EXISTS "Admins can manage all users" ON users;

-- Create policy for users to view their own data
CREATE POLICY "Users can view their own data"
ON users
FOR SELECT
USING (auth.uid() = id);

-- Create policy for admins to manage all users
CREATE POLICY "Admins can manage all users"
ON users
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND (users.role = 'Super Admin' OR users.role = 'Admin')
  )
);

-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
