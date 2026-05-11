import React from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiExternalLink } from 'react-icons/fi';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Blog | Admin Dashboard',
};

export default async function BlogPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-medium text-white tracking-tight">Blog & Articles</h2>
          <p className="text-white/50 text-sm">Manage student articles and publications.</p>
        </div>
        <button className="admin-btn flex items-center gap-2 text-sm w-full sm:w-auto">
          <FiPlus /> Write Article
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {articles && articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.id} className="admin-glass-panel p-5 group hover:border-white/20 transition-all duration-300">
              <div className="aspect-video w-full rounded-lg bg-white/5 mb-4 relative overflow-hidden flex items-center justify-center border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
                <FiExternalLink className="w-8 h-8 text-white/20" />
                <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-[10px] uppercase tracking-wider text-white border border-white/10">
                  {article.category || 'Article'}
                </div>
              </div>
              <h3 className="text-lg font-medium text-white/90 leading-tight mb-2 group-hover:text-white transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-white/40 mb-4 line-clamp-2">
                {article.excerpt || article.content || 'No description available...'}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="text-xs text-white/50">
                  By {article.author || 'Admin'} • {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors" title="Edit">
                    <FiEdit2 size={14} />
                  </button>
                  <button className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors" title="Delete">
                    <FiTrash2 size={14} />
                  </button>
                  <button className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors" title="View live">
                    <FiExternalLink size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full admin-glass-panel p-12 text-center flex flex-col items-center justify-center">
             <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-4">
                <FiExternalLink size={24} />
             </div>
             <h3 className="text-lg font-medium text-white/90 mb-1">No articles found</h3>
             <p className="text-sm text-white/40">Get started by creating your first blog article.</p>
          </div>
        )}
      </div>
    </div>
  );
}
