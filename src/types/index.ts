export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  subItems?: MenuItem[];
  // Multi-language support
  nameMn?: string;
  nameEn?: string;
  descriptionMn?: string;
  descriptionEn?: string;
}

export interface Player {
  id: number;
  name: string;
  position: string;
  club: string;
  clubLogo: string;
  photo: string;
  age?: number;
  height?: string;
  weight?: string;
  gamesPlayed?: number;
  goals?: number;
  assists?: number;
  points?: number;
}

export interface Team {
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

export interface Competition {
  id: number;
  name: string;
  season: string;
  standings: Array<{
    id: number;
    position: number;
    games_played: number;
    wins: number;
    draws: number;
    losses: number;
    goals_for: number;
    goals_against: number;
    goal_difference: number;
    points: number;
    last_5_results: string[];
    team_name_mn: string;
    team_logo: string;
  }>;
}

export interface PageContent {
  id: string;
  title: string;
  content: string;
  subSections?: {
    title: string;
    content: string;
  }[];
  media?: {
    type: 'image' | 'video';
    url: string;
    caption?: string;
  }[];
  players?: Player[];
  teams?: Team[];
  competitions?: Competition[];
  // Multi-language support
  titleMn?: string;
  titleEn?: string;
  contentMn?: string;
  contentEn?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
