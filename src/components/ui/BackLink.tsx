import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

interface BackLinkProps {
  to?: string;
  label: string;
}

const ROUTES = {
  Collections: '/recipes/collections-list',
  Recipes: '/recipes',
  Profile: '/profile',
};

function BackLink({ to = '', label }: BackLinkProps) {
  return (
    <NavLink to={ROUTES[label as keyof typeof ROUTES] || to}>
      <div className="flex items-center gap-1">
        <ChevronLeftIcon className="h-3 w-3" />
        <span className="text-xs text-[#5d5d5d] dark:text-[#afafaf]">{label}</span>
      </div>
    </NavLink>
  );
}

export default BackLink;
