import Navbar from '@/components/Navbar';
import Image from 'next/image';

const galleryImages = [
  'main-pic.jpg',
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  '9.jpg',
  'one.jpg',
  'one (2).jpg',
  'two.jpg',
  'three.jpg',
  'four.jpg'
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-primary">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="text-center mb-16 relative z-10">
          <h1 className="font-heading text-5xl text-accent font-bold tracking-widest uppercase mb-4">Old Pics Library</h1>
          <p className="font-tamil text-cream/70 text-2xl">பழைய நினைவுகள்</p>
          <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded" />
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 relative z-10">
          {galleryImages.map((src, index) => (
            <div key={index} className="break-inside-avoid relative group overflow-hidden rounded-xl border border-[#8B6914]/20 shadow-lg bg-[#072C21]">
              <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
              <img
                src={`/images/gallery/${src}`}
                alt={`Ilanthoodhu past memory ${index + 1}`}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 rounded-xl"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
