import { CustomCheckbox } from "../../../ui/custom-checkbox/custom-checkbox.component";
import { RiDeleteBin2Line, RiEdit2Line, RiSave3Fill, RiCloseLine } from "react-icons/ri"

export const TodoItem = ({todo, onChangeStatus, deleteEvent, className}) => {

  const onChangeTodoStatus = (newValue) => {
    onChangeStatus(newValue, todo.description)
  }

  const onClickDeleteTodo = () => {
    deleteEvent(todo.description)
  }

  return (
        <div className={`project-todo-item ${className}`}>
            <CustomCheckbox checked={todo.done} onChange={onChangeTodoStatus}/>
            <span>{todo.description}</span>
            <RiEdit2Line className="action-icon" />
            <RiDeleteBin2Line className="action-icon" onClick={onClickDeleteTodo}/>
        </div>
    );
};


