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
import { BASE_URL } from '../../const';
import { fromTaskToServerTask } from '../../utils';

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
  const [isCorrectEntry, setIsCorrectEntry] = useState(false);

  useEffect(() => {
    if (tasks && taskId !== null && tasks[taskId]) {
      task = tasks[taskId];
      setTitle(task.title);
      setDescription(task.description);
      setIsCorrectEntry(task.title.length>=3);
    }
  }, []);

  useEffect(() => {

  }, [title, description]);

  function postTask(newTask: ITask) {
    fetch(BASE_URL + '/tasks', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fromTaskToServerTask(newTask))
    }).then(res => {
      if (!res.ok) throw new Error("Err in postTask");
      return res.json();
    }).then(data => console.log(data))
  }

  function onClickAdd() {
    const newTask: ITask = {
      id: uuidv4(),
      title: title ?? "",
      description: description ?? "",
      isCompleted: false,
      dateOfCreation: Date.now(),
    };
    dispatch(addTask(newTask));

    postTask(newTask);

    setTitle('');
    setDescription('');
    dispatch(removeEdit());
  }

  function putTask() {
    const updates = {
      title: title ?? "",
      description: description ?? "",
    };

    fetch(BASE_URL + '/tasks/' + taskId, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    }).then(res => {
      if (!res.ok) throw new Error("Err in postTask");
      return res.json();
    }).then(data => console.log(data))
  }

  function onChangeTitleTextField(str: string) {
    setTitle(str);
    setIsCorrectEntry(str.length>=3);
  }

  function onClickChange() {
    if (isChangeMode() && taskId) {
      dispatch(changeTask({
        id: taskId,
        updates: {
          title: title,
          description: description
        }
      }));
      putTask();
    }
    dispatch(removeEdit());
  }

  return (
    <>
      {<div className={"Backdrop"} onClick={() => dispatch(removeEdit())}>
        <div className={"UiTaskCardActive"} onClick={(e) => { e.stopPropagation(); }}>
          <p className='Heading'>{isChangeMode() ? "ИЗМЕНИТЬ ЗАПИСЬ" : "новая запись"}</p>
          <TextField
            type="text"
            variant="filled"
            placeholder={"input your note..."}
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { onChangeTitleTextField(e.target.value); }}
            className={isCorrectEntry ? "search-input" : "search-input NotValidInput"}
          />
          <textarea
            placeholder={"input your note..."}
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setDescription(e.target.value); }}
            className="StretchTextArea"
          />
          <div className="Footer">
            {<Button onClick={() => dispatch(removeEdit())} className='CancellationButton FutterButtonWidth'>ОТМЕНА</Button>}
            {isChangeMode() ? <Button className={isCorrectEntry ? 'FutterButtonWidth' : 'FutterButtonWidth NotActiveButton'} onClick={onClickChange}>ИЗМЕНИТЬ</Button> :
              <Button className={isCorrectEntry ? 'FutterButtonWidth' : 'FutterButtonWidth NotActiveButton'} onClick={onClickAdd}>СОЗДАТЬ</Button>}
          </div>
        </div>
      </div>}

    </>

  );
};


export { TaskCardBilder as UiTaskCardBilder };