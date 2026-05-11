import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CurrentYearSection from '@/components/CurrentYearSection';
import NoticeBlackboardSection from '@/components/NoticeBlackboardSection';
import FounderYearbookSection from '@/components/FounderYearbookSection';
import TimelineSection from '@/components/TimelineSection';
import DigitalLibraryGrid from '@/components/DigitalLibraryGrid';

export default function Home() {
  return (
    <main className="min-h-screen bg-primary">
      <Navbar />
      <Hero />
      <CurrentYearSection />
      <NoticeBlackboardSection />
      <FounderYearbookSection />
      <TimelineSection />
      <DigitalLibraryGrid />
    </main>
  );
}
