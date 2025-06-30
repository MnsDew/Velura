'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'ar' | 'en' | 'tr';
  setLanguage: (lang: 'ar' | 'en' | 'tr') => void;
  translations: any;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    rooms: 'الغرف والأجنحة',
    services: 'الخدمات والمرافق',
    gallery: 'المعرض',
    about: 'من نحن',
    contact: 'اتصل بنا',
    reservation: 'حجز',
    
    // Hero Section
    welcome: 'هنا... تبدأ رحلتكم مع الأناقة والراحة', 
    heroSubtitle: 'تجربة استثنائية من الرفاهية والضيافة الراقية',
    bookNow: 'احجز الآن',
    exploreRooms: 'استكشف الغرف',
    
    // Common
    learnMore: 'اعرف المزيد',
    viewAll: 'عرض الكل',
    readMore: 'اقرأ المزيد',
    close: 'إغلاق',
    submit: 'إرسال',
    
    // Rooms
    roomsTitle: 'غرف وأجنحة فاخرة',
    roomsSubtitle: 'استمتع بإقامة استثنائية في غرفنا المصممة بعناية فائقة',
    deluxeRoom: 'غرفة ديلوكس',
    executiveSuite: 'جناح تنفيذي',
    presidentialSuite: 'الجناح الرئاسي',
    
    // Services
    servicesTitle: 'خدمات ومرافق عالمية',
    servicesSubtitle: 'نقدم لك تجربة شاملة من الخدمات الراقية',
    spa: 'منتجع صحي',
    restaurant: 'مطعم فاخر',
    fitness: 'مركز اللياقة',
    pool: 'حمام سباحة',
    concierge: 'خدمة الكونسيرج',
    business: 'مركز الأعمال',
    
    // Contact
    contactTitle: 'تواصل معنا',
    contactSubtitle: 'نحن هنا لخدمتك على مدار الساعة',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    address: 'العنوان',
    
    // Form
    name: 'الاسم',
    emailLabel: 'البريد الإلكتروني',
    message: 'الرسالة',
    checkIn: 'تاريخ الوصول',
    checkOut: 'تاريخ المغادرة',
    guests: 'عدد الضيوف',
    
    // About
    aboutTitle: 'قصة الفخامة',
    aboutSubtitle: 'تجربة استثنائية تجمع بين التراث والحداثة',
    
    // Footer
    followUs: 'تابعنا',
    quickLinks: 'روابط سريعة',
    contactInfo: 'معلومات التواصل',
  },
  
  en: {
    // Navigation
    home: 'Home',
    rooms: 'Rooms & Suites',
    services: 'Services & Facilities',
    gallery: 'Gallery',
    about: 'About Us',
    contact: 'Contact',
    reservation: 'Reservation',
    
    // Hero Section
    welcome: 'Elegance and comfort begin here',
    heroSubtitle: 'An exceptional experience of luxury and refined hospitality',
    bookNow: 'Book Now',
    exploreRooms: 'Explore Rooms',
    
    // Common
    learnMore: 'Learn More',
    viewAll: 'View All',
    readMore: 'Read More',
    close: 'Close',
    submit: 'Submit',
    
    // Rooms
    roomsTitle: 'Luxury Rooms & Suites',
    roomsSubtitle: 'Enjoy an exceptional stay in our meticulously designed rooms',
    deluxeRoom: 'Deluxe Room',
    executiveSuite: 'Executive Suite',
    presidentialSuite: 'Presidential Suite',
    
    // Services
    servicesTitle: 'World-Class Services & Facilities',
    servicesSubtitle: 'We provide you with a comprehensive experience of premium services',
    spa: 'Luxury Spa',
    restaurant: 'Fine Dining',
    fitness: 'Fitness Center',
    pool: 'Swimming Pool',
    concierge: 'Concierge Service',
    business: 'Business Center',
    
    // Contact
    contactTitle: 'Contact Us',
    contactSubtitle: 'We are here to serve you 24/7',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    
    // Form
    name: 'Name',
    emailLabel: 'Email',
    message: 'Message',
    checkIn: 'Check-in Date',
    checkOut: 'Check-out Date',
    guests: 'Guests',
    
    // About
    aboutTitle: 'Story of Luxury',
    aboutSubtitle: 'An exceptional experience that combines heritage and modernity',
    
    // Footer
    followUs: 'Follow Us',
    quickLinks: 'Quick Links',
    contactInfo: 'Contact Information',
  },
  
  tr: {
    // Navigation
    home: 'Ana Sayfa',
    rooms: 'Odalar ve Süitler',
    services: 'Hizmetler ve Olanaklar',
    gallery: 'Galeri',
    about: 'Hakkımızda',
    contact: 'İletişim',
    reservation: 'Rezervasyon',
    
    // Hero Section
    welcome: 'Zarafet ve konfor burada başlar',
    heroSubtitle: 'Lüks ve zarif misafirperverliğin olağanüstü deneyimi',
    bookNow: 'Şimdi Rezervasyon',
    exploreRooms: 'Odaları Keşfet',
    
    // Common
    learnMore: 'Daha Fazla Bilgi',
    viewAll: 'Tümünü Gör',
    readMore: 'Devamını Oku',
    close: 'Kapat',
    submit: 'Gönder',
    
    // Rooms
    roomsTitle: 'Lüks Odalar ve Süitler',
    roomsSubtitle: 'Titizlikle tasarlanmış odalarımızda olağanüstü bir konaklama deneyimi yaşayın',
    deluxeRoom: 'Delüks Oda',
    executiveSuite: 'Yönetici Süiti',
    presidentialSuite: 'Başkanlık Süiti',
    
    // Services
    servicesTitle: 'Dünya Standartlarında Hizmetler ve Olanaklar',
    servicesSubtitle: 'Size premium hizmetlerin kapsamlı deneyimini sunuyoruz',
    spa: 'Lüks Spa',
    restaurant: 'Gurme Restoran',
    fitness: 'Fitness Merkezi',
    pool: 'Yüzme Havuzu',
    concierge: 'Konsiyerj Hizmeti',
    business: 'İş Merkezi',
    
    // Contact
    contactTitle: 'İletişim',
    contactSubtitle: '7/24 hizmetinizdeyiz',
    phone: 'Telefon',
    email: 'E-posta',
    address: 'Adres',
    
    // Form
    name: 'Ad',
    emailLabel: 'E-posta',
    message: 'Mesaj',
    checkIn: 'Giriş Tarihi',
    checkOut: 'Çıkış Tarihi',
    guests: 'Misafir Sayısı',
    
    // About
    aboutTitle: 'Lüks Hikayesi',
    aboutSubtitle: 'Mirası ve modernliği birleştiren olağanüstü deneyim',
    
    // Footer
    followUs: 'Bizi Takip Edin',
    quickLinks: 'Hızlı Bağlantılar',
    contactInfo: 'İletişim Bilgileri',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'ar' | 'en' | 'tr'>('ar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem('language') as 'ar' | 'en' | 'tr';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language);
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      translations: translations[language],
      isRTL 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}