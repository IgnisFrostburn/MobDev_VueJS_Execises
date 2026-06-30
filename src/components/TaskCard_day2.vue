<!--
=============================================================
  DAY 2 ASSIGNMENT — Reusable TaskCard Component
  Topic: Props, Emits, Slots, Component Lifecycle
  Files: TaskCard.vue (child)  +  TaskListView.vue (parent)
  Time: 60 minutes
=============================================================

OBJECTIVE
---------
Build a reusable TaskCard child component that accepts data as props
and communicates back to the parent via custom events (emits). The
parent renders a list of TaskCards and handles all state changes.

WHAT TO BUILD — TaskCard.vue (this file)
-----------------------------------------
  1. Accept a "task" prop: { id, name, done, dueDate }
  2. Display the task name and dueDate (via a named slot "meta")
  3. Emit "complete" event (payload: task.id) when Complete/Undo clicked
  4. Emit "delete" event (payload: task.id) when Delete clicked
  5. Show "Complete" when task.done is false, "Undo" when true
  6. Apply a visual style change when task.done is true

WHAT TO BUILD — TaskListView.vue (see that file)
-------------------------------------------------
  1. Hold a tasks ref array with at least 3 sample tasks
  2. Render a TaskCard for each task using v-for
  3. Handle @complete → toggle that task's done property
  4. Handle @delete → remove that task from the array
  5. Fill the "meta" named slot with the due date

REQUIREMENTS (Acceptance Criteria)
------------------------------------
  [x] TaskCard uses defineProps({ task: Object })
  [x] TaskCard uses defineEmits(['complete', 'delete'])
  [x] TaskCard has <slot name="meta" /> for optional metadata
  [x] Parent passes :task="task" and listens @complete @delete
  [x] Parent fills the slot with <template #meta>...</template>
  [x] Data flows DOWN (props) and events flow UP (emits)
  [x] Parent owns the state — TaskCard never mutates props directly

EXTENSION (additional points)
---------------------------------
  [x] Add a priority badge prop (low/medium/high) with colour coding
  [x] Add an edit mode: clicking the task name turns it into an input
  [x] Emit an "update" event when the edited name is saved

HINTS (read only if stuck)
---------------------------
  Hint 1: const props = defineProps({ task: { type: Object, required: true } })
  Hint 2: const emit = defineEmits(['complete', 'delete'])
  Hint 3: @click="emit('complete', props.task.id)"
  Hint 4: In the parent — @complete="handleComplete"
           function handleComplete(id) { find task by id, toggle done }
  Hint 5: Named slot in child  → <slot name="meta" />
           Fill in parent      → <template #meta>Due: {{ task.dueDate }}</template>
  Hint 6: NEVER do this inside TaskCard: props.task.done = !props.task.done
           That mutates a prop directly — Vue will warn you. Emit instead.
=============================================================
-->

<!-- ─── TaskCard.vue ─── -->
<script setup>
import { ref } from 'vue'

const props = defineProps({
  task:     { type: Object,  required: true },
  priority: { type: String,  default: 'medium' } 
})

const emit = defineEmits(['complete', 'delete', 'update'])

// edit mode
const editing  = ref(false)
const editName = ref('')

function startEdit() {
  editName.value = props.task.name
  editing.value  = true
}

function saveEdit() {
  const trimmed = editName.value.trim()
  if (trimmed && trimmed !== props.task.name) {
    emit('update', { id: props.task.id, name: trimmed })
  }
  editing.value = false
}

function cancelEdit() {
  editing.value = false
}
</script>

<template>
  <div class="task-card" :class="{ completed: task.done }">

    <div class="task-header">
      <!-- priority badge -->
      <span class="badge" :class="priority">{{ priority }}</span>

      <!-- name — click to edit, input while editing -->
      <input
        v-if="editing"
        v-model="editName"
        class="name-input"
        @keyup.enter="saveEdit"
        @keyup.escape="cancelEdit"
        @blur="saveEdit"
        autofocus
      />
      <span v-else class="name" @click="startEdit" title="Click to edit">
        {{ task.name }}
      </span>

      <slot name="meta" />
    </div>

    <div class="task-actions">
      <button class="btn-complete" @click="emit('complete', task.id)">
        {{ task.done ? 'Undo' : 'Complete' }}
      </button>
      <button class="btn-delete" @click="emit('delete', task.id)">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 14px 16px;
  margin-bottom: 12px;
  transition: all 0.2s;
}
.task-card.completed {
  background: #f0fdf4;
  border-color: #86efac;
  opacity: 0.8;
}
.task-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

/* priority badge */
.badge {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 2px 7px;
  border-radius: 99px;
  flex-shrink: 0;
}
.badge.low    { background: #dcfce7; color: #16a34a; }
.badge.medium { background: #fef9c3; color: #a16207; }
.badge.high   { background: #fee2e2; color: #dc2626; }

/* task name */
.name {
  font-weight: 600;
  font-size: 15px;
  color: #1B2A4A;
  cursor: pointer;
  flex: 1;
}
.name:hover {
  text-decoration: underline;
  text-decoration-style: dashed;
  text-underline-offset: 3px;
}

/* inline edit input */
.name-input {
  flex: 1;
  font-size: 15px;
  font-weight: 600;
  color: #1B2A4A;
  border: 1px solid #93c5fd;
  border-radius: 4px;
  padding: 1px 6px;
  outline: none;
}
.name-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px #bfdbfe;
}

.task-header .meta {
  font-size: 12px;
  color: #9ca3af;
  margin-left: auto;
}
.task-actions {
  display: flex;
  gap: 8px;
}
.btn-complete {
  padding: 5px 14px;
  background: #42B883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}
.btn-delete {
  padding: 5px 14px;
  background: #fee2e2;
  color: #dc2626;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}
</style>
