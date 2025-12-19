import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@fenix/ui"],
  reactCompiler: true,
  experimental: {
  },
  webpack: (config) => {
    // Definitive Fix: Force resolution to the local installed React 19 (Absolute Path)
    // AND prioritize local node_modules
    config.resolve.alias = {
        ...config.resolve.alias,
        'react': require.resolve('react'),
        'react-dom': require.resolve('react-dom')
    };
    config.resolve.modules = [
        'node_modules', 
        ...config.resolve.modules
    ];
    return config;
  }
};

export default nextConfig;
