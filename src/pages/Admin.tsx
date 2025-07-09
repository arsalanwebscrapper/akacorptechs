import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Save,
  Calendar,
  User,
  MessageCircle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  status: string;
  keywords: string[] | null;
  seo_title: string | null;
  seo_description: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface Comment {
  id: string;
  post_id: string;
  author_name: string;
  author_email: string;
  content: string;
  status: string;
  created_at: string;
  blog_posts?: { title: string };
}

const Admin = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCheckLoading, setAdminCheckLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const { toast } = useToast();

  const [postForm, setPostForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    featured_image: '',
    status: 'draft',
    keywords: '',
    seo_title: '',
    seo_description: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    } else if (user) {
      checkAdminStatus();
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchPosts();
      fetchComments();
    }
  }, [isAdmin]);

  const checkAdminStatus = async () => {
    if (!user) return;

    console.log('Checking admin status for user:', user.id);
    setAdminCheckLoading(true);

    try {
      // First, try to get existing admin profile
      const { data: existingAdmin, error: selectError } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      console.log('Existing admin check result:', { existingAdmin, selectError });

      if (selectError) {
        console.error('Error checking admin status:', selectError);
        toast({
          title: "Error",
          description: "Failed to check admin status. Please try again.",
          variant: "destructive",
        });
        setAdminCheckLoading(false);
        return;
      }

      if (existingAdmin) {
        console.log('User is already an admin');
        setIsAdmin(true);
      } else {
        console.log('User is not an admin, creating admin profile');
        // Create admin profile for this user
        const { error: insertError } = await supabase
          .from('admin_profiles')
          .insert({
            user_id: user.id,
            full_name: user.user_metadata?.full_name || user.email || 'Admin User',
            role: 'admin'
          });

        if (insertError) {
          console.error('Error creating admin profile:', insertError);
          toast({
            title: "Error",
            description: "Failed to create admin profile. Please contact support.",
            variant: "destructive",
          });
        } else {
          console.log('Admin profile created successfully');
          setIsAdmin(true);
          toast({
            title: "Welcome!",
            description: "Admin profile created successfully.",
          });
        }
      }
    } catch (error) {
      console.error('Unexpected error checking admin status:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAdminCheckLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_comments')
        .select(`
          *,
          blog_posts!inner(title)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const slug = generateSlug(postForm.title);
      const keywords = postForm.keywords 
        ? postForm.keywords.split(',').map(k => k.trim()).filter(k => k)
        : null;

      const postData = {
        title: postForm.title,
        slug,
        excerpt: postForm.excerpt || null,
        content: postForm.content,
        featured_image: postForm.featured_image || null,
        status: postForm.status,
        keywords,
        seo_title: postForm.seo_title || null,
        seo_description: postForm.seo_description || null,
        author_id: user.id,
        ...(postForm.status === 'published' && !editingPost?.published_at ? {
          published_at: new Date().toISOString()
        } : {})
      };

      let error;
      if (editingPost) {
        ({ error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id));
      } else {
        ({ error } = await supabase
          .from('blog_posts')
          .insert(postData));
      }

      if (error) throw error;

      toast({
        title: editingPost ? "Post updated!" : "Post created!",
        description: `Your blog post has been ${editingPost ? 'updated' : 'created'} successfully.`,
      });

      resetForm();
      fetchPosts();
    } catch (error: any) {
      toast({
        title: "Error saving post",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      excerpt: post.excerpt || '',
      content: post.content,
      featured_image: post.featured_image || '',
      status: post.status,
      keywords: post.keywords ? post.keywords.join(', ') : '',
      seo_title: post.seo_title || '',
      seo_description: post.seo_description || ''
    });
    setShowNewPostForm(true);
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Post deleted!",
        description: "The blog post has been deleted successfully.",
      });

      fetchPosts();
    } catch (error: any) {
      toast({
        title: "Error deleting post",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCommentStatusChange = async (commentId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('blog_comments')
        .update({ status: newStatus })
        .eq('id', commentId);

      if (error) throw error;

      toast({
        title: "Comment updated!",
        description: `Comment has been ${newStatus}.`,
      });

      fetchComments();
    } catch (error: any) {
      toast({
        title: "Error updating comment",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setPostForm({
      title: '',
      excerpt: '',
      content: '',
      featured_image: '',
      status: 'draft',
      keywords: '',
      seo_title: '',
      seo_description: ''
    });
    setEditingPost(null);
    setShowNewPostForm(false);
  };

  if (loading || adminCheckLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {loading ? 'Loading...' : 'Checking admin access...'}
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have admin privileges to access this panel. 
              {user && (
                <span className="block mt-2 text-sm">
                  Logged in as: {user.email}
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">
              If you should have admin access, please try signing out and back in, or contact support.
            </div>
            <Button onClick={() => signOut()} className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Blog Admin Panel</h1>
            <p className="text-muted-foreground">Welcome back, {user?.user_metadata?.full_name || user?.email}</p>
          </div>
          <Button onClick={() => signOut()} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts">Blog Posts</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Manage Posts</h2>
              <Button onClick={() => setShowNewPostForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>

            {showNewPostForm && (
              <Card>
                <CardHeader>
                  <CardTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSavePost} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={postForm.title}
                          onChange={(e) => setPostForm(prev => ({ ...prev, title: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select value={postForm.status} onValueChange={(value) => setPostForm(prev => ({ ...prev, status: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        value={postForm.excerpt}
                        onChange={(e) => setPostForm(prev => ({ ...prev, excerpt: e.target.value }))}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Content *</Label>
                      <Textarea
                        id="content"
                        value={postForm.content}
                        onChange={(e) => setPostForm(prev => ({ ...prev, content: e.target.value }))}
                        rows={10}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="featured_image">Featured Image URL</Label>
                      <Input
                        id="featured_image"
                        type="url"
                        value={postForm.featured_image}
                        onChange={(e) => setPostForm(prev => ({ ...prev, featured_image: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                      <Input
                        id="keywords"
                        value={postForm.keywords}
                        onChange={(e) => setPostForm(prev => ({ ...prev, keywords: e.target.value }))}
                        placeholder="technology, web development, tutorial"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="seo_title">SEO Title</Label>
                        <Input
                          id="seo_title"
                          value={postForm.seo_title}
                          onChange={(e) => setPostForm(prev => ({ ...prev, seo_title: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="seo_description">SEO Description</Label>
                        <Textarea
                          id="seo_description"
                          value={postForm.seo_description}
                          onChange={(e) => setPostForm(prev => ({ ...prev, seo_description: e.target.value }))}
                          rows={2}
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button type="submit">
                        <Save className="w-4 h-4 mr-2" />
                        {editingPost ? 'Update Post' : 'Create Post'}
                      </Button>
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-6">
              {loadingPosts ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <div className="animate-pulse space-y-4">
                          <div className="h-4 bg-muted rounded w-1/4"></div>
                          <div className="h-16 bg-muted rounded"></div>
                          <div className="h-4 bg-muted rounded w-1/3"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">No blog posts yet</h3>
                  <p className="text-muted-foreground">Create your first blog post to get started.</p>
                </div>
              ) : (
                posts.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {format(new Date(post.created_at), 'MMM dd, yyyy')}
                            </div>
                            <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                              {post.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditPost(post)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      {post.excerpt && (
                        <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      )}
                      {post.keywords && post.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.keywords.map((keyword) => (
                            <Badge key={keyword} variant="outline">{keyword}</Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="comments" className="space-y-6">
            <h2 className="text-2xl font-semibold">Manage Comments</h2>
            
            {loadingComments ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                        <div className="h-16 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded w-1/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4" />
                            <span className="font-semibold">{comment.author_name}</span>
                            <span className="text-sm text-muted-foreground">({comment.author_email})</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {format(new Date(comment.created_at), 'MMM dd, yyyy at h:mm a')}
                            <span>•</span>
                            <span>on "{comment.blog_posts?.title}"</span>
                          </div>
                        </div>
                        <Badge 
                          variant={
                            comment.status === 'approved' ? 'default' : 
                            comment.status === 'rejected' ? 'destructive' : 
                            'secondary'
                          }
                        >
                          {comment.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {comment.status === 'rejected' && <XCircle className="w-3 h-3 mr-1" />}
                          {comment.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                          {comment.status}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4 p-4 bg-muted/30 rounded-lg">
                        {comment.content}
                      </p>
                      
                      <div className="flex gap-2">
                        {comment.status !== 'approved' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleCommentStatusChange(comment.id, 'approved')}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        )}
                        {comment.status !== 'rejected' && (
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleCommentStatusChange(comment.id, 'rejected')}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {comments.length === 0 && (
                  <div className="text-center py-12">
                    <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-muted-foreground mb-2">No comments yet</h3>
                    <p className="text-muted-foreground">Comments will appear here when readers engage with your blog posts.</p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
