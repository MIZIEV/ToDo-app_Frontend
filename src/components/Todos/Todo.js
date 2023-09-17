import { RiTodoFill, RiDeleteBin2Line } from 'react-icons/ri'
import { FaCheck } from 'react-icons/fa'

import styles from '../../styles/Todo.module.css';

function Todo(props) {
    const { todo, deleteTodo, toggleTodo } = props

    return (
        <div className={`${styles.todo} ${todo.completed ? styles.completedTodo : ''}`} >

            <RiTodoFill className={styles.todoIcon} />
            <div className={styles.todoText}>{todo.text}</div>

            <RiDeleteBin2Line className={styles.deleteIcon} onClick={() => { deleteTodo(todo.todoUniqueKey) }} />
            <FaCheck className={styles.checkIcon} onClick={() => { toggleTodo(todo.todoUniqueKey) }} />

        </div>
    )
}

export default Todo;