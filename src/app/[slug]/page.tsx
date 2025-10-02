import PageContent from '@/components/PageContent';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <PageContent slug={slug} />;
}

export async function generateStaticParams() {
  // Generate static params for all menu items
  const menuItems = [
    'about-us',
    'structure-organization',
    'infrastructure', 
    'training-seminar',
    'teams',
    'gallery',
    'competition-schedule',
    'referees',
    'rules-regulations',
    'statistics',
    'osh',
    'national-team',
    'history'
  ];

  return menuItems.map((slug) => ({
    slug,
  }));
}
