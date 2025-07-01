'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Users, Globe, Heart } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const About = () => {
  const { translations, isRTL } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { number: '50+', label: translations.aboutStatsYears, icon: Award },
    { number: '500K+', label: translations.aboutStatsGuests, icon: Users },
    { number: '25+', label: translations.aboutStatsCountries, icon: Globe },
    { number: '98%', label: translations.aboutStatsSatisfaction, icon: Heart },
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
                  {translations.aboutLong1}
                </p>
                <p className="text-orange-950 luxury-text leading-relaxed">
                  {translations.aboutLong2}
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-[#644e3ea4] border-amber-200/20">
                    <CardContent className="p-6 text-center">
                      <stat.icon className="w-8 h-8 text-amber-50 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-orange-100 luxury-heading mb-2">
                        {stat.number}
                      </div>
                      <div className="text-sm text-orange-950 luxury-text font-bold bg-luxury-cream">
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
                  className="relative overflow-hidden rounded-lg luxury-shadow aspect-[4/3] md:aspect-video"
                >
                  <Image
                    src="https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg"
                    alt="Hotel Lobby"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-lg luxury-shadow mt-8 aspect-[4/3] md:aspect-video"
                >
                  <Image
                    src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg"
                    alt="Fine Dining"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-lg luxury-shadow aspect-[4/3] md:aspect-video"
              >
                <Image
                  src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg"
                  alt="Swimming Pool"
                  fill
                  sizes="(max-width: 768px) 100vw, 100vw"
                  className="object-cover rounded-lg"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold luxury-heading mb-2">
                    {translations.aboutAwardFacilitiesTitle}
                  </h3>
                  <p className="text-sm text-gray-200 luxury-text">
                    {translations.aboutAwardFacilitiesDesc}
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
              {translations.aboutAwardSection}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { title: translations.aboutAward1, year: translations.aboutAwardYear1, org: translations.aboutAwardOrg1 },
                { title: translations.aboutAward2, year: translations.aboutAwardYear2, org: translations.aboutAwardOrg2 },
                { title: translations.aboutAward3, year: translations.aboutAwardYear3, org: translations.aboutAwardOrg3 },
                { title: translations.aboutAward4, year: translations.aboutAwardYear4, org: translations.aboutAwardOrg4 },
              ].map((award, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#644e3ea4] p-6 rounded-lg border border-amber-200/20"
                >
                  <Award className="w-8 h-8 text-amber-500 mx-auto mb-4" />
                  <h4 className="text-orange-50 font-bold luxury-heading mb-2">
                    {award.title}
                  </h4>
                  <p className="text-amber-50 luxury-text mb-1 border-orange-950">{award.year}</p>
                  <p className="text-orange-950 text-sm luxury-text bg-luxury-cream">{award.org}</p>
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