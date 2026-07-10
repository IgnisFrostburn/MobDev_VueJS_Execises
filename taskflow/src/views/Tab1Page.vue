<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tasks</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tasks</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Stats bar -->
      <ion-item lines="none" color="light">
        <ion-label>
          Total: {{ totalCount }} &nbsp;|&nbsp; Pending: {{ pendingCount }} &nbsp;|&nbsp; Done: {{ doneCount }}
        </ion-label>
      </ion-item>

      <!-- Task list -->
      <ion-list>
        <ion-item v-for="task in tasks" :key="task.id">
          <ion-checkbox
            slot="start"
            :checked="task.done"
            @ionChange="toggleTask(task.id)"
          />
          <ion-label :class="{ 'task-done': task.done }">{{ task.name }}</ion-label>
          <ion-button
            slot="end"
            fill="clear"
            color="danger"
            @click="removeTask(task.id)"
          >
            <ion-icon slot="icon-only" :icon="trashOutline" />
          </ion-button>
        </ion-item>

        <ion-item v-if="tasks.length === 0" lines="none">
          <ion-label color="medium" class="ion-text-center">No tasks yet. Tap + to add one.</ion-label>
        </ion-item>
      </ion-list>

      <!-- IonFab floating action button -->
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="openAddTask">
          <ion-icon :icon="addOutline" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton, IonIcon,
  IonCheckbox, IonFab, IonFabButton,
  alertController,
} from '@ionic/vue';
import { addOutline, trashOutline } from 'ionicons/icons';
import { storeToRefs } from 'pinia';
import { useTaskStore } from '@/stores/taskStore';

const store = useTaskStore();
const { tasks, totalCount, doneCount, pendingCount } = storeToRefs(store);
const { addTask, toggleTask, removeTask } = store;

async function openAddTask() {
  const alert = await alertController.create({
    header: 'New Task',
    inputs: [
      {
        name: 'taskName',
        type: 'text',
        placeholder: 'Task name',
      },
    ],
    buttons: [
      { text: 'Cancel', role: 'cancel' },
      {
        text: 'Add',
        handler: (data) => {
          if (data.taskName?.trim()) {
            addTask(data.taskName.trim());
          }
        },
      },
    ],
  });
  await alert.present();
}
</script>

<style scoped>
.task-done {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>
