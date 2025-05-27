import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';

interface BackLinkProps {
  to: string;
  label: string;
}

function BackLink({ to, label }: BackLinkProps) {
  return (
    <NavLink to={to}>
      <div className="flex items-center gap-1">
        <ChevronLeftIcon className="h-3 w-3" />
        <span className="text-xs text-[#0094f6]">{label}</span>
      </div>
    </NavLink>
  );
}

export default BackLink;
