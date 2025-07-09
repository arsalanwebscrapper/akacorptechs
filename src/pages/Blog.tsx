
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
  keywords: string[] | null;
  seo_title: string | null;
  seo_description: string | null;
  status: string | null;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      console.log('Fetching blog posts...');
      
      // First, let's check ALL posts to see what's in the database
      const { data: allData, error: allError } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, featured_image, published_at, keywords, seo_title, seo_description, status')
        .order('created_at', { ascending: false });

      console.log('ALL posts in database:', allData);
      setAllPosts(allData || []);

      // Now fetch only published posts
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, featured_image, published_at, keywords, seo_title, seo_description')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      console.log('Published posts query response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        setError(error.message);
        throw error;
      }
      
      console.log('Found published posts:', data?.length || 0);
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-muted rounded w-1/3"></div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="h-96">
                  <div className="h-48 bg-muted rounded-t-lg"></div>
                  <CardContent className="p-6 space-y-4">
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Blog
            </h1>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-destructive mb-2">
                Error Loading Blog Posts
              </h3>
              <p className="text-sm text-muted-foreground">
                {error}
              </p>
              <Button 
                onClick={fetchPosts} 
                className="mt-4"
                variant="outline"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on technology, development, and digital innovation.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold text-muted-foreground mb-4">
              No published blog posts found
            </h3>
            <p className="text-muted-foreground mb-6">
              Check back soon for our latest insights and updates!
            </p>
            <div className="text-sm text-muted-foreground space-y-2">
              <p className="font-semibold">Debug Information:</p>
              <p>Total posts in database: {allPosts.length}</p>
              <p>Published posts found: {posts.length}</p>
              {allPosts.length > 0 && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg text-left max-w-2xl mx-auto">
                  <p className="font-semibold mb-2">Posts in database:</p>
                  {allPosts.map((post, index) => (
                    <div key={post.id} className="mb-2 text-xs">
                      <p><strong>Post {index + 1}:</strong></p>
                      <p>Title: {post.title}</p>
                      <p>Status: "{post.status}"</p>
                      <p>Published At: {post.published_at || 'NULL'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                {post.featured_image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    {post.published_at && format(new Date(post.published_at), 'MMM dd, yyyy')}
                  </div>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  {post.excerpt && (
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {post.keywords && post.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.keywords.slice(0, 3).map((keyword) => (
                        <Badge key={keyword} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <Link to={`/blog/${post.slug}`}>
                    <Button variant="ghost" className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
