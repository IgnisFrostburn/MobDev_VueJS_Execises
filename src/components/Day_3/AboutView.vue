<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="about-view">
    <h1>About This App</h1>
    <p>This project is a task management app built as part of our Vue.js training.</p>
    <p>It covers core Vue 3 concepts including:</p>
    <ul>
      <li>Reactive state management with Pinia</li>
      <li>Client-side routing with Vue Router 4</li>
      <li>Dynamic routes and navigation guards</li>
    </ul>
    <button @click="router.push('/home')">← Back to Tasks</button>
  </div>
</template>

<style scoped>
.about-view { max-width: 520px; margin: 40px auto; padding: 24px; font-family: Arial, sans-serif; }
h1 { color: #1B2A4A; margin-bottom: 16px; }
p { color: #374151; line-height: 1.6; margin-bottom: 12px; }
ul { color: #374151; line-height: 1.8; padding-left: 20px; margin-bottom: 24px; }
code { background: #f3f4f6; padding: 2px 5px; border-radius: 4px; font-size: 13px; }
button { background: #42B883; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 14px; }
button:hover { background: #369870; }
</style>
