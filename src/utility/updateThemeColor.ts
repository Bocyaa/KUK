export const updateThemeColor = (color: string) => {
  // Update both light and dark theme color meta tags
  const lightThemeTag = document.querySelector(
    'meta[name="theme-color"][media="(prefers-color-scheme: light)"]',
  );
  const darkThemeTag = document.querySelector(
    'meta[name="theme-color"][media="(prefers-color-scheme: dark)"]',
  );
  const defaultThemeTag = document.querySelector(
    'meta[name="theme-color"]:not([media])',
  );

  if (lightThemeTag) {
    lightThemeTag.setAttribute('content', color);
  }
  if (darkThemeTag) {
    darkThemeTag.setAttribute('content', color);
  }
  if (defaultThemeTag) {
    defaultThemeTag.setAttribute('content', color);
  }
  
  // Set CSS custom properties for gradient (remove body background setting)
  document.documentElement.style.setProperty('--theme-bg-color', color);
  document.documentElement.style.setProperty('--theme-bg-gradient', `linear-gradient(to bottom, ${color}, color-mix(in srgb, ${color} 60%, black))`);
};

export const restoreThemeColor = () => {
  const lightThemeTag = document.querySelector(
    'meta[name="theme-color"][media="(prefers-color-scheme: light)"]',
  );
  const darkThemeTag = document.querySelector(
    'meta[name="theme-color"][media="(prefers-color-scheme: dark)"]',
  );
  const defaultThemeTag = document.querySelector(
    'meta[name="theme-color"]:not([media])',
  );

  if (lightThemeTag) {
    lightThemeTag.setAttribute('content', '#ffffff');
  }
  if (darkThemeTag) {
    darkThemeTag.setAttribute('content', '#000000');
  }
  if (defaultThemeTag) {
    defaultThemeTag.setAttribute('content', '#ffffff');
  }
  
  // Remove the custom properties
  document.documentElement.style.removeProperty('--theme-bg-color');
  document.documentElement.style.removeProperty('--theme-bg-gradient');
};