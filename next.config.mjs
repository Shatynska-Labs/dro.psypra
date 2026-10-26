/** @type {import('next').NextConfig} */
// The published site is the simplified page only: fully static, no API.
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
