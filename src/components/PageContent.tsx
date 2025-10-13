'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PageContent as PageContentType } from '@/types';
import Breadcrumb from './Breadcrumb';
import LoadingSpinner from './LoadingSpinner';
import { useLanguage } from '@/contexts/LanguageContext';
import LeagueTable from './LeagueTable';
import MasonryGallery from './MasonryGallery';
import PlayersGrid from './PlayersGrid';

interface PageContentProps {
  slug: string;
}

export default function PageContent({ slug }: PageContentProps) {
  const [content, setContent] = useState<PageContentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language, t } = useLanguage();
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState<{ url: string; caption?: string } | null>(null);

  // Lightbox functions
  const openLightbox = (imageUrl: string, caption?: string, index?: number) => {
    setCurrentImage({ url: imageUrl, caption });
    if (index !== undefined) {
      setCurrentImageIndex(index);
    }
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
  };

  const nextImage = () => {
    if (content?.media) {
      const images = content.media.filter(media => media.type === 'image');
      const nextIndex = (currentImageIndex + 1) % images.length;
      setCurrentImageIndex(nextIndex);
      setCurrentImage({ url: images[nextIndex].url, caption: images[nextIndex].caption });
    }
  };

  const prevImage = () => {
    if (content?.media) {
      const images = content.media.filter(media => media.type === 'image');
      const prevIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
      setCurrentImage({ url: images[prevIndex].url, caption: images[prevIndex].caption });
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowLeft') {
          prevImage();
        } else if (e.key === 'ArrowRight') {
          nextImage();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [lightboxOpen, nextImage, prevImage, closeLightbox]);

  useEffect(() => {
    const fetchPageContent = async () => {
      const api = "https://hockey.onol.tech";
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(api+`/api/page/${slug}?language=${language}`);
        const data = await response.json();
        
        if (data.success) {
          let pageData = data.data;
          
          // Add mock media data for gallery pages if no media exists
          if ((slug === 'gallery-photos' || slug === 'gallery-videos') && (!pageData.media || pageData.media.length === 0)) {
            const mediaType = slug === 'gallery-photos' ? 'image' : 'video';
            const mediaCount = 60; // More items for pagination testing
            
            // Hockey-related image categories for variety
            const hockeyImageCategories = [
              'sports', 'hockey', 'ice', 'team', 'player', 'game', 'stadium', 'equipment', 'training', 'match'
            ];
            
            const hockeyVideoCategories = [
              'hockey-game', 'training', 'match', 'celebration', 'highlights', 'interviews'
            ];
            
            pageData = {
              ...pageData,
              media: Array.from({ length: mediaCount }, (_, index) => {
                const category = mediaType === 'image' 
                  ? hockeyImageCategories[index % hockeyImageCategories.length]
                  : hockeyVideoCategories[index % hockeyVideoCategories.length];
                
                return {
                  type: mediaType,
                  url: mediaType === 'image' 
                    ? `https://picsum.photos/400/600?random=${index + 100}&category=${category}` 
                    : `https://sample-videos.com/zip/10/mp4/SampleVideo_${(index % 6) + 1}.mp4`,
                  caption: language === 'mn' 
                    ? `${mediaType === 'image' ? 'Хоккейн зураг' : 'Хоккейн бичлэг'} ${index + 1}` 
                    : `Hockey ${mediaType} ${index + 1}`
                };
              })
            };
          }
          
          setContent(pageData);
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
      'gallery-photos': t('nav.gallery-photos'),
      'gallery-videos': t('nav.gallery-videos'),
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
        'gallery-photos': 'Зургууд',
        'gallery-videos': 'Бичлэгүүд',
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
        <div className="pt-35 bg-gradient-to-r from-blue-900 to-blue-800 text-white"></div>
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
        <div className="pt-35 bg-gradient-to-r from-blue-900 to-blue-800 text-white"></div>
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

  // Special layout for competition results (league table)
  if (slug === 'statistics-competition-results') {
    return (
      <div className="min-h-screen">
        <section className="relative table w-full py-32 lg:py-40 bg-page-hero bg-no-repeat bg-center bg-cover">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900"></div>
            <div className="container relative">
                <div className="grid grid-cols-1 pb-8 text-center mt-10">
                    <h3 className="mb-3 text-3xl leading-normal font-medium text-white">
                      {content?.title || (language === 'mn' ? 'Тэмцээний үр дүн' : 'Competition Results')}
                    </h3>
                    <p className="text-slate-300 text-lg max-w-xl mx-auto">
                      {content?.content || (language === 'mn' ? 'Хоккейн тэмцээний үр дүн, оноо, байр' : 'Hockey competition results, scores and standings')}
                    </p>
                </div>
            </div>
        </section>
        <div className="relative">
            <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
                <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <LeagueTable competitions={content?.competitions} />
          </div>
        </div>
      </div>
    );
  }

  // Special layout for team player stats (players grid)
  if (slug === 'statistics-team-player-stats') {
    return (
      <div className="min-h-screen">
        <section className="relative table w-full py-32 lg:py-40 bg-page-hero bg-no-repeat bg-center bg-cover">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900"></div>
            <div className="container relative">
                <div className="grid grid-cols-1 pb-8 text-center mt-10">
                    <h3 className="mb-3 text-3xl leading-normal font-medium text-white">
                      {content?.title || (language === 'mn' ? 'Баг, тоглогчдын статистик' : 'Team & Player Statistics')}
                    </h3>
                    <p className="text-slate-300 text-lg max-w-xl mx-auto">
                      {content?.content || (language === 'mn' ? 'Хоккейн баг, тоглогчдын мэдээлэл, статистик' : 'Hockey team and player information, statistics')}
                    </p>
                </div>
            </div>
        </section>
        <div className="relative">
            <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
                <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <PlayersGrid players={content?.players} />
          </div>
        </div>
      </div>
    );
  }

  // Special layout for gallery pages (photos and videos)
  if (slug === 'gallery-photos' || slug === 'gallery-videos') {
    return (
      <div className="min-h-screen">
        <section className="relative table w-full py-32 lg:py-40 bg-page-hero bg-no-repeat bg-center bg-cover">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900"></div>
            <div className="container relative">
                <div className="grid grid-cols-1 pb-8 text-center mt-10">
                    <h3 className="mb-3 text-3xl leading-normal font-medium text-white">{content.title}</h3>

                    <p className="text-slate-300 text-lg max-w-xl mx-auto">{content.content}</p>
                </div>
            </div>
            {/* <Breadcrumb items={generateBreadcrumbs(slug)} /> */}
            {/* <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                <ul className="tracking-[0.5px] mb-0 inline-block">
                   <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white"><a href="index.html">Techwind</a></li>
                   <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="uil uil-angle-right-b"></i></li>
                   <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white"><a href="">Portfolio</a></li>
                    <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="uil uil-angle-right-b"></i></li>
                    <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white" aria-current="page">Modern</li>
                </ul>
            </div> */}
        </section>
        <div className="relative">
            <div className="shape absolute sm:-bottom-px -bottom-[2px] start-0 end-0 overflow-hidden z-1 text-white dark:text-slate-900">
                <svg className="w-full h-auto scale-[2.0] origin-top" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {content.media && content.media.length > 0 && (
              <div className="animate-fade-in">
                {/* Masonry Gallery Layout */}
                <MasonryGallery 
                  media={content.media} 
                  onImageClick={openLightbox}
                />
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
        
        {/* Lightbox Modal */}
        {lightboxOpen && currentImage && (
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-95"
            onClick={closeLightbox}
          >
            <div 
              className="relative w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 z-20 text-white hover:text-gray-300 transition-colors duration-200 bg-black bg-opacity-50 rounded-full p-2"
                aria-label="Close lightbox"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Navigation arrows */}
              {content?.media && content.media.filter(m => m.type === 'image').length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-gray-300 transition-colors duration-200 bg-black bg-opacity-50 rounded-full p-2"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 text-white hover:text-gray-300 transition-colors duration-200 bg-black bg-opacity-50 rounded-full p-2"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={currentImage.url}
                  alt={currentImage.caption || 'Gallery image'}
                  width={1920}
                  height={1080}
                  className="max-w-full max-h-full object-contain"
                  priority
                  style={{ maxHeight: '100vh' }}
                />
                
                {/* Caption */}
                {currentImage.caption && (
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white px-6 py-3 rounded-lg z-20">
                    <p className="text-center text-lg whitespace-nowrap">{currentImage.caption}</p>
                  </div>
                )}
              </div>

              {/* Image counter */}
              {content?.media && content.media.filter(m => m.type === 'image').length > 1 && (
                <div className="absolute top-6 left-6 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-lg z-20">
                  {currentImageIndex + 1} / {content.media.filter(m => m.type === 'image').length}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Special layout for president page
  if (slug === 'about-us-president') {
    return (
      <div className="min-h-screen">
        <div className="pt-35 bg-gradient-to-r from-blue-900 to-blue-800 text-white"></div>
        <Breadcrumb items={generateBreadcrumbs(slug)} />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-8xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left side - Image */}
              <div className="flex justify-center">
                <div className="relative w-full">
                  <Image
                    src="/assets/president.jpeg"
                    alt="PRESIDENT OF MIHF JAVKHLAN BOLD"
                    width={500}
                    height={700}
                    unoptimized={true}
                    className="w-full h-auto rounded-lg shadow-lg"
                    priority
                  />
                </div>
              </div>
              
              {/* Right side - Content */}
              <div className="space-y-6">
                <header className="animate-fade-in">
                  <h1 className="text-xl md:text-1xl lg:text-2xl font-bold text-center text-gray-900 mb-6">
                    {content.title}
                  </h1>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed text-base lg:text-sm text-justify">
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
                        {section.title !== (language === 'mn' ? 'Гарын үсэг' : 'Signature') && (
                          <div className="prose prose-lg max-w-none mb-4">
                            <p className="text-gray-700 leading-relaxed text-base lg:text-lg text-justify">
                              {section.content}
                            </p>
                          </div>
                        )}
                        {section.title === (language === 'mn' ? 'Гарын үсэг' : 'Signature') && (
                          <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex items-center justify-center space-x-6">
                              <p className="text-gray-800 font-medium text-lg italic">
                                {section.content}
                              </p>
                              <div className="relative">
                                <Image
                                  src="/assets/signature.png"
                                  alt={language === 'mn' ? 'Гарын үсэг' : 'Signature'}
                                  width={200}
                                  height={100}
                                  className="object-contain"
                                />
                              </div>
                            </div>
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
      <div className="pt-40 bg-gradient-to-r from-blue-900 to-blue-800 text-white"></div>
      <Breadcrumb items={generateBreadcrumbs(slug)} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-8xl mx-auto">
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
                      <Image
                        src={media.url}
                        alt={media.caption || 'Media content'}
                        width={400}
                        height={224}
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
