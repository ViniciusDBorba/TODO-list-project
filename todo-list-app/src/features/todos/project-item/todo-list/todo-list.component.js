import { TodoItem } from "./todo-item.component";

export const TodoList = ({title, todoList, deleteTodoEvent, saveTodoDescriptionEvent, onChangeTodoStatus}) => {
  return (
    <div>
      <span className="simple-title">{title}</span>
      <div className="project-todo-list">
          {
            todoList.map(todo => (
              <TodoItem 
                key={todo.description}
                todo={todo}
                deleteEvent={deleteTodoEvent}
                onChangeStatus={onChangeTodoStatus} 
                saveTodoDescriptionEvent={saveTodoDescriptionEvent}
                className={`${todo.done ? "done" : ""}`}
              />
            ))
          }
      </div>
    </div>
    );
};


