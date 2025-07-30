import { createStore } from "vuex";
import todoModule from "./modules/todo";

export default createStore({
  modules: { todoModule },
});
