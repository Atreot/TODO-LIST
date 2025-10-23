import { type PayloadAction } from "@reduxjs/toolkit";
import type { Middleware } from 'redux';
import type { RootState } from "../store";
import { toaster } from "../../components/ui/toaster";
import { useAppDispatch } from "../hook";
import { setTasks } from "../slices/tasksSlice";

function isActionWithType(action: unknown): action is { type: string } {
    return typeof action === 'object' && action !== null && 'type' in action;
}

export const notificationsMiddleware: Middleware = ({ getState , dispatch }) => (next) =>
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

                    toaster.create({
                        title: currentState.tasksSlice.tasks[payload.id].isCompleted ? `${taskTitle} ВЫПОЛНЕНА`.toLocaleUpperCase() :
                            `ВЫПОЛНЕНИЕ ${taskTitle} ОТМЕНЕНО`.toLocaleUpperCase(),
                        duration: 2000,
                    })
                }
                break;
            case 'deleteTaskById': {
                const typedAction = action as PayloadAction<string>;
                const taskId = typedAction.payload;

                if (previousState.tasksSlice.tasks === null || !(previousState.tasksSlice.tasks[taskId])) return;
                const taskTitle = previousState.tasksSlice.tasks[taskId].title;


                const savedTasks ={...previousState.tasksSlice.tasks};

                function onClickUndo() {
                    dispatch(setTasks(savedTasks));
                    toaster.success({
                        title: "Удаление отменено".toLocaleUpperCase(),
                        duration: 2000,
                    })
                }

                toaster.dismiss();
                toaster.create({
                    title: `удалена ${taskTitle}`.toLocaleUpperCase(),
                    duration: 5000,
                    action: {
                        label: "ОТМЕНА",
                        onClick: () => onClickUndo(),
                    },
                })
                result = next(action);
            }
                break;
            default:
                result = next(action);
        }
        return result;

    };