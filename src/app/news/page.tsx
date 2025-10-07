'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Breadcrumb from '@/components/Breadcrumb';
import LoadingSpinner from '@/components/LoadingSpinner';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  image?: string;
  category: string;
}

export default function NewsPage() {
  const { language, t } = useLanguage();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const api = "https://hockey.onol.tech";
        
        const response = await fetch(api+`/api/news?language=${language}&page=${currentPage}&limit=${itemsPerPage}`);
        const data = await response.json();
        
        if (data.success) {
          setNewsItems(data.data);
          setTotalPages(data.pagination.totalPages);
        } else {
          setError(data.message || 'Failed to load news');
        }
      } catch (err) {
        setError('Failed to load news');
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [language, currentPage, itemsPerPage]);

  const breadcrumbItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.news') }
  ];

  // News items are already paginated from API
  const currentNewsItems = newsItems;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    if (currentPage > 1) {
      pages.push(
        <button
          key="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
        >
          {language === 'mn' ? 'Өмнөх' : 'Previous'}
        </button>
      );
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 text-sm font-medium border-t border-b ${
            i === currentPage
              ? 'text-blue-600 bg-blue-50 border-blue-500'
              : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      pages.push(
        <button
          key="next"
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
        >
          {language === 'mn' ? 'Дараах' : 'Next'}
        </button>
      );
    }

    return pages;
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Breadcrumb items={breadcrumbItems} />
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner size="lg" text={t('common.loading')} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Breadcrumb items={breadcrumbItems} />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">{t('common.error')}</h2>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Breadcrumb items={breadcrumbItems} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('nav.news')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'mn' 
                ? 'Монголын хоккейн спортын сүүлийн үеийн мэдээ, мэдээлэл'
                : 'Latest news and information about Mongolian hockey sports'
              }
            </p>
          </header>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentNewsItems.map((item) => (
              <article 
                key={item.id} 
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Category Badge */}
                <div className="px-6 pt-6 pb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="px-6 pb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {item.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {item.content}
                  </p>

                  {/* Date */}
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(item.date).toLocaleDateString(language === 'mn' ? 'mn-MN' : 'en-US')}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
              <div className="flex items-center justify-center space-x-1">
                {renderPagination()}
              </div>
              <div className="text-center mt-4 text-sm text-gray-500">
                {language === 'mn' 
                  ? `Хуудас ${currentPage} / ${totalPages}`
                  : `Page ${currentPage} of ${totalPages}`
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
