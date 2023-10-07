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
    const [todoProgress, setTodoProgress] = useState(0);



    function progressResult(elementList) {
        const onePercent = 100 / elementList.length;

        console.log("one percent - " + onePercent);
        let progress = elementList.filter((todoElement) => todoElement.completed === true);

        let result = onePercent * progress.length;

        console.log("result -------- " + result + "    END OF FUNCTION");
        return result;
    }

    useEffect(() => {
        getTodoByKey(todoUniqueKey).then((responce) => {

            console.log(responce.data)
            setText(responce.data.text);
            setCompleted(responce.data.completed);
            setDescription(responce.data.description);

        }).catch(error => console.error(error));
    }, []);

    useEffect(() => {
        getAllElements(todoUniqueKey).then((responce) => {

            setElementList(responce.data);
            console.log(responce.data);
            console.log(elementList)

            setTodoProgress(progressResult(responce.data));

        }).catch(error => console.error(error));

    }, [elementList, todoProgress]);

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
        window.location.reload();
    }

    return (
        <div className={`${styles.container}`}>

            <div className={`${styles.todoCard}`}>

                <div className={`${styles.progressContainer}`}>
                    <label >Complete status </label>
                    <div >
                        {
                            console.log("var BEFORE - " + todoProgress)
                        }
                        <CircularProgress size="120px" color="warning" variant="determinate" value={todoProgress} />
                    </div>
                </div>


            </div>

            <div className={`${styles.todoCard}`}>
                <span>{text}</span>
            </div>

            <div className={`${styles.todoCard}`}>
                <div className={`${styles.elementsContainer}`}>
                    <form>

                        <input placeholder="Enter todo element name"
                            value={elementName}
                            onChange={(e) => setElementName(e.target.value)} type="text" />

                        <button type="button" onClick={(e) => saveNewTodoElementHandler(e)}>Submit</button>
                    </form>
                    <label>Check list:</label>

                    <div className={`${styles.elementsBox}`}>
                        {
                            elementList.map((todoElement) => <TodoElementComponent key={todoElement.id} todoElement={todoElement} />)
                        }
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