import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'
import LandingHero from '@/components/LandingHero.vue'
import ProjectsGrid from '@/components/ProjectsGrid.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('LandingHero', LandingHero)
    app.component('ProjectsGrid', ProjectsGrid)
  },
} satisfies Theme
