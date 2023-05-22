/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['ru', 'en'],
    defaultLocale: 'ru',
    localeDetection: true,
  },
};

module.exports = nextConfig;
