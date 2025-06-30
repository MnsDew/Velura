'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Users, Globe, Heart } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const About = () => {
  const { translations, isRTL } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { number: '50+', label: 'Years of Excellence', icon: Award },
    { number: '500K+', label: 'Satisfied Guests', icon: Users },
    { number: '25+', label: 'Countries Served', icon: Globe },
    { number: '98%', label: 'Guest Satisfaction', icon: Heart },
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
    hidden: { opacity: 0, y: 30 },
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
    <section id="about" className="py-20 luxury-gradient">
      <div className={cn("container mx-auto px-4", isRTL && "rtl")}>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <motion.div variants={itemVariants}>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 luxury-heading">
                  <span className="bg-gradient-to-r from-amber-950 to-amber-600 bg-clip-text text-transparent">
                    {translations.aboutTitle}
                  </span>
                </h2>
                <p className="text-xl text-amber-950 mb-6 luxury-text leading-relaxed">
                  {translations.aboutSubtitle}
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-6">
                <p className="text-orange-950 luxury-text leading-relaxed">
                  For over five decades, our hotel has been synonymous with luxury, elegance, and exceptional service. 
                  We have consistently redefined hospitality standards while maintaining our commitment to creating 
                  unforgettable experiences for our guests.
                </p>
                
                <p className="text-orange-950 luxury-text leading-relaxed">
                  Our heritage combines timeless traditions with modern innovations, ensuring that every guest 
                  enjoys the perfect blend of comfort, luxury, and personalized service that has made us a 
                  distinguished name in the hospitality industry.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-[#644e3ea4] border-amber-200/20">
                    <CardContent className="p-6 text-center">
                      <stat.icon className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-orange-50 luxury-heading mb-2">
                        {stat.number}
                      </div>
                      <div className="text-sm text-orange-950 luxury-text">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            </div>

            {/* Right Images */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-lg luxury-shadow"
                >
                  <img
                    src="https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg"
                    alt="Hotel Lobby"
                    className="w-full h-58 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-lg luxury-shadow mt-8"
                >
                  <img
                    src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg"
                    alt="Fine Dining"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-lg luxury-shadow"
              >
                <img
                  src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"
                  alt="Swimming Pool"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold luxury-heading mb-2">
                    Award-Winning Facilities
                  </h3>
                  <p className="text-sm text-gray-200 luxury-text">
                    Recognized globally for excellence in hospitality
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Awards Section */}
          <motion.div
            variants={itemVariants}
            className="mt-20 text-center"
          >
            <h3 className="text-3xl font-bold text-orange-950 mb-12 luxury-heading">
              Recognition & Awards
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { title: "World's Best Hotel", year: "2024", org: "Travel Awards" },
                { title: "Luxury Service Excellence", year: "2023", org: "Hospitality Excellence" },
                { title: "Best Hotel Design", year: "2023", org: "Architecture Awards" },
                { title: "Sustainable Tourism", year: "2024", org: "Green Awards" },
              ].map((award, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#644e3ea4] p-6 rounded-lg border border-amber-200/20"
                >
                  <Award className="w-8 h-8 text-amber-400 mx-auto mb-4" />
                  <h4 className="text-amber-50 font-bold luxury-heading mb-2">
                    {award.title}
                  </h4>
                  <p className="text-amber-50 luxury-text mb-1 border-orange-950">{award.year}</p>
                  <p className="text-orange-950 text-sm luxury-text">{award.org}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;