import { useEffect, useState } from "react";
import { CustomButton } from "../../ui/custom-button/custom-button.component";
import { CustomInput } from "../../ui/custom-input/custom-input.component";
import { addTodo, updateTodoStatus, deleteTodo, updateTodoDescription } from "../project.service";
import { TodoList } from "./todo-list/todo-list.component";
import { ProjectItemHeader } from "./project-item-header.component";

export const Project = ({project, deleteProjectEvent, saveNewNameEvent}) => {
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

  const onSaveNewTodoDescription = (oldTodoDescription, newTodoDescription) => {
    updateTodoDescription(oldTodoDescription, newTodoDescription, project.name).then(res => {
      setErrorMessage("")
      setTodoList(res.data)
    }).catch(e => {
      setErrorMessage(e.response.data)
    })
  }

  const onDeleteTodo = (todoDescription) => {
    deleteTodo(todoDescription, project.name).then(res => {
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

  const onSaveAction = (newName) => {
    saveNewNameEvent(newName, project.name).then(() => {
      setErrorMessage("")
    })
    .catch(e => {
      setErrorMessage(e.response.data)
    })
  }

  return (
    <div className="project-item">
      <ProjectItemHeader projectName={project.name} saveAction={onSaveAction} deleteProjectEvent={deleteProjectEvent}/>
      <div className="project-item-body">
        {renderErrorMessage()}
        <TodoList 
          title="To Do"
          todoList={todoList.filter(todo => !todo.done)} 
          deleteTodoEvent={onDeleteTodo}
          saveTodoDescriptionEvent={onSaveNewTodoDescription}
          onChangeTodoStatus={onChangeTodoStatus}
        />
        <TodoList 
          title="Done"
          todoList={todoList.filter(todo => todo.done)} 
          deleteTodoEvent={onDeleteTodo}
          saveTodoDescriptionEvent={onSaveNewTodoDescription}
          onChangeTodoStatus={onChangeTodoStatus}
        />
        <span className="separator" />
        <div className="project-item-add-wrapper">
            <CustomInput 
              name={`${project.name} todo description`} 
              needLabel={false}
              value={todoDescription} 
              setter={onChangeTodoDescription}
              className="add-todo-input"
            />
            <CustomButton 
              testid={`${project.name}-add-todo-button`} 
              text="Add" 
              onClick={onClickAddTodo}
              className="small-button"
            />
        </div>
      </div>
      
    </div>
    );
};


