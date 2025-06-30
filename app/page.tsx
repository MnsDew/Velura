'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Rooms from '@/components/sections/Rooms';
import Services from '@/components/sections/Services';
import Gallery from '@/components/sections/Gallery';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import StickyContact from '@/components/ui/sticky-contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Rooms />
      <Services />
      <Gallery />
      <About />
      <Contact />
      <Footer />
      <StickyContact />
    </main>
  );
}