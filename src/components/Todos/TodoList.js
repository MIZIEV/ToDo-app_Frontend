import Todo from "./Todo";
import styles from '../../styles/TodoList.module.css'

function TodoList(props) {

    const { todos, deleteTodo, toggleTodo } = props
    return (
        <div className={styles.todoListContainer}>
            {todos.length === 0 && <h3>Todo list is empty.</h3>}
            {todos.map((todo) => <Todo key={todo.todoUniqueKey} todo={todo} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />)}
        </div>
    )
}

export default TodoList;