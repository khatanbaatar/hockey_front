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
  // Create the correct slug format for the API
  const apiSlug = `${slug}-${subSlug}`;
  return <PageContent slug={subSlug} />;
}

export async function generateStaticParams() {
  // Generate static params for sub-menu items
  // These should match the actual API slugs in the database
  const subMenuItems = [
    { slug: 'about-us', subSlug: 'about-us-president' },
    { slug: 'about-us', subSlug: 'about-us-leadership-team' },
    { slug: 'about-us', subSlug: 'about-us-federation-info' },
    { slug: 'structure-organization', subSlug: 'structure-organization-federation-structure' },
    { slug: 'structure-organization', subSlug: 'structure-organization-positions-roles' },
    { slug: 'infrastructure', subSlug: 'infrastructure-sports-fields' },
    { slug: 'infrastructure', subSlug: 'infrastructure-halls' },
    { slug: 'infrastructure', subSlug: 'infrastructure-technical-equipment' },
    { slug: 'infrastructure', subSlug: 'infrastructure-provincial-infrastructure' },
    { slug: 'training-seminar', subSlug: 'training-seminar-coaches' },
    { slug: 'training-seminar', subSlug: 'training-seminar-referees' },
    { slug: 'training-seminar', subSlug: 'training-seminar-children' },
    { slug: 'training-seminar', subSlug: 'training-seminar-youth' },
    { slug: 'training-seminar', subSlug: 'training-seminar-clubs' },
    { slug: 'training-seminar', subSlug: 'training-seminar-federations' },
    { slug: 'training-seminar', subSlug: 'training-seminar-education' },
    { slug: 'training-seminar', subSlug: 'training-seminar-international' },
    { slug: 'teams', subSlug: 'teams-clubs-teams-list' },
    { slug: 'teams', subSlug: 'teams-contact-info' },
    { slug: 'gallery', subSlug: 'gallery-photos' },
    { slug: 'gallery', subSlug: 'gallery-videos' },
    { slug: 'competition-schedule', subSlug: 'competition-schedule-annual-calendar' },
    { slug: 'competition-schedule', subSlug: 'competition-schedule-details' },
    { slug: 'referees', subSlug: 'referees-referee-profiles' },
    { slug: 'referees', subSlug: 'referees-referee-qualifications' },
    { slug: 'rules-regulations', subSlug: 'rules-regulations-federation-rules' },
    { slug: 'rules-regulations', subSlug: 'rules-regulations-hockey-rules' },
    { slug: 'statistics', subSlug: 'statistics-competition-results' },
    { slug: 'statistics', subSlug: 'statistics-team-player-stats' },
    { slug: 'osh', subSlug: 'osh-safety-instructions' },
    { slug: 'osh', subSlug: 'osh-health-insurance' },
    { slug: 'national-team', subSlug: 'national-team-roster' },
    { slug: 'national-team', subSlug: 'national-team-competitions' },
    { slug: 'national-team', subSlug: 'national-team-awards' },
    { slug: 'history', subSlug: 'history-federation-history' },
    { slug: 'history', subSlug: 'history-timeline' }
  ];

  return subMenuItems;
}
