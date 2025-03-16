-- Add invitation_sent column to users table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'invitation_sent') THEN
        ALTER TABLE public.users ADD COLUMN invitation_sent BOOLEAN DEFAULT false;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'invitation_accepted') THEN
        ALTER TABLE public.users ADD COLUMN invitation_accepted BOOLEAN DEFAULT false;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'invitation_sent_at') THEN
        ALTER TABLE public.users ADD COLUMN invitation_sent_at TIMESTAMPTZ;
    END IF;
END
$$;
