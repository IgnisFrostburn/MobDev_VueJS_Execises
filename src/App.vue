<script setup lang="tsx">
import { ref } from 'vue'
import Day1_taskCounter from './components/Day_1/day1_taskCounter.vue'
import TaskListView from './components/Day_2/TaskListView_day2.vue'

const navItems = [
  { id: 'task-counter', label: 'Task Counter', day: 'Day 1' },
  { id: 'task-list',    label: 'Task List',    day: 'Day 2' },
  { id: 'router',       label: 'Task Router',  day: 'Day 3' },
]

const active = ref('task-counter')
</script>

<template>
  <div class="app-shell">
    <nav class="sidebar">
      <ul>
        <li
          v-for="item in navItems"
          :key="item.id"
          :class="{ active: active === item.id }"
          @click="active = item.id"
        >
          <span>{{ item.label }}</span>
          <span class="tag">{{ item.day }}</span>
        </li>
      </ul>
    </nav>

    <main class="content">
      <Day1_taskCounter v-if="active === 'task-counter'" />
      <TaskListView     v-if="active === 'task-list'" />
      <RouterView       v-if="active === 'router'" />
    </main>
  </div>
</template>

<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Segoe UI', sans-serif;
  background: #f9f9f9;
  color: #222;
}

.app-shell {
  display: flex;
  min-height: 100vh;
}

/* sidebar */
.sidebar {
  width: 200px;
  flex-shrink: 0;
  background: #fff;
  border-right: 1px solid #e4e4e4;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.brand {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #42b883;
  margin-bottom: 20px;
  text-transform: lowercase;
}

.section-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #aaa;
  margin: 12px 0 4px 4px;
}

ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  color: #555;
}

li:hover:not(.soon) {
  background: #f3f3f3;
  color: #111;
}

li.active {
  background: #f0fdf4;
  color: #16a34a;
  font-weight: 600;
}

li.soon {
  cursor: default;
  color: #bbb;
}

.tag {
  font-size: 10px;
  color: #bbb;
}

li.active .tag { color: #86efac; }

/* content */
.content {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
}
</style>
