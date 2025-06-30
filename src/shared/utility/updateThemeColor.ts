// A single global stack is enough
declare global {
  interface Window {
    __themeColorStack?: string[];
  }
}

const stack = ((): string[] => {
  window.__themeColorStack ??= [];
  return window.__themeColorStack;
})();

const apply = (c: string | undefined) => {
  const light = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"][media="(prefers-color-scheme: light)"]',
  );
  const dark = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"][media="(prefers-color-scheme: dark)"]',
  );
  const def = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]:not([media])',
  );

  // fall back to system colours when `c` is undefined
  const lightCol = c ?? '#ffffff';
  const darkCol = c ?? '#000000';

  light?.setAttribute('content', lightCol);
  dark?.setAttribute('content', darkCol);
  def?.setAttribute('content', lightCol);

  if (c) {
    document.documentElement.style.setProperty('--theme-bg-color', c);
    document.documentElement.style.setProperty(
      '--theme-bg-gradient',
      `linear-gradient(to bottom, ${c}, color-mix(in srgb, ${c} 60%, black))`,
    );
  } else {
    document.documentElement.style.removeProperty('--theme-bg-color');
    document.documentElement.style.removeProperty('--theme-bg-gradient');
  }
};

export const updateThemeColor = (colour: string) => {
  stack.push(colour);
  apply(colour); // top of stack
};

export const restoreThemeColor = () => {
  stack.pop(); // drop the colour for the page that unmounted
  apply(stack.at(-1)); // apply next colour or defaults
};
