<script setup lang="ts">
interface Project {
  name: string
  description: string
  note?: string
  category: 'music' | 'language' | 'infra'
  categoryLabel: string
  tech: string[]
  url: string
  github: string
}

const projects: Project[] = [
  {
    name: 'Suzume',
    description: 'Japanese tokenizer for the browser. Under 350 KB, zero dictionary files.',
    note: 'A design I\u2019d had in mind for years, finally built with AI pinning it down through massive test suites. MeCab was no oracle\u2014it had its own bugs. Language is endlessly hard.',
    category: 'language',
    categoryLabel: 'Language',
    tech: ['C++', 'WASM'],
    url: 'https://suzume.libraz.net',
    github: 'https://github.com/libraz/suzume',
  },
  {
    name: 'MIDI Sketch',
    description: 'Pop music MIDI generator grounded in music theory. 9 tracks, seed-based, deterministic.',
    note: 'Built for my day job\u2014briefing composers on song ideas. Watching music emerge from C++ was a strange and fascinating feeling.',
    category: 'music',
    categoryLabel: 'Music',
    tech: ['C++', 'WASM'],
    url: 'https://midisketch.libraz.net',
    github: 'https://github.com/libraz/midi-sketch',
  },
  {
    name: 'MIDI Sketch Bach',
    description: 'Bach instrumental works generator. Fugues, chorales, cello suites, the Chaconne.',
    note: 'Thought counterpoint was just logic. I was wrong. Every generated piece reminds me how great Bach was. Music is endlessly hard.',
    category: 'music',
    categoryLabel: 'Music',
    tech: ['C++', 'WASM'],
    url: 'https://bach.midi-sketch.libraz.net',
    github: 'https://github.com/libraz/midi-sketch-bach',
  },
  {
    name: 'MygramDB',
    description: 'In-memory full-text search with MySQL replication. 27\u20133700\u00d7 faster than MySQL FULLTEXT.',
    note: 'Full-text search broke on a 100M-pageview/month project. Built this, shipped it to production. Problem solved.',
    category: 'infra',
    categoryLabel: 'Search',
    tech: ['C++', 'Docker'],
    url: 'https://mygramdb.libraz.net',
    github: 'https://github.com/libraz/mygram-db',
  },
  {
    name: 'libsonare',
    description: 'librosa-compatible audio analysis for C++ and browsers. BPM, key, chords, beats.',
    note: 'A tool as great as librosa being Python-only felt unfair to every other language. So I made it a WASM project.',
    category: 'music',
    categoryLabel: 'Audio',
    tech: ['C++', 'WASM'],
    url: 'https://libsonare.libraz.net',
    github: 'https://github.com/libraz/libsonare',
  },
  {
    name: 'BPM Detector',
    description: 'Comprehensive music analysis. Tempo, key, chords, structure, timbre \u2014 all from audio.',
    note: 'Needed to put music into words when commissioning tracks at work. Python because librosa was the only option back then.',
    category: 'music',
    categoryLabel: 'Audio',
    tech: ['Python', 'Docker'],
    url: 'https://github.com/libraz/bpm-detector',
    github: 'https://github.com/libraz/bpm-detector',
  },
]

const categoryColor: Record<string, string> = {
  music: '#A78BFA',
  language: '#06B6D4',
  infra: '#10B981',
}

function open(url: string) {
  window.open(url, '_blank', 'noopener')
}
</script>

<template>
  <section class="projects">
    <div class="projects__inner">
      <h2 class="projects__title">Open Source</h2>
      <p class="projects__subtitle">
        Tools for language processing, music generation, and search infrastructure.
      </p>
      <div class="projects__grid">
        <div
          v-for="project in projects"
          :key="project.name"
          class="card"
          :style="{ '--accent': categoryColor[project.category] }"
          role="link"
          tabindex="0"
          :aria-label="project.name"
          @click="open(project.url)"
          @keydown.enter="open(project.url)"
        >
          <div class="card__head">
            <span class="card__tag">
              <span class="card__dot" />
              {{ project.categoryLabel }}
            </span>
            <a
              :href="project.github"
              class="card__gh"
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
              @click.stop
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>

          <h3 class="card__name">{{ project.name }}</h3>
          <p class="card__desc">{{ project.description }}</p>
          <p v-if="project.note" class="card__note">{{ project.note }}</p>

          <div class="card__foot">
            <span v-for="t in project.tech" :key="t" class="card__pill">{{ t }}</span>
            <svg class="card__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects {
  padding: 5rem 2rem 6rem;
  background: #0A0A10;
}

.projects__inner {
  max-width: 1080px;
  margin: 0 auto;
}

.projects__title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.4rem;
}

.projects__subtitle {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.35);
  margin: 0 0 2.5rem;
}

/* ── Grid ──────────────────────────────────────────── */
.projects__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 1.125rem;
  row-gap: 1.125rem;
}

/* ── Card ──────────────────────────────────────────── */
.card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 5;
  row-gap: 0;
  padding: 1.35rem 1.4rem 1.25rem;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  cursor: pointer;
  transition:
    transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    background 0.3s ease;
}

.card:hover {
  transform: translateY(-3px);
  border-color: color-mix(in srgb, var(--accent) 35%, transparent);
  box-shadow: 0 6px 28px color-mix(in srgb, var(--accent) 8%, transparent);
  background: rgba(255, 255, 255, 0.04);
}

.card:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* ── Card header ───────────────────────────────────── */
.card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.85rem;
}

.card__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent);
}

.card__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.8;
}

.card__gh {
  display: flex;
  color: rgba(255, 255, 255, 0.2);
  transition: color 0.2s;
}

.card__gh:hover {
  color: rgba(255, 255, 255, 0.65);
}

/* ── Card body ─────────────────────────────────────── */
.card__name {
  font-family: 'Outfit', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 0.45rem;
  line-height: 1.3;
}

.card__desc {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.84rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.45);
  margin: 0;
}

/* ── Card note (author comment) ────────────────────── */
.card__note {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.68rem;
  font-style: italic;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.25);
  margin: 0;
  padding-left: 1.1rem;
  padding-top: 0.75rem;
  align-self: start;
  position: relative;
}

.card__note::before {
  content: '//';
  position: absolute;
  left: 0;
  font-style: normal;
  color: color-mix(in srgb, var(--accent) 40%, transparent);
}

/* ── Card footer ───────────────────────────────────── */
.card__foot {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0;
  padding-top: 1.1rem;
  align-self: end;
}

.card__pill {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.04em;
  padding: 0.18rem 0.45rem;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.055);
  color: rgba(255, 255, 255, 0.38);
}

.card__arrow {
  margin-left: auto;
  color: rgba(255, 255, 255, 0.15);
  transition: color 0.25s, transform 0.25s;
}

.card:hover .card__arrow {
  color: var(--accent);
  transform: translate(2px, -2px);
}

/* ── Responsive ────────────────────────────────────── */
@media (max-width: 900px) {
  .projects__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .projects {
    padding: 3rem 1.25rem 4rem;
  }

  .projects__grid {
    grid-template-columns: 1fr;
  }
}
</style>
