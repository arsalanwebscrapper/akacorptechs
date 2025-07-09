
-- Drop the existing problematic RLS policies
DROP POLICY IF EXISTS "Admins can view all admin profiles" ON public.admin_profiles;
DROP POLICY IF EXISTS "Admins can manage admin profiles" ON public.admin_profiles;

-- Create a security definer function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_profiles 
        WHERE user_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Create new RLS policies using the security definer function
CREATE POLICY "Users can view their own admin profile" 
  ON public.admin_profiles 
  FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own admin profile" 
  ON public.admin_profiles 
  FOR INSERT 
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can manage all admin profiles" 
  ON public.admin_profiles 
  FOR ALL 
  USING (public.is_admin());

-- Update the blog_posts policies to use the new function
DROP POLICY IF EXISTS "Admins can manage all posts" ON public.blog_posts;
CREATE POLICY "Admins can manage all posts" 
  ON public.blog_posts 
  FOR ALL 
  USING (public.is_admin());

-- Update the blog_comments policies to use the new function
DROP POLICY IF EXISTS "Admins can manage all comments" ON public.blog_comments;
CREATE POLICY "Admins can manage all comments" 
  ON public.blog_comments 
  FOR ALL 
  USING (public.is_admin());
