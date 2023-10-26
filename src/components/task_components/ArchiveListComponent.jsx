import React, { useEffect, useState } from "react";
import Task from "./Task";
import { getAllCompletedTask } from "../../services/TaskService";
import styles from '../../styles/ArchiveList.module.css';

function ArchiveListComponent() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        listTodos();
    }, [])


    function listTodos() {
        console.log("get all todo func")
        getAllCompletedTask().then((responce) => {
            console.log(responce.data);
            setTasks(responce.data);
        }).catch(error => console.error(error));
    }


    return (
        <div className={styles.todoListContainer}>
            {tasks.length === 0 && <h3>Archive is empty.</h3>}
            {tasks.map((task) => <Task key={task.todoUniqueKey} task={task} />)}
        </div>
    )
}

export default ArchiveListComponent;