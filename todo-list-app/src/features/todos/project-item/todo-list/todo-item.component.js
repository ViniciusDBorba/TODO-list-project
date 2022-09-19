import { CustomCheckbox } from "../../../ui/custom-checkbox/custom-checkbox.component";
import { RiDeleteBin2Line, RiEdit2Line, RiSave3Fill, RiCloseLine } from "react-icons/ri"
import { useState } from "react";
import { CustomInput } from "../../../ui/custom-input/custom-input.component";

export const TodoItem = ({todo, onChangeStatus, deleteEvent, saveTodoDescriptionEvent, className}) => {
    const [editing, setEditing] = useState(false)
    const [newDescription, setNewDescription] = useState("")

    const onChangeTodoStatus = (newValue) => {
      onChangeStatus(newValue, todo.description)
    }   
    const onClickDeleteTodo = () => {
      deleteEvent(todo.description)
    }   

    const onClickEdit = () => {
        setEditing(!editing)
    }

    const onClickSave = () => {
        saveTodoDescriptionEvent(todo.description, newDescription)
        setNewDescription("")
    }

    const renderEditLayout = () => {
        if (editing) {
            return (
                <div className={`project-todo-item ${className}`}>
                    <CustomInput
                        name="new todo description"
                        value={newDescription}
                        setter={setNewDescription}
                        needLabel={false}
                        className="medium-margin-right"
                    /> 
                    <RiSave3Fill className="action-icon" onClick={onClickSave}/>
                    <RiCloseLine className="action-icon" onClick={onClickEdit}/>
                </div>
            )
        } else {
            return (
                <div className={`project-todo-item ${className}`}>
                    <CustomCheckbox checked={todo.done} onChange={onChangeTodoStatus}/>
                    <span>{todo.description}</span>
                    <RiEdit2Line className="action-icon" onClick={onClickEdit}/>
                    <RiDeleteBin2Line className="action-icon" onClick={onClickDeleteTodo}/>
                </div>
            )
        }
    }
    return renderEditLayout();
};


