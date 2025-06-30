'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import { cn } from '@/lib/utils';

const Footer = () => {
  const { translations, isRTL } = useLanguage();

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  ];

  const quickLinks = [
    { name: translations.home, href: '#home' },
    { name: translations.rooms, href: '#rooms' },
    { name: translations.services, href: '#services' },
    { name: translations.gallery, href: '#gallery' },
    { name: translations.about, href: '#about' },
    { name: translations.contact, href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="luxury-gradient pt-16 pb-8">
      <div className={cn("container mx-auto px-4", isRTL && "rtl")}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xl luxury-heading">P</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-orange-950 luxury-heading">Velura Hotel</h3>
                <p className="text-amber-400 text-sm luxury-text">Luxury Experience</p>
              </div>
            </div>
            <p className="text-orange-950 luxury-text leading-relaxed">
              Experience unparalleled luxury and exceptional service at our world-class hotel. 
              Creating memorable moments for over 50 years.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-amber-400 hover:bg-white/20 transition-all duration-300"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-bold text-orange-950 luxury-heading">
              {translations.quickLinks}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-orange-950 hover:text-amber-400 transition-colors duration-300 luxury-text"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-bold text-orange-950 luxury-heading">
              {translations.services}
            </h4>
            <ul className="space-y-2">
              {[
                { name: translations.spa },
                { name: translations.restaurant },
                { name: translations.fitness },
                { name: translations.pool },
                { name: translations.concierge },
                { name: translations.business },
              ].map((service, index) => (
                <li key={index}>
                  <span className="text-orange-950 luxury-text">{service.name}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-bold text-orange-950 luxury-heading">
              {translations.contactInfo}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-400" />
                <span className="text-orange-950 luxury-text">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-400" />
                <span className="text-orange-950 luxury-text">info@palacehotel.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-400 mt-1" />
                <span className="text-orange-950 luxury-text">
                  123 Luxury Avenue<br />
                  City Center, State 12345
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/20 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-orange-950 text-sm luxury-text">
              © 2024 Palace Hotel. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-orange-950 hover:text-amber-400 text-sm luxury-text transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-orange-950 hover:text-amber-400 text-sm luxury-text transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-orange-950 hover:text-amber-400 text-sm luxury-text transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;