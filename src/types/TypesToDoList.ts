export interface ITask {
  id: string,
  title: string,
  description: string,
  isCompleted: boolean,
  dateOfCreation?: number,
  dateOfCompletion?: number
}

export interface IServerTask {
  id: string;
  title: string;
  description: string;
  complete: boolean;
  createdAt: number;
  updatedAt: number;
  userId: string;
}

export interface INotification{
  open?: boolean,
  autoHideDuration?: number,
  message?: string,
  action?: ()=>void | undefined,
}
