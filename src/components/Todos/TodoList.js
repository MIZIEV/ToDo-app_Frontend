import Todo from "./Todo";
import styles from './TodoList.module.css'

function TodoList(props) {

    const { todos, deleteTodo, toggleTodo } = props
    return (
        <div className={styles.todoListContainer}>
            {todos.length === 0 && <h3>Todo list is empty.</h3>}
            {todos.map((todo) => <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />)}
        </div>
    )
}

export default TodoList;