import { useEffect, useState } from 'react';
import type { FC } from 'react'
import "./UiTaskCardBilder.scss"
import type { ITask } from '../../types/TypesToDoList';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { addTask, changeTask, removeEdit } from '../../store/slices/tasksSlice';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React from 'react';
import { Outlet, Route } from 'react-router';

//Overlay Manager npx @chakra-ui/cli snippet add toaster


interface IUiTaskCardBilderProps {

}

const TaskCardBilder: FC<IUiTaskCardBilderProps> = () => {
  const taskId = useAppSelector(state => state.tasksSlice.isEdit);
  const tasks = useAppSelector(state => state.tasksSlice.tasks);

  let task: ITask;

  function isChangeMode() {
    return taskId !== null && taskId !== " ";
  }

  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (tasks && taskId !== null && tasks[taskId]) {
      task = tasks[taskId];
      setTitle(task.title);
      setDescription(task.description);
    }
  }, []);

  useEffect(() => {

  }, [title, description]);

  function onClickAdd() {
    const newTask: ITask = {
      id: uuidv4(),
      title: title ?? "",
      description: description ?? "",
      isCompleted: false,
      dateOfCreation: Date.now(),
    };
    dispatch(addTask(newTask));
    setTitle('');
    setDescription('');
    dispatch(removeEdit());
  }
  function onClickChange() {
    if (isChangeMode() && taskId)
      dispatch(changeTask({
        id: taskId,
        updates: {
          title: title,
          description: description
        }
      }));
    dispatch(removeEdit());
  }

  return (
<>
      <div className={"Backdrop"} onClick={() => dispatch(removeEdit())}>
        <div className={"UiTaskCardActive"} onClick={(e) => { e.stopPropagation(); }}>
          <p className='Heading'>{isChangeMode() ? "ИЗМЕНИТЬ ЗАПИСЬ" : "новая запись"}</p>
          <TextField
            type="text"
            variant="filled"
            placeholder={"input your note..."}
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTitle(e.target.value) }}
            className="search-input"
          />
          <textarea
            placeholder={"input your note..."}
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setDescription(e.target.value); }}
            className="StretchTextArea"
          />
          <div className="Footer">
            {<Button onClick={() => dispatch(removeEdit())} className='CancellationButton FutterButtonWidth'>ОТМЕНА</Button>}
            {isChangeMode() ? <Button className='FutterButtonWidth' onClick={onClickChange}>ИЗМЕНИТЬ</Button> : <Button className='FutterButtonWidth' onClick={onClickAdd}>СОЗДАТЬ</Button>}
          </div>
        </div>
      </div>
      <Outlet/>
      </>

  );
};


export { TaskCardBilder as UiTaskCardBilder };