import { useState } from 'react';
import styles from '../../styles/TodoForm.module.css';
import Button from '../UI/Button';
import { saveTodo } from '../../services/TodoService';
import React from "react";

function TodoForm() {

    //const { addTodo } = props;
    const [text, setText] = useState("");
    const [username, setUsername] = useState("");
    const [todoUniqueKey, setTodoUniqueKey] = useState("");

    function saveNewTodo(event) {
        event.preventDefault();


        //const username = sessionStorage.getItem("authenticatedUser");
        const todo = { text, todoUniqueKey, username };
        setUsername(username);
        //addTodo(text);
        setText('');

        console.log(text);
        console.log(username);
        setTodoUniqueKey(text);

        saveTodo(todo).then((responce) => {
            console.log(responce.data)
        }).catch(error => { console.error(error) });
    }

    return (
        <div className={styles.todoFormContainer}>
            <form>
                <input placeholder="Enter new todo" value={text} onChange={(e) => setText(e.target.value)} />

                <div>
                    <Button onClick={(e) => saveNewTodo(e)}>Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default TodoForm;