<!--
=============================================================
  DAY 5 ASSIGNMENT — TodoListView.vue
  Uses useFetch() to load and display todos from JSONPlaceholder
=============================================================
-->
<script setup>
import { ref, computed } from 'vue'
import { useFetch } from '@/composables/useFetch'

const filter = ref('all') // 'all' | 'done' | 'pending'

// TODO 1: Call useFetch with the JSONPlaceholder todos endpoint
// Rename 'data' to 'todos' using destructuring alias syntax
const { data: todos, loading, error } = useFetch('https://jsonplaceholder.typicode.com/todos')

// TODO 2: Create a filteredTodos computed() that:
//  - Returns [] if todos.value is null (still loading)
//  - Filters by filter.value ('all' shows first 20, 'done' shows completed, 'pending' shows incomplete)
const filteredTodos = computed(() => {
  if(!todos.value) return []
  if(filter.value==='done') return todos.value.filter(t=>t.completed) 
  if(filter.value==='pending') return todos.value.filter(t=>!t.completed) 
  return todos.value.slice(0, 20)
})
</script>

<template>
  <div class="todo-view">
    <h1>📋 Todo List</h1>
    <p class="subtitle">Loaded from JSONPlaceholder API</p>

    <!-- TODO 3: Show a loading message/spinner while loading is true -->
    <p v-if="loading" class="loading">
      Loading Todo Tasks...
    </p>
    <!-- TODO 4: Show an error message if error has a value -->
    <p v-else-if="error" class="error-box">
      {{ error }}
    </p>
    <!-- TODO 5: Show the content block when NOT loading and NO error -->
    <div v-else class="content">
      <!-- Filter buttons -->
      <div class="filters">
        <!-- TODO 6: Three buttons — All, Done, Pending -->
        <!-- Each sets filter.value and gets :class="{ active: filter === '...' }" -->
         <button class="all" @click="filter='all'">
          All
         </button>
         <button class="done" @click="filter='done'">
          Done
         </button>
         <button class="pending" @click="filter='pending'">
          Pending
         </button>
      </div>

      <!-- TODO 7: Render filteredTodos using v-for -->
      <ul class="todo-list">
        <!-- li with checkbox (disabled, reflects todo.completed) and title -->
        <li v-for="todo in filteredTodos" :key="{id: todo.id}">
          <div class="todo-details">
            <input type="checkbox":checked="todo.completed" disabled></input>
            <span :class="{completed: todo.completed}" style="margin-left: 8px;"><p>{{todo.title }}</p></span>          
          </div>
         </li>
      </ul>

      <!-- TODO 8: Show count of visible items -->
       <p class="count">Todos Count: {{ filteredTodos.length }}</p>
    </div>
  </div>
</template>

<style scoped>
.todo-view { max-width: 560px; margin: 20px auto; padding: 24px; font-family: Arial, sans-serif; }
h1 { color: #1B2A4A; margin-bottom: 4px; }
.subtitle { color: #9ca3af; font-size: 13px; margin-bottom: 10px; margin-top: 40px; }
.loading { text-align: center; padding: 48px; color: #42B883; font-size: 16px; }
.error-box { background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 16px; color: #dc2626; }
.content {justify-content: space-between;}
.filters { display: flex; gap: 8px; justify-content: space-evenly; align-content: center; width: 100%; margin-bottom: 12px;}
.filters button { padding: 6px 16px; border: 1px solid #ddd; border-radius: 20px; background: white; cursor: pointer; font-size: 13px; width: 120px;}
.filters button.all { padding: 8px 16px; background: #0505ac; color: white; cursor: pointer; }
.filters button.done { padding: 8px 16px; background: #42B883; color: white; cursor: pointer; }
.filters button.pending { padding: 8px 16px; background: #b30b0b; color: white; cursor: pointer; }
.filters button.active { background: #42B883; color: white; border-color: #42B883; }
.todo-list { list-style: none; padding: 0; margin: 0; }
.todo-list li { display: flex; align-items: center; gap: 10px; padding: 10px 12px; background: white; border-radius: 6px; margin-bottom: 6px; border: 1px solid #eee; font-size: 14px; }
.todo-list li.done-item { opacity: 0.6; }
.todo-list li span { flex: 1; }
.completed-text { text-decoration: line-through; color: #9ca3af; }
.count { font-size: 13px; color: #9ca3af; margin-top: 12px; text-align: right; }
.todo-details {display: flex; flex-direction: row;}
</style>
