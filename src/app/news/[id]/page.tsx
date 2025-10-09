import NewsDetailClient from './NewsDetailClient';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  image?: string;
  category: string;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// This function is required for static export with dynamic routes
export async function generateStaticParams() {
  try {
    // Fetch news IDs from your API
    const api = "https://hockey.onol.tech";
    const response = await fetch(`${api}/api/news?language=mn`);
    const data = await response.json();
    
    if (data.success && data.data) {
      // Return array of params for each news item
      return data.data.map((item: NewsItem) => ({
        id: item.id,
      }));
    }
    
    // Fallback: return empty array if API fails
    return [];
  } catch (error) {
    console.error('Error fetching news for static generation:', error);
    // Return empty array if API fails during build
    return [];
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <NewsDetailClient newsId={id} />;
}
