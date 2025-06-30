'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bed, Users, Wifi, Car, Coffee, Tv, Bath, Wind } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const Rooms = () => {
  const { translations, isRTL } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const rooms = [
    {
      id: 1,
      name: translations.deluxeRoom,
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      price: 299,
      size: '45',
      guests: 2,
      amenities: [
        { icon: Bed, name: 'King Bed' },
        { icon: Wifi, name: 'Free WiFi' },
        { icon: Tv, name: 'Smart TV' },
        { icon: Bath, name: 'Luxury Bath' },
      ],
      description: 'Elegant and spacious deluxe room with modern amenities and stunning city views.',
    },
    {
      id: 2,
      name: translations.executiveSuite,
      image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
      price: 599,
      size: '75',
      guests: 3,
      amenities: [
        { icon: Bed, name: 'King Bed' },
        { icon: Coffee, name: 'Coffee Machine' },
        { icon: Wind, name: 'Air Conditioning' },
        { icon: Car, name: 'Valet Parking' },
      ],
      description: 'Luxurious executive suite with separate living area and premium business amenities.',
    },
    {
      id: 3,
      name: translations.presidentialSuite,
      image: 'https://images.pexels.com/photos/2598638/pexels-photo-2598638.jpeg',
      price: 1299,
      size: '120',
      guests: 4,
      amenities: [
        { icon: Bed, name: 'Master Bedroom' },
        { icon: Bath, name: 'Jacuzzi' },
        { icon: Tv, name: 'Entertainment System' },
        { icon: Coffee, name: 'Kitchenette' },
      ],
      description: 'Our crown jewel - a presidential suite with panoramic views and exclusive amenities.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="rooms" className="py-20 bg-[#fff7e1] dark:bg-[#e9dbc2]">
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
            className="text-4xl md:text-5xl font-bold text-black mb-6 luxury-heading" //title
          >
            <span className="bg-gradient-to-r from-[#864d25] to-[#4e4734] bg-clip-text text-transparent"> 
              {translations.roomsTitle} 
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl from text-orange-900 to-yellow-50  max-w-3xl mx-auto luxury-text"
          >
            {translations.roomsSubtitle}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="overflow-hidden  bg-[#864d25]/30 border-amber-200/20 hover:border-amber-400/50 transition-all duration-500 luxury-shadow">
                <div className="relative overflow-hidden">
                  <motion.img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="bg-[#864d25] text-[#fff7e1] px-3 py-1 rounded-full text-sm font-medium">
                      ${room.price}/night
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-orange-50">
                    <h3 className="text-xl font-bold luxury-heading mb-1">{room.name}</h3>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1 text-[#864d25]" />
                        {room.guests} guests
                      </span>
                      <span>{room.size} m²</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-orange-50 mb-4 luxury-text">
                    {room.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {room.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-orange-50">
                        <amenity.icon className="w-4 h-4 text-[#864d25]" />
                        <span className="luxury-text">{amenity.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-[#864d25] luxury-heading">
                      ${room.price}
                      <span className="text-sm text-orange-50 font-normal">/night</span>
                    </div>
                    <Button className="bg-[#864d25] text-[#fff7e1] px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
                      {translations.bookNow}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            className=" dark:text-orange-100 border-[#864d25] text-[#864d25] hover:bg-[#864d25] hover:text-[#fff7e1] px-8 py-3 rounded-full font-medium transition-all duration-300 text-lg"
          >
            {translations.viewAll}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Rooms;