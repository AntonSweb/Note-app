<script setup lang="ts">
import { Note } from "../db/index";
import moment from "moment";

const { data } = defineProps({
  data: {
    type: Object as PropType<Note.TNote>,
    required: true
  }
});

const emit = defineEmits(["save"]);
const emitSave = () => {
  emit("save", {
    ...data,
    text: data.text,
    isActive: false,
    updatedAt: new Date().toISOString()
  });
};

function formatDate(d: string): string {
  return moment(d).format("DD/MM/YYYY, kk:mm:ss");
};
</script>

<template>
  <div class="editor">
    <div class="icons">
      <img @click="" class="icon" src="/img/edit.png" alt="Edit note" />
      <img class="icon" src="/img/search.png" alt="Search note" />
    </div>
    <div class="date">
      {{ formatDate(data.updatedAt || data.createdAt) }}
    </div>
    <div class="textarea-wrap">
      <textarea v-model="data.text" @input="emitSave()" class="textarea">
      </textarea>
    </div>
  </div>
</template>

<style scoped>
.editor {
  padding: 10px;
  width: 75%;
}

.icons {
  display: flex;
  justify-content: space-between;
}

.date {
  font-size: 14px;
  text-align: center;
  color: #838280;
}

.textarea-wrap {
  padding: 15px 10px;
  height: 100%;
}

.textarea {
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
}
</style>