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
    // Mock news data - replace with actual API call
    const mockNewsData: NewsItem[] = [
      {
        id: '1',
        title: language === 'mn' 
          ? 'Монголын хоккейн холбооны шинэ төлөвлөгөө' 
          : 'New Plans for Mongolian Hockey Federation',
        content: language === 'mn'
          ? 'Монголын хоккейн холбоо ирэх жилүүдэд хоккейн спортыг хөгжүүлэх шинэ төлөвлөгөө боловсруулжээ. Энэ төлөвлөгөөнд залуучуудын хөгжүүлэлт, мэргэжлийн сургалт, олон улсын тэмцээнд оролцоо зэрэг чухал асуудлуудыг багтаасан байна.'
          : 'The Mongolian Hockey Federation has developed new plans to develop hockey sports in the coming years. This plan includes important issues such as youth development, professional training, and participation in international competitions.',
        date: '2024-01-15',
        category: language === 'mn' ? 'Төлөвлөгөө' : 'Planning'
      },
      {
        id: '2',
        title: language === 'mn'
          ? 'Үндэсний шигшээ багийн бэлтгэл эхэлжээ'
          : 'National Team Training Begins',
        content: language === 'mn'
          ? 'Монголын үндэсний хоккейн шигшээ баг олон улсын тэмцээнд бэлтгэх зорилгоор эрчимтэй бэлтгэл эхлүүлжээ. Багийн бүрэлдэхүүнд шинэ тоглогчид нэмэгдэж, мэргэжлийн зөвлөгчдийн удирдлага дор сургалт явуулж байна.'
          : 'The Mongolian national hockey team has begun intensive training to prepare for international competitions. New players have been added to the team roster, and training is being conducted under the guidance of professional coaches.',
        date: '2024-01-10',
        category: language === 'mn' ? 'Тэмцээн' : 'Competition'
      },
      {
        id: '3',
        title: language === 'mn'
          ? 'Хоккейн талбай шинэчлэгдэж байна'
          : 'Hockey Rink Being Renovated',
        content: language === 'mn'
          ? 'Улаанбаатар хотын төвд байрлах хоккейн талбайг орчин үеийн стандартад нийцүүлэн шинэчлэх ажил эхэлжээ. Шинэчлэлтэд мөсний систем, гэрэлтүүлэг, харааны систем зэрэг орно.'
          : 'The hockey rink located in the center of Ulaanbaatar has begun renovation work to meet modern standards. The renovation includes ice system, lighting, and sound system.',
        date: '2024-01-05',
        category: language === 'mn' ? 'Дэд бүтэц' : 'Infrastructure'
      },
      {
        id: '4',
        title: language === 'mn'
          ? 'Залуучуудын хоккейн сургалт эхэлжээ'
          : 'Youth Hockey Training Begins',
        content: language === 'mn'
          ? 'Монголын хоккейн холбоо залуучуудын хөгжүүлэлтийн хөтөлбөр эхлүүлжээ. 8-16 насны хүүхдүүдэд зориулсан сургалт долоо хоногт 3 удаа явуулж байна.'
          : 'The Mongolian Hockey Federation has launched a youth development program. Training for children aged 8-16 is conducted 3 times a week.',
        date: '2024-01-20',
        category: language === 'mn' ? 'Сургалт' : 'Training'
      },
      {
        id: '5',
        title: language === 'mn'
          ? 'Олон улсын тэмцээнд оролцоо'
          : 'Participation in International Competition',
        content: language === 'mn'
          ? 'Монголын үндэсний шигшээ баг Азийн хоккейн аварга шалгаруулах тэмцээнд оролцох бэлтгэл хийж байна. Тэмцээн 3-р сард Японд зохион байгуулагдана.'
          : 'The Mongolian national team is preparing to participate in the Asian Hockey Championship. The competition will be held in Japan in March.',
        date: '2024-01-25',
        category: language === 'mn' ? 'Тэмцээн' : 'Competition'
      },
      {
        id: '6',
        title: language === 'mn'
          ? 'Шинэ тоног төхөөрөмж авч ирэв'
          : 'New Equipment Arrived',
        content: language === 'mn'
          ? 'Хоккейн талбайд шинэ тоног төхөөрөмж, хамгаалалтын хэрэгсэл, цохиур зэрэг авч ирэв. Энэ нь тамирчдын аюулгүй байдал, гүйцэтгэлийг сайжруулахад тусална.'
          : 'New equipment, protective gear, and sticks have arrived at the hockey rink. This will help improve the safety and performance of athletes.',
        date: '2024-01-30',
        category: language === 'mn' ? 'Тоног төхөөрөмж' : 'Equipment'
      },
      {
        id: '7',
        title: language === 'mn'
          ? 'Зөвлөгчдийн сургалт зохион байгуулав'
          : 'Coaches Training Organized',
        content: language === 'mn'
          ? 'Монголын хоккейн холбоо зөвлөгчдийн мэргэжлийн хөгжүүлэлтийн сургалт зохион байгуулжээ. Сургалтад 20 гаруй зөвлөгч оролцож байна.'
          : 'The Mongolian Hockey Federation has organized professional development training for coaches. More than 20 coaches are participating in the training.',
        date: '2024-02-01',
        category: language === 'mn' ? 'Сургалт' : 'Training'
      },
      {
        id: '8',
        title: language === 'mn'
          ? 'Хоккейн дүрмийн шинэчлэл'
          : 'Hockey Rules Update',
        content: language === 'mn'
          ? 'Олон улсын хоккейн холбоо дүрмийн шинэчлэл гаргажээ. Шинэ дүрэм нь тоглолтын хурд, аюулгүй байдлыг сайжруулахад чиглэгдсэн байна.'
          : 'The International Hockey Federation has released rule updates. The new rules are aimed at improving game speed and safety.',
        date: '2024-02-05',
        category: language === 'mn' ? 'Дүрэм' : 'Rules'
      }
    ];

    // Simulate API call
    setTimeout(() => {
      setNewsItems(mockNewsData);
      setTotalPages(Math.ceil(mockNewsData.length / itemsPerPage));
      setLoading(false);
    }, 1000);
  }, [language]);

  const breadcrumbItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.news') }
  ];

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNewsItems = newsItems.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
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
                  ? `Хуудас ${currentPage} / ${totalPages} (Нийт ${newsItems.length} мэдээ)`
                  : `Page ${currentPage} of ${totalPages} (Total ${newsItems.length} news)`
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
