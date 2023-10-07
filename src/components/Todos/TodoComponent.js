import styles from '../../styles/Todo.module.css';
import { useNavigate } from 'react-router-dom';

function Todo(props) {
    const { todo } = props
    const navigator = useNavigate();

    function todoDetailsHandler(todoUniqueKey) {
        console.log(todoUniqueKey)
        navigator(`/todo-details/${todoUniqueKey}`)
    }

    function completedOrNot(todo) {
        if (todo.completed) {
            return <div>Completed</div>
        } else {
            return <button className={`${styles.detailButton}`} onClick={() => todoDetailsHandler(todo.todoUniqueKey)}>Details</button>
        }

    }

    return (

        <div className={`${styles.todo}`} >

            <div className={styles.todoText}>{todo.name}</div>
            {
                completedOrNot(todo)
            }
        </div>
    )
}

export default Todo;