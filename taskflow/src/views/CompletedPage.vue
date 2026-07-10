<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Completed</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Completed</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item v-for="task in doneTasks" :key="task.id" button @click="goToDetail(task.id)">
          <ion-checkbox slot="start" :checked="true" @ionChange.stop="toggleTask(task.id)" @click.stop />
          <ion-label class="task-done">{{ task.name }}</ion-label>
        </ion-item>

        <ion-item v-if="doneTasks.length === 0" lines="none">
          <ion-label color="medium" class="ion-text-center">No completed tasks yet.</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonCheckbox } from '@ionic/vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useTaskStore } from '@/stores/taskStore';

const store = useTaskStore();
const { tasks } = storeToRefs(store);
const { toggleTask } = store;

const router = useRouter();

const doneTasks = computed(() => tasks.value.filter((t: { done: boolean }) => t.done === true));

function goToDetail(id: number) {
  router.push({ path: `/tabs/tasks/${id}`, query: { from: 'completed' } });
}
</script>

<style scoped>
.task-done {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>
