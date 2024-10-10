/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'acrfghzeschofxtzjorr.supabase.co',
            port: '',
            pathname: '/storage/v1/**', // Ajuste o padrão de caminho conforme a estrutura da sua URL
          },
        ],
      },
};

module.exports = nextConfig;
