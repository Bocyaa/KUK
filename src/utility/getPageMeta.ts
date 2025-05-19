export const pageMeta = [
  // Depth: 1
  { path: '/dashboard', title: 'Home' },
  { path: '/search', title: 'Search' },
  { path: '/create-recipe', title: 'Create Recipe' },
  { path: '/settings', title: 'Settings' },
  { path: '/recipe', title: 'Recipe Details' },
  // Depth: 2
  {
    path: '/settings/profile',
    title: 'Profile',
    back: '/settings',
  },
  {
    path: '/settings/language',
    title: 'Language',
    back: '/settings',
  },
  {
    path: '/settings/notifications',
    title: 'Notifications',
    back: '/settings',
  },
  {
    path: '/settings/privacyData',
    title: 'Privacy & Data',
    back: '/settings',
  },
  {
    path: '/settings/dashboard',
    title: 'Dashboard',
    back: '/settings',
  },
  {
    path: '/settings/personalization',
    title: 'Personalization',
    back: '/settings',
  },
  {
    path: '/settings/layout',
    title: 'Layout',
    back: '/settings',
  },
  {
    path: '/settings/theme',
    title: 'Theme',
    back: '/settings',
  },
  {
    path: '/settings/accentColor',
    title: 'Accent Color',
    back: '/settings',
  },
  {
    path: '/settings/fontSize',
    title: 'Font Size',
    back: '/settings',
  },
  // Depth: 3
  {
    path: '/settings/profile/personalInfo',
    title: 'Personal Information',
    back: '/settings/profile',
  },
  {
    path: '/settings/profile/passwordUpdate',
    title: 'Update Password',
    back: '/settings/profile',
  },
  {
    path: '/settings/profile/deleteAccount',
    title: 'Delete Account',
    back: '/settings/profile',
  },
];

interface GetPageMeta {
  title: string;
  back?: string;
}

export function getPageMeta(pathname: string): GetPageMeta {
  // Try to match the most specific path first
  return (
    pageMeta.find((meta) => pathname === meta.path) ||
    pageMeta.find((meta) => pathname.startsWith(meta.path)) || { title: '' }
  );
}
