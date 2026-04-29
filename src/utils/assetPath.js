export const withBasePath = (path = '') => {
  if (!path) {
    return path;
  }

  if (!path.startsWith('/')) {
    return path;
  }

  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
};

