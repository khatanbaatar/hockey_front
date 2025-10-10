'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'mn' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation keys and their values
const translations = {
  mn: {
    // Navigation
    'nav.home': 'Нүүр',
    'nav.about': 'Бидний тухай',
    'nav.structure': 'Бүтэц зохион байгуулалт',
    'nav.infrastructure': 'Дэд бүтэц',
    'nav.training': 'Сургалт, семинар',
    'nav.teams': 'Багууд',
    'nav.gallery': 'Зураг болон бичлэгийн галерей',
    'nav.gallery-photos': 'Зургууд',
    'nav.gallery-videos': 'Бичлэгүүд',
    'nav.schedule': 'Тэмцээний төлөвлөгөө',
    'nav.referees': 'Шүүгчид',
    'nav.rules': 'Дүрэм журам',
    'nav.statistics': 'Статистик',
    'nav.osh': 'ХАБ',
    'nav.national-team': 'Үндэсний шигшээ баг',
    'nav.history': 'Түүхэн замнал',
    
    // Gallery sub-items
    'nav.photos': 'Photos',
    'nav.videos': 'Videos',
    
    // About sub-items
    'nav.president': 'Ерөнхийлөгч',
    'nav.leadership': 'Удирдлагын баг',
    'nav.federation-info': 'Холбооны тухай',
    'nav.news': 'Мэдээ мэдээлэл',
    
    // Common
    'common.loading': 'Ачааллаж байна...',
    'common.error': 'Алдаа гарлаа',
    'common.not-found': 'Хуудас олдсонгүй',
    'common.page-not-found': 'Хүссэн хуудас олдсонгүй.',
    'common.media-content': 'Медиа контент',
    
    // Language switcher
    'lang.mongolian': 'Монгол',
    'lang.english': 'English',
    
    // Homepage
    'home.title': 'Монгол улсын хоккейн холбоо',
    'home.subtitle': 'Хоккейн спортын хөгжүүлэлт, тэмцээн зохион байгуулалт, мэргэжлийн хөгжүүлэлт',
    'home.teams-button': 'Багуудтай танилцах',
    'home.schedule-button': 'Тэмцээний хуваарь',
    'home.services-title': 'Үйлчилгээний талбар',
    'home.teams': 'Багууд',
    'home.teams-desc': 'Бүх түвшний баг, клубын мэдээлэл, холбоо барих мэдээлэл',
    'home.schedule': 'Тэмцээний хуваарь',
    'home.schedule-desc': 'Жилийн тэмцээний хуанли, цаг, байршлын мэдээлэл',
    'home.statistics': 'Статистик',
    'home.statistics-desc': 'Тэмцээний үр дүн, баг, тоглогчдын статистик',
    'home.training': 'Сургалт, семинар',
    'home.training-desc': 'Зөвлөгч, шүүгч, хүүхэд, залуучуудын сургалт',
    'home.gallery': 'Галерей',
    'home.gallery-desc': 'Зураг болон бичлэгийн цуглуулга',
    'home.rules': 'Дүрэм журам',
    'home.rules-desc': 'Холбооны дүрэм журам, хоккейн спортын дүрэм',
    'home.news-title': 'Сүүлийн мэдээлэл',
    'home.news-1-title': 'Шинэ тэмцээн зарлагдлаа',
    'home.news-1-desc': '2024 оны хоккейн аварга шалгаруулах тэмцээн эхэлж байна.',
    'home.news-2-title': 'Сургалт зохион байгуулагдаж байна',
    'home.news-2-desc': 'Зөвлөгчдийн мэргэжлийн хөгжүүлэлтийн сургалт эхэлж байна.',
    'home.news-3-title': 'Шинэ баг бүртгэгдлээ',
    'home.news-3-desc': 'Улаанбаатар хотын шинэ хоккейн клуб бүртгэгдлээ.',
    
    // Footer
    'footer.title': 'Монголын хоккейн холбоо',
    'footer.description': 'Монголын хоккейн спортын хөгжүүлэлт, тэмцээн зохион байгуулалт, мэргэжлийн хөгжүүлэлтийг дэмжих зорилготой.',
    'footer.contact': 'Холбоо барих',
    'footer.phone': 'Утас: +976 11 123456',
    'footer.email': 'Имэйл: info@hockey.mn',
    'footer.address': 'Хаяг: Улаанбаатар хот, Сүхбаатар дүүрэг',
    'footer.social': 'Сошиал сүлжээ',
    'footer.copyright': '© 2025 Монголын хоккейн холбоо. Бүх эрх хуулиар хамгаалагдсан.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.structure': 'Structure & Organization',
    'nav.infrastructure': 'Infrastructure',
    'nav.training': 'Training & Seminars',
    'nav.teams': 'Teams',
    'nav.gallery': 'Photo & Video Gallery',
    'nav.gallery-photos': 'Photos',
    'nav.gallery-videos': 'Videos',
    'nav.schedule': 'Competition Schedule',
    'nav.referees': 'Referees',
    'nav.rules': 'Rules & Regulations',
    'nav.statistics': 'Statistics',
    'nav.osh': 'OSH',
    'nav.national-team': 'National Team',
    'nav.history': 'History',
    
    // Gallery sub-items
    'nav.photos': 'Photos',
    'nav.videos': 'Videos',
    
    // About sub-items
    'nav.president': 'President',
    'nav.leadership': 'Leadership Team',
    'nav.federation-info': 'About Federation',
    'nav.news': 'News & Information',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error occurred',
    'common.not-found': 'Page not found',
    'common.page-not-found': 'The requested page was not found.',
    'common.media-content': 'Media Content',
    
    // Language switcher
    'lang.mongolian': 'Монгол',
    'lang.english': 'English',
    
    // Homepage
    'home.title': 'Mongolian Hockey Federation',
    'home.subtitle': 'Hockey sports development, competition organization, professional development',
    'home.teams-button': 'Explore Teams',
    'home.schedule-button': 'Competition Schedule',
    'home.services-title': 'Service Areas',
    'home.teams': 'Teams',
    'home.teams-desc': 'All level teams, club information, contact details',
    'home.schedule': 'Competition Schedule',
    'home.schedule-desc': 'Annual competition calendar, time, location information',
    'home.statistics': 'Statistics',
    'home.statistics-desc': 'Competition results, team and player statistics',
    'home.training': 'Training & Seminars',
    'home.training-desc': 'Coach, referee, children and youth training',
    'home.gallery': 'Gallery',
    'home.gallery-desc': 'Photo and video collection',
    'home.rules': 'Rules & Regulations',
    'home.rules-desc': 'Federation rules and regulations, hockey sports rules',
    'home.news-title': 'Latest News',
    'home.news-1-title': 'New Competition Announced',
    'home.news-1-desc': '2024 Hockey Championship competition has begun.',
    'home.news-2-title': 'Training Program Organized',
    'home.news-2-desc': 'Professional development training for coaches has started.',
    'home.news-3-title': 'New Team Registered',
    'home.news-3-desc': 'New hockey club in Ulaanbaatar has been registered.',
    
    // Footer
    'footer.title': 'Hockey Federation',
    'footer.description': 'Dedicated to supporting the development of Mongolian hockey sports, competition organization, and professional development.',
    'footer.contact': 'Contact Us',
    'footer.phone': 'Phone: +976 11 123456',
    'footer.email': 'Email: info@hockey.mn',
    'footer.address': 'Address: Ulaanbaatar City, Sukhbaatar District',
    'footer.social': 'Social Media',
    'footer.copyright': '© 2025 Mongolian Hockey Federation. All rights reserved.',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('mn');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'mn' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
