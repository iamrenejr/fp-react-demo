import lightbox$ from './pages/lightbox';
import math$ from './pages/math';

export const getPageByPath = path => {
  const paths = {
    '/lightbox': lightbox$,
    '/math': math$,
  };
  const fallback = math$;
  return paths[path] || fallback;
};

export default getPageByPath(location.pathname);
