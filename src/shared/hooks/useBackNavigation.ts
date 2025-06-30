import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

interface BackNavigationConfig {
  defaultTo: string;
  defaultLabel: string;
  routes?: {
    [key: string]: {
      to: string;
      label: string;
    };
  };
}

export function useBackNavigation(config: BackNavigationConfig) {
  const location = useLocation();

  return useMemo(() => {
    const state = location.state as { from?: string } | undefined;
    const from = state?.from;

    if (from && config.routes) {
      // Check for specific route matches
      for (const [routePattern, backData] of Object.entries(config.routes)) {
        // Check if it's an exact match (ends with $)
        if (routePattern.endsWith('$')) {
          const exactPattern = routePattern.slice(0, -1);
          if (from === exactPattern) {
            return backData;
          }
        } else {
          // Regular includes check
          if (from.includes(routePattern)) {
            return backData;
          }
        }
      }
    }

    // Return default
    return {
      to: config.defaultTo,
      label: config.defaultLabel,
    };
  }, [location.state, config]);
}
