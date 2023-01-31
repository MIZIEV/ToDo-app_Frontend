import Todo from "./Todo";
import styles from './TodoList.module.css'

function TodoList(props) {

    const { todos, deleteTodo } = props
    return (
        <div className={styles.todoListContainer}>
            {todos.length === 0 && <h3>Todo list is empty.</h3>}
            {todos.map((todo, index) => <Todo key={index} todo={todo} index={index} deleteTodo={deleteTodo} />)}
        </div>
    )
}

export default TodoList;