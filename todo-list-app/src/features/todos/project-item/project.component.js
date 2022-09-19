import { useEffect, useState } from "react";
import { CustomButton } from "../../ui/custom-button/custom-button.component";
import { CustomInput } from "../../ui/custom-input/custom-input.component";
import { addTodo, updateTodoStatus } from "../project.service";
import { TodoList } from "./todo-list/todo-list.component";
import { RiDeleteBin2Line, RiEdit2Line } from "react-icons/ri"

export const Project = ({project, deleteProjectEvent}) => {
  const [todoDescription, setTodoDescription] = useState("")
  const [todoList, setTodoList] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  
  useEffect(() => {
    setTodoList(project.todos)
  }, [])

  const onClickAddTodo = () => {
    addTodo(todoDescription, project.name).then(res => {
      setTodoDescription("")
      setTodoList(res.data)
    }).catch(e => {
      setErrorMessage(e.response.data)
    })
  }

  const onChangeTodoStatus = (newValue, todoDescription) => {
    updateTodoStatus(newValue, todoDescription, project.name).then(res => {
      setTodoList(res.data)
    })
  }

  const onChangeTodoDescription = (value) => {
    setErrorMessage("")
    setTodoDescription(value)
  }

  const renderErrorMessage = () => {
    if (errorMessage) {
        return (<p className='card-error-message' data-testid={`login-error-message`}>{errorMessage}</p>)
    }
}

  return (
    <div className="project-item">
      <div className="project-item-header">
        <span>{project.name}</span>
        <div>
          <RiEdit2Line className="small-margin-right action-icon"/>
          <RiDeleteBin2Line className="action-icon" onClick={() => deleteProjectEvent(project.name)}/>
        </div>
      </div>
      <div className="project-item-body">
        {renderErrorMessage()}
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
              setter={onChangeTodoDescription}
            />
            <CustomButton testid={`${project.name}-add-todo-button`} text="Add" onClick={onClickAddTodo}/>
        </div>
      </div>
      
    </div>
    );
};


