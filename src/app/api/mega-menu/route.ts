import { NextResponse } from 'next/server';

// Mock mega menu data structure
const megaMenuData = {
  categories: [
    {
      id: 1,
      name_mn: 'Тухай',
      name_en: 'About',
      slug: 'about',
      icon: 'fas fa-info-circle',
      sort_order: 1,
      sections: [
        {
          id: 1,
          title_mn: 'Холбооны мэдээлэл',
          title_en: 'Federation Info',
          description_mn: 'Монголын хоккейн холбооны тухай мэдээлэл',
          description_en: 'Information about Mongolian Hockey Federation',
          icon: 'fas fa-building',
          background_color: 'bg-blue-50',
          text_color: 'text-blue-600',
          is_featured: true,
          link_url: '/about',
          items: [
            {
              id: 1,
              name_mn: 'Холбооны тухай',
              name_en: 'About Federation',
              slug: 'about',
              description_mn: 'Монголын хоккейн холбооны тухай',
              description_en: 'About Mongolian Hockey Federation',
              icon: 'fas fa-info',
              link_url: '/about',
              badge_text: null,
              badge_color: null
            },
            {
              id: 2,
              name_mn: 'Зорилго, зорилт',
              name_en: 'Mission & Vision',
              slug: 'mission-vision',
              description_mn: 'Холбооны зорилго, зорилт',
              description_en: 'Mission and vision of the federation',
              icon: 'fas fa-bullseye',
              link_url: '/mission-vision',
              badge_text: null,
              badge_color: null
            }
          ]
        },
        {
          id: 2,
          title_mn: 'Түүх',
          title_en: 'History',
          description_mn: 'Хоккейн спортын түүх, хөгжил',
          description_en: 'History and development of hockey sport',
          icon: 'fas fa-history',
          background_color: 'bg-indigo-50',
          text_color: 'text-indigo-600',
          is_featured: false,
          link_url: '/history',
          items: [
            {
              id: 3,
              name_mn: 'Хоккейн түүх',
              name_en: 'Hockey History',
              slug: 'history',
              description_mn: 'Хоккейн спортын түүх',
              description_en: 'History of hockey sport',
              icon: 'fas fa-history',
              link_url: '/history',
              badge_text: null,
              badge_color: null
            }
          ]
        }
      ]
    },
    {
      id: 6,
      name_mn: 'Дэд бүтэц',
      name_en: 'Infrastructure',
      slug: 'infrastructure',
      icon: 'fas fa-warehouse',
      sort_order: 6,
      sections: [
        {
          id: 12,
          title_mn: 'Талбай, байгууламж',
          title_en: 'Facilities & Fields',
          description_mn: 'Хоккейн талбай, байгууламжийн мэдээлэл',
          description_en: 'Information on hockey facilities and fields',
          icon: 'fas fa-warehouse',
          background_color: 'bg-slate-50',
          text_color: 'text-slate-700',
          is_featured: true,
          link_url: '/infrastructure',
          items: [
            {
              id: 101,
              name_mn: 'Спортын талбай',
              name_en: 'Sports Fields',
              slug: 'infrastructure-sports-fields',
              description_mn: 'Спортын талбайн мэдээлэл',
              description_en: 'Details about sports fields',
              icon: 'fas fa-hockey-puck',
              link_url: '/infrastructure-sports-fields',
              image_url: '/assets/header-bg.webp',
              badge_text: null,
              badge_color: null
            },
            {
              id: 102,
              name_mn: 'Танхимууд',
              name_en: 'Halls',
              slug: 'infrastructure-halls',
              description_mn: 'Дотор танхим, аренанууд',
              description_en: 'Indoor halls and arenas',
              icon: 'fas fa-building',
              link_url: '/infrastructure-halls',
              image_url: '/assets/header-bg-1.webp',
              badge_text: null,
              badge_color: null
            },
            {
              id: 103,
              name_mn: 'Аймаг, дүүргийн дэд бүтэц',
              name_en: 'Provincial Infrastructure',
              slug: 'infrastructure-provincial-infrastructure',
              description_mn: 'Аймаг, дүүргийн байгууламж',
              description_en: 'Provincial and district facilities',
              icon: 'fas fa-map-marked-alt',
              link_url: '/infrastructure-provincial-infrastructure',
              image_url: '/assets/001.jpeg',
              badge_text: null,
              badge_color: null
            },
            {
              id: 104,
              name_mn: 'Тоног төхөөрөмж',
              name_en: 'Technical Equipment',
              slug: 'infrastructure-technical-equipment',
              description_mn: 'Техникийн хэрэгсэл, тоног төхөөрөмж',
              description_en: 'Technical equipment and tools',
              icon: 'fas fa-tools',
              link_url: '/infrastructure-technical-equipment',
              image_url: '/assets/president.jpeg',
              badge_text: null,
              badge_color: null
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name_mn: 'Тэмцээн',
      name_en: 'Competitions',
      slug: 'competitions',
      icon: 'fas fa-trophy',
      sort_order: 2,
      sections: [
        {
          id: 3,
          title_mn: 'Тэмцээний хуанли',
          title_en: 'Competition Schedule',
          description_mn: 'Орчуулагдах тэмцээнүүдийн хуанли',
          description_en: 'Schedule of upcoming competitions',
          icon: 'fas fa-calendar',
          background_color: 'bg-green-50',
          text_color: 'text-green-600',
          is_featured: true,
          link_url: '/competition-schedule',
          items: [
            {
              id: 4,
              name_mn: 'Жилийн хуанли',
              name_en: 'Annual Calendar',
              slug: 'annual-calendar',
              description_mn: 'Оны турш тэмцээнүүдийн хуанли',
              description_en: 'Annual calendar of competitions',
              icon: 'fas fa-calendar-alt',
              link_url: '/annual-calendar',
              badge_text: 'NEW',
              badge_color: 'bg-green-500'
            },
            {
              id: 5,
              name_mn: 'Тэмцээний дэлгэрэнгүй',
              name_en: 'Competition Details',
              slug: 'competition-details',
              description_mn: 'Тэмцээний дэлгэрэнгүй мэдээлэл',
              description_en: 'Detailed competition information',
              icon: 'fas fa-info-circle',
              link_url: '/competition-details',
              badge_text: null,
              badge_color: null
            }
          ]
        },
        {
          id: 4,
          title_mn: 'Тэмцээний үр дүн',
          title_en: 'Competition Results',
          description_mn: 'Тэмцээний үр дүн, байрлал',
          description_en: 'Competition results and standings',
          icon: 'fas fa-medal',
          background_color: 'bg-yellow-50',
          text_color: 'text-yellow-600',
          is_featured: true,
          link_url: '/competition-results',
          items: [
            {
              id: 6,
              name_mn: 'Одоогийн байрлал',
              name_en: 'Current Standings',
              slug: 'current-standings',
              description_mn: 'Одоогийн байрлалын хүснэгт',
              description_en: 'Current league standings',
              icon: 'fas fa-trophy',
              link_url: '/current-standings',
              badge_text: null,
              badge_color: null
            },
            {
              id: 7,
              name_mn: 'Тэмцээний үр дүн',
              name_en: 'Match Results',
              slug: 'match-results',
              description_mn: 'Тоглолтын үр дүн',
              description_en: 'Match results and scores',
              icon: 'fas fa-futbol',
              link_url: '/match-results',
              badge_text: null,
              badge_color: null
            }
          ]
        }
      ]
    },
    {
      id: 3,
      name_mn: 'Бүтэц',
      name_en: 'Structure',
      slug: 'structure',
      icon: 'fas fa-sitemap',
      sort_order: 3,
      sections: [
        {
          id: 5,
          title_mn: 'Байгууллага',
          title_en: 'Organization',
          description_mn: 'Холбооны бүтэц, байгууллага',
          description_en: 'Federation structure and organization',
          icon: 'fas fa-sitemap',
          background_color: 'bg-purple-50',
          text_color: 'text-purple-600',
          is_featured: false,
          link_url: '/structure',
          items: [
            {
              id: 8,
              name_mn: 'Холбооны бүтэц',
              name_en: 'Federation Structure',
              slug: 'structure',
              description_mn: 'Холбооны бүтэц, байгууллага',
              description_en: 'Federation structure and organization',
              icon: 'fas fa-sitemap',
              link_url: '/structure',
              badge_text: null,
              badge_color: null
            }
          ]
        },
        {
          id: 6,
          title_mn: 'Дасгал семинар',
          title_en: 'Training Seminar',
          description_mn: 'Дасгал, семинар, сургалт',
          description_en: 'Training, seminars and education',
          icon: 'fas fa-graduation-cap',
          background_color: 'bg-teal-50',
          text_color: 'text-teal-600',
          is_featured: false,
          link_url: '/training-seminar',
          items: [
            {
              id: 9,
              name_mn: 'Дасгал семинар',
              name_en: 'Training Seminars',
              slug: 'training-seminar',
              description_mn: 'Дасгал, семинар, сургалт',
              description_en: 'Training, seminars and education',
              icon: 'fas fa-graduation-cap',
              link_url: '/training-seminar',
              badge_text: null,
              badge_color: null
            }
          ]
        }
      ]
    },
    {
      id: 4,
      name_mn: 'Хуудас',
      name_en: 'Media',
      slug: 'media',
      icon: 'fas fa-newspaper',
      sort_order: 4,
      sections: [
        {
          id: 7,
          title_mn: 'Мэдээ',
          title_en: 'News',
          description_mn: 'Сүүлийн үеийн мэдээ',
          description_en: 'Latest news and updates',
          icon: 'fas fa-newspaper',
          background_color: 'bg-blue-50',
          text_color: 'text-blue-600',
          is_featured: true,
          link_url: '/news',
          items: [
            {
              id: 10,
              name_mn: 'Сүүлийн мэдээ',
              name_en: 'Latest News',
              slug: 'latest-news',
              description_mn: 'Сүүлийн үеийн мэдээ',
              description_en: 'Latest news and updates',
              icon: 'fas fa-newspaper',
              link_url: '/news',
              badge_text: 'HOT',
              badge_color: 'bg-red-500'
            }
          ]
        },
        {
          id: 8,
          title_mn: 'Зургийн цуглуулга',
          title_en: 'Photo Gallery',
          description_mn: 'Хоккейн тэмцээний зургууд',
          description_en: 'Hockey competition photos',
          icon: 'fas fa-images',
          background_color: 'bg-pink-50',
          text_color: 'text-pink-600',
          is_featured: true,
          link_url: '/gallery-photos',
          items: [
            {
              id: 11,
              name_mn: 'Тэмцээний зургууд',
              name_en: 'Competition Photos',
              slug: 'competition-photos',
              description_mn: 'Тэмцээний зургууд',
              description_en: 'Competition photos',
              icon: 'fas fa-camera',
              link_url: '/gallery-photos',
              badge_text: null,
              badge_color: null
            }
          ]
        },
        {
          id: 9,
          title_mn: 'Бичлэгийн цуглуулга',
          title_en: 'Video Gallery',
          description_mn: 'Хоккейн тэмцээний бичлэгүүд',
          description_en: 'Hockey competition videos',
          icon: 'fas fa-video',
          background_color: 'bg-indigo-50',
          text_color: 'text-indigo-600',
          is_featured: false,
          link_url: '/gallery-videos',
          items: [
            {
              id: 12,
              name_mn: 'Тэмцээний бичлэгүүд',
              name_en: 'Competition Videos',
              slug: 'competition-videos',
              description_mn: 'Тэмцээний бичлэгүүд',
              description_en: 'Competition videos',
              icon: 'fas fa-video',
              link_url: '/gallery-videos',
              badge_text: null,
              badge_color: null
            }
          ]
        }
      ]
    },
    {
      id: 5,
      name_mn: 'Статистик',
      name_en: 'Statistics',
      slug: 'statistics',
      icon: 'fas fa-chart-bar',
      sort_order: 5,
      sections: [
        {
          id: 10,
          title_mn: 'Тэмцээний үр дүн',
          title_en: 'Competition Results',
          description_mn: 'Тэмцээний үр дүн, байрлал',
          description_en: 'Competition results and standings',
          icon: 'fas fa-chart-line',
          background_color: 'bg-green-50',
          text_color: 'text-green-600',
          is_featured: true,
          link_url: '/statistics-competition-results',
          items: [
            {
              id: 13,
              name_mn: 'Байрлалын хүснэгт',
              name_en: 'League Table',
              slug: 'league-table',
              description_mn: 'Тэмцээний байрлалын хүснэгт',
              description_en: 'Competition league table',
              icon: 'fas fa-table',
              link_url: '/statistics-competition-results',
              badge_text: null,
              badge_color: null
            }
          ]
        },
        {
          id: 11,
          title_mn: 'Баг, тоглогчдын статистик',
          title_en: 'Team & Player Statistics',
          description_mn: 'Баг, тоглогчдын статистик мэдээлэл',
          description_en: 'Team and player statistics',
          icon: 'fas fa-users',
          background_color: 'bg-blue-50',
          text_color: 'text-blue-600',
          is_featured: true,
          link_url: '/statistics-team-player-stats',
          items: [
            {
              id: 14,
              name_mn: 'Тоглогчдын статистик',
              name_en: 'Player Statistics',
              slug: 'player-stats',
              description_mn: 'Тоглогчдын статистик',
              description_en: 'Player statistics',
              icon: 'fas fa-chart-bar',
              link_url: '/statistics-team-player-stats',
              badge_text: null,
              badge_color: null
            }
          ]
        }
      ]
    }
  ],
  featured: [
    {
      id: 1,
      title_mn: 'Сүүлийн мэдээ',
      title_en: 'Latest News',
      description_mn: 'Хоккейн салбарын хамгийн сүүлийн үеийн мэдээлэл',
      description_en: 'Latest news and updates from hockey sector',
      icon: 'fas fa-newspaper',
      background_color: 'bg-blue-50',
      text_color: 'text-blue-600',
      link_url: '/news',
      badge_text: 'HOT'
    },
    {
      id: 2,
      title_mn: 'Тэмцээний хуанли',
      title_en: 'Competition Schedule',
      description_mn: 'Орчуулагдах тэмцээнүүдийн хуанли',
      description_en: 'Schedule of upcoming competitions',
      icon: 'fas fa-calendar',
      background_color: 'bg-green-50',
      text_color: 'text-green-600',
      link_url: '/competition-schedule',
      badge_text: null
    },
    {
      id: 3,
      title_mn: 'Зургийн цуглуулга',
      title_en: 'Photo Gallery',
      description_mn: 'Хоккейн тэмцээний гайхамшигт агшингууд',
      description_en: 'Amazing moments from hockey competitions',
      icon: 'fas fa-images',
      background_color: 'bg-purple-50',
      text_color: 'text-purple-600',
      link_url: '/gallery-photos',
      badge_text: null
    }
  ]
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'mn';

    // Transform data based on language
    const transformedData = {
      categories: megaMenuData.categories.map(category => ({
        ...category,
        name: language === 'mn' ? category.name_mn : category.name_en,
        sections: category.sections.map(section => ({
          ...section,
          title: language === 'mn' ? section.title_mn : section.title_en,
          description: language === 'mn' ? section.description_mn : section.description_en,
          items: section.items.map(item => ({
            ...item,
            name: language === 'mn' ? item.name_mn : item.name_en,
            description: language === 'mn' ? item.description_mn : item.description_en
          }))
        }))
      })),
      featured: megaMenuData.featured.map(item => ({
        ...item,
        title: language === 'mn' ? item.title_mn : item.title_en,
        description: language === 'mn' ? item.description_mn : item.description_en
      }))
    };

    return NextResponse.json({
      success: true,
      data: transformedData,
      message: 'Mega menu data retrieved successfully'
    });

  } catch (error) {
    console.error('Mega menu API error:', error);
    
    return NextResponse.json({
      success: false,
      data: null,
      message: 'Failed to retrieve mega menu data'
    }, { status: 500 });
  }
}
