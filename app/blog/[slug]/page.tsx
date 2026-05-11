import Navbar from '@/components/Navbar';
import { client } from '@/sanity/lib/client';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { PortableText } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const { projectId, dataset } = client.config();
const urlFor = (source: any) => projectId && dataset ? imageUrlBuilder({ projectId, dataset }).image(source) : null;

const BLOG_DETAIL_QUERY = `*[_type in ["post", "blog"] && slug.current == $slug][0] {
  _id, title, "slug": slug.current, author, category, publishedAt, body, "image": coalesce(featuredImage, image)
}`;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await client.fetch(BLOG_DETAIL_QUERY, { slug: params.slug }).catch(() => null);
  
  if (!post) {
    return { title: 'Post Not Found | Ilanthoodhu' };
  }
  
  return {
    title: `${post.title} | Ilanthoodhu`,
    description: `An article by ${post.author} under ${post.category}`,
  };
}

export default async function BlogDetail({ params }: { params: { slug: string } }) {
  let post;
  try {
    post = await client.fetch(BLOG_DETAIL_QUERY, { slug: params.slug });
  } catch (err) {
    console.warn("Sanity fetch failed. Using fallback data for:", params.slug);
  }

  if (!post) {
    // Fallback display if not connected to Sanity yet
    if (params.slug === 'modern-literature') {
      post = {
        title: 'நவீன இலக்கியத்தில் மாணவர்களின் பங்கு',
        author: 'M. கார்த்தி',
        category: 'Literature',
        publishedAt: '2024-03-10T00:00:00Z',
        body: [
          { _type: 'block', children: [{ _type: 'span', text: 'மாணவர் சமுதாயம் எப்போதுமே இலக்கியத்தின் மீது ஒரு தனி விருப்பத்தை கொண்டுள்ளது. இந்த கட்டுரையில், நவீன கால படைப்புகளில் மாணவர்களின் பங்களிப்பை ஆராய்வோம்...' }] }
        ]
      }
    } else {
      notFound();
    }
  }

  return (
    <main className="min-h-screen bg-primary">
      <Navbar />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="mb-12 border-b border-accent/20 pb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-accent/10 border border-accent/20 text-accent font-bold text-xs tracking-widest uppercase px-3 py-1.5 rounded">
              {post.category}
            </span>
            <span className="text-cream/50 text-sm font-heading tracking-widest uppercase">
              {post.publishedAt ? format(new Date(post.publishedAt), 'MMMM d, yyyy') : ''}
            </span>
          </div>

          <h1 className="font-tamil text-4xl md:text-5xl lg:text-6xl font-bold bg-gold-gradient text-transparent bg-clip-text mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1A5C45] border border-accent/30 flex items-center justify-center">
              <span className="text-accent font-bold text-lg">{post.author.charAt(0)}</span>
            </div>
            <div>
              <p className="text-cream font-bold">{post.author || 'Author'}</p>
              <p className="text-cream/50 text-xs uppercase tracking-widest">Author</p>
            </div>
          </div>
          
          {post.image && (
            <div className="mt-8 mb-4">
              <img
                src={urlFor(post.image)?.url() || ''}
                alt={post.title}
                className="w-full max-h-[500px] object-cover rounded-xl shadow-2xl drop-shadow-md border border-accent/20"
              />
            </div>
          )}
        </div>

        <div className="prose prose-lg prose-invert prose-p:font-tamil prose-p:text-cream/80 prose-headings:font-tamil prose-headings:text-accent prose-a:text-accent-light max-w-none mb-16">
          {Array.isArray(post.body) && <PortableText value={post.body} />}
        </div>

        <div className="border-t border-accent/20 pt-8 mt-16 text-center">
          <Link href="/blog" className="inline-block px-8 py-3 border border-cream/30 text-cream/80 hover:text-white hover:border-white transition-all duration-300 tracking-widest font-bold text-sm rounded">
            ← BACK TO ARTICLES
          </Link>
        </div>
      </article>
    </main>
  );
}
