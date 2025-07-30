<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const todo = ref("");
const modeUpdate = ref(false);
const editingTodo = ref<{ id?: number; title?: string } | null>(null);

const handleAddTodo = () => {
  const payload = {
    title: todo.value,
  };
  store.dispatch("todoModule/addTodo", payload);
  todo.value = "";
};

const handleUpdateTodo = () => {
  if (!editingTodo.value) return;

  const payloadUpdate = {
    ...editingTodo.value,
    title: todo.value,
  };

  store.dispatch("todoModule/updateTodo", payloadUpdate);
  modeUpdate.value = false;
  todo.value = "";
  editingTodo.value = null;
};

const handleSubmitTodo = () => {
  if (modeUpdate) {
    return handleUpdateTodo();
  }

  return handleAddTodo();
};

const handleChangeMode = (todoItem: any) => {
  modeUpdate.value = true;
  editingTodo.value = { ...todoItem };
  todo.value = todoItem.title;
};

const handleCancelUpdate = () => {
  modeUpdate.value = false;
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
    <button @click="handleSubmitTodo">
      {{ modeUpdate ? "Update" : "Add" }}
    </button>
    <button v-if="modeUpdate" @click="handleCancelUpdate">Cancel Update</button>
    <ul>
      <li v-for="todo in todoList">
        <p>
          {{ todo.title }}
        </p>
        <button @click="handleDelete(todo.id)">Delete</button>
        <button @click="handleChangeMode(todo)">Edit</button>
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
