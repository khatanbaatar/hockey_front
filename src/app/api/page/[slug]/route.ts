import { NextRequest, NextResponse } from 'next/server';

interface Player {
  id: number;
  name: string;
  position: string;
  club: string;
  clubLogo: string;
  photo: string;
  age: number;
  height: string;
  weight: string;
  gamesPlayed: number;
  goals: number;
  assists: number;
  points: number;
}

interface Team {
  id: number;
  name: string;
  logo: string;
  gamesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

interface PageContent {
  title: string;
  content: string;
  media?: Array<{
    type: 'image' | 'video';
    url: string;
    caption?: string;
  }>;
  subSections?: Array<{
    title: string;
    content: string;
  }>;
  players?: Player[];
  teams?: Team[];
}

// Mock data for team-player-stats
const teamPlayerStatsData: Record<string, PageContent> = {
  'statistics-team-player-stats': {
    title: 'Баг, тоглогчдын статистик',
    content: 'Монголын хоккейн холбооны баг, тоглогчдын мэдээлэл, статистик болон гүйцэтгэлийн мэдээлэл',
    players: [
      {
        id: 1,
        name: "Батбаяр Батбат",
        position: "Forward",
        club: "Хангарьд",
        clubLogo: "🏒",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face",
        age: 25,
        height: "175cm",
        weight: "75kg",
        gamesPlayed: 15,
        goals: 8,
        assists: 5,
        points: 13
      },
      {
        id: 2,
        name: "Энхбаяр Мөнхбат",
        position: "Goalkeeper",
        club: "Бүргэд",
        clubLogo: "🏒",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face",
        age: 28,
        height: "180cm",
        weight: "85kg",
        gamesPlayed: 15,
        goals: 0,
        assists: 1,
        points: 1
      },
      {
        id: 3,
        name: "Төмөрбаатар Төмөр",
        position: "Defender",
        club: "Алтан гадас",
        clubLogo: "🏒",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face",
        age: 26,
        height: "178cm",
        weight: "80kg",
        gamesPlayed: 14,
        goals: 3,
        assists: 7,
        points: 10
      },
      {
        id: 4,
        name: "Ганбаатар Ганзориг",
        position: "Forward",
        club: "Хүрэл мөнгөн",
        clubLogo: "🏒",
        photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=400&fit=crop&crop=face",
        age: 24,
        height: "172cm",
        weight: "70kg",
        gamesPlayed: 13,
        goals: 6,
        assists: 4,
        points: 10
      },
      {
        id: 5,
        name: "Мөнхбаатар Мөнхбат",
        position: "Midfielder",
        club: "Цагаан сар",
        clubLogo: "🏒",
        photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=face",
        age: 27,
        height: "176cm",
        weight: "78kg",
        gamesPlayed: 15,
        goals: 4,
        assists: 8,
        points: 12
      },
      {
        id: 6,
        name: "Батбаатар Батбат",
        position: "Defender",
        club: "Хангарьд",
        clubLogo: "🏒",
        photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=face",
        age: 29,
        height: "182cm",
        weight: "88kg",
        gamesPlayed: 14,
        goals: 2,
        assists: 6,
        points: 8
      },
      {
        id: 7,
        name: "Энхбаатар Энхбат",
        position: "Forward",
        club: "Бүргэд",
        clubLogo: "🏒",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face",
        age: 23,
        height: "170cm",
        weight: "68kg",
        gamesPlayed: 12,
        goals: 7,
        assists: 3,
        points: 10
      },
      {
        id: 8,
        name: "Төмөрбаатар Төмөр",
        position: "Goalkeeper",
        club: "Алтан гадас",
        clubLogo: "🏒",
        photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=400&fit=crop&crop=face",
        age: 31,
        height: "185cm",
        weight: "90kg",
        gamesPlayed: 13,
        goals: 0,
        assists: 0,
        points: 0
      },
      {
        id: 9,
        name: "Ганбаатар Ганзориг",
        position: "Defender",
        club: "Хүрэл мөнгөн",
        clubLogo: "🏒",
        photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=face",
        age: 25,
        height: "179cm",
        weight: "82kg",
        gamesPlayed: 15,
        goals: 1,
        assists: 9,
        points: 10
      },
      {
        id: 10,
        name: "Мөнхбаатар Мөнхбат",
        position: "Forward",
        club: "Цагаан сар",
        clubLogo: "🏒",
        photo: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=400&fit=crop&crop=face",
        age: 26,
        height: "174cm",
        weight: "72kg",
        gamesPlayed: 14,
        goals: 9,
        assists: 2,
        points: 11
      }
    ],
    teams: [
      {
        id: 1,
        name: "Хангарьд",
        logo: "🏒",
        gamesPlayed: 15,
        wins: 10,
        draws: 3,
        losses: 2,
        goalsFor: 45,
        goalsAgainst: 28,
        goalDifference: 17,
        points: 33
      },
      {
        id: 2,
        name: "Бүргэд",
        logo: "🏒",
        gamesPlayed: 15,
        wins: 9,
        draws: 4,
        losses: 2,
        goalsFor: 42,
        goalsAgainst: 25,
        goalDifference: 17,
        points: 31
      },
      {
        id: 3,
        name: "Алтан гадас",
        logo: "🏒",
        gamesPlayed: 15,
        wins: 8,
        draws: 5,
        losses: 2,
        goalsFor: 38,
        goalsAgainst: 30,
        goalDifference: 8,
        points: 29
      },
      {
        id: 4,
        name: "Хүрэл мөнгөн",
        logo: "🏒",
        gamesPlayed: 15,
        wins: 7,
        draws: 6,
        losses: 2,
        goalsFor: 35,
        goalsAgainst: 32,
        goalDifference: 3,
        points: 27
      },
      {
        id: 5,
        name: "Цагаан сар",
        logo: "🏒",
        gamesPlayed: 15,
        wins: 6,
        draws: 4,
        losses: 5,
        goalsFor: 32,
        goalsAgainst: 35,
        goalDifference: -3,
        points: 22
      }
    ]
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    // const language = searchParams.get('language') || 'mn'; // Currently not used

    // Check if we have data for this slug
    const pageData = teamPlayerStatsData[slug];

    if (!pageData) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Page not found' 
        },
        { status: 404 }
      );
    }

    // Return the page data
    return NextResponse.json({
      success: true,
      data: pageData
    });

  } catch (error) {
    console.error('Error fetching page content:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch page content' 
      },
      { status: 500 }
    );
  }
}
