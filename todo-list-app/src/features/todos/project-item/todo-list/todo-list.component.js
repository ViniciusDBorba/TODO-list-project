import { TodoItem } from "./todo-item.component";

export const TodoList = ({title, todoList, onChangeTodoStatus}) => {
  return (
    <div>
      <span className="simple-title">{title}</span>
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
    </div>
    );
};


