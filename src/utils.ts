import type { ITask } from "./types/TypesToDoList";


export function createDefaulTask(): ITask {
  return {
    id: "",
    title: "",
    description: "",
    isCompleted: false,
  };
}