import PageContent from '@/components/PageContent';

interface PageProps {
  params: Promise<{
    slug: string;
    subSlug: string;
  }>;
}

export default async function SubPage({ params }: PageProps) {
  // For sub-pages, we'll use the subSlug as the main identifier
  // This allows for nested routing like /training-seminar/coaches
  const { slug, subSlug } = await params;
  return <PageContent slug={`${slug}-${subSlug}`} />;
}

export async function generateStaticParams() {
  // Generate static params for sub-menu items
  const subMenuItems = [
    { slug: 'about-us', subSlug: 'president' },
    { slug: 'about-us', subSlug: 'leadership-team' },
    { slug: 'about-us', subSlug: 'federation-info' },
    { slug: 'structure-organization', subSlug: 'federation-structure' },
    { slug: 'structure-organization', subSlug: 'positions-roles' },
    { slug: 'infrastructure', subSlug: 'sports-fields' },
    { slug: 'infrastructure', subSlug: 'halls' },
    { slug: 'infrastructure', subSlug: 'technical-equipment' },
    { slug: 'infrastructure', subSlug: 'provincial-infrastructure' },
    { slug: 'training-seminar', subSlug: 'coaches' },
    { slug: 'training-seminar', subSlug: 'referees' },
    { slug: 'training-seminar', subSlug: 'children' },
    { slug: 'training-seminar', subSlug: 'youth' },
    { slug: 'training-seminar', subSlug: 'clubs' },
    { slug: 'training-seminar', subSlug: 'federations' },
    { slug: 'training-seminar', subSlug: 'education' },
    { slug: 'training-seminar', subSlug: 'international' },
    { slug: 'teams', subSlug: 'clubs-teams-list' },
    { slug: 'teams', subSlug: 'contact-info' },
    { slug: 'gallery', subSlug: 'photos' },
    { slug: 'gallery', subSlug: 'videos' },
    { slug: 'competition-schedule', subSlug: 'annual-calendar' },
    { slug: 'competition-schedule', subSlug: 'competition-details' },
    { slug: 'referees', subSlug: 'referee-profiles' },
    { slug: 'referees', subSlug: 'referee-qualifications' },
    { slug: 'rules-regulations', subSlug: 'federation-rules' },
    { slug: 'rules-regulations', subSlug: 'hockey-rules' },
    { slug: 'statistics', subSlug: 'competition-results' },
    { slug: 'statistics', subSlug: 'team-player-stats' },
    { slug: 'osh', subSlug: 'safety-instructions' },
    { slug: 'osh', subSlug: 'health-insurance' },
    { slug: 'national-team', subSlug: 'national-team-roster' },
    { slug: 'national-team', subSlug: 'participated-competitions' },
    { slug: 'national-team', subSlug: 'awards-incentives' },
    { slug: 'history', subSlug: 'federation-history' },
    { slug: 'history', subSlug: 'timeline' }
  ];

  return subMenuItems;
}
