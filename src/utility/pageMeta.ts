export const pageMeta = [
  { path: "/dashboard", title: "Home" },
  { path: "/search", title: "Search" },
  { path: "/recipe", title: "Recipe Details" },
  { path: "/settings", title: "Settings" },
  {
    path: "/settings/profile",
    title: "Profile",
    back: "/settings",
  },
  {
    path: "/settings/profile/personalInfo",
    title: "Personal Information",
    back: "/settings/profile",
  },
  {
    path: "/settings/profile/contactDemographics",
    title: "Contact & Demographics",
    back: "/settings/profile",
  },
  {
    path: "/settings/profile/passwordUpdate",
    title: "Update Password",
    back: "/settings/profile",
  },
  { path: "/create-recipe", title: "Create Recipe" },
  // ...add more as needed
];
