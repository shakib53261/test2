-- Add role column to users table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'role') THEN
    ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'Employee';
  END IF;
END $$;

-- Update existing users to have a default role
UPDATE users SET role = 'Employee' WHERE role IS NULL OR role = '';

-- Enable realtime for the users table
alter publication supabase_realtime add table users;
