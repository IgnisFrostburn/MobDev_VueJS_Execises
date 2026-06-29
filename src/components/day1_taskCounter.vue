<!--
=============================================================
  DAY 1 Task — Reactive Task Counter App
  Topic: Vue 3 Composition API (ref, computed, v-model, v-for)
  Time: 60 minutes
=============================================================

OBJECTIVE
---------
Build a reactive task management app that demonstrates Vue 3's
reactivity system. You will use ref(), computed(), v-model, v-for,
and event handling — the core building blocks of every Vue app.

WHAT TO BUILD
-------------
A single-file Vue component (this file) that:

  1. Has a text input + "Add Task" button to create new tasks.
  2. Displays the task list, each item with:
       - A checkbox to mark it as done
       - The task name (strike-through when done)
       - A "Remove" button
  3. Shows a live stats bar:
       Total Tasks | Done: X | Pending: X
  4. Shows an empty state message when there are no tasks.

REQUIREMENTS (Acceptance Criteria)
------------------------------------
  [x] Use ref() for the text input value
  [x] Use ref() for the tasks array
  [x] Use computed() for total, done, and pending counts
  [x] Use v-model on the text input
  [x] Use v-for with :key to render the task list
  [x] Use @keyup.enter on the input to also trigger addTask
  [x] Prevent adding empty/whitespace-only tasks
  [x] Clear the input after adding a task

EXTENSION (Additional Points)
---------------------------------
  - Add a filter bar: All | Done | Pending — filters the visible list
  - Add a "Clear All Done" button that removes all completed tasks
  - Add a task priority: Low / Medium / High (use a <select> dropdown)

HINTS (read only if stuck)
---------------------------
  Hint 1: import { ref, computed } from 'vue'
  Hint 2: tasks.value.push({ id: Date.now(), name: '...', done: false })
  Hint 3: computed(() => tasks.value.filter(t => t.done).length)
  Hint 4: For :class strikethrough — :class="{ done: task.done }"
  Hint 5: v-model on a checkbox binds to a boolean — v-model="task.done"
  Hint 6: To prevent empty tasks — if (!newTaskName.value.trim()) return

FILE STRUCTURE (this is a single-file component)
-------------------------------------------------
  <script setup>  — all your reactive logic goes here
  <template>      — your HTML markup
  <style scoped>  — your CSS (scoped = only applies to this component)
=============================================================
-->

<script setup>
import { ref, computed } from 'vue'

const newTaskName = ref('')
const tasks = ref([])
const selectedPriority = ref('Medium')
const filter = ref('all')

const totalCount = computed(() => tasks.value.length)
const doneCount = computed(() => tasks.value.filter(t => t.done).length)
const pendingCount = computed(() => tasks.value.filter(t => !t.done).length)

const filteredTasks = computed(() => {
  if (filter.value === 'done') return tasks.value.filter(task => task.done)
  if (filter.value === 'pending') return tasks.value.filter(task => !task.done)
  return tasks.value
})

function addTask() {
  const name = newTaskName.value.trim()
  if (!name) return

  tasks.value.push({
    id: Date.now(),
    name,
    done: false,
    priority: selectedPriority.value
  })

  newTaskName.value = ''
  selectedPriority.value = 'Medium'
}

function toggleTask(id) {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    task.done = !task.done
  }
}

function removeTask(id) {
  tasks.value = tasks.value.filter(t => t.id !== id)
}

function clearCompleted() {
  tasks.value = tasks.value.filter(task => !task.done)
}
</script>

<template>
  <div class="app">
    <h1>Task Counter</h1>

    <div class="input-row">
      <input
        v-model="newTaskName"
        @keyup.enter="addTask"
        placeholder="Enter a new task"
      />
      <select v-model="selectedPriority" class="priority-select">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button @click="addTask">Add Task</button>
    </div>

    <div class="stats">
      Total: {{ totalCount }} | Done: {{ doneCount }} | Pending: {{ pendingCount }}
    </div>

    <div class="toolbar">
      <div class="filter-group" role="group" aria-label="Task filters">
        <button :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
        <button :class="{ active: filter === 'done' }" @click="filter = 'done'">Done</button>
        <button :class="{ active: filter === 'pending' }" @click="filter = 'pending'">Pending</button>
      </div>
      <button class="clear-btn" @click="clearCompleted" :disabled="doneCount === 0">Clear All Done</button>
    </div>

    <p v-if="tasks.length === 0" class="empty">No tasks yet. Add one above!</p>

    <ul v-else class="task-list">
      <li v-for="task in filteredTasks" :key="task.id">
        <input type="checkbox" v-model="task.done" />
        <span :class="{ done: task.done }">{{ task.name }}</span>
        <span class="priority-badge" :class="task.priority.toLowerCase()">{{ task.priority }}</span>
        <button @click="removeTask(task.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.app {
  max-width: 560px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
  padding: 24px;
  background: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
}

h1 { color: #1B2A4A; margin-bottom: 20px; }

.input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.input-row input,
.priority-select {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.input-row button,
.filter-group button,
.clear-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.input-row button {
  background: #42B883;
  color: white;
}

.stats {
  font-size: 13px;
  color: #666;
  margin-bottom: 16px;
  padding: 8px 12px;
  background: #e9f7f0;
  border-radius: 6px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  gap: 6px;
}

.filter-group button {
  background: #fff;
  color: #4b5563;
  border: 1px solid #d1d5db;
}

.filter-group button.active {
  background: #42B883;
  color: white;
  border-color: #42B883;
}

.clear-btn {
  background: #fee2e2;
  color: #dc2626;
}

.clear-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.empty {
  text-align: center;
  color: #aaa;
  font-style: italic;
  margin: 32px 0;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: white;
  border-radius: 6px;
  margin-bottom: 8px;
  border: 1px solid #eee;
}

.task-list li span {
  font-size: 14px;
}

.task-list li span:nth-of-type(2) {
  flex: 1;
}

.done {
  text-decoration: line-through;
  color: #aaa;
}

.priority-badge {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
}

.priority-badge.low {
  background: #dbeafe;
  color: #1d4ed8;
}

.priority-badge.medium {
  background: #fef3c7;
  color: #b45309;
}

.priority-badge.high {
  background: #fee2e2;
  color: #dc2626;
}

.task-list li button {
  padding: 4px 10px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
</style>
