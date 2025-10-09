'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

interface NewsDetailClientProps {
  newsId: string;
}

export default function NewsDetailClient({ newsId }: NewsDetailClientProps) {
  const { language, t } = useLanguage();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const api = "https://hockey.onol.tech";
        const response = await fetch(`${api}/api/news/${newsId}?language=${language}`);
        const data = await response.json();
        
        if (data.success) {
          setNewsItem(data.data);
        } else {
          setError(data.message || 'Failed to load news');
        }
      } catch (err) {
        setError('Failed to load news');
        console.error('Error fetching news detail:', err);
      } finally {
        setLoading(false);
      }
    };

    if (newsId) {
      fetchNewsDetail();
    }
  }, [newsId, language]);

  const breadcrumbItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.news'), href: '/news' },
    { label: newsItem?.title || '...' }
  ];

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

  if (error || !newsItem) {
    return (
      <div className="min-h-screen">
        <Breadcrumb items={breadcrumbItems} />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">{t('common.error')}</h2>
            <p className="text-red-600 mb-4">{error || 'News not found'}</p>
            <Link 
              href="/news" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {language === 'mn' ? 'Мэдээний жагсаалт руу буцах' : 'Back to News List'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* News Header */}
          <header className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                {newsItem.category}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(newsItem.date).toLocaleDateString(language === 'mn' ? 'mn-MN' : 'en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {newsItem.title}
            </h1>
          </header>

          {/* News Image */}
          {newsItem.image && (
            <div className="mb-8">
              <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={newsItem.image}
                  alt={newsItem.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* News Content */}
          <article className="prose prose-lg max-w-none">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="text-gray-700 leading-relaxed text-base lg:text-lg whitespace-pre-line">
                {newsItem.content}
              </div>
            </div>
          </article>

          {/* Navigation */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <Link 
              href="/news" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {language === 'mn' ? 'Бүх мэдээ харах' : 'Back to All News'}
            </Link>
            
            <div className="flex gap-2">
              <button 
                onClick={() => window.print()}
                className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                {language === 'mn' ? 'Хэвлэх' : 'Print'}
              </button>
              
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: newsItem.title,
                      text: newsItem.content.substring(0, 100) + '...',
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert(language === 'mn' ? 'Холбоос хуулагдлаа' : 'Link copied to clipboard');
                  }
                }}
                className="inline-flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                {language === 'mn' ? 'Хуваалцах' : 'Share'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
