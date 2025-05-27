import { NavLink } from 'react-router-dom';
import HeaderButtonIcon from './HeaderButtonIcon';

interface HeaderButtonLinkProps {
  to: string;
  icon: string;
}

function HeaderButtonLink({ to, icon }: HeaderButtonLinkProps) {
  return (
    <NavLink to={to}>
      <HeaderButtonIcon icon={icon} />
    </NavLink>
  );
}

export default HeaderButtonLink;
