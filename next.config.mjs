import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
  // Fix: Next.js chọn sai workspace root khi có nhiều lockfile (parent dir)
  turbopack: {
    root: __dirname,
  },
}

export default nextConfig
