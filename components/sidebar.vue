<script setup lang="ts">
import { Note } from "../db/index";
import moment from "moment";

let notes: Ref<Array<Note.TNote>> = ref([]);

onBeforeMount(async () => {
  notes.value = await Note.getAll();
});

const removeNote = async () => {
  const note = notes.value.find(n => n.isActive);
  if (!note) {
    return;
  };
  let result = window.confirm(`Do you really want to remove?`);
  if (!result) {
    return;
  };
  await Note.remove(note.id);
  notes.value = await Note.getAll();
};

const addNote = async () => {
  const emptyNote: Note.TNoteArgs = {
    title: "New Note",
    text: "No additioanl text",
    isActive: false,
    createdAt: new Date().toISOString(),
  };
  const res = await Note.add(emptyNote);
  notes.value = await Note.getAll();
  openNote(res.id);
};

const openNote = (id: number) => {
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
        <div class="title">{{ note.title }}</div>
        <div>
          <span class="time">{{ formatDate(note.updatedAt || note.createdAt) }}</span>
          <span class="text">{{ note.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  padding: 10px;
  width: 260px;
  border-right: 1px solid #c6c6c6;
}

.icon {
  margin: 12px;
  width: 14px;
  cursor: pointer;
}

.note {
  padding: 16px 12px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 7px;
}

.note._active {
  background-color: #ffe490;
}

.title {
  font-weight: bold;
}

.time {
  margin-right: 10px;
}

.text {
  color: #838280;
}
</style>




<!-- // interface DataModel {
//   notes: Array<TNoteArgs>
// }

// export default defineComponent({
//   data(): DataModel {
//     return {
//       notes: [],
//       db: {}
//     }
//   },
//   async beforeMount() {
//     const this.db = await idb.init();
//     console.log(objectStoreNames);
//   },
//   methods: {
//     formatDate(d: string): string {
//       return `${d.getHours()}:${d.getMinutes()}`;
//     },
//     addNote(): void {
//       const emptyNote: TNoteArgs = {
//         title: "New Note",
//         text: "No additioanl text",
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       }
//       let note = new Note(emptyNote);
//       this.notes.push(note);
//       this.openNote(this.notes.length - 1);
//     },
//     openNote(index: number): void {
//       this.notes.forEach((n, i) => index !== i ? n.is_active = false : n.is_active = true);
//     }
//   }
// })

// :class="['note', { _active: note.is_active }]" -->
