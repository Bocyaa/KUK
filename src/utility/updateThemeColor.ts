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

  // Update CSS custom properties instead of inline styles
  document.documentElement.style.setProperty('--theme-bg-color', color);
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

  // Remove the custom property to restore default behavior
  document.documentElement.style.removeProperty('--theme-bg-color');
};