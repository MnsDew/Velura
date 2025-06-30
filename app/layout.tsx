import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { LanguageProvider } from '@/providers/LanguageProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Luxury Palace Hotel - Premium Hospitality Experience',
  description: 'Experience unparalleled luxury at Palace Hotel. Premium rooms, world-class amenities, and exceptional service in the heart of the city.',
  keywords: 'luxury hotel, premium accommodation, five star hotel, hospitality, suites, restaurant, spa',
  authors: [{ name: 'Palace Hotel' }],
  creator: 'Palace Hotel',
  publisher: 'Palace Hotel',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Luxury Palace Hotel - Premium Hospitality Experience',
    description: 'Experience unparalleled luxury at Palace Hotel. Premium rooms, world-class amenities, and exceptional service.',
    url: 'https://palace-hotel.com',
    siteName: 'Palace Hotel',
    images: [
      {
        url: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
        width: 1200,
        height: 630,
        alt: 'Palace Hotel Luxury Suite',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Palace Hotel - Premium Hospitality Experience',
    description: 'Experience unparalleled luxury at Palace Hotel. Premium rooms, world-class amenities, and exceptional service.',
    images: ['https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}