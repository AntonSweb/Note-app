<script setup lang="ts">
import { Note } from "../db/index";
import moment from "moment";

let notes: Ref<Array<Note.TNote>> = ref([]);
let note: Ref<Note.TNote | null> = ref(null);

onBeforeMount(async () => {
  notes.value = await Note.getAll();
});

const removeNote = async () => {
  const note = notes.value.find(n => n.isActive);
  if (!note) return;

  let isConfirm = window.confirm(`Do you really want to remove?`);
  if (!isConfirm) return;

  await Note.remove(note.id);
  notes.value = await Note.getAll();
};

const addNote = async () => {
  const newNote: Note.TNoteArgs = {
    title: "New Note",
    text: "No additioanl text",
    isActive: false,
    createdAt: new Date().toISOString(),
  };
  const res = await Note.add(newNote);
  notes.value = await Note.getAll();
  openNote(res.id);
};

const openNote = (id: number) => {
  notes.value.forEach(n => {
    if (n.id === id) {
      n.isActive = true;
      note.value = { ...n }
    } else {
      n.isActive = false;
    }
  });
};

const saveNote = async (patch: Note.TNote) => {
  const id = await Note.put(patch);
  notes.value = await Note.getAll();
  notes.value.forEach(
    n => n.id === id
      ? n.isActive = true
      : n.isActive = false
  );
}

function formatDate(d: string): string {
  return moment(d).format("kk:mm");
};
</script>

<template>
  <div class="sidebar">
    <div class="icons">
      <img @click="addNote()" class="icon" src="/img/plus.png" alt="Add note" />
      <img @click="removeNote()" class="icon" src="/img/delete.png" alt="Delete note" />
    </div>
    <div class="notes">
      <div v-for="note in notes" :key="note.id" @click="openNote(note.id)" :class="['note', { _active: note.isActive }]">
        <div class="border">
          <div class="title">{{ note.title }}</div>
          <div>
            <span class="time">{{ formatDate(note.updatedAt || note.createdAt) }}</span>
            <span class="text">{{ note.text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Editor v-if="note" :data=note @save="saveNote" />
</template>

<style scoped>
.sidebar {
  padding: 10px;
  width: 25%;
  max-width: 280px;
  border-right: 1px solid #e5e5e5;
}

.note {
  padding: 0 12px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 7px;
}

.note._active {
  background-color: #ffe490;
}

.border {
  padding: 16px 0;
  border-bottom: 1px solid #e5e5e5;
}

.title {
  font-weight: bold;
  margin-bottom: 4px;
}

.time {
  margin-right: 10px;
}

.text {
  color: #838280;
}
</style>