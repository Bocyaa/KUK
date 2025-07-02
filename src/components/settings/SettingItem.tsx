//   AdjustmentsVerticalIcon,
//   ArrowLeftStartOnRectangleIcon,
//   BellAlertIcon,
//   FingerPrintIcon,
//   ItalicIcon,
//   LanguageIcon,
//   LockClosedIcon,
//   PaintBrushIcon,
//   PresentationChartLineIcon,
//   RectangleGroupIcon,
//   SunIcon,
//   UserIcon,
//   UserPlusIcon,

import { ChevronRightIcon } from '@heroicons/react/24/outline';
import type { ReactElement } from 'react';

interface SettingItemProps {
  label: string;
  icon: ReactElement;
  isDanger?: boolean;
  handleClick: () => void;
}

function SettingItem({
  label,
  icon,
  isDanger = false,
  handleClick,
}: SettingItemProps) {
  // const navigate = useNavigate();
  // const invalidate = useInvalidateUserPofile();

  // const settingItems: SettingItems[] = [
  //   {
  //     key: 'language',
  //     label: 'Language',
  //     icon: <LanguageIcon />,
  //   },
  //   {
  //     key: 'notifications',
  //     label: 'Notifications',
  //     icon: <BellAlertIcon />,
  //   },
  //   {
  //     key: 'privacyData',
  //     label: 'Privacy & Data',
  //     icon: <LockClosedIcon />,
  //   },
  //   {
  //     key: 'dashboard',
  //     label: 'Dashboard',
  //     icon: <PresentationChartLineIcon />,
  //   },
  //   {
  //     key: 'personalization',
  //     label: 'Personalization',
  //     icon: <AdjustmentsVerticalIcon />,
  //   },
  //   {
  //     key: 'layout',
  //     label: 'Layout',
  //     icon: <RectangleGroupIcon />,
  //   },
  //   {
  //     key: 'theme',
  //     label: 'Theme',
  //     icon: <SunIcon />,
  //   },
  //   {
  //     key: 'accentColor',
  //     label: 'Accent Color',
  //     icon: <PaintBrushIcon />,
  //   },
  //   {
  //     key: 'fontSize',
  //     label: 'Font Size',
  //     icon: <ItalicIcon />,
  //   },
  //   {
  //     key: 'personalInfo',
  //     label: 'Personal Information',
  //     icon: <UserIcon />,
  //   },
  //   {
  //     key: 'contactDemographics',
  //     label: 'Contact & Demographics',
  //     icon: <UserPlusIcon />,
  //   },
  //   {
  //     key: 'passwordUpdate',
  //     label: 'Update Password',
  //     icon: <FingerPrintIcon />,
  //   },
  //   {
  //     key: 'deleteAccount',
  //     label: 'Delete Account',
  //     icon: <UserMinusIcon />,
  //   },
  //   {
  //     key: 'logout',
  //     label: 'Log out',
  //     icon: <ArrowLeftStartOnRectangleIcon />,
  //     handleClick: async () => {
  //       await supabase.auth.signOut();
  //       invalidate();
  //       navigate('/login');
  //     },
  //   },
  // ];

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between bg-[#f9f9f9] py-[0.65rem] pl-4 pr-2 hover:bg-[#d2d1d7] active:bg-[##d2d1d7] dark:bg-[#1c1c1e] dark:hover:bg-[#3a3a3c] dark:active:bg-[#3a3a3c]"
    >
      <div className={`flex items-center gap-5 text-[#0b0b0b] dark:text-[#f9f9f9]`}>
        <span className={`h-5 w-5 ${isDanger && 'text-red-500 dark:text-red-500'}`}>
          {icon}
        </span>
        <span className={`${isDanger && 'text-red-500 dark:text-red-500'}`}>
          {label}
        </span>
      </div>
      {!isDanger && (
        <ChevronRightIcon className="h-4 stroke-[3] text-[#c0c0c0] dark:text-[#59585e]" />
      )}
    </div>
  );
}

export default SettingItem;
