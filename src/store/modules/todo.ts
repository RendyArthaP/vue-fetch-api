import type { Module } from "vuex/types/index.js";
import http from "../../lib/axios";

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

      if (index !== -1) {
        state.todos[index] = updateTodo;
      }
    },

    DELETE_TODO(state, id: number) {
      state.todos = state.todos.filter((item) => item.id !== id);
    },
  },

  actions: {
    async getTodo({ commit }) {
      const res = await http.get("/todos");
      commit("GET_TODO", res.data);
    },

    async addTodo({ commit }, payload: { title: string }) {
      const data = {
        userId: 1,
        title: payload.title,
        completed: false,
      };
      const res = await http.post("/todos", data);
      commit("ADD_TODO", res.data);
    },

    async updateTodo({ commit }, payload: Todo) {
      const res = await http.put(`/todos/${payload.id}`, payload);
      commit("UPDATE_TODO", res.data);
    },

    async deleteTodo({ commit }, id: number) {
      await http.delete(`/todos/${id}`);
      commit("DELETE_TODO", id);
    },
  },

  getters: {
    allTodo: (state) => state.todos,
  },
};

export default todoModule;
