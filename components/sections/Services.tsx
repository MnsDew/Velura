'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Utensils, Dumbbell, Waves, ConciergeBell, Briefcase, Car, Wifi } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const Services = () => {
  const { translations, isRTL } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const services = [
    {
      icon: Sparkles,
      title: translations.spa,
      description: 'Rejuvenate your body and soul with our world-class spa treatments and wellness programs.',
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg',
      features: ['Massage Therapy', 'Aromatherapy', 'Facial Treatments', 'Sauna & Steam'],
    },
    {
      icon: Utensils,
      title: translations.restaurant,
      description: 'Experience culinary excellence with our award-winning restaurants and diverse cuisine options.',
      image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg',
      features: ['Fine Dining', 'Room Service', 'Bar & Lounge', 'Private Dining'],
    },
    {
      icon: Dumbbell,
      title: translations.fitness,
      description: 'Stay fit and healthy with our state-of-the-art fitness center and personal training services.',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
      features: ['Modern Equipment', 'Personal Trainers', 'Group Classes', '24/7 Access'],
    },
    {
      icon: Waves,
      title: translations.pool,
      description: 'Relax and unwind in our luxurious swimming pool with stunning city views.',
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      features: ['Infinity Pool', 'Pool Bar', 'Cabanas', 'Night Swimming'],
    },
    {
      icon: ConciergeBell,
      title: translations.concierge,
      description: 'Our dedicated concierge team is available 24/7 to assist with all your needs.',
      image: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg',
      features: ['24/7 Service', 'Tour Planning', 'Reservations', 'Transportation'],
    },
    {
      icon: Briefcase,
      title: translations.business,
      description: 'Conduct business seamlessly with our fully equipped business center and meeting rooms.',
      image: 'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg',
      features: ['Meeting Rooms', 'Conference Facilities', 'High-Speed Internet', 'Secretarial Services'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="services" className="py-20 luxury-gradient">
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
            className="text-4xl md:text-5xl font-bold text-orange-950 mb-6 luxury-heading"
          >
            <span className="bg-gradient-to-r from-orange-300 to-orange-950 bg-clip-text text-transparent">
              {translations.servicesTitle}
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-orange-950 max-w-3xl mx-auto luxury-text"
          >
            {translations.servicesSubtitle}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <Card className="overflow-hidden bg-[#644e3ea4] border-[#864d25]/20 hover:border-[#864d25]/50 transition-all duration-500 luxury-shadow h-full">
                <div className="relative overflow-hidden">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-orange-400/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-amber-400/30">
                      <service.icon className="w-6 h-6 text-orange-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-orange-50 luxury-heading mb-2">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-orange-50-300 mb-4 luxury-text leading-relaxed">
                    {service.description}
                  </p>

                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-orange-300 rounded-full" />
                        <span className="text-sm text-orange-50 luxury-text">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-amber-400/20">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-orange-200 hover:text-orange-50 font-medium transition-colors duration-300 luxury-text"
                    >
                      {translations.learnMore} →
                    </motion.button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Services Strip */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <div className="glass-effect rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-orange-950 mb-6 luxury-heading">
              Additional Premium Services
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Car, name: 'Valet Parking' },
                { icon: Wifi, name: 'High-Speed WiFi' },
                { icon: ConciergeBell, name: 'Butler Service' },
                { icon: Briefcase, name: 'Airport Transfer' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  <item.icon className="w-8 h-8 text-orange-950" />
                  <span className="text-orange-950 font-medium luxury-text">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;