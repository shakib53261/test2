-- Add active column to users table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'active') THEN
        ALTER TABLE public.users ADD COLUMN active BOOLEAN DEFAULT true;
    END IF;
END
$$;

-- Make sure the users table has the role column
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'role') THEN
        ALTER TABLE public.users ADD COLUMN role TEXT DEFAULT 'Employee';
    END IF;
END
$$;
