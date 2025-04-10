import { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement> & {
  bold?: boolean;
};

const CustomMagnifyingGlass = ({
  bold = false,
  className = '',
  ...rest
}: Props) => {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={bold ? 2.2 : 1.5}
      strokeLinecap='round'
      strokeLinejoin='round'
      xmlns='http://www.w3.org/2000/svg'
      {...rest}
    >
      <path d='M21 21l-4.35-4.35' />
      <circle cx='10.5' cy='10.5' r='7.5' />
    </svg>
  );
};

export default CustomMagnifyingGlass;
