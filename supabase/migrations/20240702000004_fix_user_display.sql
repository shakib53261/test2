-- Ensure all required columns exist in the users table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'active') THEN
        ALTER TABLE public.users ADD COLUMN active BOOLEAN DEFAULT true;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'role') THEN
        ALTER TABLE public.users ADD COLUMN role TEXT DEFAULT 'Employee';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'user_id') THEN
        ALTER TABLE public.users ADD COLUMN user_id UUID;
    END IF;
END
$$;

-- Add some demo users if the table is empty
INSERT INTO public.users (id, email, full_name, role, token_identifier, created_at, active, user_id)
SELECT 
    gen_random_uuid(), 
    'admin@example.com', 
    'Admin User', 
    'Super Admin',
    'admin@example.com',
    NOW(),
    true,
    gen_random_uuid()
WHERE NOT EXISTS (SELECT 1 FROM public.users LIMIT 1);

-- Make sure realtime is enabled for the users table
ALTER PUBLICATION supabase_realtime ADD TABLE users;
