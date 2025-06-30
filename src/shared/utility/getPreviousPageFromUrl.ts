interface PreviousPage {
  name: string;
  path: string;
}

export function getPreviousPageFromUrl(currentPath: string): PreviousPage {
  const pathParts = currentPath.split('/');

  // Remove the last part (ID) to get the parent route
  if (pathParts.length >= 3) {
    const parentRoute = pathParts[pathParts.length - 2]; // Gets "recipes", "explore", etc.
    return {
      name: parentRoute,
      path: pathParts.slice(0, -1).join('/'),
    };
  }

  return { name: 'back', path: '/' };
}