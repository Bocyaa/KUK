import ReactSelect, { Props as SelectProps } from 'react-select';
import { useEffect, useState } from 'react';

const ThemedSelect = <Option,>(props: SelectProps<Option>) => {
  // Initialize theme based on current state instead of defaulting to 'light'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Check for manual theme toggle first
    if (document.documentElement.classList.contains('dark')) {
      return 'dark';
    }
    // Then check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  // Detect the theme on mount and when it changes
  useEffect(() => {
    // Initial detection
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const hasManualDarkClass = document.documentElement.classList.contains('dark');
    setTheme(hasManualDarkClass || isDarkMode ? 'dark' : 'light');

    // Listen for changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const hasManualDarkClass = document.documentElement.classList.contains('dark');
      setTheme(hasManualDarkClass || e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Also check for manual theme toggles (if you have a theme class on html/body)
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDark || isSystemDark ? 'dark' : 'light');
    };

    // Initial check
    checkTheme();

    // Set up observer to watch for class changes on html element
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <ReactSelect
      {...props}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: theme === 'dark' ? '#212121' : '#ffffff',
          borderRadius: '0.75rem',
          padding: '0.1rem 0 0.1rem 0',
          borderColor: state.isFocused
            ? theme === 'dark'
              ? '#ffffff'
              : '#3f6ef3'
            : theme === 'dark'
              ? '#424242'
              : '#e5e7eb',
          boxShadow: state.isFocused
            ? theme === 'dark'
              ? '0 0 0 1px #3f6ef3'
              : '0 0 0 1px #3f6ef3'
            : 'none',
          '&:hover': {
            borderColor: theme === 'dark' ? '#424242' : '#d1d5db',
          },
        }),
        menu: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: theme === 'dark' ? '#212121' : '#ffffff',
          boxShadow:
            theme === 'dark'
              ? '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.4)'
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isSelected
            ? theme === 'dark'
              ? '#2c2c2e'
              : '#f3f4f6'
            : state.isFocused
              ? theme === 'dark'
                ? '#2c2c2e'
                : '#e0e0e0'
              : theme === 'dark'
                ? '#212121'
                : '#ffffff',
          color: state.isSelected
            ? theme === 'dark'
              ? '#ffffff'
              : '#000000'
            : theme === 'dark'
              ? '#ffffff'
              : '#000000',
          '&:active': {
            backgroundColor: theme === 'dark' ? '#323234' : '#e5e7eb',
          },
        }),
        input: (baseStyles) => ({
          ...baseStyles,
          color: theme === 'dark' ? '#ffffff' : '#000000',
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          color: theme === 'dark' ? '#ffffff' : '#000000',
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          color: theme === 'dark' ? '#74747b' : '#9ca3af',
        }),
        multiValue: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: theme === 'dark' ? '#2c2c2e' : '#f3f4f6',
        }),
        multiValueLabel: (baseStyles) => ({
          ...baseStyles,
          color: theme === 'dark' ? '#ffffff' : '#000000',
        }),
        multiValueRemove: (baseStyles) => ({
          ...baseStyles,
          color: theme === 'dark' ? '#74747b' : '#9ca3af',
          '&:hover': {
            backgroundColor: theme === 'dark' ? '#424242' : '#e5e7eb',
            color: theme === 'dark' ? '#ffffff' : '#000000',
          },
        }),
      }}
    />
  );
};

export default ThemedSelect;
