import ProfileCard from "@app/components/ui/settings/ProfileCard";
import SectionBg from "@app/components/ui/settings/SectionBg";
import SettingItem from "@app/components/ui/settings/SettingItem";
import { NavLink } from "react-router-dom";

function SettingsList() {
  return (
    <div className="mt-14 flex w-full flex-col gap-5">
      <NavLink to="profile">
        <ProfileCard />
      </NavLink>
      <SectionBg>
        <NavLink to="language">
          <SettingItem settingKey="language" />
        </NavLink>
        <NavLink to="notifications">
          <SettingItem settingKey="notifications" />
        </NavLink>
        <NavLink to="privacyData">
          <SettingItem settingKey="privacyData" />
        </NavLink>
      </SectionBg>
      <SectionBg>
        <NavLink to="dashboard">
          <SettingItem settingKey="dashboard" />
        </NavLink>
        <NavLink to="personalization">
          <SettingItem settingKey="personalization" />
        </NavLink>
      </SectionBg>
      <SectionBg>
        <NavLink to="layout">
          <SettingItem settingKey="layout" />
        </NavLink>
        <NavLink to="theme">
          <SettingItem settingKey="theme" />
        </NavLink>
        <NavLink to="accentColor">
          <SettingItem settingKey="accentColor" />
        </NavLink>
        <NavLink to="fontSize">
          <SettingItem settingKey="fontSize" />
        </NavLink>
      </SectionBg>
      <SectionBg>
        <NavLink to="logout">
          <SettingItem settingKey="logout" />
        </NavLink>
      </SectionBg>
    </div>
  );
}

export default SettingsList;
