import React, { useEffect } from "react";
import { useState } from 'react';
import { getTodoByKey, saveTodo, updateTodod } from '../../services/TodoService';
import styles from '../../styles/TodoForm.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function TodoForm() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [username, setUsername] = useState("");
    const navigator = useNavigate();
    const { todoUniqueKey } = useParams();

    function saveOrUpdateTodo(event) {
        event.preventDefault();

        const username = sessionStorage.getItem("authenticatedUser");
        const todo = { name, description, todoUniqueKey: uuidv4(), username };

        setUsername(username);
        setName('');

        if (todoUniqueKey) {

            updateTodod(todoUniqueKey, todo).then((responce) => {

                console.log(todo)
                console.log(responce.data);
                navigator(`/todos/${username}`);

            }).catch(error => console.error(error));
        } else {
            saveTodo(todo).then((responce) => {

                console.log(responce.data)
                navigator(`/todos/${username}`)

            }).catch(error => { console.error(error) });
        }
    }

    useEffect(() => {
        if (todoUniqueKey) {
            getTodoByKey(todoUniqueKey).then((responce) => {

                console.log(responce)
                setName(responce.data.name);
                setDescription(responce.data.description);

            }).catch(error => console.error(error));
        }
    }, [])

    function pageTitle() {
        if (todoUniqueKey) {
            return <h1>Update todo</h1>
        } else {
            return <h1>Save new todo</h1>
        }
    }

    return (
        <div className={styles.todoFormContainer}>
            {
                pageTitle()
            }
            <form>
                <div className={`${styles.inputDiv}`}>
                    <input placeholder="Enter new todo" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className={`${styles.inputDiv}`}>
                    <input placeholder="Enter todo description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div>
                    <button className={`${styles.button}`} type="button" onClick={(e) => saveOrUpdateTodo(e)}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default TodoForm;