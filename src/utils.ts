import { BASE_URL, USER_ID } from "./const";
import type { IServerTask, ITask } from "./types/TypesToDoList";


export function createDefaulTask(): ITask {
  return {
    id: "",
    title: "",
    description: "",
    isCompleted: false,
  };
}

export function fromServerTaskToTask(sTask: IServerTask): ITask {
  return {
    id: sTask.id,
    title: sTask.title,
    description: sTask.description,
    isCompleted: sTask.complete,
    dateOfCreation: sTask.createdAt,
    dateOfCompletion: sTask.updatedAt,
  };
}

export function fromTaskToServerTask(task: ITask): IServerTask {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    complete: task.isCompleted,
    createdAt: task.dateOfCreation ?? Date.now(),
    updatedAt: task.dateOfCompletion ?? (task.dateOfCreation ?? Date.now()),
    userId: USER_ID
  };
}

export const pages: { [key: string]: string }[] =
  [{ 'tasks': 'задачи' }, { 'contacts': 'контакты' }];


export function putTaskStatus(newStatus: boolean, id:string) {
  const updates = {
    complete: newStatus
  };
  fetch(BASE_URL + '/tasks/' + id, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  }).then(res => {
    if (!res.ok) throw new Error("Err in putTaskStatus");
    return res.json();
  }).then(data => console.log(data))
}

export function deleteTask( id:string) {
  
  fetch(BASE_URL + '/tasks/' + id, {
    method: 'DELETE',
  }).then(res => {
    if (!res.ok) throw new Error("Err in deleteTask");
    return res.json();
  }).then(data => console.log(data))
}



