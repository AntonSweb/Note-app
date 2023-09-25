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
const emit = defineEmits(["save", "search"]);
const { data } = toRefs(props);
let isMarked: Ref<boolean> = ref(true);
let q: Ref<string> = ref("");

const formatedTitle = computed<string>(() => {
  return formatStr(data.value.title);
});
const formatedText = computed<string>(() => {
  return formatStr(data.value.text);
});

const toggleMode = () => isMarked.value = !isMarked.value;
const emitSearch = () => { emit("search", q) };
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
      <div class="search-note">
        <img class="icon search-icon" src="/img/search.png" alt="Search note" />
        <input v-model="q" @input="emitSearch()" class="search-input" type="search" name="q" placeholder="Search" />
      </div>
    </div>
    <div class="date"> {{ formatDate(data.updatedAt || data.createdAt) }} </div>
    <div v-show="isMarked" class="textarea-wrap textarea-mark">
      <div v-html="formatedTitle" class="title"></div>
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
  align-items: center;
}

.search-note {
  position: relative;
}

.search-input {
  padding-left: 28px;
  height: 28px;
  width: 190px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  outline: none;
  color: #838280;
}

.search-icon {
  position: absolute;
  left: 6px;
  bottom: 6px;
  margin: 0;
}

.date {
  text-align: center;
  color: #838280;
}

.title {
  font-weight: bold;
}

.textarea-wrap {
  font-size: 14px;
  padding: 10px;
  height: 100%;
}

.textarea-mark {
  padding: 0px 12px;
}

.textarea {
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  width: 100%;
  border: none;
  outline: none;
}

.textarea.title {
  height: 22px;
}

.textarea.text {
  height: 100%;
}
</style>