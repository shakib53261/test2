-- Create a table to store email invitations
CREATE TABLE IF NOT EXISTS email_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  role TEXT NOT NULL,
  invite_url TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable realtime for the email_invitations table
alter publication supabase_realtime add table email_invitations;

-- Create a view to display email invitations
CREATE OR REPLACE VIEW email_invitations_view AS
SELECT * FROM email_invitations ORDER BY sent_at DESC;
