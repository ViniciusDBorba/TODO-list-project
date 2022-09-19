import { TodoItem } from "./todo-item.component";

export const TodoList = ({todoList, onChangeTodoStatus}) => {
  return (
    <div className="project-todo-list">
        {
          todoList.map(todo => (
            <TodoItem 
              description={todo.description} 
              checked={todo.done} 
              onChangeStatus={onChangeTodoStatus} 
              className={`${todo.done ? "done" : ""}`}
            />
          ))
        }
    </div>
    );
};


