import { CustomCheckbox } from "../../../ui/custom-checkbox/custom-checkbox.component";

export const TodoItem = ({description, checked, onChangeStatus, className}) => {

  const onChangeTodoStatus = (newValue) => {
    onChangeStatus(newValue, description)
  }

  return (
        <div key={`${description}${checked ? "-done" : ""}`} className={`project-todo-item ${className}`}>
            <CustomCheckbox checked={checked} onChange={onChangeTodoStatus}/>
            <span>{description}</span>
        </div>
    );
};


