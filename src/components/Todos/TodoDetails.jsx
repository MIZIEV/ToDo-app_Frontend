import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { changeTodoCompleteStatus, deleteTodo, getTodoByKey } from "../../services/TodoService";
import styles from "../../styles/TodoDetails.module.css";

function TodoDetails() {

    const { todoUniqueKey } = useParams();
    const navigator = useNavigate();
    const username = sessionStorage.getItem("authenticatedUser");
    const [text, setText] = useState("");
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        getTodoByKey(todoUniqueKey).then((responce) => {

            console.log(responce.data)
            setText(responce.data.text);
            setCompleted(responce.data.completed)

        }).catch(error => console.error(error));
    }, []);


    function editHandler(todoUniqueKey) {
        navigator(`/update-todo/${todoUniqueKey}`)
    }

    function deleteHandler(todoUniqueKey) {
        deleteTodo(todoUniqueKey).then((responce) => {
            console.log(responce.data);
            navigator(`/todos/${username}`)
        }).catch(error => console.error(error));

    }

    function changeStatusHandler(todoUniqueKey) {
        changeTodoCompleteStatus(todoUniqueKey).then((responce) => {
            console.log(responce.data);
        }).catch(error => HTMLFormControlsCollection.error(error));
        //todo: it is a temporary solution (window.location.reload()) must be removed
        window.location.reload();
    }

    return (
        <div className={`${styles.container}`}>

            <div>
                <span>{text}</span>
            </div>

            <div>
                <label >is completed: </label>
                <span>{" " + completed}</span>
            </div>

            <div>
                <button onClick={() => changeStatusHandler(todoUniqueKey)}>Change todo status</button>
            </div>

            <div>
                <button onClick={() => editHandler(todoUniqueKey)}>Edit</button>
            </div>

            <div>
                <button onClick={() => deleteHandler(todoUniqueKey)}>Delete</button>
            </div>


        </div>
    )
}

export default TodoDetails;