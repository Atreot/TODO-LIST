import React, { FC, useState } from 'react';
import "./UiTaskCard.css"

// Определение типов для пропсов
interface UiTaskCardProps {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

const UiTaskCard: FC<UiTaskCardProps> = ({id,title,description = '',isCompleted = false}) => {
  
  const [TaskCard, setTaskCard] = useState<UiTaskCardProps>({
  id: id,
  title: title,
  description: description,
  isCompleted: isCompleted,

  });

  function OnClickCompleted(){
    setTaskCard(prev => ({ ...prev,isCompleted:true }));
    console.log("OnClickCompleted");
    
  }
  function OnClickDelete(){
    
  }

  return (
    <div  className={`UiTaskCard${TaskCard.isCompleted ? 'InActive' : 'Active'}`}>
      <h2>{TaskCard.title}</h2>
      <p>Description: {TaskCard.description}</p>
      <p>Status: {TaskCard.isCompleted ? 'Completed' : 'In progress'}</p>
      <button onClick={OnClickCompleted}
        style={{ display: TaskCard.isCompleted ? 'none' : 'block'  }}>✔</button>
      <button onClick={OnClickDelete}
        style={{ display: TaskCard.isCompleted ?  'block' :  'none'  }}>❌</button>
    </div>
  );
};

// UiTaskCard.defaultProps = {
//   title: "string",
//   description: "string",
//   isCompleted: "boolean",
// };

export default UiTaskCard;