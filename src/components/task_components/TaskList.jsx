import Task from "./Task";
import styles from '../../styles/TodoList.module.css'
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
        <div className={styles.todoListContainer}>
            {tasks.length === 0 && <h3>Task list is empty.</h3>}
            {tasks.map((task) => <Task key={task.todoUniqueKey} task={task} />)}
        </div>
    )
}

export default TaskList;