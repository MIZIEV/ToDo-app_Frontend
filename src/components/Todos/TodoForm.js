import React from "react";
import { useState } from 'react';
import { saveTodo } from '../../services/TodoService';
import styles from '../../styles/TodoForm.module.css';
import { useNavigate } from "react-router-dom";

function TodoForm() {

    const [text, setText] = useState("");
    const [username, setUsername] = useState("");
    const [todoUniqueKey, setTodoUniqueKey] = useState("");
    const navigator = useNavigate();

    function saveNewTodo(event) {
        event.preventDefault();


        const username = sessionStorage.getItem("authenticatedUser");
        const todo = { text, todoUniqueKey, username };
        setUsername(username);
        setText('');
        //todo change unique key logic!!!!!!!!!!!!!!!!!! 
        setTodoUniqueKey(text);

        saveTodo(todo).then((responce) => {
            console.log(responce.data)
            navigator("/todos")
        }).catch(error => { console.error(error) });
    }

    return (
        <div className={styles.todoFormContainer}>
            <form>
                <input placeholder="Enter new todo" value={text} onChange={(e) => setText(e.target.value)} />

                <div>
                    <button type="button" onClick={(e) => saveNewTodo(e)}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default TodoForm;