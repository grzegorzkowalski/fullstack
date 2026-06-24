/** @type {import('next').NextConfig} */
const nextConfig = {
  // "standalone" tworzy w .next/standalone samodzielny, minimalny zestaw plików
  // do uruchomienia produkcyjnego (przydatne w obrazie Docker — nie trzeba
  // kopiować całego node_modules).
  output: 'standalone',
};

export default nextConfig;
