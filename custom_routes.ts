export const rewrites = [
  {
    source: '/',
    destination: '/home',
  },
]

export const redirects = [
  {
    source: '/auth',
    destination: '/',
    permanent: true,
  },
  {
    source: '/auth/:pathname*',
    destination: '/:pathname*',
    permanent: true,
  },
]
