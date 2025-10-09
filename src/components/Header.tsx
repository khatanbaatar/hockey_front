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
  const { language,setLanguage } = useLanguage();
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
    const windowScroll = () => {
      const navbar = document.getElementById("topnav");
      if (navbar != null) {
          if (
              document.body.scrollTop >= 50 ||
              document.documentElement.scrollTop >= 50
          ) {
              navbar.classList.add("nav-sticky");
              // ⚠️ Таны JS-д defaultscroll-ийг арилгах код байхгүй тул,
              // энд бас арилгахгүй байхаар орхиё.
          } else {
              navbar.classList.remove("nav-sticky");
              // Scroll хийгээгүй үед defaultscroll класс байх ёстой
          }
      }
    }

    // Scroll listener нэмэх
    window.addEventListener('scroll', windowScroll);

    // Компонент устгагдахад listener-ийг цэвэрлэх
    return () => {
        window.removeEventListener('scroll', windowScroll);
    };
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
      <nav className="defaultscroll is-sticky">
        <div className="container relative">
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
    <nav id="topnav" className="defaultscroll is-sticky">
      <div className="container relative"> 
          {/* Logo */}
          <a href="/" className="logo">
          
          <Image
              src="/assets/logo.webp"
              alt="Монголын хоккейн холбоо"
              width={60}
              height={50}
              className="object-contain"
            />
          
            {/* <span className="text-xl font-bold text-gray-900">
              {language === 'mn' ? 'Монголын хоккейн холбоо' : 'Mongolian Hockey Federation'}
            </span> */}
          </a>

          <ul className="buy-button list-none mb-0">
            <li className="inline mb-0">
                <a onClick={() => setLanguage('mn')}>
                    <span className="login-btn-primary"><span className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-indigo-600/5 hover:bg-indigo-600 border border-indigo-600/10 hover:border-indigo-600 text-indigo-600 hover:text-white"><i data-feather="settings" className="size-4"></i></span></span>
                    <span className="login-btn-light"><span className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-gray-50 hover:bg-gray-200 dark:bg-slate-900 dark:hover:bg-gray-700 border hover:border-gray-100 dark:border-gray-800 dark:hover:border-gray-700"><i data-feather="settings" className="size-4"></i></span></span>
                </a>
            </li>
            
            <li className="inline ps-1 mb-0">
                <a onClick={() => setLanguage('en')}>
                    <div className="login-btn-primary"><span className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-indigo-600 hover:bg-indigo-700 border border-indigo-600 hover:border-indigo-700 text-white"><i data-feather="shopping-cart" className="size-4"></i></span></div>
                    <div className="login-btn-light"><span className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-gray-50 hover:bg-gray-200 dark:bg-slate-900 dark:hover:bg-gray-700 border hover:border-gray-100 dark:border-gray-800 dark:hover:border-gray-700"><i data-feather="shopping-cart" className="size-4"></i></span></div>
                </a>
            </li>
        </ul>

          <div id="navigation">
          <ul className="navigation-menu nav-light">
            {menuItems.map((item) => (
              <li
                key={item.id}
                // Custom CSS-ийн классуудыг нэмнэ
                className={`${item.subItems && item.subItems.length > 0 ? 'has-submenu parent-parent-menu-item' : ''}`}
              >
                {/* Үндсэн цэсний линк / span */}
                {item.subItems && item.subItems.length > 0 ? (
                  <a className="sub-menu-item">
                    {item.name}
                    <span className="menu-arrow"></span>
                  </a>
                ) : (
                  <Link
                    href={`/${item.slug}`}
                    className={`sub-menu-item ${isActive(item) ? 'text-indigo-600' : ''}`}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Submenu (Энгийн Dropdown) */}
                {item.subItems && item.subItems.length > 0 && (
                  // 🚨 Зөвхөн "submenu" классыг үлдээснээр энгийн dropdown үүснэ.
                  <ul className="submenu">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          href={`/${item.slug}/${subItem.slug}`}
                          className="sub-menu-item"
                          onClick={() => setIsMenuOpen(false)} // Mobile-д зориулж нэмлээ
                        >
                          {subItem.name}
                          {/* Таны Custom Tag/Badge-ийг харуулна (API-аас ирдэг бол) */}
                          {/* {subItem.tag && ( 
                            <span className="bg-red-500 inline-block text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5 ms-1">
                                {subItem.tag}
                            </span>
                          )} */}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>


          {/* <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
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
          </div> */}

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
