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

        <div className={`${styles.todo}`} >

            <div className={styles.todoText}>{todo.name}</div>
            <button className={`${styles.detailButton}`} onClick={() => todoDetailsHandler(todo.todoUniqueKey)}>Details</button>
        </div>
    )
}

export default Todo;