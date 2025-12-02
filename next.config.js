/** @type {import('next').NextConfig} */
const nextConfig = {
  // FIX LOW: Server Leaks Information via "X-Powered-By"
  // Menonaktifkan header yang memberitahu bahwa server menggunakan Next.js
  poweredByHeader: false,

  // Konfigurasi Header Keamanan
  async headers() {
    return [
      {
        // Terapkan ke semua rute
        source: '/:path*',
        headers: [
          {
            // FIX MEDIUM: Missing Anti-clickjacking Header
            // Mencegah website di-iframe oleh situs lain.
            // Gunakan 'SAMEORIGIN' agar jika domain utama butuh iframe, masih bisa.
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            // FIX LOW: X-Content-Type-Options Header Missing
            // Mencegah browser menebak tipe file (MIME sniffing).
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // FIX LOW: Strict-Transport-Security Header Not Set
            // Memaksa penggunaan HTTPS.
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            // FIX MEDIUM: Content Security Policy (CSP) Header Not Set
            // Catatan: Karena ini Next.js 11 (Legacy), kita harus mengizinkan 'unsafe-eval' 
            // dan 'unsafe-inline' agar aplikasi tidak error/blank.
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self';",
          },
          {
            // Tambahan: Mengontrol privasi referrer link
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig