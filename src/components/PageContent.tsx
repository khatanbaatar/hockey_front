'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PageContent as PageContentType } from '@/types';
import Breadcrumb from './Breadcrumb';
import LoadingSpinner from './LoadingSpinner';
import { useLanguage } from '@/contexts/LanguageContext';

interface PageContentProps {
  slug: string;
}

export default function PageContent({ slug }: PageContentProps) {
  const [content, setContent] = useState<PageContentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchPageContent = async () => {
      const api = "http://5.135.26.43:15400";
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(api+`/api/page/${slug}?language=${language}`);
        const data = await response.json();
        
        if (data.success) {
          setContent(data.data);
        } else {
          setError(data.message || 'Failed to load page content');
        }
      } catch (err) {
        setError('Failed to load page content');
        console.error('Error fetching page content:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPageContent();
    }
  }, [slug, language]);

  // Generate breadcrumb items based on slug
  const generateBreadcrumbs = (slug: string): Array<{ label: string; href?: string }> => {
    const items: Array<{ label: string; href?: string }> = [{ label: t('nav.home'), href: '/' }];
    
    // Map slug to readable labels
    const slugLabels: Record<string, string> = {
      'about-us': t('nav.about'),
      'structure-organization': t('nav.structure'),
      'infrastructure': t('nav.infrastructure'),
      'training-seminar': t('nav.training'),
      'teams': t('nav.teams'),
      'gallery': t('nav.gallery'),
      'competition-schedule': t('nav.schedule'),
      'referees': t('nav.referees'),
      'rules-regulations': t('nav.rules'),
      'statistics': t('nav.statistics'),
      'osh': t('nav.osh'),
      'national-team': t('nav.national-team'),
      'history': t('nav.history')
    };

    // Handle sub-pages
    if (slug.includes('-')) {
      const parts = slug.split('-');
      const mainSlug = parts[0] + '-' + parts[1];
      const subSlug = parts.slice(2).join('-');
      
      if (slugLabels[mainSlug]) {
        items.push({ label: slugLabels[mainSlug], href: `/${mainSlug}` });
      }
      
      // Add sub-page label
      const subLabels: Record<string, string> = {
        'president': 'Ерөнхийлөгч',
        'leadership-team': 'Удирдлагын баг',
        'federation-info': 'Холбооны тухай',
        'federation-structure': 'Холбооны бүтэц',
        'positions-roles': 'Албан тушаал, үүрэг',
        'sports-fields': 'Спортын талбай',
        'halls': 'Заал',
        'technical-equipment': 'Техник хэрэгсэл',
        'provincial-infrastructure': 'Орон нутгийн дэд бүтэц',
        'coaches': 'Зөвлөгчид',
        'referees': 'Шүүгчид',
        'children': 'Хүүхэд',
        'youth': 'Залуучууд',
        'clubs': 'Клубууд',
        'federations': 'Холбоонууд',
        'education': 'Боловсрол',
        'international': 'Олон улсын',
        'clubs-teams-list': 'Баг, клубын жагсаалт',
        'contact-info': 'Холбоо барих мэдээлэл',
        'photos': 'Зургууд',
        'videos': 'Бичлэгүүд',
        'annual-calendar': 'Жилийн хуанли',
        'competition-details': 'Тэмцээний дэлгэрэнгүй',
        'referee-profiles': 'Шүүгчдийн профайл',
        'referee-qualifications': 'Мэргэжлийн чадвар',
        'federation-rules': 'Холбооны дүрэм',
        'hockey-rules': 'Хоккейн дүрэм',
        'competition-results': 'Тэмцээний үр дүн',
        'team-player-stats': 'Баг, тоглогчдын статистик',
        'safety-instructions': 'Аюулгүй ажиллагааны зааварчилгаа',
        'health-insurance': 'Эрүүл мэнд, даатгал',
        'national-team-roster': 'Үндэсний шигшээ багийн бүрэлдэхүүн',
        'participated-competitions': 'Оролцсон тэмцээн',
        'awards-incentives': 'Шагнал, урамшуулал',
        'federation-history': 'Холбооны түүх',
        'timeline': 'Цаг хугацааны дараалал'
      };
      
      if (subLabels[subSlug]) {
        items.push({ label: subLabels[subSlug] });
      }
    } else if (slugLabels[slug]) {
      items.push({ label: slugLabels[slug] });
    }
    
    return items;
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Breadcrumb items={generateBreadcrumbs(slug)} />
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner size="lg" text={t('common.loading')} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Breadcrumb items={generateBreadcrumbs(slug)} />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">{t('common.error')}</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen">
        <Breadcrumb items={generateBreadcrumbs(slug)} />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('common.not-found')}</h2>
            <p className="text-gray-600">{t('common.page-not-found')}</p>
          </div>
        </div>
      </div>
    );
  }

  // Special layout for gallery pages (photos and videos)
  if (slug === 'gallery-photos' || slug === 'gallery-videos') {
    return (
      <div className="min-h-screen">
        <Breadcrumb items={generateBreadcrumbs(slug)} />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <header className="mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {content.title}
              </h1>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {content.content}
                </p>
              </div>
            </header>

            {content.media && content.media.length > 0 && (
              <div className="animate-fade-in">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-6 lg:mb-8">
                  {t('common.media-content')}
                </h2>
                {/* 4x4 Grid Layout */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                  {content.media.map((media, index) => (
                    <div 
                      key={index} 
                      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {media.type === 'image' ? (
                        <div className="relative aspect-square">
                          <Image
                            src={media.url}
                            alt={media.caption || 'Media content'}
                            fill
                            className="object-cover"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="relative aspect-square">
                          <video
                            src={media.url}
                            controls
                            className="w-full h-full object-cover"
                            preload="metadata"
                          />
                        </div>
                      )}
                      {media.caption && (
                        <div className="p-3">
                          <p className="text-sm text-gray-600 font-medium line-clamp-2">{media.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {content.subSections && content.subSections.length > 0 && (
              <div className="mt-12 space-y-6 lg:space-y-8">
                {content.subSections.map((section, index) => (
                  <section 
                    key={index} 
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8 hover:shadow-md transition-shadow animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 lg:mb-6">
                      {section.title}
                    </h2>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                        {section.content}
                      </p>
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Special layout for president page
  if (slug === 'about-us-president') {
    return (
      <div className="min-h-screen">
        <Breadcrumb items={generateBreadcrumbs(slug)} />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left side - Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md">
                  <Image
                    src="/assets/president.jpeg"
                    alt="PRESIDENT OF MIHF JAVKHLAN BOLD"
                    width={500}
                    height={700}
                    className="w-full h-auto rounded-lg shadow-lg"
                    priority
                  />
                </div>
              </div>
              
              {/* Right side - Content */}
              <div className="space-y-6">
                <header className="animate-fade-in">
                  <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                    {content.title}
                  </h1>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed text-base lg:text-sm">
                      {content.content}
                    </p>
                  </div>
                </header>

                {content.subSections && content.subSections.length > 0 && (
                  <div className="space-y-6">
                    {content.subSections.map((section, index) => (
                      <section 
                        key={index} 
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {section.title !== 'Гарын үсэг' && (
                          <div className="prose prose-lg max-w-none mb-4">
                            <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                              {section.content}
                            </p>
                          </div>
                        )}
                        {section.title === 'Гарын үсэг' && (
                          <div className="mt-8 pt-6 border-t border-gray-200">
                            <p className="text-gray-800 font-medium text-lg italic">
                              {section.content}
                            </p>
                          </div>
                        )}
                      </section>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Breadcrumb items={generateBreadcrumbs(slug)} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {content.title}
            </h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {content.content}
              </p>
            </div>
          </header>

          {content.subSections && content.subSections.length > 0 && (
            <div className="space-y-6 lg:space-y-8">
              {content.subSections.map((section, index) => (
                <section 
                  key={index} 
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8 hover:shadow-md transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 lg:mb-6">
                    {section.title}
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                      {section.content}
                    </p>
                  </div>
                </section>
              ))}
            </div>
          )}

          {content.media && content.media.length > 0 && (
            <div className="mt-8 lg:mt-12 animate-fade-in">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-6 lg:mb-8">
                Медиа контент
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {content.media.map((media, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {media.type === 'image' ? (
                      <img
                        src={media.url}
                        alt={media.caption || 'Media content'}
                        className="w-full h-48 lg:h-56 object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <video
                        src={media.url}
                        controls
                        className="w-full h-48 lg:h-56 object-cover"
                        preload="metadata"
                      />
                    )}
                    {media.caption && (
                      <div className="p-4">
                        <p className="text-sm text-gray-600">{media.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
