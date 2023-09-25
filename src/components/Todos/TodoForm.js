import React, { useEffect } from "react";
import { useState } from 'react';
import { getTodoByKey, saveTodo, updateTodod } from '../../services/TodoService';
import styles from '../../styles/TodoForm.module.css';
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function TodoForm() {

    const [text, setText] = useState("");
    const [username, setUsername] = useState("");
    const navigator = useNavigate();
    const { todoUniqueKey } = useParams();

    function saveOrUpdateTodo(event) {
        event.preventDefault();

        const username = sessionStorage.getItem("authenticatedUser");
        const todo = { text, todoUniqueKey: uuidv4(), username };

        setUsername(username);
        setText('');

        if (todoUniqueKey) {

            updateTodod(todoUniqueKey, todo).then((responce) => {
                console.log("update func")
                console.log(todo)
                console.log(responce.data);
                navigator("/todos")
            }).catch(error => console.error(error));
        } else {
            saveTodo(todo).then((responce) => {
                console.log(responce.data)
                navigator("/todos")
            }).catch(error => { console.error(error) });
        }
    }

    useEffect(() => {
        if (todoUniqueKey) {
            getTodoByKey(todoUniqueKey).then((responce) => {
                console.log(responce)
                setText(responce.data.text);
            }).catch(error => console.error(error));
        }
    }, [])

    function pageTitle() {
        if (todoUniqueKey) {
            return <h1>Update todo</h1>
        } else {
            return <ha>Save new todo</ha>
        }
    }

    return (
        <div className={styles.todoFormContainer}>
            {
                pageTitle()
            }
            <form>
                <input placeholder="Enter new todo" value={text} onChange={(e) => setText(e.target.value)} />

                <div>
                    <button type="button" onClick={(e) => saveOrUpdateTodo(e)}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default TodoForm;