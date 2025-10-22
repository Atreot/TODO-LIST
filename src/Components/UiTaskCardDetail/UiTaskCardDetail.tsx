import { useState, type FC } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { UiTaskCardBilder } from "../UiTaskCardBilder/UiTaskCardBilder";
import { ShowDate } from "../UiTaskCard/UiTaskCard";
import { BinIcon, PencilIcon } from "../../assets/icons/icons";
import { deleteTaskById, setEdit, updateTaskStatus } from "../../store/slices/tasksSlice";
import "../../Components/UiTaskCard/UiTaskCard.css"
import "./UiTaskCardDetail.css"


interface IUiTaskCardDetailProps {

}

const UiTaskCardDetail: FC<IUiTaskCardDetailProps> = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const { id } = useParams();
    const tasks = useAppSelector(state => state.tasksSlice.tasks)
    const [displayTaskBilder, setDisplayTaskBilder] = useState(false);

    const task = (tasks && id) ? tasks[id] : null

    function OnClickDelete() {
        navigate(`/`);
        task && dispatch(deleteTaskById(task.id));
    }

    function OnClickCompleted() {
        task && dispatch(updateTaskStatus({
            id: task.id,
            newStatusIsCompleted: true
        }))
    }

    function OnClickDeComplet() {
        task && dispatch(updateTaskStatus({
            id: task.id,
            newStatusIsCompleted: false
        }))
        console.log("OnClickCompleted");
    }

    return (
        <>

            {
                (!id || !tasks || !task) ?
                    <div>
                        <nav>
                            <Link to="/"><button>Главная страница</button></Link>
                        </nav>
                        <h1>Задача не найдена! {id} </h1>
                        <p>{JSON.stringify(tasks, null, 2)}</p>
                    </div> :


                    <div className="RootContainer">
                        <div className="Container">
                            <div className="TitleDiv MarginLeft MarginRight"><h2 className="MarginLeft MarginRight"> {task.title}</h2></div>

                            <div className={`UiTaskCard  parentCenter Tools`}>
                                <nav className="MarginLeft">
                                    <Link to="/"><button>Главная</button></Link>
                                </nav>
                                <p className={`TaskCardTitle  ${task.isCompleted ? 'InActive' : 'Active'}`} > { }</p>

                                <span className={``} onClick={() => {
                                    dispatch(setEdit(id))
                                }}
                                ><PencilIcon /></span>
                                <span className={`MarginRight`} onClick={OnClickDelete}
                                ><BinIcon /></span>

                            </div>

                            <p className="Description MarginLeft MarginRight">{task.description}</p>

                            <div className="Footer">
                                <button onClick={OnClickDeComplet} className='CancellationButton'>отменить выполнение</button>
                                <button onClick={OnClickCompleted}>ВЫПОЛНИТЬ</button>
                            </div>
                        </div>
                        <div className="Footer DateContainer">
                            <div className="dateOfCreation Date" >
                                создана: <ShowDate date={task.dateOfCreation} /></div>
                            <div className="dateOfCompletion Date" >
                                {(task.dateOfCompletion) ? "выполнена:" : ""}  <ShowDate date={task.dateOfCompletion} /></div>
                        </div>



                    </div>

            }

        </>
    );
}

export { UiTaskCardDetail }