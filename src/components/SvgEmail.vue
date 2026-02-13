<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

// 'libraz@libraz.net' encoded
const encoded = 'bGlicmF6QGxpYnJhei5uZXQ='
const text = ref('')
const href = computed(() => `mailto:${text.value}`)

onMounted(() => {
  text.value = atob(encoded)
})
</script>

<template>
  <a :href="href" class="svg-email">
    <svg viewBox="0 0 200 24" xmlns="http://www.w3.org/2000/svg" aria-label="Email address">
      <text x="0" y="17" class="svg-email-text">{{ text }}</text>
    </svg>
  </a>
</template>

<style scoped>
.svg-email {
  display: inline-block;
  vertical-align: middle;
  text-decoration: none;
}

.svg-email svg {
  height: 1.2em;
  width: auto;
}

.svg-email-text {
  font-size: 16px;
  font-family: var(--vp-font-family-base);
  fill: var(--vp-c-brand-1);
}

.svg-email:hover .svg-email-text {
  text-decoration: underline;
  fill: var(--vp-c-brand-2);
}
</style>
