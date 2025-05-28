import { NavLink } from 'react-router-dom';
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
  return (
    <NavLink to={to}>
      <HeaderButtonIcon
        icon={icon}
        iconColor={iconColor}
        transparent={transparent}
      />
    </NavLink>
  );
}

export default HeaderButtonLink;
