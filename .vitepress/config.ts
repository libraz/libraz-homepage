import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'

const siteUrl = 'https://libraz.net'

export default defineConfig({
  srcDir: 'src',
  title: 'libraz',
  description: 'Personal homepage of libraz. Open-source projects in music, language, and search infrastructure.',

  appearance: 'force-dark',

  sitemap: { hostname: siteUrl },

  head: [
    ['meta', { name: 'theme-color', content: '#8B5CF6' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', {
      href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Outfit:wght@600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap',
      rel: 'stylesheet',
    }],
  ],

  themeConfig: {
    nav: [
      { text: 'Blog', link: '/posts/' },
      { text: 'About', link: '/about' },
    ],
    sidebar: {
      '/posts/': [
        {
          text: 'Posts',
          items: [
            { text: 'Hello World', link: '/posts/hello-world' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/libraz' },
    ],
    footer: {
      copyright: '© 2026 libraz · All bugs are considered features.',
    },
  },

  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../src', import.meta.url)),
        '@theme': fileURLToPath(new URL('./theme', import.meta.url)),
      },
    },
  },
})
