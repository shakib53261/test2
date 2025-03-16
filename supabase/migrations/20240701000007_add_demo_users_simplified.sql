-- Create demo users with different roles in the public.users table only

-- Super Admin
INSERT INTO public.users (id, email, full_name, role, token_identifier, created_at, user_id)
VALUES 
('00000000-0000-0000-0000-000000000001', 'ferdus.ahmod1@gmail.com', 'Ferdus Ahmod', 'Super Admin', '00000000-0000-0000-0000-000000000001', now(), '00000000-0000-0000-0000-000000000001')
ON CONFLICT (id) DO NOTHING;

-- Admin
INSERT INTO public.users (id, email, full_name, role, token_identifier, created_at, user_id)
VALUES 
('00000000-0000-0000-0000-000000000002', 'admin@tigfin.com', 'Admin User', 'Admin', '00000000-0000-0000-0000-000000000002', now(), '00000000-0000-0000-0000-000000000002')
ON CONFLICT (id) DO NOTHING;

-- Project Manager
INSERT INTO public.users (id, email, full_name, role, token_identifier, created_at, user_id)
VALUES 
('00000000-0000-0000-0000-000000000003', 'pm@tigfin.com', 'Project Manager', 'Project Manager', '00000000-0000-0000-0000-000000000003', now(), '00000000-0000-0000-0000-000000000003')
ON CONFLICT (id) DO NOTHING;

-- Employee
INSERT INTO public.users (id, email, full_name, role, token_identifier, created_at, user_id)
VALUES 
('00000000-0000-0000-0000-000000000004', 'employee@tigfin.com', 'Regular Employee', 'Employee', '00000000-0000-0000-0000-000000000004', now(), '00000000-0000-0000-0000-000000000004')
ON CONFLICT (id) DO NOTHING;