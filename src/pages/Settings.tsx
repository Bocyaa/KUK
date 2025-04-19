import ProfileCard from "@app/components/ui/settings/ProfileCard";
import SectionBg from "@app/components/ui/settings/SectionBg";
import SettingItem from "@app/components/ui/settings/SettingItem";
import { NavLink } from "react-router-dom";

function Settings() {
  return (
    <div className="mt-14 flex w-full flex-col gap-5">
      <NavLink to="/profile">
        <ProfileCard />
      </NavLink>
      <SectionBg>
        <SettingItem settingKey="language" />
        <SettingItem settingKey="notifications" />
        <SettingItem settingKey="privacyData" />
      </SectionBg>
      <SectionBg>
        <SettingItem settingKey="dashboard" />
        <SettingItem settingKey="personalization" />
      </SectionBg>
      <SectionBg>
        <SettingItem settingKey="layout" />
        <SettingItem settingKey="theme" />
        <SettingItem settingKey="accentColor" />
        <SettingItem settingKey="fontSize" />
      </SectionBg>
      <SectionBg>
        <SettingItem settingKey="logout" />
      </SectionBg>
    </div>
  );
}

export default Settings;
