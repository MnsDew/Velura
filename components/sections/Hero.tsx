'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Calendar, Users } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Hero = () => {
  const { translations, isRTL } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
    'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
    'https://images.pexels.com/photos/2598638/pexels-photo-2598638.jpeg',
    'https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg',
    'https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${image})`,
              backgroundAttachment: 'fixed',
            }}
          />
        ))}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#864d25]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className={cn("relative z-10 text-center px-4 max-w-6xl mx-auto pt-16 md:pt-0", isRTL && "rtl")}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-4"
        >
          {/* Main Heading */} 
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="text-4xl md:text-7xl font-bold text-orange-50 mb-10 mt-20 md:mt-0 luxury-heading text-shadow leading-normal md:leading-tight"
          >
            <span className="block bg-gradient-to-r from-[#fff7e1] to-[#9b5d30] bg-clip-text text-transparent">
              {translations.welcome}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-xl md:text-3xl from-orange-100 to-orange-200 max-w-3xl mx-auto leading-relaxed luxury-text text-shadow"
          >
            {translations.heroSubtitle}
          </motion.p>

          {/* Quick Booking Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-4xl mx-auto border border-white/30"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-orange-50 text-sm font-medium luxury-text">
                  {translations.checkIn}
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-[#864d25]" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 bg-[#fff7e1] border border-[#864d25]/30 rounded-lg text-[#864d25] placeholder-gray-500 focus:border-[#864d25] focus:outline-none focus:ring-2 focus:ring-[#864d25]/50 hover:bg-[#f3e3c3] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-orange-50 text-sm font-medium luxury-text">
                  {translations.checkOut}
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-[#864d25]" />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 bg-[#fff7e1] border border-[#864d25]/30 rounded-lg text-[#864d25] placeholder-gray-500 focus:border-[#864d25] focus:outline-none focus:ring-2 focus:ring-[#864d25]/50 hover:bg-[#f3e3c3] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-orange-50 text-sm font-medium luxury-text">
                  {translations.guests}
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-5 h-5 text-[#864d25]" />
                  <select className="w-full pl-10 pr-4 py-3 bg-[#fff7e1] border border-[#864d25]/30 rounded-lg text-[#864d25] focus:border-[#864d25] focus:outline-none focus:ring-2 focus:ring-[#864d25]/50 hover:bg-[#f3e3c3] transition-colors">
                    <option value="1">1 {translations.guests}</option>
                    <option value="2">2 {translations.guests}</option>
                    <option value="3">3 {translations.guests}</option>
                    <option value="4">4+ {translations.guests}</option>
                  </select>
                </div>
              </div>

              <Button 
                onClick={() => scrollToSection('#contact')}
                className="bg-[#864d25] text-[#fff7e1] px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl h-12"
              >
                {translations.bookNow}
              </Button>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={() => scrollToSection('#rooms')}
              className="bg-[#864d25] text-[#fff7e1] px-8 py-3 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              {translations.exploreRooms}
            </Button>

            <Button
              onClick={() => scrollToSection('#about')}
              variant="outline"
              className="border-2 border-[#864d25] bg-[#fff7e1]/10 backdrop-blur-sm text-white hover:bg-[#fff7e1]/20 px-8 py-3 rounded-full font-medium transition-all duration-300 text-lg"
            >
              {translations.learnMore}
            </Button>
          </motion.div>
        </motion.div>

        {/* On mobile, place the cursor between the card and the Explore Rooms button. On desktop, keep it at the bottom. */}
        <div className=" mb-5 block md:hidden w-full flex justify-center mt-5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer"
            onClick={() => scrollToSection('#services')}
          >
            <ChevronDown className="w-8 h-8 text-orange-50/70 hover:text-[#864d25] transition-colors" />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 bottom-8 w-full justify-center -mb-20" //the cursor here
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer"
            onClick={() => scrollToSection('#services')}
          >
            <ChevronDown className="w-8 h-8 text-white/70 hover:text-[#864d25] transition-colors" />
          </motion.div>
        </motion.div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-4 right-4 z-10 flex space-x-2 gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-300',
              index === currentImageIndex 
                ? 'bg-[#864d25] scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;