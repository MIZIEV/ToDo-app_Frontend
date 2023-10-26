import React, { useEffect } from "react";
import { useState } from 'react';
import { getTaskByKey, saveTask, updateTaskd } from '../../services/TaskService';
import styles from '../../styles/TaskForm.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function TaskForm() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [username, setUsername] = useState("");
    const navigator = useNavigate();
    const { taskUniqueKey } = useParams();

    function saveOrUpdateTask(event) {
        event.preventDefault();

        const username = sessionStorage.getItem("authenticatedUser");
        const task = { name, description, taskUniqueKey: uuidv4(), username };

        setUsername(username);
        setName('');

        if (taskUniqueKey) {

            updateTaskd(taskUniqueKey, task).then((responce) => {

                console.log(task)
                console.log(responce.data);
                navigator(`/tasks/${username}`);

            }).catch(error => console.error(error));
        } else {
            saveTask(task).then((responce) => {

                console.log(responce.data)
                navigator(`/tasks/${username}`)

            }).catch(error => { console.error(error) });
        }
    }

    useEffect(() => {
        if (taskUniqueKey) {
            getTaskByKey(taskUniqueKey).then((responce) => {

                console.log(responce)
                setName(responce.data.name);
                setDescription(responce.data.description);

            }).catch(error => console.error(error));
        }
    }, [])

    function pageTitle() {
        if (taskUniqueKey) {
            return <h1>Update task</h1>
        } else {
            return <h1>Save new task</h1>
        }
    }

    return (
        <div className={styles.taskFormContainer}>
            {
                pageTitle()
            }
            <form>
                <div className={styles.inputDiv}>
                    <input placeholder="Enter new task" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className={styles.inputDiv}>
                    <input placeholder="Enter task description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div>
                    <button className={styles.button} type="button" onClick={(e) => saveOrUpdateTask(e)}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default TaskForm;