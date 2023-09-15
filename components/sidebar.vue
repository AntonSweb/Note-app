<template>
  <div class="sidebar">
    <div class="icons">
      <img @click="createNote()" class="icon" src="/img/plus.png" alt="Add note" />
      <img class="icon" src="/img/delete.png" alt="Delete note" />
    </div>
    <div class="notes">
      <div v-for="(note, index) in notes" :key="note.date" @click="openNote(index)"
        :class="['note', { _active: note.is_active }]">
        <div class="title">{{ note.title }}</div>
        <div>
          <span class="time">{{ formatDate(note.updated_at || note.created_at) }}</span>
          <span class="text">{{ note.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { INote, Note } from "../types/note"

interface DataModel {
  notes: Array<INote>
}

export default defineComponent({
  data(): DataModel {
    return {
      notes: []
    }
  },
  methods: {
    formatDate(d: string): string {
      return `${d.getHours()}:${d.getMinutes()}`;
    },
    createNote(): void {
      const emptyNote: INote = {
        title: "New Note",
        text: "No additioanl text"
      }
      let note = new Note(emptyNote);
      this.notes.push(note);
      this.openNote(this.notes.length - 1);
    },
    openNote(index: number): void {
      this.notes.forEach((n, i) => index !== i ? n.is_active = false : n.is_active = true);
    }
  }
})
</script>

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