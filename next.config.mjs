import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Sanity types expect React 19; ignore type errors for the studio route
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    // Alias 'react/compiler-runtime' to our mock for React 18 compatibility.
    // Sanity v3.99+ uses React Compiler internally which expects React 19.
    config.resolve.alias = {
      ...config.resolve.alias,
      'react/compiler-runtime': path.resolve(
        __dirname,
        'sanity/react-compiler-runtime-mock.js'
      ),
    };
    return config;
  },
  turbopack: {
    root: __dirname,
    resolveAlias: {
      'react/compiler-runtime': './sanity/react-compiler-runtime-mock.js',
    },
  },
};

export default nextConfig;
