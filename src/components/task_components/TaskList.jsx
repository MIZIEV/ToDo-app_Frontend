import Task from "./Task";
import styles from '../../styles/TaskList.module.css'
import { getAllTasks } from "../../services/TaskService";
import { useEffect, useState } from "react";

function TaskList() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        listTasks();
    }, [])


    function listTasks() {
        getAllTasks().then((responce) => {
            console.log(responce.data);
            setTasks(responce.data);
        }).catch(error => console.error(error));
    }


    return (
        <div className={styles.taskListContainer}>
            {tasks.length === 0 && <h3>Task list is empty.</h3>}
            {tasks.map((task) => <Task key={task.taskUniqueKey} task={task} />)}
        </div>
    )
}

export default TaskList;