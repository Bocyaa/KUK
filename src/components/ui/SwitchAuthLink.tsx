import { NavLink } from 'react-router-dom';

interface SwitchAuthLinkProps {
  question: string;
  linkText: string;
  to: string;
}

function SwitchAuthLink({ question, linkText, to }: SwitchAuthLinkProps) {
  return (
    <div className="flex flex-col items-center">
      <span className="my-5 text-sm text-[#171823BF] dark:text-[#bab9bc]">
        {question}
      </span>
      <NavLink
        to={`/${to}`}
        className="flex w-full justify-center rounded-lg border border-[#d2d4db] bg-white py-2 text-sm font-semibold hover:bg-gray-100 dark:border-[#3b3f4e] dark:bg-[#181823] dark:hover:bg-[#1e1e2b]"
      >
        <span className="text-[#171823] dark:text-white">{linkText}</span>
      </NavLink>
    </div>
  );
}

export default SwitchAuthLink;
