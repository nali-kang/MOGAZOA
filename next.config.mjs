/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  sassOptions: {
    prependData: `@import "src/styles/globals.scss";`,
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack', 'url-loader'],
    });
    return config;
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://default-api-url.com',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'https://default-auth-url.com',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'default-secret',
    KAKAO_CLIENT_ID: process.env.KAKAO_CLIENT_ID || 'default-client-id',
    KAKAO_CLIENT_SECRET: process.env.KAKAO_CLIENT_SECRET || 'default-client-secret',
  },
  async redirects() {
    return [
      {
        source: '/login',
        has: [
          {
            type: 'cookie',
            key: 'next-auth.session-token',
          },
        ],
        destination: '/',
        permanent: false,
      },
      {
        source: '/signup',
        has: [
          {
            type: 'cookie',
            key: 'next-auth.session-token',
          },
        ],
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
