import styles from '../../styles/Task.module.css';
import { useNavigate } from 'react-router-dom';

function Task(props) {
    const { task } = props
    const navigator = useNavigate();

    function taskDetailsHandler(taskUniqueKey) {
        console.log(taskUniqueKey)
        navigator(`/task-details/${taskUniqueKey}`)
    }

    function completedOrNot(task) {
        if (task.completed) {
            return <div className={styles.completedDiv}>Completed</div>
        } else {
            return <button className={styles.detailButton} onClick={() => taskDetailsHandler(task.taskUniqueKey)}>Details</button>
        }

    }

    return (

        <div className={styles.task} >

            <div className={styles.taskText}>{task.name}</div>
            {
                completedOrNot(task)
            }
        </div>
    )
}

export default Task;