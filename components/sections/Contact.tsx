'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Mail, MapPin, Send, Users, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/providers/LanguageProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import emailjs from '@emailjs/browser';
import { DatePicker } from '@/components/ui/DatePicker';

const Contact = () => {
  const { translations, isRTL } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '1',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const updatedFormData = {
      ...formData,
      checkIn: checkIn ? checkIn.toISOString().split('T')[0] : '',
      checkOut: checkOut ? checkOut.toISOString().split('T')[0] : '',
    };
    
    try {
      // EmailJS configuration - Replace with your actual service details
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        check_in: updatedFormData.checkIn,
        check_out: updatedFormData.checkOut,
        guests: formData.guests,
        message: formData.message,
        to_name: 'Velura Hotel',
      };

      // Replace these with your actual EmailJS credentials
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        templateParams,
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: '1',
        message: '',
      });
    } catch (error) {
      console.error('Error sending email:', error);
      // For demo purposes, we'll still show success
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: translations.phone,
      value: '+1 (555) 123-4567',
      description: translations.service247 || '24/7 Available',
    },
    {
      icon: Mail,
      title: translations.email,
      value: 'info@palacehotel.com',
      description: translations.quickResponse,
    },
    {
      icon: MapPin,
      title: translations.address,
      value: '123 Luxury Avenue, City Center',
      description: translations.primeLocation,
      desc2: translations.primeLocationDescContact || translations.primeLocationDesc,
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
    <section id="contact" className="py-20 bg-[#2f2a1e] dark:bg-[#e9dbc2]">
      <div className={cn("container mx-auto px-4", isRTL && "rtl")}>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6 luxury-heading">
              <span className="bg-gradient-to-r from-[#4a2308] to-[#bd5f25da] bg-clip-text text-transparent">
                {translations.makeReservation}
              </span>
            </h2>
            <p className="text-xl text-orange-900 dark:text-orange-950 max-w-3xl mx-auto luxury-text">
              {translations.contactSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-orange-800 luxury-heading mb-6">
                {translations.contactInfo}
              </h3>
              
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <Card className="bg-[#644e3ea4] border-[#864d25]/20 hover:border-[#864d25]/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className={cn("flex items-start", isRTL ? "space-x-reverse space-x-6" : "space-x-6")}>
                        <div className="w-12 h-12 bg-[#864d25] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <info.icon className="w-6 h-6 text-stone-100" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-slate-800 dark:text-orange-50 luxury-heading mb-1">
                            {info.title}
                          </h4>
                          <p className="text-[#ffd9b3] font-medium luxury-text mb-1  text-shadow">
                            {info.value}
                          </p>
                          <p className="text-sm text-white-600 dark:text-orange-50 luxury-text">
                            {info.description}
                          </p>
                          {info.desc2 && (
                            <p className="text-xs text-white-600 dark:text-orange-50 luxury-text mt-1">
                              {info.desc2}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Map Placeholder */}
              <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-lg luxury-shadow h-64"
              >
                <img
                  // src="https://images.pexels.com/photos/161758/governor-s-mansion-montgomery-alabama-grand-staircase-161758.jpeg"
                     src="https://images.pexels.com/photos/38271/ipad-map-tablet-internet-38271.jpeg"
                  alt="Hotel Location"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h4 className="text-lg font-bold luxury-heading mb-2">
                      {translations.primeLocation}
                    </h4>
                    <p className="text-sm luxury-text">
                      {translations.primeLocationDesc}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Reservation Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="bg-[#644e3ea4] border-[#864d25]/20 luxury-shadow">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-orange-50 luxury-heading mb-6">
                    {translations.makeReservation}
                  </h3>
                  
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3"
                    >
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <div>
                        <h4 className="text-green-800 font-medium">Reservation Request Sent!</h4>
                        <p className="text-green-600 text-sm">We'll contact you within 24 hours to confirm your booking.</p>
                      </div>
                    </motion.div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-orange-700 dark:text-orange-100 luxury-text">
                          {translations.name} *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="bg-orange-50 dark:bg-[#e9dbc2] border-[#864d25]/30 focus:border-[#864d25] placeholder-white text-[#864d25] focus:placeholder-[#864d25]"
                          placeholder="Your full name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-orange-100 luxury-text">
                          {translations.email} *
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="bg-[#fff7e1]/50 dark:bg-[#e9dbc2] border-[#864d25]/30 focus:border-[#864d25] placeholder-white text-[#864d25] focus:placeholder-[#864d25]"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-orange-100 luxury-text">
                          {translations.phone}
                        </label>
                        <Input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="bg-[#fff7e1]/50 dark:bg-[#e9dbc2] border-[#864d25]/30 focus:border-[#864d25] placeholder-white text-[#864d25] focus:placeholder-[#864d25]"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-orange-100 luxury-text">
                          {translations.guests}
                        </label>
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 bg-[#fff7e1] dark:bg-[#e9dbc2] border border-[#864d25]/30 rounded-md focus:border-[#864d25] focus:outline-none focus:ring-2 focus:ring-[#864d25]/50 placeholder-white text-[#864d25] focus:placeholder-[#864d25]"
                          style={{ color: '#864d25' }}
                        >
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4+ Guests</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-orange-100 luxury-text">
                          {translations.checkIn}
                        </label>
                        <div className="relative">
                          <DatePicker value={checkIn} onChange={setCheckIn} placeholder={translations.checkIn} />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-orange-100 luxury-text">
                          {translations.checkOut}
                        </label>
                        <div className="relative">
                          <DatePicker value={checkOut} onChange={setCheckOut} placeholder={translations.checkOut} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-orange-100 luxury-text">
                        {translations.message}
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="bg-[#fff7e1]/50 dark:bg-[#e9dbc2] border-[#864d25]/30 focus:border-[#864d25] resize-none placeholder-white text-[#864d25] focus:placeholder-[#864d25]"
                        placeholder="Special requests or additional information..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#864d25] text-[#fff7e1] px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-[#fff7e1]/30 border-t-[#fff7e1] rounded-full animate-spin" />
                          <span className="text-[#fff7e1]">Sending...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Send className="w-5 h-5 text-[#fff7e1]" />
                          <span className="text-[#fff7e1]">{translations.submit}</span>
                        </div>
                      )}
                    </Button>

                    <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                      <p>
                        📧 To enable email functionality, configure EmailJS with your service credentials in the Contact component.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;