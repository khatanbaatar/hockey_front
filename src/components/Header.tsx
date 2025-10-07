'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MenuItem } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const fetchMenuItems = async () => {
      const api = "https://hockey.onol.tech";
      try {
        const response = await fetch(api+`/api/menu?language=${language}`);
        const data = await response.json();
        
        if (data.success) {
          setMenuItems(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [language]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if menu item is active
  const isActive = (item: MenuItem) => {
    const currentPath = pathname.replace(/\/$/, ''); // Remove trailing slash
    const itemPath = `/${item.slug}`;
    
    // Check if current path matches the menu item path
    if (currentPath === itemPath) return true;
    
    // Check if current path starts with the menu item path (for sub-pages)
    if (currentPath.startsWith(itemPath + '/')) return true;
    
    return false;
  };

  if (loading) {
    return (
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src="/assets/logo.webp"
                alt="Монголын хоккейн холбоо"
                width={80}
                height={80}
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-bold">Монголын хоккейн холбоо</span>
            </div>
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 hover:text-blue-200 transition-colors">
            <Image
              src="/assets/logo.webp"
              alt="Монголын хоккейн холбоо"
              width={50}
              height={50}
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold">
              {language === 'mn' ? 'Монголын хоккейн холбоо' : 'Mongolian Hockey Federation'}
            </span>
          </Link>
          
          {/* Language Switcher - Desktop */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-blue-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <nav className="hidden md:block mt-4">
          <ul className="flex flex-wrap gap-6">
            {menuItems.map((item) => (
              <li key={item.id} className="relative group">
                {item.subItems && item.subItems.length > 0 ? (
                  <span className={`block py-2 px-3 rounded-lg transition-colors cursor-pointer ${
                    isActive(item) 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-blue-800 text-blue-100 hover:text-white'
                  }`}>
                    {item.name}
                    <svg className="inline-block ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                ) : (
                  <Link
                    href={`/${item.slug}`}
                    className={`block py-2 px-3 rounded-lg transition-colors ${
                      isActive(item)
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-blue-800 text-white hover:text-blue-100'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
                
                {/* Dropdown for sub-items */}
                {item.subItems && item.subItems.length > 0 && (
                  <ul className={`absolute top-full left-0 mt-1 bg-blue-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ${
                    item.slug === 'gallery' ? 'w-96' : 'w-64'
                  }`}>
                    {item.subItems.map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          href={`/${item.slug}/${subItem.slug}`}
                          className="block py-3 px-4 hover:bg-blue-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                        >
                          <div className="font-medium">{subItem.name}</div>
                          {subItem.description && (
                            <div className="text-sm text-blue-200 mt-1">
                              {subItem.description}
                            </div>
                          )}
                          
                          {/* Grid preview for gallery items */}
                          {item.slug === 'gallery' && (
                            <div className="mt-3 grid grid-cols-4 gap-1">
                              {subItem.slug === 'photos' && (
                                <>
                                  <div className="aspect-square bg-blue-600 rounded overflow-hidden">
                                    <img src="/assets/header-bg.webp" alt="Preview 1" className="w-full h-full object-cover" />
                                  </div>
                                  <div className="aspect-square bg-blue-600 rounded overflow-hidden">
                                    <img src="/assets/header-bg-1.webp" alt="Preview 2" className="w-full h-full object-cover" />
                                  </div>
                                  <div className="aspect-square bg-blue-600 rounded overflow-hidden">
                                    <img src="/assets/president.jpeg" alt="Preview 3" className="w-full h-full object-cover" />
                                  </div>
                                  <div className="aspect-square bg-blue-600 rounded overflow-hidden">
                                    <img src="/assets/logo.webp" alt="Preview 4" className="w-full h-full object-cover" />
                                  </div>
                                </>
                              )}
                              {subItem.slug === 'videos' && (
                                <>
                                  <div className="aspect-square bg-blue-600 rounded flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                                    </svg>
                                  </div>
                                  <div className="aspect-square bg-blue-600 rounded flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                                    </svg>
                                  </div>
                                  <div className="aspect-square bg-blue-600 rounded flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                                    </svg>
                                  </div>
                                  <div className="aspect-square bg-blue-600 rounded flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
                                    </svg>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 bg-blue-800 rounded-lg p-4">
            {/* Language Switcher - Mobile */}
            <div className="mb-4 pb-4 border-b border-blue-700">
              <LanguageSwitcher />
            </div>
            
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  {item.subItems && item.subItems.length > 0 ? (
                    <div className={`block py-3 px-4 rounded-lg transition-colors cursor-pointer ${
                      isActive(item)
                        ? 'bg-blue-600'
                        : 'bg-blue-700 hover:bg-blue-600'
                    }`}>
                      <div className={`font-semibold flex items-center ${
                        isActive(item) ? 'text-white' : 'text-blue-100'
                      }`}>
                        {item.name}
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      {item.description && (
                        <div className="text-sm text-blue-200 mt-1">
                          {item.description}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={`/${item.slug}`}
                      className={`block py-3 px-4 rounded-lg transition-colors ${
                        isActive(item)
                          ? 'bg-blue-600'
                          : 'hover:bg-blue-700'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className={`font-medium ${
                        isActive(item) ? 'text-white' : 'text-white'
                      }`}>{item.name}</div>
                      {item.description && (
                        <div className="text-sm text-blue-200 mt-1">
                          {item.description}
                        </div>
                      )}
                    </Link>
                  )}
                  
                  {/* Mobile sub-items */}
                  {item.subItems && item.subItems.length > 0 && (
                    <ul className="ml-4 mt-2 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.id}>
                          <Link
                            href={`/${item.slug}/${subItem.slug}`}
                            className="block py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
