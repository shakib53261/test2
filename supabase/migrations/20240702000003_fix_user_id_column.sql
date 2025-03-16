-- Make sure the users table has the user_id column
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'user_id') THEN
        ALTER TABLE public.users ADD COLUMN user_id UUID;
    END IF;
END
$$;
