import { type PayloadAction } from "@reduxjs/toolkit";
import type { Middleware } from 'redux';
import type { RootState } from "../store";
import { setNotification, setTasks } from "../slices/tasksSlice";


function isActionWithType(action: unknown): action is { type: string } {
    return typeof action === 'object' && action !== null && 'type' in action;
}

export const notificationsMiddleware: Middleware = ({ getState, dispatch }) => (next) =>
    (action) => {
        
        if (!isActionWithType(action)) {
            return next(action);
        }

        let result;
        const previousState: RootState = getState();
        const actionType = action.type;

        const actionPrefix = actionType.split('/')[1];
        switch (actionPrefix) {
            case 'updateTaskStatus':
                {
                    const typedAction = action as PayloadAction<{ id: string, newStatusIsCompleted: boolean }>;
                    const payload = typedAction.payload;

                    if (previousState.tasksSlice.tasks === null || !(previousState.tasksSlice.tasks[payload.id])) return;
                    const taskTitle = previousState.tasksSlice.tasks[payload.id].title;

                    if (payload.newStatusIsCompleted === previousState.tasksSlice.tasks[payload.id].isCompleted) { return; }
                    result = next(action);

                    const currentState: RootState = getState();
                    if (currentState.tasksSlice.tasks === null || !(currentState.tasksSlice.tasks[payload.id])) return;

                    dispatch(setNotification({message: currentState.tasksSlice.tasks[payload.id].isCompleted ? `${taskTitle} ВЫПОЛНЕНА`.toLocaleUpperCase() :
                            `ВЫПОЛНЕНИЕ ${taskTitle} ОТМЕНЕНО`.toLocaleUpperCase(),
                        autoHideDuration: 2000,}));

                }
                break;
            case 'deleteTaskById': {
                const typedAction = action as PayloadAction<string>;
                const taskId = typedAction.payload;

                if (previousState.tasksSlice.tasks === null || !(previousState.tasksSlice.tasks[taskId])) return;
                const taskTitle = previousState.tasksSlice.tasks[taskId].title;


                const savedTasks = { ...previousState.tasksSlice.tasks };

                function onClickUndo() {
                    dispatch(setTasks(savedTasks));
                    
                    dispatch(setNotification({message: "Удаление отменено".toLocaleUpperCase(),
                        autoHideDuration: 2000,}));
                }

                result = next(action);

                dispatch(setNotification({message: `удалена ${taskTitle}`.toLocaleUpperCase(),
                        autoHideDuration: 5000, action: onClickUndo}));
            }
                break;
            default:
                result = next(action);
        }
        return result;

    };