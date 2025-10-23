import { type FC } from 'react'
import "./UiTaskCard.css"
import type { ITask } from '../../types/TypesToDoList';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../store/hook';
import { deleteTaskById, setEdit, updateTaskStatus } from '../../store/slices/tasksSlice';
import { BinIcon, PencilIcon } from '../../assets/icons/icons';

interface IUiTaskCardProps {
  task: ITask;
}

const UiTaskCard: FC<IUiTaskCardProps> = ({ task }) => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  function OnClickCompleted() {
    dispatch(updateTaskStatus({
      id: task.id,
      newStatusIsCompleted: true
    }))
  }
  function OnClickDeComplet() {
    dispatch(updateTaskStatus({
      id: task.id,
      newStatusIsCompleted: false
    }))
  }
  function OnClickDelete() {
    dispatch(deleteTaskById(task.id));
  }

  function openViewTaskCard() {
     navigate(`/${task.id}`);
  }

  return (
    <div  className={`UiTaskCard  parentCenter`}>
      <input
        type="checkbox"
        id={task.id}
        className="checkbox-input"
        checked={task.isCompleted}
        onChange={task.isCompleted ? OnClickDeComplet : OnClickCompleted}
        onClick={(e) => { e.stopPropagation(); }}
      />
      <p className={`TaskCardTitle  ${task.isCompleted ? 'InActive' : 'Active'}`} onClick={openViewTaskCard}> {task.title}</p>
      
      <span  className={`TaskCardButton ${task.isCompleted ? 'Hiden' : ''}`}  onClick={()=>{dispatch(setEdit(task.id))}}
      ><PencilIcon /></span>
      <span className={`TaskCardButton ${task.isCompleted ? 'Hiden' : ''}`}  onClick={OnClickDelete}
      ><BinIcon /></span>
      <div className={`TaskCardDate ${task.isCompleted ? '' : 'Hiden'}  Visible`}
      ><ShowDate date={task.dateOfCompletion} /></div>
    </div>
  );
};

const ShowDate: FC<{ date: number | undefined }> = ({ date }) => {
    if (date) {
      const dateStr = new Date(date).toLocaleDateString('ru-RU');
      //const timeStr = new Date(date).toLocaleTimeString('ru-RU');//<br></br> {timeStr}</></>
      return (<>{dateStr} </>)
    }
    return ''
  }

export { UiTaskCard, ShowDate};