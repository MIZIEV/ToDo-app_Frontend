import styles from '../../styles/Todo.module.css';
import { useNavigate } from 'react-router-dom';

function Todo(props) {
    const { todo } = props
    const navigator = useNavigate();

    function todoDetailsHandler(todoUniqueKey) {
        console.log(todoUniqueKey)
        navigator(`/todo-details/${todoUniqueKey}`)
    }

    return (

        <div className={`${styles.todo} ${todo.completed ? styles.completedTodo : ''}`} >

            <div className={styles.todoText}>{todo.text}</div>
            <button onClick={() => todoDetailsHandler(todo.todoUniqueKey)}>Details</button>
        </div>
    )
}

export default Todo;