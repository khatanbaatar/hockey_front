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
