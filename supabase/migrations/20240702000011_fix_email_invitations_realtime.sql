-- Fix the email_invitations table realtime publication
-- This migration removes the line that's causing the error
-- since the table is already in the publication

-- No need to add to realtime publication as it's already there
-- alter publication supabase_realtime add table email_invitations;
