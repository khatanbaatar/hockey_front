'use client';

import Link from "next/link";
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ImageCarousel from '@/components/ImageCarousel';
import HomeMasonryGallery from '@/components/HomeMasonryGallery';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  image?: string;
  category: string;
}

interface GalleryItem {
  type: 'image' | 'video';
  url: string;
  caption?: string;
}

export default function Home() {
  const { language, t } = useLanguage();
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setNewsLoading(true);
        const api = "https://hockey.onol.tech";
        const response = await fetch(`${api}/api/news?language=${language}&page=1&limit=3`);
        const data = await response.json();
        
        if (data.success) {
          setLatestNews(data.data);
        }
      } catch (error) {
        console.error('Error fetching latest news:', error);
      } finally {
        setNewsLoading(false);
      }
    };

    fetchLatestNews();
  }, [language]);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        setGalleryLoading(true);
        const api = "https://hockey.onol.tech";
        const response = await fetch(`${api}/api/page/gallery-photos?language=${language}`);
        const data = await response.json();
        
        if (data.success && data.data.media && data.data.media.length > 0) {
          // Take first 10 images from gallery
          const images = data.data.media
            .filter((item: { type: string; url: string; caption?: string }) => item.type === 'image')
            .slice(0, 10)
            .map((item: { type: string; url: string; caption?: string }) => ({
              type: item.type,
              url: item.url,
              caption: item.caption
            }));
          setGalleryImages(images);
        } else {
          // Fallback mock data if API fails
          const mockImages = Array.from({ length: 10 }, (_, index) => ({
            type: 'image' as const,
            url: `https://picsum.photos/400/600?random=${index + 200}&category=sports`,
            caption: language === 'mn' ? `Хоккейн зураг ${index + 1}` : `Hockey Photo ${index + 1}`
          }));
          setGalleryImages(mockImages);
        }
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        // Fallback mock data on error
        const mockImages = Array.from({ length: 10 }, (_, index) => ({
          type: 'image' as const,
          url: `https://picsum.photos/400/600?random=${index + 200}&category=sports`,
          caption: language === 'mn' ? `Хоккейн зураг ${index + 1}` : `Hockey Photo ${index + 1}`
        }));
        setGalleryImages(mockImages);
      } finally {
        setGalleryLoading(false);
      }
    };

    fetchGalleryImages();
  }, [language]);
  

  return (
    <div className="min-h-screen">
      
      <div className="mx-auto">
            <ImageCarousel 
              images={[
                {
                  src: "https://mihf.mn/sliders/001.jpeg?w=1200&q=75",
                  alt: language === 'mn' ? 'Хоккейн тэмцээн' : 'Hockey Match',
                  caption: language === 'mn' ? 'Хоккейн тэмцээний агшин' : 'Hockey Match Moment'
                },
                {
                  src: "https://mihf.mn/bg/bg-o3.jpeg",
                  alt: language === 'mn' ? 'Хоккейн талбай' : 'Hockey Rink',
                  caption: language === 'mn' ? 'Хоккейн талбай дээрх тоглолт' : 'Game on Hockey Rink'
                },
                {
                  src: "https://mihf.mn/bg/bg-04.jpeg",
                  alt: language === 'mn' ? 'Хоккейн баг' : 'Hockey Team',
                  caption: language === 'mn' ? 'Хоккейн багийн бүрэлдэхүүн' : 'Hockey Team Lineup'
                },
                {
                  src: "https://mihf.mn/sliders/002.jpeg?w=1200&q=75",
                  alt: language === 'mn' ? 'Хоккейн тэмцээн' : 'Hockey Competition',
                  caption: language === 'mn' ? 'Үндэсний тэмцээн' : 'National Competition'
                }
              ]}
              autoPlay={true}
              interval={5000}
            />
          </div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('home.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            {t('home.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/teams"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              {t('home.teams-button')}
            </Link>
            <Link
              href="/competition-schedule"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              {t('home.schedule-button')}
            </Link>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section>
      <div className="" style={{ animationDelay: '120ms' }}><div className="flex justify-center w-full container bg-hero bg-no-repeat bg-cover xl:bg-center h-auto xl:h-[20vh] py-12 rounded "></div></div>
      </section>

      {/* News/Updates Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {t('home.news-title')}
          </h2>
          
          {newsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestNews.map((item, index) => {
                const colors = [
                  { bg: 'bg-blue-100', icon: 'text-blue-400' },
                  { bg: 'bg-green-100', icon: 'text-green-400' },
                  { bg: 'bg-purple-100', icon: 'text-purple-400' }
                ];
                const icons = [
                  <svg key="news" className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>,
                  <svg key="training" className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>,
                  <svg key="team" className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ];
                
                return (
                  <Link key={item.id} href={`/news/${item.id}`} className="block">
                    <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                      <div className={`h-48 ${colors[index % 3].bg} flex items-center justify-center`}>
                        <div className={colors[index % 3].icon}>
                          {icons[index % 3]}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {item.content}
                        </p>
                        <span className="text-sm text-blue-600">
                          {new Date(item.date).toLocaleDateString(language === 'mn' ? 'mn-MN' : 'en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
          
          {/* View All News Button */}
          <div className="text-center mt-12">
            <Link 
              href="/news" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              {language === 'mn' ? 'Бүх мэдээ харах' : 'View All News'}
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Masonry Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === 'mn' ? 'Зургийн цуглуулга' : 'Photo Gallery'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'mn' 
                ? 'Монголын хоккейн холбооны сүүлийн үеийн зургууд' 
                : 'Latest photos from Mongolian Hockey Federation'
              }
            </p>
          </div>
          
          {galleryLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-200 rounded-lg animate-pulse" style={{ height: `${200 + (i * 50)}px` }}></div>
              ))}
            </div>
          ) : (
            <>
              <HomeMasonryGallery media={galleryImages} />
              
              {/* View All Gallery Button */}
              <div className="text-center mt-12">
                <Link 
                  href="/gallery-photos" 
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                >
                  {language === 'mn' ? 'Бүх зураг харах' : 'View All Photos'}
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="flex justify-center">
          <div className="block md:hidden">
            <video 
              autoPlay 
              loop 
              muted
              playsInline 
              className="min-w-full min-h-full max-w-none h-[20%] w-[40%]"
            >
              <source src="https://mihf.mn/03.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="hidden md:block">
            <video 
              autoPlay 
              loop 
              muted
              playsInline 
              className="min-w-full min-h-full max-w-none h-[20%] w-[20%]"
            >
              <source src="https://mihf.mn/03.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {t('home.services-title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/teams" className="block">
              <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 hover:bg-blue-50 hover:scale-105 cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('home.teams')}</h3>
                <p className="text-gray-600">{t('home.teams-desc')}</p>
              </div>
            </Link>

            <Link href="/competition-schedule" className="block">
              <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 hover:bg-blue-50 hover:scale-105 cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('home.schedule')}</h3>
                <p className="text-gray-600">{t('home.schedule-desc')}</p>
              </div>
            </Link>

            <Link href="/statistics" className="block">
              <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 hover:bg-blue-50 hover:scale-105 cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('home.statistics')}</h3>
                <p className="text-gray-600">{t('home.statistics-desc')}</p>
              </div>
            </Link>

            <Link href="/training-seminar" className="block">
              <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 hover:bg-blue-50 hover:scale-105 cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('home.training')}</h3>
                <p className="text-gray-600">{t('home.training-desc')}</p>
              </div>
            </Link>

            <Link href="/gallery" className="block">
              <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 hover:bg-blue-50 hover:scale-105 cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('home.gallery')}</h3>
                <p className="text-gray-600">{t('home.gallery-desc')}</p>
              </div>
            </Link>

            <Link href="/rules-regulations" className="block">
              <div className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 hover:bg-blue-50 hover:scale-105 cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('home.rules')}</h3>
                <p className="text-gray-600">{t('home.rules-desc')}</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}