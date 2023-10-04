import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { changeTodoCompleteStatus, deleteTodo, getTodoByKey } from "../../services/TodoService";

import { BiSolidEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import styles from "../../styles/TodoDetails.module.css";

function TodoDetails() {

    const { todoUniqueKey } = useParams();
    const navigator = useNavigate();
    const username = sessionStorage.getItem("authenticatedUser");
    const [text, setText] = useState("");
    const [completed, setCompleted] = useState(false);
    const [description, setDescription] = useState("")

    useEffect(() => {
        getTodoByKey(todoUniqueKey).then((responce) => {

            console.log(responce.data)
            setText(responce.data.text);
            setCompleted(responce.data.completed);
            setDescription(responce.data.description);

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



            <div className={`${styles.todoCard}`}>
                <label >is completed: </label>
                <span>{" " + completed}</span>
            </div>

            <div className={`${styles.todoCard}`}>
                <span>{text}</span>
            </div>

            <div className={`${styles.todoCard}`}>
                <button onClick={() => changeStatusHandler(todoUniqueKey)}>Change todo status</button>
            </div>

            <div className={`${styles.todoCard}`}>
                <button className={`${styles.button}`} onClick={() => editHandler(todoUniqueKey)}>
                    <BiSolidEdit className={`${styles.iconEdit}`} />
                </button>
            </div>

            <div className={`${styles.todoCard}`}>
                <span>{description}</span>
            </div>

            <div className={`${styles.todoCard}`}>
                <button className={`${styles.button}`} onClick={() => deleteHandler(todoUniqueKey)}>
                    <AiFillDelete className={`${styles.iconDelete}`} />
                </button>
            </div>


        </div>
    )
}

export default TodoDetails;