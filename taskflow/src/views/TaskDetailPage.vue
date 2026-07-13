<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :default-href="backHref" />
        </ion-buttons>
        <ion-title>Task Detail</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div v-if="task" class="detail-wrapper">
        <ion-list>
          <ion-item>
            <ion-label>
              <p class="field-label">ID</p>
              <h2>{{ task.id }}</h2>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label>
              <p class="field-label">Name</p>
              <h2>{{ task.name }}</h2>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label>
              <p class="field-label">Status</p>
              <h2 :class="task.done ? 'status-done' : 'status-pending'">
                {{ task.done ? 'Completed' : 'Pending' }}
              </h2>
            </ion-label>
            <ion-checkbox
              slot="end"
              :checked="task.done"
              @ionChange="toggleTask(task.id)"
            />
          </ion-item>

          <ion-item>
            <ion-button expand="block" @click="capturePhoto(task.id)">Add Photo</ion-button>
          </ion-item>

          <ion-item v-if="task.photo">
            <ion-label>
              <p class="field-label">Photo</p>
              <ion-img :src="task.photo" class="task-photo" />
            </ion-label>
          </ion-item>
        </ion-list>
      </div>

      <div v-else class="detail-wrapper">
        <ion-item lines="none">
          <ion-label color="medium" class="ion-text-center">Task not found.</ion-label>
        </ion-item>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButtons, IonBackButton, IonCheckbox, IonButton, IonImg,
} from '@ionic/vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useTaskStore } from '@/stores/taskStore';

const route = useRoute();
const store = useTaskStore();
const { tasks } = storeToRefs(store);
const { toggleTask, addPhotoToTask } = store;

const taskId = computed(() => Number(route.params.id));
const task = computed(() => tasks.value.find(t => t.id === taskId.value));
const backHref = computed(() =>
  route.query.from === 'completed' ? '/tabs/completed' : '/tabs/tasks'
);

async function capturePhoto(id: number) {
  try {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
    });

    if (photo.webPath) {
      addPhotoToTask(id, photo.webPath);
    }
  } catch (e) {
    console.log(e)
  }
}
</script>

<style scoped>
.detail-wrapper {
  padding: 16px 0;
}
.field-label {
  font-size: 0.75rem;
  color: var(--ion-color-medium);
  margin-bottom: 2px;
}
.status-done {
  color: var(--ion-color-success);
}
.status-pending {
  color: var(--ion-color-warning);
}
.task-photo {
  margin-top: 8px;
  width: 100%;
  max-width: 320px;
}
</style>
