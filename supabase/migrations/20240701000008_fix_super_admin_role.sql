-- Update the role for ferdus.ahmod1@gmail.com to Super Admin
UPDATE public.users
SET role = 'Super Admin'
WHERE email = 'ferdus.ahmod1@gmail.com';
