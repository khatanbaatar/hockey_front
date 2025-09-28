export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  subItems?: MenuItem[];
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
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
