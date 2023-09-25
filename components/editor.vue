<script setup lang="ts">
import { Note } from "../db/index";
import moment from "moment";

const props = defineProps({
  data: {
    type: Object as PropType<Note.TNote>,
    required: true
  }
});
const { data } = toRefs(props);

const emit = defineEmits(["save"]);
const emitPatch = () => {
  emit("save", {
    ...data.value,
    title: data.value.title,
    text: data.value.text,
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
      <textarea v-model="data.title" @input="emitPatch()" class="textarea title"></textarea>
      <textarea v-model="data.text" @input="emitPatch()" class="textarea text"></textarea>
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
  text-align: center;
  color: #838280;
}

.textarea-wrap {
  padding: 15px 10px;
  height: 100%;
}

.textarea {
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  width: 100% !important;
  border: none;
  outline: none;
}

.textarea.title {
  font-weight: bold;
}

.textarea.text {
  height: 100%;
}
</style>