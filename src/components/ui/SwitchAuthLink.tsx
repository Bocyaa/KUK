import { NavLink } from 'react-router-dom';

interface SwitchAuthLinkProps {
  question: string;
  linkText: string;
  to: string;
}

function SwitchAuthLink({ question, linkText, to }: SwitchAuthLinkProps) {
  return (
    <p className='mt-10 text-center text-sm text-gray-500'>
      {question}{' '}
      <NavLink to={`/${to}`} className='text-blue-500 hover:text-blue-500'>
        {linkText}
      </NavLink>
    </p>
  );
}

export default SwitchAuthLink;
