import { NextResponse } from 'next/server';
import { MenuItem, ApiResponse } from '@/types';

// Mock data based on the menu structure from the image
const menuData: MenuItem[] = [
  {
    id: '1',
    name: 'Нэмэлтээ хийгдэх меню',
    slug: 'additional-menu',
    description: 'Extension of the main menu',
    subItems: []
  },
  {
    id: '2',
    name: 'Бүтэц зохион байгуулалт',
    slug: 'structure-organization',
    description: 'Federation management structure',
    subItems: [
      {
        id: '2-1',
        name: 'Federation structure',
        slug: 'federation-structure',
        description: 'Federation organizational structure'
      },
      {
        id: '2-2',
        name: 'Positions, roles and responsibilities',
        slug: 'positions-roles',
        description: 'Management positions and responsibilities'
      }
    ]
  },
  {
    id: '3',
    name: 'Дэд бүтэц',
    slug: 'infrastructure',
    description: 'Infrastructure development map',
    subItems: [
      {
        id: '3-1',
        name: 'Sports fields',
        slug: 'sports-fields',
        description: 'Sports facilities and fields'
      },
      {
        id: '3-2',
        name: 'Halls',
        slug: 'halls',
        description: 'Sports halls and venues'
      },
      {
        id: '3-3',
        name: 'Technical equipment',
        slug: 'technical-equipment',
        description: 'Sports equipment and technology'
      },
      {
        id: '3-4',
        name: 'Provincial/branch infrastructure',
        slug: 'provincial-infrastructure',
        description: 'Regional infrastructure development'
      }
    ]
  },
  {
    id: '4',
    name: 'Сургалт, семинар',
    slug: 'training-seminar',
    description: 'Training, seminar information',
    subItems: [
      {
        id: '4-1',
        name: 'Coaches',
        slug: 'coaches',
        description: 'Coach training programs'
      },
      {
        id: '4-2',
        name: 'Referees',
        slug: 'referees',
        description: 'Referee training and certification'
      },
      {
        id: '4-3',
        name: 'Children',
        slug: 'children',
        description: 'Children training programs'
      },
      {
        id: '4-4',
        name: 'Youth',
        slug: 'youth',
        description: 'Youth development programs'
      },
      {
        id: '4-5',
        name: 'Clubs',
        slug: 'clubs',
        description: 'Club management training'
      },
      {
        id: '4-6',
        name: 'Federations',
        slug: 'federations',
        description: 'Federation management training'
      },
      {
        id: '4-7',
        name: 'Education',
        slug: 'education',
        description: 'Educational programs'
      },
      {
        id: '4-8',
        name: 'International',
        slug: 'international',
        description: 'International training programs'
      }
    ]
  },
  {
    id: '5',
    name: 'Багууд',
    slug: 'teams',
    description: 'Teams of all levels',
    subItems: [
      {
        id: '5-1',
        name: 'List of clubs, teams',
        slug: 'clubs-teams-list',
        description: 'Complete list of registered teams'
      },
      {
        id: '5-2',
        name: 'Contact information',
        slug: 'contact-info',
        description: 'Team contact details'
      }
    ]
  },
  {
    id: '6',
    name: 'Зураг болон бичлэгийн галерей',
    slug: 'gallery',
    description: 'Media content',
    subItems: [
      {
        id: '6-1',
        name: 'Photos',
        slug: 'photos',
        description: 'Photo gallery'
      },
      {
        id: '6-2',
        name: 'Videos',
        slug: 'videos',
        description: 'Video gallery'
      }
    ]
  },
  {
    id: '7',
    name: 'Тэмцээний төлөвлөгөө',
    slug: 'competition-schedule',
    description: 'To be displayed in calendar format',
    subItems: [
      {
        id: '7-1',
        name: 'Annual calendar',
        slug: 'annual-calendar',
        description: 'Yearly competition calendar'
      },
      {
        id: '7-2',
        name: 'Competition date, time, location',
        slug: 'competition-details',
        description: 'Detailed competition information'
      }
    ]
  },
  {
    id: '8',
    name: 'Шүүгчид',
    slug: 'referees',
    description: 'Referee information',
    subItems: [
      {
        id: '8-1',
        name: 'Referee profiles',
        slug: 'referee-profiles',
        description: 'Individual referee profiles'
      },
      {
        id: '8-2',
        name: 'Experience, qualifications',
        slug: 'referee-qualifications',
        description: 'Referee experience and qualifications'
      }
    ]
  },
  {
    id: '9',
    name: 'Дүрэм журам',
    slug: 'rules-regulations',
    description: 'In PDF/HTML format',
    subItems: [
      {
        id: '9-1',
        name: 'Federation rules',
        slug: 'federation-rules',
        description: 'Federation governing rules'
      },
      {
        id: '9-2',
        name: 'Hockey sports rules',
        slug: 'hockey-rules',
        description: 'Official hockey game rules'
      }
    ]
  },
  {
    id: '10',
    name: 'Статистик',
    slug: 'statistics',
    description: 'In table, graph format',
    subItems: [
      {
        id: '10-1',
        name: 'Competition results',
        slug: 'competition-results',
        description: 'Competition results and standings'
      },
      {
        id: '10-2',
        name: 'Team, player statistics',
        slug: 'team-player-stats',
        description: 'Detailed team and player statistics'
      }
    ]
  },
  {
    id: '11',
    name: 'ХАБ (Хөдөлмөрийн аюулгүй байдал)',
    slug: 'osh',
    description: 'Occupational Safety and Health',
    subItems: [
      {
        id: '11-1',
        name: 'Safety instructions',
        slug: 'safety-instructions',
        description: 'Safety guidelines and instructions'
      },
      {
        id: '11-2',
        name: 'Health, insurance information',
        slug: 'health-insurance',
        description: 'Health and insurance information'
      }
    ]
  },
  {
    id: '12',
    name: 'Үндэсний шигшээ баг',
    slug: 'national-team',
    description: 'National team information',
    subItems: [
      {
        id: '12-1',
        name: 'National team roster',
        slug: 'national-team-roster',
        description: 'Current national team players'
      },
      {
        id: '12-2',
        name: 'Participated competitions',
        slug: 'participated-competitions',
        description: 'Competitions participated by national team'
      },
      {
        id: '12-3',
        name: 'Awards, incentives',
        slug: 'awards-incentives',
        description: 'Team awards and achievements'
      }
    ]
  },
  {
    id: '13',
    name: 'Түүхэн замнал',
    slug: 'history',
    description: 'Combined photos, text',
    subItems: [
      {
        id: '13-1',
        name: 'Federation history',
        slug: 'federation-history',
        description: 'Historical development of the federation'
      },
      {
        id: '13-2',
        name: 'Timeline',
        slug: 'timeline',
        description: 'Chronological timeline of events'
      }
    ]
  }
];

export async function GET() {
  try {
    const response: ApiResponse<MenuItem[]> = {
      success: true,
      data: menuData,
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
