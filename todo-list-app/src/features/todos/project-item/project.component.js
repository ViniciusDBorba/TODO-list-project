import { useEffect, useState } from "react";
import { CustomButton } from "../../ui/custom-button/custom-button.component";
import { CustomInput } from "../../ui/custom-input/custom-input.component";
import { addTodo, updateTodoStatus } from "../project.service";
import { TodoList } from "./todo-list/todo-list.component";

export const Project = ({project}) => {
  const [todoDescription, setTodoDescription] = useState("")
  const [todoList, setTodoList] = useState([])

  useEffect(() => {
    setTodoList(project.todos)
  }, [])

  const onClickAddTodo = () => {
    addTodo(todoDescription, project.name).then(res => {
      setTodoDescription("")
      setTodoList(res.data)
    })
  }

  const onChangeTodoStatus = (newValue, todoDescription) => {
    updateTodoStatus(newValue, todoDescription, project.name).then(res => {
      setTodoList(res.data)
    })
  }

  return (
    <div key={project.name} className="project-item">
      <div className="project-item-header">
        <span>{project.name}</span>
      </div>
      <div className="project-item-body">
        <TodoList 
          title="To Do"
          todoList={todoList.filter(todo => !todo.done)} 
          onChangeTodoStatus={onChangeTodoStatus}
        />
        <TodoList 
          title="Done"
          todoList={todoList.filter(todo => todo.done)} 
          onChangeTodoStatus={onChangeTodoStatus}
        />
        <span className="separator" />
        <div className="project-item-add-wrapper">
            <CustomInput 
              name={`${project.name} todo description`} 
              needLabel={false}
              value={todoDescription} 
              setter={setTodoDescription}
            />
            <CustomButton testid={`${project.name}-add-todo-button`} text="Add" onClick={onClickAddTodo}/>
        </div>
      </div>
      
    </div>
    );
};


