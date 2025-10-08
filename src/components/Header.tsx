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
  const { language } = useLanguage();
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
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/assets/logo.webp"
                alt="Монголын хоккейн холбоо"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-xl font-bold text-gray-900">Монголын хоккейн холбоо</span>
            </div>
            <div className="animate-pulse text-gray-500">Loading...</div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/assets/logo.webp"
              alt="Монголын хоккейн холбоо"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="text-xl font-bold text-gray-900">
              {language === 'mn' ? 'Монголын хоккейн холбоо' : 'Mongolian Hockey Federation'}
            </span>
          </Link>

          {/* Desktop Navigation Menu - Center */}
          <div className="hidden md:flex items-center">
            <ul className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <li key={item.id} className="relative group">
                  {item.subItems && item.subItems.length > 0 ? (
                    <span className="block py-2 px-3 text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer flex items-center font-medium">
                      {item.name}
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  ) : (
                    <Link
                      href={`/${item.slug}`}
                      className={`block py-2 px-3 text-gray-700 hover:text-indigo-600 transition-colors font-medium ${
                        isActive(item) ? 'text-indigo-600' : ''
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                
                  {/* Dropdown for sub-items */}
                  {item.subItems && item.subItems.length > 0 && (
                    <ul className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-64 border border-gray-200">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.id}>
                          <Link
                            href={`/${item.slug}/${subItem.slug}`}
                            className="block py-3 px-4 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                          >
                            <div className="font-medium text-gray-900">{subItem.name}</div>
                            {subItem.description && (
                              <div className="text-sm text-gray-500 mt-1">
                                {subItem.description}
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
          </div>

          {/* Right side - Language Switcher and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span className="block h-0.5 w-6 bg-gray-900"></span>
                <span className="block h-0.5 w-6 bg-gray-900"></span>
                <span className="block h-0.5 w-6 bg-gray-900"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
        <div className="container mx-auto px-4 py-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.subItems && item.subItems.length > 0 ? (
                  <div className="block py-3 px-4 rounded-lg transition-colors cursor-pointer hover:bg-gray-50 text-gray-700">
                    <div className="font-semibold flex items-center">
                      {item.name}
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {item.description && (
                      <div className="text-sm text-gray-500 mt-1">
                        {item.description}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={`/${item.slug}`}
                    className="block py-3 px-4 rounded-lg transition-colors hover:bg-gray-50 text-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="font-medium">{item.name}</div>
                    {item.description && (
                      <div className="text-sm text-gray-500 mt-1">
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
                          className="block py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-600"
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
        </div>
          </div>
        )}
      </div>
    </nav>
  );
}
