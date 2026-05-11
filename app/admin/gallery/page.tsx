import React from 'react';
import { FiUpload, FiTrash2, FiImage } from 'react-icons/fi';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'Gallery | Admin Dashboard',
};

export default async function GalleryPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: galleryItems } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-medium text-white tracking-tight">Media Gallery</h2>
          <p className="text-white/50 text-sm">Manage images and event photos.</p>
        </div>
        <button className="admin-btn flex items-center gap-2 text-sm w-full sm:w-auto">
          <FiUpload /> Upload Media
        </button>
      </div>

      <div className="admin-glass-panel p-1 min-h-[400px]">
        {galleryItems && galleryItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1">
            {galleryItems.map((item) => (
              <div key={item.id} className="aspect-square relative group bg-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                
                {/* Real Image or Placeholder depending on implementation */}
                <div className="w-full h-full flex items-center justify-center bg-white/10 group-hover:scale-105 transition-transform duration-500 bg-cover bg-center" style={{ backgroundImage: `url(${item.image_url})` }}>
                  {!item.image_url && <FiImage className="text-white/20 w-12 h-12" />}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 flex justify-between items-center">
                  <span className="text-xs text-white/80 truncate pr-2">{item.file_name}</span>
                  <button className="text-white/40 hover:text-red-400 transition-colors p-1 bg-black/40 backdrop-blur-sm rounded">
                    <FiTrash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-[400px] flex flex-col items-center justify-center text-center p-6">
             <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/20 mb-4">
                <FiImage size={24} />
             </div>
             <h3 className="text-lg font-medium text-white/90 mb-1">Gallery is empty</h3>
             <p className="text-sm text-white/40">Upload your first image to see it here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
