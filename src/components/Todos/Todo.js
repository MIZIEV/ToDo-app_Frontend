import styles from './Todo.module.css';

function Todo(props) {
    const { todo } = props

    return (
        <div className={styles.todo}>
            <div classsName={styles.todoText}>{todo}</div>
        </div>
    )
}

export default Todo;