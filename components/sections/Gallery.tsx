'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import { cn } from '@/lib/utils';

const Gallery = () => {
  const { translations, isRTL } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      src: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      alt: 'Luxury Hotel Room',
      category: 'Rooms',
    },
    {
      src: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
      alt: 'Executive Suite',
      category: 'Suites',
    },
    {
      src: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg',
      alt: 'Fine Dining Restaurant',
      category: 'Dining',
    },
    {
      src: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      alt: 'Swimming Pool',
      category: 'Facilities',
    },
    {
      src: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg',
      alt: 'Spa Treatment',
      category: 'Spa',
    },
    {
      src: 'https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg',
      alt: 'Hotel Lobby',
      category: 'Lobby',
    },
    {
      src: 'https://images.pexels.com/photos/2598638/pexels-photo-2598638.jpeg',
      alt: 'Presidential Suite',
      category: 'Suites',
    },
    {
      src: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
      alt: 'Fitness Center',
      category: 'Fitness',
    },
    {
      src: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg',
      alt: 'Concierge Service',
      category: 'Services',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-[#fff7e1] dark:bg-[#e9dbc2]">
      <div className={cn("container mx-auto px-4", isRTL && "rtl")}>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6 luxury-heading"
          >
            <span className="bg-gradient-to-r from-orange-950 to-amber-600 bg-clip-text text-transparent">
              {translations.gallery}
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-600 dark:text-orange-900 max-w-3xl mx-auto luxury-text"
          >
            Discover the elegance and luxury that awaits you at our hotel
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className={cn(
                "relative overflow-hidden rounded-lg cursor-pointer group",
                index === 0 && "md:col-span-2 md:row-span-2",
                index === 4 && "lg:col-span-2",
              )}
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative aspect-square md:aspect-auto h-full">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-amber-400 text-white px-3 py-1 rounded-full text-xs font-medium mb-2">
                    {image.category}
                  </div>
                  <h3 className="text-lg font-bold luxury-heading">{image.alt}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  className="w-full h-full object-contain rounded-lg"
                />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <X size={20} />
                </button>

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Image Info */}
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="bg-amber-400 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                    {galleryImages[selectedImage].category}
                  </div>
                  <h3 className="text-xl font-bold luxury-heading">
                    {galleryImages[selectedImage].alt}
                  </h3>
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 text-white bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  {selectedImage + 1} / {galleryImages.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;