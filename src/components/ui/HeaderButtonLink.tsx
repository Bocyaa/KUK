import { NavLink } from 'react-router-dom';
import HeaderButtonIcon from './HeaderButtonIcon';

interface HeaderButtonLinkProps {
  to: string;
  icon: string;
  iconColor?: string;
  bgLight?: string;
  bgDark?: string;
}

function HeaderButtonLink({
  to,
  icon,
  iconColor,
  bgLight,
  bgDark,
}: HeaderButtonLinkProps) {
  return (
    <NavLink to={to}>
      <HeaderButtonIcon
        icon={icon}
        iconColor={iconColor}
        bgLight={bgLight}
        bgDark={bgDark}
      />
    </NavLink>
  );
}

export default HeaderButtonLink;
