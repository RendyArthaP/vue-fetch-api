<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import { useStore } from "vuex";

const store = useStore();

const todo = ref("");

const handleAddTodo = () => {
  const payload = {
    title: todo.value,
  };
  store.dispatch("todoModule/addTodo", payload);
  todo.value = "";
};

const handleDelete = (id: number) => {
  store.dispatch("todoModule/deleteTodo", id);
};

onMounted(() => {
  store.dispatch("todoModule/getTodo");
});

const todoList = computed(() => store.getters["todoModule/allTodo"]);

// watch(todoList, (val) => {
//   console.log("Todos updated:", val);
// });
</script>

<template>
  <div>
    <input v-model="todo" />
    <button @click="handleAddTodo">Input</button>
    <ul>
      <li v-for="todo in todoList">
        <p>
          {{ todo.title }}
        </p>
        <button @click="handleDelete(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
