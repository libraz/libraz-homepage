<script setup lang="ts">
const W = 1200
const H = 200
const BAR_COUNT = 40

interface Wave {
  amp: number
  periods: number
  dur: number
  opacity: number
  stroke: number
  yOff: number
  reverse: boolean
  pulse: number
  pulseDelay: number
}

const waves: Wave[] = [
  { amp: 50, periods: 3, dur: 30,  opacity: 0.30, stroke: 1.8, yOff: 0,  reverse: false, pulse: 20, pulseDelay: 0 },
  { amp: 35, periods: 5, dur: 22,  opacity: 0.18, stroke: 1.2, yOff: -6, reverse: true,  pulse: 26, pulseDelay: 5 },
  { amp: 70, periods: 1, dur: 45,  opacity: 0.13, stroke: 2.5, yOff: 10, reverse: false, pulse: 32, pulseDelay: 11 },
  { amp: 18, periods: 9, dur: 16,  opacity: 0.10, stroke: 0.8, yOff: -3, reverse: true,  pulse: 22, pulseDelay: 3 },
  { amp: 42, periods: 4, dur: 25,  opacity: 0.16, stroke: 1.4, yOff: 4,  reverse: false, pulse: 28, pulseDelay: 8 },
]

function path(amp: number, periods: number, yOff: number): string {
  const cy = H / 2 + (yOff / 100) * H
  const segs: string[] = []
  for (let x = 0; x <= W * 2; x += 3) {
    const y = cy + amp * Math.sin((x / W) * periods * Math.PI * 2)
    segs.push(x === 0 ? `M${x},${y.toFixed(1)}` : `L${x},${y.toFixed(1)}`)
  }
  return segs.join(' ')
}
</script>

<template>
  <section class="landing-hero">
    <!-- Spectrum bars (back layer) -->
    <div class="landing-hero__eq" aria-hidden="true">
      <div
        v-for="n in BAR_COUNT"
        :key="n"
        class="eq-bar"
        :style="`--i: ${n}`"
      />
    </div>

    <!-- Analog waveforms (front layer) -->
    <div class="landing-hero__waves" aria-hidden="true">
      <div
        v-for="(w, i) in waves"
        :key="i"
        class="wave-wrap"
        :style="{
          '--pulse': `${w.pulse}s`,
          '--pulse-delay': `${-w.pulseDelay}s`,
        }"
      >
        <svg
          class="wave"
          :style="{
            '--dur': `${w.dur}s`,
            opacity: w.opacity,
            animationDirection: w.reverse ? 'reverse' : 'normal',
          }"
          :viewBox="`0 0 ${W * 2} ${H}`"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            :d="path(w.amp, w.periods, w.yOff)"
            stroke="#A78BFA"
            :stroke-width="w.stroke"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <div class="landing-hero__inner">
      <div class="landing-hero__tagline">
        <p>Every sentence can be parsed another way.</p>
        <p>Every chord can resolve somewhere else.</p>
        <p class="landing-hero__tagline-accent">The ambiguity is deliberate.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.landing-hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 22vh;
  overflow: hidden;
  background: #07070B;
}

/* ── Spectrum Bars (back layer) ─────────────────────── */
.landing-hero__eq {
  position: absolute;
  bottom: 0;
  left: 4%;
  right: 4%;
  height: 80%;
  display: flex;
  align-items: flex-end;
  gap: clamp(4px, 0.55vw, 8px);
  -webkit-mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0.06) 55%,
    transparent 80%
  );
  mask-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0.06) 55%,
    transparent 80%
  );
  pointer-events: none;
}

.landing-hero__eq::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(167, 139, 250, 0.08);
}

.eq-bar {
  flex: 1;
  min-height: 3px;
  border-radius: 1px 1px 0 0;
  background:
    repeating-linear-gradient(
      to top,
      transparent 0px,
      transparent 4px,
      rgba(0, 0, 0, 0.7) 4px,
      rgba(0, 0, 0, 0.7) 6px
    ),
    linear-gradient(
      to top,
      rgba(16, 185, 129, 0.4) 0%,
      rgba(167, 139, 250, 0.35) 55%,
      rgba(239, 68, 68, 0.45) 85%
    );
  animation: eq-a 1.8s calc(var(--i) * -0.15s) ease-in-out infinite alternate;
}

.eq-bar:nth-child(4n+2) { animation-name: eq-b; animation-duration: 2.2s; }
.eq-bar:nth-child(4n+3) { animation-name: eq-c; animation-duration: 1.5s; }
.eq-bar:nth-child(4n)   { animation-name: eq-d; animation-duration: 2.7s; }

@keyframes eq-a { 0% { height: 12%; } 100% { height: 55%; } }
@keyframes eq-b { 0% { height: 18%; } 100% { height: 42%; } }
@keyframes eq-c { 0% { height: 8%;  } 100% { height: 65%; } }
@keyframes eq-d { 0% { height: 25%; } 100% { height: 35%; } }

/* ── Waveform container ────────────────────────────── */
.landing-hero__waves {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 80%;
  transform: translateY(-50%);
  pointer-events: none;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
}

/* ── Pulse wrapper (amplitude surge) ───────────────── */
.wave-wrap {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  animation: wave-pulse var(--pulse, 10s) var(--pulse-delay, 0s) ease-in-out infinite;
}

@keyframes wave-pulse {
  0%   { transform: scaleY(1); }
  35%  { transform: scaleY(1.1); }
  50%  { transform: scaleY(1.45); }
  65%  { transform: scaleY(1.15); }
  80%  { transform: scaleY(1.3); }
  100% { transform: scaleY(1); }
}

/* ── Scrolling waveform ────────────────────────────── */
.wave {
  position: absolute;
  left: 0;
  top: 0;
  width: 200%;
  height: 100%;
  animation: wave-scroll var(--dur, 10s) linear infinite;
  filter: drop-shadow(0 0 8px rgba(167, 139, 250, 0.4));
}

@keyframes wave-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* ── Content ───────────────────────────────────────── */
.landing-hero__inner {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 1.5rem 2rem 2rem;
  max-width: 760px;
}

.landing-hero__tagline {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.88rem;
  line-height: 2.1;
  color: rgba(255, 255, 255, 0.38);
  animation: fade-up 0.8s ease-out 0.25s both;
}

.landing-hero__tagline p {
  margin: 0;
}

.landing-hero__tagline-accent {
  color: rgba(167, 139, 250, 0.6);
  margin-top: 0.75rem !important;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Mobile ────────────────────────────────────────── */
@media (max-width: 640px) {
  .landing-hero__inner {
    padding: 1.25rem 1.5rem 1.5rem;
  }

  .landing-hero__tagline {
    font-size: 0.78rem;
    line-height: 2;
  }

  .landing-hero__waves {
    height: 80%;
  }

  .landing-hero__eq {
    height: 80%;
    left: 2%;
    right: 2%;
  }
}
</style>
