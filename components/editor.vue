<script setup lang="ts">
import { Note } from "../db/index";
import { Marked } from "@ts-stack/markdown";
import moment from "moment";

const props = defineProps({
  data: {
    type: Object as PropType<Note.TNote>,
    required: true
  }
});
const emit = defineEmits(["save"]);
const { data } = toRefs(props);
let isMarked: Ref<boolean> = toRef(true);

const formatedTitle = computed(() => {
  return formatStr(data.value.title);
});
const formatedText = computed(() => {
  return formatStr(data.value.text);
});

const toggleMode = () => isMarked.value = !isMarked.value;
const emitPatch = () => {
  emit("save", {
    ...data.value,
    title: data.value.title,
    text: data.value.text,
    isActive: false,
    updatedAt: new Date().toISOString()
  });
};

function formatStr(str: string): string {
  return Marked.parse(str);
};
function formatDate(d: string): string {
  return moment(d).format("DD/MM/YYYY, kk:mm:ss");
};
</script>

<template>
  <div class="editor">
    <div class="icons">
      <img v-show="isMarked" @click="toggleMode" class="icon" src="/img/edit.png" alt="Edit note" />
      <img v-show="!isMarked" @click="toggleMode" class="icon mark" src="/img/mark.png" alt="Mark note" />
      <img class="icon" src="/img/search.png" alt="Search note" />
    </div>
    <div class="date"> {{ formatDate(data.updatedAt || data.createdAt) }} </div>
    <div v-show="isMarked" class="textarea-wrap">
      <div v-html="formatedTitle"></div>
      <div v-html="formatedText"></div>
    </div>
    <div v-show="!isMarked" class="textarea-wrap">
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