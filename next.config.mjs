/** @type {import('next').NextConfig} */

import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, './styles')],
    prependData: `@import "@styles/variables.scss";`,
  },
};

export default nextConfig;
