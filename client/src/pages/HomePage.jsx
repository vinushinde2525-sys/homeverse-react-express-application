// src/pages/HomePage.jsx
import { lazy, Suspense } from 'react';
import HeroSection         from '../components/home/HeroSection';
import StatsSection        from '../components/home/StatsSection';
import FeaturedProperties  from '../components/home/FeaturedProperties';
import ServicesSection     from '../components/home/ServicesSection';
import AboutSection        from '../components/home/AboutSection';
import AmenitiesSection    from '../components/home/AmenitiesSection';
import PopularLocations    from '../components/home/PopularLocations';
import TestimonialsSection from '../components/home/TestimonialsSection';
import BlogSection         from '../components/home/BlogSection';
import CTASection          from '../components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedProperties />
      <ServicesSection />
      <AboutSection />
      <AmenitiesSection />
      <PopularLocations />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
    </>
  );
}
