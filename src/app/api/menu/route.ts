import { NextRequest, NextResponse } from 'next/server';
import { MenuItem, ApiResponse } from '@/types';

// Mock data based on the menu structure from the image
const menuData: MenuItem[] = [
  {
    id: '1',
    name: 'Бидний тухай',
    nameMn: 'Бидний тухай',
    nameEn: 'About Us',
    slug: 'about-us',
    description: 'About Mongolian Hockey Federation',
    descriptionMn: 'About Mongolian Hockey Federation',
    descriptionEn: 'About Mongolian Hockey Federation',
    subItems: [
      {
        id: '1-1',
        name: 'Ерөнхийлөгч',
        nameMn: 'Ерөнхийлөгч',
        nameEn: 'President',
        slug: 'president',
        description: 'President of MIHF',
        descriptionMn: 'President of MIHF',
        descriptionEn: 'President of MIHF'
      },
      {
        id: '1-2',
        name: 'Удирдлагын баг',
        nameMn: 'Удирдлагын баг',
        nameEn: 'Leadership Team',
        slug: 'leadership-team',
        description: 'Leadership team members',
        descriptionMn: 'Leadership team members',
        descriptionEn: 'Leadership team members'
      },
      {
        id: '1-3',
        name: 'Холбооны тухай',
        nameMn: 'Холбооны тухай',
        nameEn: 'About Federation',
        slug: 'federation-info',
        description: 'About the federation',
        descriptionMn: 'About the federation',
        descriptionEn: 'About the federation'
      }
    ]
  },
  {
    id: '2',
    name: 'Бүтэц зохион байгуулалт',
    nameMn: 'Бүтэц зохион байгуулалт',
    nameEn: 'Structure & Organization',
    slug: 'structure-organization',
    description: 'Federation management structure',
    descriptionMn: 'Federation management structure',
    descriptionEn: 'Federation management structure',
    subItems: [
      {
        id: '2-1',
        name: 'Federation structure',
        nameMn: 'Холбооны бүтэц',
        nameEn: 'Federation Structure',
        slug: 'federation-structure',
        description: 'Federation organizational structure',
        descriptionMn: 'Холбооны бүтэц, удирдлагын зохион байгуулалт',
        descriptionEn: 'Federation organizational structure'
      },
      {
        id: '2-2',
        name: 'Positions, roles and responsibilities',
        nameMn: 'Албан тушаал, үүрэг хариуцлага',
        nameEn: 'Positions, Roles & Responsibilities',
        slug: 'positions-roles',
        description: 'Management positions and responsibilities',
        descriptionMn: 'Удирдлагын албан тушаал, үүрэг хариуцлага',
        descriptionEn: 'Management positions and responsibilities'
      }
    ]
  },
  {
    id: '3',
    name: 'Дэд бүтэц',
    nameMn: 'Дэд бүтэц',
    nameEn: 'Infrastructure',
    slug: 'infrastructure',
    description: 'Infrastructure development map',
    descriptionMn: 'Infrastructure development map',
    descriptionEn: 'Infrastructure development map',
    subItems: [
      {
        id: '3-1',
        name: 'Sports fields',
        nameMn: 'Спортын талбай',
        nameEn: 'Sports Fields',
        slug: 'sports-fields',
        description: 'Sports facilities and fields',
        descriptionMn: 'Спортын талбай, дасгалын газар',
        descriptionEn: 'Sports facilities and fields'
      },
      {
        id: '3-2',
        name: 'Halls',
        nameMn: 'Заал',
        nameEn: 'Halls',
        slug: 'halls',
        description: 'Sports halls and venues',
        descriptionMn: 'Спортын заал, тэмцээний газар',
        descriptionEn: 'Sports halls and venues'
      },
      {
        id: '3-3',
        name: 'Technical equipment',
        nameMn: 'Техник хэрэгсэл',
        nameEn: 'Technical Equipment',
        slug: 'technical-equipment',
        description: 'Sports equipment and technology',
        descriptionMn: 'Спортын тоног төхөөрөмж, техник хэрэгсэл',
        descriptionEn: 'Sports equipment and technology'
      },
      {
        id: '3-4',
        name: 'Provincial/branch infrastructure',
        nameMn: 'Орон нутгийн дэд бүтэц',
        nameEn: 'Provincial Infrastructure',
        slug: 'provincial-infrastructure',
        description: 'Regional infrastructure development',
        descriptionMn: 'Орон нутгийн дэд бүтэц хөгжүүлэлт',
        descriptionEn: 'Regional infrastructure development'
      }
    ]
  },
  {
    id: '4',
    name: 'Сургалт, семинар',
    nameMn: 'Сургалт, семинар',
    nameEn: 'Training & Seminars',
    slug: 'training-seminar',
    description: 'Training, seminar information',
    descriptionMn: 'Training, seminar information',
    descriptionEn: 'Training, seminar information',
    subItems: [
      {
        id: '4-1',
        name: 'Coaches',
        nameMn: 'Зөвлөгчид',
        nameEn: 'Coaches',
        slug: 'coaches',
        description: 'Coach training programs',
        descriptionMn: 'Зөвлөгчдийн сургалт, мэргэжлийн хөгжүүлэлт',
        descriptionEn: 'Coach training programs'
      },
      {
        id: '4-2',
        name: 'Referees',
        nameMn: 'Шүүгчид',
        nameEn: 'Referees',
        slug: 'referees',
        description: 'Referee training and certification',
        descriptionMn: 'Шүүгчдийн сургалт, гэрчилгээжилт',
        descriptionEn: 'Referee training and certification'
      },
      {
        id: '4-3',
        name: 'Children',
        nameMn: 'Хүүхэд',
        nameEn: 'Children',
        slug: 'children',
        description: 'Children training programs',
        descriptionMn: 'Хүүхдийн сургалт, хөгжүүлэлт',
        descriptionEn: 'Children training programs'
      },
      {
        id: '4-4',
        name: 'Youth',
        nameMn: 'Залуучууд',
        nameEn: 'Youth',
        slug: 'youth',
        description: 'Youth development programs',
        descriptionMn: 'Залуучуудын сургалт, хөгжүүлэлт',
        descriptionEn: 'Youth development programs'
      },
      {
        id: '4-5',
        name: 'Clubs',
        nameMn: 'Клубууд',
        nameEn: 'Clubs',
        slug: 'clubs',
        description: 'Club management training',
        descriptionMn: 'Клубын удирдлагын сургалт',
        descriptionEn: 'Club management training'
      },
      {
        id: '4-6',
        name: 'Federations',
        nameMn: 'Холбоонууд',
        nameEn: 'Federations',
        slug: 'federations',
        description: 'Federation management training',
        descriptionMn: 'Холбооны удирдлагын сургалт',
        descriptionEn: 'Federation management training'
      },
      {
        id: '4-7',
        name: 'Education',
        nameMn: 'Боловсрол',
        nameEn: 'Education',
        slug: 'education',
        description: 'Educational programs',
        descriptionMn: 'Боловсролын хөтөлбөр',
        descriptionEn: 'Educational programs'
      },
      {
        id: '4-8',
        name: 'International',
        nameMn: 'Олон улсын',
        nameEn: 'International',
        slug: 'international',
        description: 'International training programs',
        descriptionMn: 'Олон улсын сургалт хөтөлбөр',
        descriptionEn: 'International training programs'
      }
    ]
  },
  {
    id: '5',
    name: 'Багууд',
    nameMn: 'Багууд',
    nameEn: 'Teams',
    slug: 'teams',
    description: 'Teams of all levels',
    descriptionMn: 'Teams of all levels',
    descriptionEn: 'Teams of all levels',
    subItems: [
      {
        id: '5-1',
        name: 'List of clubs, teams',
        nameMn: 'Баг, клубын жагсаалт',
        nameEn: 'List of Clubs & Teams',
        slug: 'clubs-teams-list',
        description: 'Complete list of registered teams',
        descriptionMn: 'Бүртгэлтэй баг, клубын бүрэн жагсаалт',
        descriptionEn: 'Complete list of registered teams'
      },
      {
        id: '5-2',
        name: 'Contact information',
        nameMn: 'Холбоо барих мэдээлэл',
        nameEn: 'Contact Information',
        slug: 'contact-info',
        description: 'Team contact details',
        descriptionMn: 'Баг, клубын холбоо барих мэдээлэл',
        descriptionEn: 'Team contact details'
      }
    ]
  },
  {
    id: '6',
    name: 'Зураг болон бичлэгийн галерей',
    nameMn: 'Зураг болон бичлэгийн галерей',
    nameEn: 'Photo & Video Gallery',
    slug: 'gallery',
    description: 'Media content',
    descriptionMn: 'Media content',
    descriptionEn: 'Media content',
    subItems: [
      {
        id: '6-1',
        name: 'Photos',
        nameMn: 'Photos',
        nameEn: 'Photos',
        slug: 'photos',
        description: 'Photo gallery',
        descriptionMn: 'Photo gallery',
        descriptionEn: 'Photo gallery'
      },
      {
        id: '6-2',
        name: 'Videos',
        nameMn: 'Videos',
        nameEn: 'Videos',
        slug: 'videos',
        description: 'Video gallery',
        descriptionMn: 'Video gallery',
        descriptionEn: 'Video gallery'
      }
    ]
  },
  {
    id: '7',
    name: 'Тэмцээний төлөвлөгөө',
    nameMn: 'Тэмцээний төлөвлөгөө',
    nameEn: 'Competition Schedule',
    slug: 'competition-schedule',
    description: 'To be displayed in calendar format',
    descriptionMn: 'To be displayed in calendar format',
    descriptionEn: 'To be displayed in calendar format',
    subItems: [
      {
        id: '7-1',
        name: 'Annual calendar',
        nameMn: 'Жилийн хуанли',
        nameEn: 'Annual Calendar',
        slug: 'annual-calendar',
        description: 'Yearly competition calendar',
        descriptionMn: 'Жилийн тэмцээний хуанли',
        descriptionEn: 'Yearly competition calendar'
      },
      {
        id: '7-2',
        name: 'Competition date, time, location',
        nameMn: 'Тэмцээний дэлгэрэнгүй',
        nameEn: 'Competition Details',
        slug: 'competition-details',
        description: 'Detailed competition information',
        descriptionMn: 'Тэмцээний огноо, цаг, байршлын мэдээлэл',
        descriptionEn: 'Detailed competition information'
      }
    ]
  },
  {
    id: '8',
    name: 'Шүүгчид',
    nameMn: 'Шүүгчид',
    nameEn: 'Referees',
    slug: 'referees',
    description: 'Referee information',
    descriptionMn: 'Referee information',
    descriptionEn: 'Referee information',
    subItems: [
      {
        id: '8-1',
        name: 'Referee profiles',
        nameMn: 'Шүүгчдийн профайл',
        nameEn: 'Referee Profiles',
        slug: 'referee-profiles',
        description: 'Individual referee profiles',
        descriptionMn: 'Шүүгчдийн хувийн мэдээлэл',
        descriptionEn: 'Individual referee profiles'
      },
      {
        id: '8-2',
        name: 'Experience, qualifications',
        nameMn: 'Мэргэжлийн чадвар',
        nameEn: 'Experience & Qualifications',
        slug: 'referee-qualifications',
        description: 'Referee experience and qualifications',
        descriptionMn: 'Шүүгчдийн туршлага, мэргэжлийн чадвар',
        descriptionEn: 'Referee experience and qualifications'
      }
    ]
  },
  {
    id: '9',
    name: 'Дүрэм журам',
    nameMn: 'Дүрэм журам',
    nameEn: 'Rules & Regulations',
    slug: 'rules-regulations',
    description: 'In PDF/HTML format',
    descriptionMn: 'In PDF/HTML format',
    descriptionEn: 'In PDF/HTML format',
    subItems: [
      {
        id: '9-1',
        name: 'Federation rules',
        nameMn: 'Холбооны дүрэм',
        nameEn: 'Federation Rules',
        slug: 'federation-rules',
        description: 'Federation governing rules',
        descriptionMn: 'Холбооны удирдлагын дүрэм',
        descriptionEn: 'Federation governing rules'
      },
      {
        id: '9-2',
        name: 'Hockey sports rules',
        nameMn: 'Хоккейн дүрэм',
        nameEn: 'Hockey Rules',
        slug: 'hockey-rules',
        description: 'Official hockey game rules',
        descriptionMn: 'Хоккейн спортын албан ёсны дүрэм',
        descriptionEn: 'Official hockey game rules'
      }
    ]
  },
  {
    id: '10',
    name: 'Статистик',
    nameMn: 'Статистик',
    nameEn: 'Statistics',
    slug: 'statistics',
    description: 'In table, graph format',
    descriptionMn: 'In table, graph format',
    descriptionEn: 'In table, graph format',
    subItems: [
      {
        id: '10-1',
        name: 'Competition results',
        nameMn: 'Тэмцээний үр дүн',
        nameEn: 'Competition Results',
        slug: 'competition-results',
        description: 'Competition results and standings',
        descriptionMn: 'Тэмцээний үр дүн, байрлал',
        descriptionEn: 'Competition results and standings'
      },
      {
        id: '10-2',
        name: 'Team, player statistics',
        nameMn: 'Баг, тоглогчдын статистик',
        nameEn: 'Team & Player Statistics',
        slug: 'team-player-stats',
        description: 'Detailed team and player statistics',
        descriptionMn: 'Баг, тоглогчдын дэлгэрэнгүй статистик',
        descriptionEn: 'Detailed team and player statistics'
      }
    ]
  },
  {
    id: '11',
    name: 'ХАБ (Хөдөлмөрийн аюулгүй байдал)',
    nameMn: 'ХАБ (Хөдөлмөрийн аюулгүй байдал)',
    nameEn: 'OSH (Occupational Safety & Health)',
    slug: 'osh',
    description: 'Occupational Safety and Health',
    descriptionMn: 'Occupational Safety and Health',
    descriptionEn: 'Occupational Safety and Health',
    subItems: [
      {
        id: '11-1',
        name: 'Safety instructions',
        nameMn: 'Аюулгүй ажиллагааны зааварчилгаа',
        nameEn: 'Safety Instructions',
        slug: 'safety-instructions',
        description: 'Safety guidelines and instructions',
        descriptionMn: 'Аюулгүй ажиллагааны зааварчилгаа',
        descriptionEn: 'Safety guidelines and instructions'
      },
      {
        id: '11-2',
        name: 'Health, insurance information',
        nameMn: 'Эрүүл мэнд, даатгал',
        nameEn: 'Health & Insurance',
        slug: 'health-insurance',
        description: 'Health and insurance information',
        descriptionMn: 'Эрүүл мэндийн болон даатгалын мэдээлэл',
        descriptionEn: 'Health and insurance information'
      }
    ]
  },
  {
    id: '12',
    name: 'Үндэсний шигшээ баг',
    nameMn: 'Үндэсний шигшээ баг',
    nameEn: 'National Team',
    slug: 'national-team',
    description: 'National team information',
    descriptionMn: 'National team information',
    descriptionEn: 'National team information',
    subItems: [
      {
        id: '12-1',
        name: 'National team roster',
        nameMn: 'Үндэсний шигшээ багийн бүрэлдэхүүн',
        nameEn: 'National Team Roster',
        slug: 'national-team-roster',
        description: 'Current national team players',
        descriptionMn: 'Одоогийн үндэсний шигшээ багийн тоглогчид',
        descriptionEn: 'Current national team players'
      },
      {
        id: '12-2',
        name: 'Participated competitions',
        nameMn: 'Оролцсон тэмцээн',
        nameEn: 'Participated Competitions',
        slug: 'participated-competitions',
        description: 'Competitions participated by national team',
        descriptionMn: 'Үндэсний шигшээ багийн оролцсон тэмцээн',
        descriptionEn: 'Competitions participated by national team'
      },
      {
        id: '12-3',
        name: 'Awards, incentives',
        nameMn: 'Шагнал, урамшуулал',
        nameEn: 'Awards & Incentives',
        slug: 'awards-incentives',
        description: 'Team awards and achievements',
        descriptionMn: 'Багийн шагнал, амжилт',
        descriptionEn: 'Team awards and achievements'
      }
    ]
  },
  {
    id: '13',
    name: 'Түүхэн замнал',
    nameMn: 'Түүхэн замнал',
    nameEn: 'History',
    slug: 'history',
    description: 'Combined photos, text',
    descriptionMn: 'Combined photos, text',
    descriptionEn: 'Combined photos, text',
    subItems: [
      {
        id: '13-1',
        name: 'Federation history',
        nameMn: 'Холбооны түүх',
        nameEn: 'Federation History',
        slug: 'federation-history',
        description: 'Historical development of the federation',
        descriptionMn: 'Холбооны түүхэн хөгжил',
        descriptionEn: 'Historical development of the federation'
      },
      {
        id: '13-2',
        name: 'Timeline',
        nameMn: 'Цаг хугацааны дараалал',
        nameEn: 'Timeline',
        slug: 'timeline',
        description: 'Chronological timeline of events',
        descriptionMn: 'Үйл явдлын цаг хугацааны дараалал',
        descriptionEn: 'Chronological timeline of events'
      }
    ]
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'mn';
    
    // Filter menu items based on language
    const filteredMenuData = menuData.map(item => ({
      ...item,
      name: language === 'en' ? item.nameEn || item.name : item.nameMn || item.name,
      description: language === 'en' ? item.descriptionEn || item.description : item.descriptionMn || item.description,
      subItems: item.subItems?.map(subItem => ({
        ...subItem,
        name: language === 'en' ? subItem.nameEn || subItem.name : subItem.nameMn || subItem.name,
        description: language === 'en' ? subItem.descriptionEn || subItem.description : subItem.descriptionMn || subItem.description,
      }))
    }));
    
    const response: ApiResponse<MenuItem[]> = {
      success: true,
      data: filteredMenuData,
      message: 'Menu data retrieved successfully'
    };
    
    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      message: 'Failed to retrieve menu data'
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}
