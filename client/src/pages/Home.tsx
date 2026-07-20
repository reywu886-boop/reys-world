import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import FilmSection from '@/components/sections/FilmSection';
import ExperimentsSection from '@/components/sections/ExperimentsSection';
import AskReySection from '@/components/sections/AskReySection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import FilmContinuityOverlay from '@/components/FilmContinuityOverlay';
import ShotReelTransition from '@/components/ShotReelTransition';
import UnitReelTransition from '@/components/UnitReelTransition';
import SectionPassageOverlay from '@/components/SectionPassageOverlay';
import StudioRollRail from '@/components/StudioRollRail';
import WeatherContinuity from '@/components/WeatherContinuity';

export default function Home() {
  useEffect(() => {
    const returningToProjects = window.location.hash === '#projects' || sessionStorage.getItem('rey-return-target') === 'projects';
    sessionStorage.removeItem('rey-return-target');
    const placeViewport = () => {
      if (returningToProjects) {
        document.getElementById('projects')?.scrollIntoView({ block: 'start', behavior: 'auto' });
        return;
      }
      window.history.replaceState(null, '', `${window.location.pathname}#home`);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    placeViewport();
    const frame = window.requestAnimationFrame(placeViewport);
    const handlePageShow = () => {
      if (window.location.hash === '#projects') {
        document.getElementById('projects')?.scrollIntoView({ block: 'start', behavior: 'auto' });
      } else if (window.location.hash === '#home') {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <FilmContinuityOverlay />
      <UnitReelTransition />
      <SectionPassageOverlay />
      <ShotReelTransition />
      <WeatherContinuity />
      <StudioRollRail />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <FilmSection />
        <ExperimentsSection />
        <AskReySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
