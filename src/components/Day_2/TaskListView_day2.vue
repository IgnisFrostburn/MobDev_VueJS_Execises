<!--
=============================================================
  DAY 2 ASSIGNMENT — TaskListView.vue (Parent Component)
  This file renders a list of TaskCard components.
=============================================================
-->
<script setup>
import { ref } from 'vue'
import TaskCard from './TaskCard_day2.vue'

// TODO 1: Create a ref() tasks array with at least 3 sample tasks
// Each task: { id, name, done, dueDate }
const tasks = ref([
  { id: 1, name: 'Set up Vue project',       done: true,  dueDate: '2025-07-01', priority: 'low'    },
  { id: 2, name: 'Build TaskCard component', done: false, dueDate: '2025-07-03', priority: 'high'   },
  { id: 3, name: 'Connect parent and child', done: false, dueDate: '2025-07-05', priority: 'medium' },
])

// TODO 2 ✓
function handleComplete(id) {
  const task = tasks.value.find(t => t.id === id)
  if (task) task.done = !task.done
}

// TODO 3 ✓
function handleDelete(id) {
  tasks.value = tasks.value.filter(t => t.id !== id)
}

// EXTENSION ✓
function handleUpdate({ id, name }) {
  const task = tasks.value.find(t => t.id === id)
  if (task) task.name = name
}
</script>

<template>
  <div class="task-list-view">
    <h1>My Tasks</h1>

    <TaskCard
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      :priority="task.priority"
      @complete="handleComplete"
      @delete="handleDelete"
      @update="handleUpdate"
    >
      <template #meta>
        Due: {{ task.dueDate }}
      </template>
    </TaskCard>
  </div>
</template>

<style scoped>
.task-list-view {
  max-width: 520px;
  margin: 40px auto;
  padding: 24px;
  font-family: Arial, sans-serif;
}
h1 { color: #1B2A4A; margin-bottom: 24px; }
</style>
