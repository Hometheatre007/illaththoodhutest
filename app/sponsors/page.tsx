import Navbar from '@/components/Navbar';

const sponsors = [
  { name: 'ARC', logo: 'arc-logo.jpg' },
  { name: 'Babu', logo: 'babu-logo.jpg' },
  { name: 'Narayanan', logo: 'narayanan-logo.jpg' },
  { name: 'ARC Premium', logo: 'ARC_Logo.png' },
];

export default function SponsorsPage() {
  return (
    <main className="min-h-screen bg-primary">
      <Navbar />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative min-h-[80vh]">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="text-center mb-20 relative z-10">
          <h1 className="font-heading text-5xl text-accent font-bold tracking-widest uppercase mb-4">Our Sponsors</h1>
          <p className="font-tamil text-cream/70 text-2xl">எங்கள் புரவலர்கள்</p>
          <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded" />
          <p className="mt-8 text-cream/90 max-w-2xl mx-auto text-lg leading-relaxed font-body">
            We extend our deepest gratitude to the generous sponsors who have supported Ilanthoodhu throughout its journey. Their contributions make this platform for literary expression possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-center justify-items-center relative z-10">
          {sponsors.map((sponsor, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center bg-white/5 backdrop-blur-sm border border-accent/20 rounded-xl p-8 w-full h-64 hover:border-accent/60 transition-all duration-300 shadow-xl group"
            >
              <img 
                src={`/images/sponsors/${sponsor.logo}`} 
                alt={`${sponsor.name} Sponsor`} 
                className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
