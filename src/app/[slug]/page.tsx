import PageContent from '@/components/PageContent';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function Page({ params }: PageProps) {
  return <PageContent slug={params.slug} />;
}

export async function generateStaticParams() {
  // Generate static params for all menu items
  const menuItems = [
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
