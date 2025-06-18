import { NavLink, useLocation } from 'react-router-dom';
import HeaderButtonIcon from './HeaderButtonIcon';

interface HeaderButtonLinkProps {
  to: string;
  icon: string;
  iconColor?: string;
  transparent?: boolean;
}

function HeaderButtonLink({
  to,
  icon,
  iconColor,
  transparent,
}: HeaderButtonLinkProps) {
  const location = useLocation();

  return (
    <NavLink to={to} state={{ from: location.pathname }}>
      <HeaderButtonIcon
        icon={icon}
        iconColor={iconColor}
        transparent={transparent}
      />
    </NavLink>
  );
}

export default HeaderButtonLink;
