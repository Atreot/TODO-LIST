import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { INotification, ITask } from '../../types/TypesToDoList';
import { v4 as uuidv4 } from 'uuid';
type TTheme = 'light' | 'dark'

export type TNotificationVariant = 'compete' | 'cancel' | 'delete'
export interface INotific {
    id: string,
    variant: TNotificationVariant
    task?: ITask
}
export interface IDeleteNotific extends INotific {
    task: ITask
}
export interface IInitialState {
    tasks: Record<string, ITask> | null;
    isEdit: string | null,
    isLightAppTeme: boolean,
    theme: TTheme,
    notification: INotification | null,
    // notific: Record<string, INotific>,
    notific: INotific [],
}

const initialState: IInitialState = {
    tasks: null,
    isEdit: null,
    isLightAppTeme: true,
    theme: 'light',
    notification: null,
    notific: [{
        id: '1',
        variant: 'compete',
    },
    {
        id: '2',
        variant: 'cancel',
    },
    {
        id: '3',
        variant: 'cancel',
    },
    {
        id: '4',
        variant: 'cancel',
    }
    ]
};


const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Record<string, ITask>>) => {
            const { payload } = action;
            state.tasks = payload;
        },
        setTheme: (state, action: PayloadAction<TTheme>) => {
            // const { payload } = action;
            // state.tasks = payload;
        },
        addTask: (state, action: PayloadAction<ITask>) => {
            const id = action.payload.id;
            if (!state.tasks) state.tasks = {}
            state.tasks[id] = action.payload
        },
        updateTaskStatus: (state, action: PayloadAction<{ id: string, newStatusIsCompleted: boolean }>) => {
            const { id, newStatusIsCompleted } = action.payload
            if (state.tasks && state.tasks[id])
                state.tasks[id] = {
                    ...state.tasks[id],
                    isCompleted: newStatusIsCompleted,
                    dateOfCompletion: newStatusIsCompleted ? Date.now() : undefined,
                }
        },
        deleteTaskById: (state, action: PayloadAction<string>) => {
            if (state.tasks && state.tasks[action.payload])
                delete state.tasks[action.payload];
        },
        changeTask: (state, action: PayloadAction<{ id: string, updates: Partial<ITask> }>) => {
            const { id, updates } = action.payload
            if (state.tasks && state.tasks[id]) {
                state.tasks[id] = {
                    ...state.tasks[id],
                    ...updates
                };
            }
        },

        setEdit: (state, action: PayloadAction<string | null>) => {
            state.isEdit = action.payload
        },
        removeEdit: (state) => {
            state.isEdit = null
        },

        setLightTheme: (state) => {
            state.isLightAppTeme = true;
            document.documentElement.setAttribute('data-theme', "light");
        },
        setDarkTheme: (state) => {
            state.isLightAppTeme = false;
            document.documentElement.setAttribute('data-theme', "dark");
        },
        setNotification: (state, action: PayloadAction<INotification | null>) => {
            state.notification = action.payload;
        },
        addNotific: (state, action: PayloadAction<Omit<INotific, 'id'>>) => {
            const id = uuidv4()
            state.notific = {
                ...state.notific,
                [id]: { id, ...action.payload }
            };
        },
        addDeleteNotific: (state, action: PayloadAction<Omit<IDeleteNotific, 'id'>>) => {
            const id = uuidv4()
            state.notific = {
                ...state.notific,
                [id]: {
                    id,
                    ...action.payload
                }
            };
        },
        removeNotific: (state, action: PayloadAction<INotific>) => {
            const id = action.payload.id
            if (!state.notific[id]) return
            delete state.notific[id]
        },
    },
});

export const { setTasks, addTask, deleteTaskById, updateTaskStatus, changeTask, setEdit, removeEdit,
    setLightTheme, setDarkTheme, setTheme, setNotification, addNotific, removeNotific, addDeleteNotific
} = tasksSlice.actions;
export default tasksSlice.reducer;