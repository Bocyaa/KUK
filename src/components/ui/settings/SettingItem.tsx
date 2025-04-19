import {
  AdjustmentsVerticalIcon,
  ArrowLeftStartOnRectangleIcon,
  BellAlertIcon,
  ChevronRightIcon,
  ItalicIcon,
  LanguageIcon,
  LockClosedIcon,
  PaintBrushIcon,
  PresentationChartLineIcon,
  RectangleGroupIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import type { ReactElement } from "react";
import { supabase } from "@app/lib/supabaseClient";

type SettingItemProps = {
  settingKey: string;
};

interface SettingItems {
  key: string;
  label: string;
  icon: ReactElement;
  handleClick?: () => Promise<void>;
}

function SettingItem({ settingKey }: SettingItemProps) {
  const navigate = useNavigate();

  const settingItems: SettingItems[] = [
    {
      key: "language",
      label: "Language",
      icon: <LanguageIcon />,
    },
    {
      key: "notifications",
      label: "Notifications",
      icon: <BellAlertIcon />,
    },
    {
      key: "privacyData",
      label: "Privacy & Data",
      icon: <LockClosedIcon />,
    },
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <PresentationChartLineIcon />,
    },
    {
      key: "personalization",
      label: "Personalization",
      icon: <AdjustmentsVerticalIcon />,
    },
    {
      key: "layout",
      label: "Layout",
      icon: <RectangleGroupIcon />,
    },
    {
      key: "theme",
      label: "Theme",
      icon: <SunIcon />,
    },
    {
      key: "accentColor",
      label: "Accent Color",
      icon: <PaintBrushIcon />,
    },
    {
      key: "fontSize",
      label: "Font Size",
      icon: <ItalicIcon />,
    },
    {
      key: "logout",
      label: "Log out",
      icon: <ArrowLeftStartOnRectangleIcon />,
      handleClick: async () => {
        await supabase.auth.signOut();
        navigate("/login");
      },
    },
  ];

  return (
    <>
      {settingItems.map(
        (item) =>
          item.key === settingKey && (
            <div
              onClick={item.handleClick}
              className="flex items-center justify-between py-[0.65rem] pl-4 pr-2"
            >
              <div
                className={`flex items-center gap-5 ${item.key === "logout" ? "text-red-600" : "text-[#0b0b0b]"}`}
              >
                <span className="h-5 w-5">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.key !== "logout" && (
                <ChevronRightIcon className="h-4 stroke-[3] text-[#c0c0c0] dark:text-[#59585e]" />
              )}
            </div>
          ),
      )}
    </>
  );
}

export default SettingItem;
