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
    aboutStatsYears: "سنوات من التميز",
    aboutStatsGuests: "ضيوف راضون",
    aboutStatsCountries: "دول مخدومة",
    aboutStatsSatisfaction: "رضا الضيوف",
    aboutAwardSection: "الجوائز والتكريم",
    aboutAward1: "أفضل فندق في العالم",
    aboutAward2: "تميز الخدمة الفاخرة",
    aboutAward3: "أفضل تصميم فندقي",
    aboutAward4: "السياحة المستدامة",
    aboutAwardOrg1: "جوائز السفر",
    aboutAwardOrg2: "تميز الضيافة",
    aboutAwardOrg3: "جوائز العمارة",
    aboutAwardOrg4: "جوائز البيئة الخضراء",
    aboutAwardYear1: "2024",
    aboutAwardYear2: "2023",
    aboutAwardYear3: "2023",
    aboutAwardYear4: "2024",
    aboutAwardFacilitiesTitle: "مرافق حائزة على جوائز",
    aboutAwardFacilitiesDesc: "معترف بها عالميًا للتميز في الضيافة",
    
    // Footer
    followUs: 'تابعنا',
    quickLinks: 'روابط سريعة',
    contactInfo: 'معلومات التواصل',
    
    // Room Descriptions
    deluxeRoomDesc: 'غرفة ديلوكس أنيقة وواسعة مع وسائل راحة حديثة وإطلالات خلابة على المدينة.',
    executiveSuiteDesc: 'جناح تنفيذي فاخر مع منطقة معيشة منفصلة ووسائل راحة للأعمال.',
    presidentialSuiteDesc: 'جناح رئاسي فاخر مع إطلالات بانورامية ووسائل راحة حصرية.',
    
    // Room Amenities
    kingBed: 'سرير ملكي',
    freeWifi: 'واي فاي مجاني',
    smartTv: 'تلفزيون ذكي',
    luxuryBath: 'حمام فاخر',
    coffeeMachine: 'آلة قهوة',
    airConditioning: 'تكييف هواء',
    valetParking: 'خدمة صف السيارات',
    masterBedroom: 'غرفة نوم رئيسية',
    jacuzzi: 'جاكوزي',
    entertainmentSystem: 'نظام ترفيهي',
    kitchenette: 'مطبخ صغير',
    
    // Service Descriptions
    spaDesc: 'جدّد نشاطك مع علاجات السبا العالمية وبرامج العافية.',
    restaurantDesc: 'استمتع بتجربة طعام راقية مع مطاعمنا الحائزة على جوائز.',
    fitnessDesc: 'حافظ على لياقتك مع مركز اللياقة الحديث وخدمات التدريب الشخصي.',
    poolDesc: 'استرخِ في حمام السباحة الفاخر مع إطلالات خلابة.',
    conciergeDesc: 'فريق الكونسيرج متواجد لخدمتك على مدار الساعة.',
    businessDesc: 'أنجز أعمالك بسهولة مع مركز الأعمال المجهز بالكامل.',
    
    // Premium Services
    additionalPremium: 'خدمات إضافية مميزة',
    valetParkingPremium: 'خدمة صف السيارات',
    highSpeedWifi: 'واي فاي عالي السرعة',
    butlerService: 'خدمة الخادم الشخصي',
    airportTransfer: 'خدمة النقل من وإلى المطار',
    
    // Gallery
    gallerySubtitle: 'اكتشف الأناقة والفخامة التي تنتظرك في فندقنا',
    galleryRooms: 'الغرف',
    gallerySuites: 'الأجنحة',
    galleryDining: 'المطاعم',
    galleryFacilities: 'المرافق',
    gallerySpa: 'السبا',
    galleryLobby: 'الردهة',
    galleryFitness: 'اللياقة',
    galleryServices: 'الخدمات',
    
    // Footer
    footerText: 'اختبر الفخامة والخدمة الاستثنائية في فندقنا العالمي. نصنع لحظات لا تُنسى منذ أكثر من 50 عامًا.',
    privacyPolicy: 'سياسة الخصوصية',
    termsOfService: 'شروط الخدمة',
    cookiePolicy: 'سياسة الكوكيز',
    fineDining: 'طعام راقٍ',
    roomService: 'خدمة الغرف',
    barLounge: 'بار وصالة',
    privateDining: 'طعام خاص',
    aboutLong1: 'لأكثر من خمسة عقود، كان فندقنا مرادفًا للفخامة والأناقة والخدمة الاستثنائية. لقد أعدنا باستمرار تعريف معايير الضيافة مع الحفاظ على التزامنا بخلق تجارب لا تُنسى لضيوفنا.',
    aboutLong2: 'يجمع تراثنا بين التقاليد الخالدة والابتكارات الحديثة، مما يضمن أن كل ضيف يستمتع بالمزيج المثالي من الراحة والفخامة والخدمة الشخصية التي جعلتنا اسمًا مميزًا في صناعة الضيافة.',
    countriesServed: 'الدول المخدومة',
    awards: 'الجوائز',
    makeReservation: 'احجز الآن',
    primeLocation: 'موقع مميز',
    primeLocationDesc: 'يقع في موقع استراتيجي وسط المدينة، بالقرب من أبرز المعالم السياحية والمرافق الحيوية',
    copyright: '© 2025 م.منصور الجبلي | Mansoor Gabali | MnsDew. جميع الحقوق محفوظة',
    meetingRooms: "غرف الاجتماعات",
    conferenceFacilities: "مرافق المؤتمرات",
    highSpeedInternet: "إنترنت عالي السرعة",
    secretarialServices: "خدمات السكرتارية",
    service247: "خدمة  24/7",
    tourPlanning: "تخطيط الجولات",
    reservations: "الحجوزات",
    transportation: "النقل",
    infinityPool: "مسبح إنفينيتي",
    poolBar: "بار المسبح",
    cabanas: "أكواخ",
    nightSwimming: "السباحة الليلية",
    quickResponse: "استجابة سريعة",
    primeLocationDescContact: " يقع في وسط المدينة بالقرب من جميع المعالم الرئيسية.",
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
    aboutStatsYears: "Years of Excellence",
    aboutStatsGuests: "Satisfied Guests",
    aboutStatsCountries: "Countries Served",
    aboutStatsSatisfaction: "Guest Satisfaction",
    aboutAwardSection: "Recognition & Awards",
    aboutAward1: "World's Best Hotel",
    aboutAward2: "Luxury Service Excellence",
    aboutAward3: "Best Hotel Design",
    aboutAward4: "Sustainable Tourism",
    aboutAwardOrg1: "Travel Awards",
    aboutAwardOrg2: "Hospitality Excellence",
    aboutAwardOrg3: "Architecture Awards",
    aboutAwardOrg4: "Green Awards",
    aboutAwardYear1: "2024",
    aboutAwardYear2: "2023",
    aboutAwardYear3: "2023",
    aboutAwardYear4: "2024",
    aboutAwardFacilitiesTitle: "Award-Winning Facilities",
    aboutAwardFacilitiesDesc: "Recognized globally for excellence in hospitality",
    
    // Footer
    followUs: 'Follow Us',
    quickLinks: 'Quick Links',
    contactInfo: 'Contact Information',
    
    // Room Descriptions
    deluxeRoomDesc: 'Elegant and spacious deluxe room with modern amenities and stunning city views.',
    executiveSuiteDesc: 'Luxurious executive suite with separate living area and premium business amenities.',
    presidentialSuiteDesc: 'Our crown jewel - a presidential suite with panoramic views and exclusive amenities.',
    
    // Room Amenities
    kingBed: 'King Bed',
    freeWifi: 'Free WiFi',
    smartTv: 'Smart TV',
    luxuryBath: 'Luxury Bath',
    coffeeMachine: 'Coffee Machine',
    airConditioning: 'Air Conditioning',
    valetParking: 'Valet Parking',
    masterBedroom: 'Master Bedroom',
    jacuzzi: 'Jacuzzi',
    entertainmentSystem: 'Entertainment System',
    kitchenette: 'Kitchenette',
    
    // Service Descriptions
    spaDesc: 'Rejuvenate your body and soul with our world-class spa treatments and wellness programs.',
    restaurantDesc: 'Experience culinary excellence with our award-winning restaurants and diverse cuisine options.',
    fitnessDesc: 'Stay fit and healthy with our state-of-the-art fitness center and personal training services.',
    poolDesc: 'Relax and unwind in our luxurious swimming pool with stunning city views.',
    conciergeDesc: 'Our dedicated concierge team is available 24/7 to assist with all your needs.',
    businessDesc: 'Conduct business seamlessly with our fully equipped business center and meeting rooms.',
    
    // Premium Services
    additionalPremium: 'Additional Premium Services',
    valetParkingPremium: 'Valet Parking',
    highSpeedWifi: 'High-Speed WiFi',
    butlerService: 'Butler Service',
    airportTransfer: 'Airport Transfer',
    
    // Gallery
    gallerySubtitle: 'Discover the elegance and luxury that awaits you at our hotel',
    galleryRooms: 'Rooms',
    gallerySuites: 'Suites',
    galleryDining: 'Dining',
    galleryFacilities: 'Facilities',
    gallerySpa: 'Spa',
    galleryLobby: 'Lobby',
    galleryFitness: 'Fitness',
    galleryServices: 'Services',
    
    // Footer
    footerText: 'Experience unparalleled luxury and exceptional service at our world-class hotel. Creating memorable moments for over 50 years.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    cookiePolicy: 'Cookie Policy',
    fineDining: 'Fine Dining',
    roomService: 'Room Service',
    barLounge: 'Bar & Lounge',
    privateDining: 'Private Dining',
    aboutLong1: 'For over five decades, our hotel has been synonymous with luxury, elegance, and exceptional service. We have consistently redefined hospitality standards while maintaining our commitment to creating unforgettable experiences for our guests.',
    aboutLong2: 'Our heritage combines timeless traditions with modern innovations, ensuring that every guest enjoys the perfect blend of comfort, luxury, and personalized service that has made us a distinguished name in the hospitality industry.',
    countriesServed: 'Countries Served',
    awards: 'Awards',
    makeReservation: 'Make Reservation',
    primeLocation: 'Prime Location',
    primeLocationDesc: 'Located in the heart of the city with easy access to major attractions',
    copyright: '© 2025 Mansoor Gabali | MnsDew. All rights reserved.',
    meetingRooms: "Meeting Rooms",
    conferenceFacilities: "Conference Facilities",
    highSpeedInternet: "High-Speed Internet",
    secretarialServices: "Secretarial Services",
    service247: "Service 24/7",
    tourPlanning: "Tour Planning",
    reservations: "Reservations",
    transportation: "Transportation",
    infinityPool: "Infinity Pool",
    poolBar: "Pool Bar",
    cabanas: "Cabanas",
    nightSwimming: "Night Swimming",
    quickResponse: "Quick Response",
    primeLocationDescContact: "Located in the city center, close to all major attractions.",
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
    aboutStatsYears: "Mükemmellik Yılları",
    aboutStatsGuests: "Memnun Misafirler",
    aboutStatsCountries: "Hizmet Verilen Ülkeler",
    aboutStatsSatisfaction: "Misafir Memnuniyeti",
    aboutAwardSection: "Tanıma ve Ödüller",
    aboutAward1: "Dünyanın En İyi Oteli",
    aboutAward2: "Lüks Hizmet Mükemmelliği",
    aboutAward3: "En İyi Otel Tasarımı",
    aboutAward4: "Sürdürülebilir Turizm",
    aboutAwardOrg1: "Seyahat Ödülleri",
    aboutAwardOrg2: "Konaklama Mükemmelliği",
    aboutAwardOrg3: "Mimarlık Ödülleri",
    aboutAwardOrg4: "Yeşil Ödüller",
    aboutAwardYear1: "2024",
    aboutAwardYear2: "2023",
    aboutAwardYear3: "2023",
    aboutAwardYear4: "2024",
    aboutAwardFacilitiesTitle: "Ödüllü Tesisler",
    aboutAwardFacilitiesDesc: "Konaklamada mükemmellik için küresel olarak tanınmıştır",
    
    // Footer
    followUs: 'Bizi Takip Edin',
    quickLinks: 'Hızlı Bağlantılar',
    contactInfo: 'İletişim Bilgileri',
    
    // Room Descriptions
    deluxeRoomDesc: 'Modern olanaklara ve muhteşem şehir manzarasına sahip şık ve ferah delüks oda.',
    executiveSuiteDesc: 'Ayrı oturma alanı ve iş olanaklarıyla lüks yönetici süiti.',
    presidentialSuiteDesc: 'Taç mücevherimiz - panoramik manzaralı ve ayrıcalıklı olanaklara sahip başkanlık süiti.',
    
    // Room Amenities
    kingBed: 'King Yatak',
    freeWifi: 'Ücretsiz WiFi',
    smartTv: 'Akıllı TV',
    luxuryBath: 'Lüks Banyo',
    coffeeMachine: 'Kahve Makinesi',
    airConditioning: 'Klima',
    valetParking: 'Vale Park Hizmeti',
    masterBedroom: 'Ana Yatak Odası',
    jacuzzi: 'Jakuzi',
    entertainmentSystem: 'Eğlence Sistemi',
    kitchenette: 'Mini Mutfak',
    
    // Service Descriptions
    spaDesc: 'Dünya standartlarında spa bakımları ve sağlıklı yaşam programları ile kendinizi yenileyin.',
    restaurantDesc: 'Ödüllü restoranlarımız ve çeşitli mutfak seçeneklerimizle mutfak mükemmelliğini yaşayın.',
    fitnessDesc: 'Son teknoloji fitness merkezimiz ve kişisel antrenör hizmetlerimizle formda kalın.',
    poolDesc: 'Muhteşem şehir manzaralı lüks yüzme havuzumuzda rahatlayın.',
    conciergeDesc: 'Özel konsiyerj ekibimiz tüm ihtiyaçlarınız için 7/24 hizmetinizde.',
    businessDesc: 'Tam donanımlı iş merkezimiz ve toplantı odalarımız ile işlerinizi sorunsuzca yürütün.',
    
    // Premium Services
    additionalPremium: 'Ekstra Premium Hizmetler',
    valetParkingPremium: 'Vale Park Hizmeti',
    highSpeedWifi: 'Yüksek Hızlı WiFi',
    butlerService: 'Uşak Hizmeti',
    airportTransfer: 'Havalimanı Transferi',
    
    // Gallery
    gallerySubtitle: 'Otelimizde sizi bekleyen zarafet ve lüksü keşfedin',
    galleryRooms: 'Odalar',
    gallerySuites: 'Süitler',
    galleryDining: 'Yemek',
    galleryFacilities: 'Olanaklar',
    gallerySpa: 'Spa',
    galleryLobby: 'Lobi',
    galleryFitness: 'Fitness',
    galleryServices: 'Hizmetler',
    
    // Footer
    footerText: 'Dünya standartlarında otelimizde benzersiz lüksü ve olağanüstü hizmeti deneyimleyin. 50 yılı aşkın süredir unutulmaz anlar yaratıyoruz.',
    privacyPolicy: 'Gizlilik Politikası',
    termsOfService: 'Hizmet Şartları',
    cookiePolicy: 'Çerez Politikası',
    fineDining: 'Gurme Yemek',
    roomService: 'Oda Servisi',
    barLounge: 'Bar & Dinlenme Salonu',
    privateDining: 'Özel Yemek',
    aboutLong1: 'Yarım asırdan fazla bir süredir otelimiz lüks, zarafet ve olağanüstü hizmetin simgesi olmuştur. Misafirlerimiz için unutulmaz deneyimler yaratma taahhüdümüzü sürdürürken, konaklama standartlarını sürekli olarak yeniden tanımladık.',
    aboutLong2: 'Mirasımız, her misafirin konfor, lüks ve kişiselleştirilmiş hizmetin mükemmel birleşimini yaşamasını sağlayan zamansız gelenekleri modern yeniliklerle birleştirir.',
    countriesServed: 'Hizmet Verilen Ülkeler',
    awards: 'Ödüller',
    makeReservation: 'Rezervasyon Yap',
    primeLocation: 'Merkezi Konum',
    primeLocationDesc: 'Şehrin kalbinde, başlıca cazibe merkezlerine kolay erişim ile',
    copyright: '© 2025 Mansoor Gabali | MnsDew. Tüm hakları saklıdır.',
    meetingRooms: "Toplantı Odaları",
    conferenceFacilities: "Konferans Olanakları",
    highSpeedInternet: "Yüksek Hızlı İnternet",
    secretarialServices: "Sekreterlik Hizmetleri",
    service247: "7/24 Hizmet",
    tourPlanning: "Tur Planlama",
    reservations: "Rezervasyonlar",
    transportation: "Ulaşım",
    infinityPool: "Sonsuzluk Havuzu",
    poolBar: "Havuz Barı",
    cabanas: "Kabanalar",
    nightSwimming: "Gece Yüzme",
    quickResponse: "Hızlı Yanıt",
    primeLocationDescContact: "Şehir merkezinde, tüm önemli cazibe merkezlerine yakın.",
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