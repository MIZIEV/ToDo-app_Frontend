
import styles from '../../styles/Todo.module.css';

function Todo(props) {
    const { todo } = props

    return (

        <div className={`${styles.todo} ${todo.completed ? styles.completedTodo : ''}`} >

            <div className={styles.todoText}>{todo.text}</div>


        </div>
    )
}

export default Todo;