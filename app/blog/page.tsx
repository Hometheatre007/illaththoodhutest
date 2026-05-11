'use client';

import Navbar from '@/components/Navbar';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url';
import { useState, useEffect } from 'react';

const { projectId, dataset } = client.config();
const urlFor = (source: any) => projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null;

const BLOG_QUERY = `*[_type in ["blog", "post"]] | order(publishedAt desc) {
  _id, title, "slug": slug.current, author, category, publishedAt, "image": coalesce(featuredImage, image)
}`;

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchPosts = async () => {
      try {
        const data = await client.fetch(BLOG_QUERY);
        if (data && data.length > 0) {
          setPosts(data);
        } else {
          setPosts([
            { _id: '1', title: 'நவீன இலக்கியத்தில் மாணவர்களின் பங்கு', slug: 'modern-literature', author: 'M. கார்த்தி', category: 'Literature', publishedAt: '2024-03-10T00:00:00Z' },
            { _id: '2', title: 'Through the Eyes of the Editor 36', slug: 'editor-36', author: 'T. Sebasthi John Baskar', category: 'Editorial', publishedAt: '2024-02-28T00:00:00Z' },
            { _id: '3', title: 'கல்லூரி நாட்களின் கவிதை', slug: 'college-poetry', author: 'அருண் குமார்', category: 'Poetry', publishedAt: '2024-02-15T00:00:00Z' }
          ]);
        }
      } catch (err) {
        console.error("Sanity blog fetch error", err);
      }
    };
    fetchPosts();
  }, []);

  if (!mounted) return (
    <main className="min-h-screen bg-primary">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-cream/50">Loading...</div>
    </main>
  );

  return (
    <main className="min-h-screen bg-primary">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl text-accent font-bold tracking-widest uppercase mb-4">Articles & Poems</h1>
          <p className="font-tamil text-cream/70 text-2xl">படைப்புகள்</p>
        </div>

        <div className="flex justify-center gap-4 mb-16 flex-wrap">
          {['all', 'Literature', 'Student News', 'Editorial', 'Poetry', 'Campus Life'].map((cat) => (
             <button key={cat} className="px-6 py-2 rounded-full border border-accent/30 text-cream/80 hover:bg-accent/20 transition-colors font-heading text-sm uppercase tracking-widest font-bold">
               {cat}
             </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <Link key={post._id} href={`/blog/${post.slug}`} className="group block h-full">
              <div className="bg-[#0B3D2E] rounded-lg border border-accent/20 overflow-hidden h-full flex flex-col hover:border-accent/60 transition-colors shadow-lg hover:shadow-2xl">
                {post.image ? (
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={urlFor(post.image)?.width(400).height(250).url() || ''} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-[#072C21] relative overflow-hidden flex items-center justify-center">
                     <div className="absolute inset-0 bg-[url('/textures/parchment.png')] opacity-10 mix-blend-overlay" />
                     <div className="font-tamil text-4xl text-accent/10 font-bold transform -rotate-12">இளந்தாது</div>
                  </div>
                )}
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-accent/10 border border-accent/20 text-accent font-bold text-[10px] tracking-widest uppercase px-2 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                  
                  <h2 className="font-tamil text-2xl font-bold text-white mb-4 line-clamp-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  
                  <div className="mt-auto flex items-center justify-between border-t border-accent/10 pt-4">
                    <div className="flex items-center gap-2 text-cream/80 text-sm font-body">
                       By <span className="font-bold text-cream">{post.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
