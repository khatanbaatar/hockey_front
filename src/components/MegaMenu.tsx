"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MenuItem } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface MegaMenuSection {
  id: number;
  title: string;
  description: string;
  icon: string;
  background_color: string;
  text_color: string;
  is_featured: boolean;
  link_url: string;
  items: Array<{
    id: number;
    name: string;
    slug: string;
    description: string;
    icon: string;
    link_url: string;
    image_url?: string;
    badge_text?: string;
    badge_color?: string;
  }>;
}

interface MegaMenuCategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
  sort_order: number;
  sections: MegaMenuSection[];
}

interface MegaMenuData {
  categories: MegaMenuCategory[];
  featured: Array<{
    id: number;
    title: string;
    description: string;
    icon: string;
    background_color: string;
    text_color: string;
    link_url: string;
    badge_text?: string;
  }>;
}

interface MegaMenuProps {
  menuItems: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const MegaMenu = ({ menuItems, isOpen, onClose, onMouseEnter, onMouseLeave }: MegaMenuProps) => {
  const [megaMenuData, setMegaMenuData] = useState<MegaMenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchMegaMenuData = async () => {
      try {
        const api = "https://hockey.onol.tech";
        const response = await fetch(api + `/api/mega-menu?language=${language}`);
        const data = await response.json();
        
        if (data.success) {
          setMegaMenuData(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch mega menu data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMegaMenuData();
  }, [language]);

  if (!isOpen || loading || !megaMenuData) return null;

  return (
    <div
      className={`mega-menu absolute top-full left-0 w-full bg-white shadow-sm border border-gray-100 rounded-md z-50 ${isOpen ? 'show' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-4 py-6">
        {/* Simple multi-column list like the screenshot */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {megaMenuData.categories.map((category) => (
            <div key={category.id} className="mega-menu-column">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
                {category.name}
              </h3>
              <div className="space-y-2 text-sm">
                {category.sections.map((section) => (
                  <div key={section.id}>
                    {/* Show section title as a small bold link */}
                    <Link
                      href={section.link_url}
                      className="block text-xs font-medium text-gray-700 hover:text-indigo-600 py-1 px-1"
                      onClick={onClose}
                    >
                      {section.title}
                    </Link>
                    <ul className="mt-1 space-y-1 ml-2">
                      {section.items.map((item) => (
                        <li key={item.id}>
                          <Link
                            href={item.link_url}
                            className="block text-xs text-gray-600 hover:text-indigo-600 transition-colors duration-150 py-1 px-2 rounded-sm hover:bg-gray-50"
                            onClick={onClose}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
