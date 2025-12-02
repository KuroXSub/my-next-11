/** @type {import('next').NextConfig} */
const nextConfig = {
  // FIX LOW: Server Leaks Information via "X-Powered-By"
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            // FIX MEDIUM: Missing Anti-clickjacking Header
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            // FIX LOW: X-Content-Type-Options Header Missing
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // FIX LOW: Strict-Transport-Security Header Not Set
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            // FIX MEDIUM: CSP Configuration (Updated)
            key: 'Content-Security-Policy',
            // PERUBAHAN DI SINI:
            // 1. Menambahkan 'frame-ancestors', 'form-action', 'base-uri', 'object-src' (Mengatasi "Failure to Define Directive")
            // 2. Menghapus 'unsafe-eval' (Mengatasi alert "unsafe-eval"). Jika web error setelah ini, kembalikan 'unsafe-eval'.
            // 3. 'unsafe-inline' TETAP ADA. Ini wajib untuk Next.js 11.
            value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';",
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig