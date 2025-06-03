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

  // Update body background color
  document.body.style.backgroundColor = color;
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

  // Restore body background color based on color scheme preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.body.style.backgroundColor = prefersDark ? '#000000' : '#ffffff';
};
