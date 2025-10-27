import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { INotification, ITask } from '../../types/TypesToDoList';
type TTheme = 'light'|'dark'

export interface IInitialState {
    tasks: Record<string, ITask> | null;
    isEdit: string | null,
    isLightAppTeme:boolean,
    theme:TTheme,
    notification:INotification | null,
}

const initialState: IInitialState = {
    tasks: null,
    isEdit: null,
    isLightAppTeme:true,
    theme:'light',
    notification: null,
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

        setEdit: (state, action: PayloadAction<string|null>) => {
            state.isEdit = action.payload
        },
        removeEdit: (state) => {
            state.isEdit = null
        },

        setLightTheme: (state) => {
            state.isLightAppTeme = true;
            document.documentElement.setAttribute('data-theme', "light" );
        },
        setDarkTheme: (state) => {
            state.isLightAppTeme = false;
            document.documentElement.setAttribute('data-theme', "dark" );
        },
        setNotification: (state, action: PayloadAction<INotification | null>) => {
            state.notification = action.payload;
        },
    },
});

export const { setTasks, addTask, deleteTaskById, updateTaskStatus, changeTask, setEdit, removeEdit,
setLightTheme, setDarkTheme, setTheme,setNotification
 } = tasksSlice.actions;
export default tasksSlice.reducer;