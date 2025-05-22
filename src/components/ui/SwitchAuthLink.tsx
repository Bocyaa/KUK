import { NavLink } from 'react-router-dom';

interface SwitchAuthLinkProps {
  question: string;
  linkText: string;
  to: string;
}

function SwitchAuthLink({ question, linkText, to }: SwitchAuthLinkProps) {
  return (
    <div className="flex flex-col items-center">
      <span className="mb-5 mt-7 text-sm text-[#171823BF] dark:text-[#afafaf]">
        {question}
      </span>
      <NavLink
        to={`/${to}`}
        className="flex w-full justify-center rounded-xl border border-[#d2d4db] bg-white py-2 text-sm font-semibold dark:border-[#424242] dark:bg-[#000000] dark:active:bg-[#212121] md:hover:bg-gray-100 dark:md:hover:bg-[#212121]"
      >
        <span className="text-[#171823] dark:text-white">{linkText}</span>
      </NavLink>
    </div>
  );
}

export default SwitchAuthLink;
