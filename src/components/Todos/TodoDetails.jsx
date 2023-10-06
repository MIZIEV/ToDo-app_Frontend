import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { changeTodoCompleteStatus, deleteTodo, getTodoByKey } from "../../services/TodoService";
import TodoElementComponent from "./TodoElementComponent";

import { BiSolidEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CircularProgress from '@mui/material/CircularProgress';

import styles from "../../styles/TodoDetails.module.css";
import { getAllElements, saveNewTodoElement } from "../../services/TodoElementService";

function TodoDetails() {

    const { todoUniqueKey } = useParams();
    const navigator = useNavigate();
    const username = sessionStorage.getItem("authenticatedUser");
    const [text, setText] = useState("");
    const [completed, setCompleted] = useState(false);
    const [description, setDescription] = useState("")

    const [elementName, setElementName] = useState("");
    const [elementComleted, setElementCompleted] = useState(false);

    const [elementList, setElementList] = useState([]);

    useEffect(() => {
        getTodoByKey(todoUniqueKey).then((responce) => {

            console.log(responce.data)
            setText(responce.data.text);
            setCompleted(responce.data.completed);
            setDescription(responce.data.description);

        }).catch(error => console.error(error));
    }, []);

    useEffect(() => {
        listElements();
    }, []);

    function listElements() {
        getAllElements(todoUniqueKey).then((responce) => {

            setElementList(responce.data);
            console.log(responce.data);
            console.log(elementList)

        }).catch(error => console.error(error));
    }


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

    function saveNewTodoElementHandler(event) {
        event.preventDefault();

        const todoElement = { elementName, elementComleted };

        saveNewTodoElement(todoUniqueKey, todoElement).then((responce) => {
            console.log(responce.data)
        }).catch(error => console.error(error));
    }

    return (
        <div className={`${styles.container}`}>



            <div className={`${styles.todoCard}`}>

                <div className={`${styles.progressContainer}`}>
                    <label >Complete status </label>
                    <div >
                        <CircularProgress size="120px" color="warning" variant="determinate" value={100} />
                    </div>
                </div>


            </div>

            <div className={`${styles.todoCard}`}>
                <span>{text}</span>
            </div>

            <div className={`${styles.todoCard}`}>
                <div>
                    <form>

                        <input placeholder="Enter todo element name"
                            value={elementName}
                            onChange={(e) => setElementName(e.target.value)} type="text" />

                        <button type="button" onClick={(e) => saveNewTodoElementHandler(e)}>Submit</button>
                    </form>
                    <label>Check list:</label>

                    {
                        elementList.map((todoElement) => <TodoElementComponent  todoElement={todoElement} />)
                    }
                    <div>

                    </div>


                </div>
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