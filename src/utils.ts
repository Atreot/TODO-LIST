import type { ITask } from "./types/TypesToDoList";


export function createDefaulTask(): ITask {
  return {
    id: "",
    title: "",
    description: "",
    isCompleted: false,
  };
}

export const pages : { [key: string]: string }[] =
 [{'tasks': 'задачи'},  {'contacts': 'контакты'}];


export const baseUrl = "http://localhost:3000";
 
 