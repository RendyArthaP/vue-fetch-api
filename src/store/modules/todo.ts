import type { Module } from "vuex/types/index.js";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const todoModule: Module<TodoState, any> = {
  namespaced: true,

  state: () => ({
    todos: [],
  }),

  mutations: {
    GET_TODO(state, todos: Todo[]) {
      state.todos = todos;
    },

    ADD_TODO(state, todos: Todo) {
      state.todos.unshift(todos);
    },

    UPDATE_TODO(state, updateTodo: Todo) {
      const index = state.todos.findIndex((item) => item.id === updateTodo.id);

      if (index - 1) {
        state.todos[index] = updateTodo;
      }
    },

    DELETE_TODO(state, id: number) {
      state.todos = state.todos.filter((item) => item.id !== id);
    },
  },

  actions: {},
};

export default todoModule;
