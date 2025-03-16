-- Add role column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50);

-- Set default role for all users
UPDATE users SET role = 'Employee' WHERE role IS NULL;

-- Set default for new rows
ALTER TABLE users ALTER COLUMN role SET DEFAULT 'Employee';

-- Enable realtime for the users table
alter publication supabase_realtime add table users;
