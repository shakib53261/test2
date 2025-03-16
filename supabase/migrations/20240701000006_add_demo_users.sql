-- Create demo users with different roles

-- Super Admin (using the provided email)
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES 
('00000000-0000-0000-0000-000000000001', 'ferdus.ahmod1@gmail.com', crypt('SuperAdmin123!', gen_salt('bf')), now(), now(), now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, email, full_name, role, token_identifier, created_at, user_id)
VALUES 
('00000000-0000-0000-0000-000000000001', 'ferdus.ahmod1@gmail.com', 'Ferdus Ahmod', 'super_admin', '00000000-0000-0000-0000-000000000001', now(), '00000000-0000-0000-0000-000000000001')
ON CONFLICT (id) DO NOTHING;

-- Admin
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES 
('00000000-0000-0000-0000-000000000002', 'admin@tigfin.com', crypt('Admin123!', gen_salt('bf')), now(), now(), now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, email, full_name, role, token_identifier, created_at, user_id)
VALUES 
('00000000-0000-0000-0000-000000000002', 'admin@tigfin.com', 'Admin User', 'admin', '00000000-0000-0000-0000-000000000002', now(), '00000000-0000-0000-0000-000000000002')
ON CONFLICT (id) DO NOTHING;

-- Project Manager
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES 
('00000000-0000-0000-0000-000000000003', 'pm@tigfin.com', crypt('Manager123!', gen_salt('bf')), now(), now(), now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, email, full_name, role, token_identifier, created_at, user_id)
VALUES 
('00000000-0000-0000-0000-000000000003', 'pm@tigfin.com', 'Project Manager', 'project_manager', '00000000-0000-0000-0000-000000000003', now(), '00000000-0000-0000-0000-000000000003')
ON CONFLICT (id) DO NOTHING;

-- Employee
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES 
('00000000-0000-0000-0000-000000000004', 'employee@tigfin.com', crypt('Employee123!', gen_salt('bf')), now(), now(), now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, email, full_name, role, token_identifier, created_at, user_id)
VALUES 
('00000000-0000-0000-0000-000000000004', 'employee@tigfin.com', 'Regular Employee', 'employee', '00000000-0000-0000-0000-000000000004', now(), '00000000-0000-0000-0000-000000000004')
ON CONFLICT (id) DO NOTHING;