import React, { useEffect, useState } from "react";
import TodoComponent from "./Task";
import { getAllCompletedTask } from "../../services/TaskService";
import styles from '../../styles/ArchiveList.module.css';

function ArchiveListComponent() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        listTodos();
    }, [])


    function listTodos() {
        console.log("get all todo func")
        getAllCompletedTask().then((responce) => {
            console.log(responce.data);
            setTodos(responce.data);
        }).catch(error => console.error(error));
    }


    return (
        <div className={styles.todoListContainer}>
            {todos.length === 0 && <h3>Archive is empty.</h3>}
            {todos.map((todo) => <TodoComponent key={todo.todoUniqueKey} todo={todo} />)}
        </div>
    )
}

export default ArchiveListComponent;