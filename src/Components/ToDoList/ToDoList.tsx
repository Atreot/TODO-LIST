import { useEffect, useState } from 'react';
import type { FC } from 'react'
import { UiTaskCard } from '../UiTaskCard/UiTaskCard';
import { type ITask } from '../../types/TypesToDoList';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setDarkTheme, setEdit, setLightTheme, setTasks } from '../../store/slices/tasksSlice';
import SearchInput from '../SearchInput/SearchInput';
import { DetectiveIcon, PlusIcon } from '../../assets/icons/icons';
import Button from '@mui/material/Button';
import './ToDoList.scss';
import { baseUrl } from '../../utils';



const ToDoList: FC = () => {
  let tasks = useAppSelector((state) => state.tasksSlice.tasks);
  const dispatch = useAppDispatch();

  const [filteredTasks, setFilteredTasks] = useState<ITask[] | null>();
  const [searchValue, setSearchValue] = useState("");
  const [selectValue, setSelectValue] = useState("all");

  useEffect(() => {
    // const storedTasksStr = localStorage.getItem('tasks');
    // const storedTasks: Record<string, ITask> = storedTasksStr ? JSON.parse(storedTasksStr) : {};

    //dispatch(setTasks(storedTasks));
    //tasks = useAppSelector((state) => state.tasksSlice.tasks);
    //setFilteredTasks(tasks && Object.values(tasks));

    const isLightAppTemeStr = localStorage.getItem('isLightAppTeme');
    const storedIsLightAppTeme: boolean = isLightAppTemeStr === null ? true : JSON.parse(isLightAppTemeStr);
    if (storedIsLightAppTeme) dispatch(setLightTheme()); else dispatch(setDarkTheme());


    fetch(baseUrl + '/tasks',{

    }).then(response => {
      console.log(response)
      console.dir(response)
      console.table(response)

      if (response.ok) return response.json();
    }).then(response => {
      const respTasks = response as unknown as Record<string, ITask>
      console.log(respTasks);
      dispatch(setTasks(respTasks));
    });


  }, []);

  useEffect(() => {
    if (tasks === null) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateFilteredTasks();
  }, [tasks]);

  useEffect(() => {
    updateFilteredTasks();
  }, [searchValue, selectValue]);

  function onChangeSearch(value: string) {
    setSearchValue(value);
  }

  function onChangeSelect(value: string) {
    setSelectValue(value);
  }

  function updateFilteredTasks() {
    if (tasks) {
      let newTask: ITask[];
      if (searchValue === "") {
        newTask = Object.values(tasks);
      } else {
        newTask = Object.values(tasks).filter((task) => {
          if (task.title.includes(searchValue) || task.description.includes(searchValue)) {
            return task;
          }
        });
      }

      if (selectValue === "all") {
        setFilteredTasks(newTask);
        return;
      }

      const isCompletedTasks = selectValue === "complete";

      newTask = Object.values(newTask).filter((task) => {
        if (task.isCompleted === isCompletedTasks) {
          return task;
        }
      });

      setFilteredTasks(newTask);
    }
  }

  const DisplayTasks: FC = () => {

    if (filteredTasks && filteredTasks.length !== 0) {
      return (
        <>
          {
            filteredTasks.map((task) => {
              return (
                <UiTaskCard task={task} key={task.id} />
              )
            })
          }
        </>
      );
    } else {
      return (<>
        <DetectiveIcon />
        <p>Пусто...</p>
      </>);
    }

  }



  return (
    <>
      <div className='container1'>
        <h1>TODO LIST</h1>
        <div className="parentCenter" >
          <SearchInput onChangeInput={onChangeSearch} onChangeSelect={onChangeSelect} onClickAll={() => { setSearchValue(""); }} />
        </div>
      </div>
      <div className="parentCenterList" id='listContainer'>

        <Button variant="contained" className="ButtonAddTask" onClick={() => { dispatch(setEdit(" ")); }}><PlusIcon /></Button>

        <div className="childCenter" id='listContainerChild'>
          <DisplayTasks />
        </div>
      </div>
    </>
  )
};






export { ToDoList as ToDoList };

