'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, Globe } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Image from "next/image";
import noBackground from "../images/noBackground.png"; // path relative to your file


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, translations, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: translations.home, href: '#home' },
    { name: translations.rooms, href: '#rooms' },
    { name: translations.services, href: '#services' },
    { name: translations.gallery, href: '#gallery' },
    { name: translations.about, href: '#about' },
    { name: translations.contact, href: '#contact' },
  ];

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-500',
        isScrolled 
          ? 'glass-effect shadow-lg py-2' 
          : 'bg-transparent py-4',
        isRTL && 'rtl'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className={cn("flex items-center space-x-5", isRTL && "space-x-reverse")}
>
  <div className="w-15 h-15 rounded-full overflow-hidden flex items-center justify-center">
    <Image
      src={noBackground}
      alt="Logo"
      width={100}
      height={100}

      className="object-cover rounded-full"
    />
  </div>
  <div className="text-orange-50">
    <h1 className="text-xl font-bold luxury-heading">Velura Hotel</h1>
    <p className="text-xs text-orange-300 luxury-text">Luxury Experience</p>
  </div>
</motion.div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="space-x-9">
              {navigation.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink
                    className={cn(
                      'text-orange-50 hover:text-[#864d25] transition-colors duration-300 cursor-pointer',
                      'font-medium tracking-wide luxury-text',
                      'relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0',
                      'after:bg-[#864d25] after:transition-all after:duration-300 hover:after:w-full'
                    )}
                    onClick={() => scrollToSection(item.href)}
                  >
                    {item.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Language Switcher & CTA */}
          <div className={cn(
            "hidden lg:flex items-center p-1",
            isRTL ? "flex-row-reverse space-x-reverse gap-x-8" : "gap-x-5" //the space between the two buttons on top 
          )}>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-orange-50 hover:text-[#864d25] bg-[#644e3ea4] hover:bg-[#644e3ea4] focus:bg-[#644e3ea4] transition-colors duration-300 rounded-md ">
                    <Globe className="w-4 h-4 mr-2" />
                    {languages.find(lang => lang.code === language)?.flag}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4 w-48 bg-[#644e3ea4] rounded-md shadow-lg ">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setLanguage(lang.code as 'ar' | 'en' | 'tr')}
                          className={cn(
                            'w-full text-left p-2 rounded-md transition-colors',
                            'hover:bg-[#fff7e1] hover:text-[#864d25]',
                            language === lang.code && 'bg-[#fff7e1] text-[#864d25]'
                          )}
                        >
                          <span className="mr-2">{lang.flag}</span>
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button 
              onClick={() => scrollToSection('#contact')}
              className={cn(
                "bg-[#864d25] text-[#fff7e1] px-8 py-2 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl",
                isRTL ? "mr-6" : "ml-6"
              )}
            >
              {translations.reservation}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-orange-50 p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#644e3ea4] mt-4 rounded-md shadow-lg"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="text-orange-50 hover:text-[#864d25] transition-colors duration-300 text-left py-2 luxury-text"
                  >
                    {item.name}
                  </button>
                ))}
                
                <div className="border-t border-black/20 pt-4">
                  <div className="flex flex-col space-y-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code as 'ar' | 'en' | 'tr')}
                        className={cn(
                          'text-left p-2 rounded-md transition-colors',
                          'hover:bg-[#fff7e1] hover:text-[#864d25]',
                          language === lang.code ? 'bg-[#fff7e1] text-[#864d25]' : 'text-orange-50'
                        )}
                      >
                        <span className="mr-2">{lang.flag}</span>
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={() => scrollToSection('#contact')}
                  className="bg-[#864d25] text-[#fff7e1] px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-lg w-full"
                >
                  {translations.reservation}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;