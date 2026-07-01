import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref([
    { id: 1, name: 'Task 1',       done: true,  dueDate: '2025-07-01', priority: 'low'    },
    { id: 2, name: 'Task 2', done: false, dueDate: '2025-07-03', priority: 'high'   },
    { id: 3, name: 'Task 3', done: false, dueDate: '2025-07-05', priority: 'medium' },
    { id: 4, name: 'Task 4', done: false, dueDate: '2025-07-05', priority: 'low' },
    { id: 5, name: 'Task 5', done: true, dueDate: '2025-07-05', priority: 'medium' },
    { id: 6, name: 'Task 6', done: true, dueDate: '2025-07-05', priority: 'high' },
    { id: 7, name: 'Task 7', done: false, dueDate: '2025-07-05', priority: 'medium' },
  ])

  function toggleDone(id) {
    const task = tasks.value.find(t => t.id === id)
    if (task) task.done = !task.done
  }

  return { tasks, toggleDone }
})
