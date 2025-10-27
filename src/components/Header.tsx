"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MenuItem } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import MegaMenu from './MegaMenu';
// import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [megaMenuTimeout, setMegaMenuTimeout] = useState<NodeJS.Timeout | null>(null);
  const [loading, setLoading] = useState(true);
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();

  // Helper functions for mega menu mouse events
  const handleMenuMouseEnter = (item: MenuItem) => {
    console.log('Menu mouse enter:', item.name);
    // Clear any existing timeout
    if (megaMenuTimeout) {
      clearTimeout(megaMenuTimeout);
      setMegaMenuTimeout(null);
    }
    
    // Only show mega menu for items with sub-items
    if (item.subItems && item.subItems.length > 0) {
      console.log('Opening mega menu for:', item.name);
      setIsMegaMenuOpen(true);
      setActiveMenuId(item.id);
    }
  };

  const handleMenuMouseLeave = () => {
    console.log('Menu mouse leave');
    // Clear any existing timeout
    if (megaMenuTimeout) {
      clearTimeout(megaMenuTimeout);
    }
    
    // Set a timeout to close the mega menu
    const timeout = setTimeout(() => {
      console.log('Closing mega menu due to timeout');
      setIsMegaMenuOpen(false);
      setActiveMenuId(null);
    }, 300);
    setMegaMenuTimeout(timeout);
  };

  const handleMegaMenuMouseEnter = () => {
    console.log('Mega menu mouse enter');
    // Clear any existing timeout when entering mega menu
    if (megaMenuTimeout) {
      clearTimeout(megaMenuTimeout);
      setMegaMenuTimeout(null);
    }
  };

  const handleMegaMenuMouseLeave = () => {
    console.log('Mega menu mouse leave');
    // Clear any existing timeout
    if (megaMenuTimeout) {
      clearTimeout(megaMenuTimeout);
    }
    
    // Set a timeout to close the mega menu
    const timeout = setTimeout(() => {
      console.log('Closing mega menu due to timeout');
      setIsMegaMenuOpen(false);
      setActiveMenuId(null);
    }, 200);
    setMegaMenuTimeout(timeout);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (megaMenuTimeout) {
        clearTimeout(megaMenuTimeout);
      }
    };
  }, [megaMenuTimeout]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const api = "https://hockey.onol.tech";
      try {
        const response = await fetch(api + `/api/menu?language=${language}`);
        const data = await response.json();

        if (data.success) {
          setMenuItems(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch menu items:", error);
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
    };

    // Scroll listener нэмэх
    window.addEventListener("scroll", windowScroll);

    // Компонент устгагдахад listener-ийг цэвэрлэх
    return () => {
      window.removeEventListener("scroll", windowScroll);
    };
  }, [language]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if menu item is active
  const isActive = (item: MenuItem) => {
    const currentPath = pathname.replace(/\/$/, ""); // Remove trailing slash
    const itemPath = `/${item.slug}`;

    // Check if current path matches the menu item path
    if (currentPath === itemPath) return true;

    // Check if current path starts with the menu item path (for sub-pages)
    if (currentPath.startsWith(itemPath + "/")) return true;

    return false;
  };

  if (loading) {
    return (
      <nav id="topnav" className="defaultscroll is-sticky" >
        <div className="container relative">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/assets/logo.webp"
                alt=""
                width={32}
                height={32}
                className="object-contain"
                unoptimized={true}
              />
              <span className="text-xl font-bold text-gray-900">
                Монголын хоккейн холбоо
              </span>
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
        <Link href="/" className="logo relative z-10">
          <Image
            src="/assets/logo.webp"
            alt="Монголын хоккейн холбоо"
            width={60}
            height={50}
            className="object-contain"
            unoptimized={true}
          />

          {/* <span className="text-xl font-bold text-gray-900">
              {language === 'mn' ? 'Монголын хоккейн холбоо' : 'Mongolian Hockey Federation'}
            </span> */}
        </Link>

        <ul className="buy-button list-none mb-0 relative z-10">
          <li className="inline mb-0">
            <button
              type="button"
              onClick={() => { 
                console.log('Switching to Mongolian'); 
                setLanguage('mn'); 
                setIsMegaMenuOpen(false); 
              }}
              className={`cursor-pointer transition-all duration-300 ${
                language === 'mn' ? 'opacity-100' : 'opacity-60 hover:opacity-80'
              }`}
              title="Монгол хэл"
              aria-label="Switch to Mongolian"
            >
              <span className={`size-9 inline-flex text-sm items-center justify-center rounded-full border transition-all duration-300 font-bold ${
                language === 'mn'
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg'
                  : 'bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800'
              }`}>
                MN
              </span>
            </button>
          </li>

          <li className="inline ps-2 mb-0">
            <button
              type="button"
              onClick={() => { 
                console.log('Switching to English'); 
                setLanguage('en'); 
                setIsMegaMenuOpen(false); 
              }}
              className={`cursor-pointer transition-all duration-300 ${
                language === 'en' ? 'opacity-100' : 'opacity-60 hover:opacity-80'
              }`}
              title="English"
              aria-label="Switch to English"
            >
              <span className={`size-9 inline-flex text-sm items-center justify-center rounded-full border transition-all duration-300 font-bold ${
                language === 'en'
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg'
                  : 'bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800'
              }`}>
                EN
              </span>
            </button>
          </li>
        </ul>

        <div 
          id="navigation" 
          className="relative"
          onMouseLeave={handleMenuMouseLeave}
        >
          <ul className="navigation-menu nav-light">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`relative ${item.subItems && item.subItems.length > 0 ? 'has-submenu' : ''} ${isActive(item) ? 'active' : ''}`}
                onMouseEnter={() => handleMenuMouseEnter(item)}
              >
                {item.subItems && item.subItems.length > 0 ? (
                  <a className="sub-menu-item cursor-pointer">
                    {item.name}
                    <span className="menu-arrow"></span>
                  </a>
                ) : (
                  <Link
                    href={`/${item.slug}`}
                    className={`sub-menu-item ${isActive(item) ? "text-indigo-600" : ""
                      }`}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          
          {/* Mega Menu */}
          <MegaMenu
            menuItems={menuItems}
            isOpen={isMegaMenuOpen}
            onClose={() => {
              setIsMegaMenuOpen(false);
              setActiveMenuId(null);
            }}
            onMouseEnter={handleMegaMenuMouseEnter}
            onMouseLeave={handleMegaMenuMouseLeave}
          />
        </div>

        <div className="flex items-center space-x-4">
          {/* <LanguageSwitcher /> */}

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
                          <svg
                            className="ml-2 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
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
