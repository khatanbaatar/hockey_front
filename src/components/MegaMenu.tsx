'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
      className={`mega-menu absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 z-50 ${isOpen ? 'show' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
          {megaMenuData.categories.map((category) => (
            <div key={category.id} className="mega-menu-column">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center">
                <i className={`${category.icon} mr-2`}></i>
                {category.name}
              </h3>
              <div className="space-y-4">
                {category.sections.map((section) => (
                  <div key={section.id} className="space-y-2">
                    <Link
                      href={section.link_url}
                      className={`block text-sm font-medium ${section.text_color} hover:opacity-80 transition-opacity duration-200`}
                      onClick={onClose}
                    >
                      {section.title}
                    </Link>

                    {category.slug === 'infrastructure' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {section.items.map((item) => (
                          <Link
                            key={item.id}
                            href={item.link_url}
                            onClick={onClose}
                            className="group rounded-lg overflow-hidden border border-gray-200 hover:shadow transition-shadow duration-200 bg-white"
                          >
                            <div className="relative h-28 w-full">
                              {item.image_url ? (
                                <Image
                                  src={item.image_url}
                                  alt={item.name}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                  className="object-cover"
                                  unoptimized
                                />
                              ) : (
                                <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400">
                                  <i className={`${item.icon} text-xl`}></i>
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="p-3">
                              <div className="flex items-center text-sm font-medium text-gray-800">
                                <i className={`${item.icon} mr-2 text-xs text-gray-500`}></i>
                                {item.name}
                                {item.badge_text && (
                                  <span className={`ml-2 px-1.5 py-0.5 text-xs font-bold text-white rounded ${item.badge_color || 'bg-red-500'}`}>
                                    {item.badge_text}
                                  </span>
                                )}
                              </div>
                              {item.description && (
                                <p className="mt-1 text-xs text-gray-500 line-clamp-2">{item.description}</p>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <ul className="space-y-1 ml-2">
                        {section.items.map((item) => (
                          <li key={item.id}>
                            <Link
                              href={item.link_url}
                              className="block text-xs text-gray-600 hover:text-indigo-500 transition-colors duration-200 py-1 flex items-center"
                              onClick={onClose}
                            >
                              <i className={`${item.icon} mr-2 text-xs`}></i>
                              {item.name}
                              {item.badge_text && (
                                <span className={`ml-2 px-1.5 py-0.5 text-xs font-bold text-white rounded ${item.badge_color || 'bg-red-500'}`}>
                                  {item.badge_text}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Featured Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {megaMenuData.featured.map((item) => (
              <Link
                key={item.id}
                href={item.link_url}
                className={`${item.background_color} p-6 rounded-lg hover:shadow-md transition-shadow duration-200`}
                onClick={onClose}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className={`font-semibold ${item.text_color} mb-2 flex items-center`}>
                      <i className={`${item.icon} mr-2`}></i>
                      {item.title}
                      {item.badge_text && (
                        <span className="ml-2 px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded">
                          {item.badge_text}
                        </span>
                      )}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  </div>
                  <div className={`${item.text_color} text-sm font-medium`}>
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
