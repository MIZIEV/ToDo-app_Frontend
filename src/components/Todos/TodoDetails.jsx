import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { changeTodoCompleteStatus, deleteTodo, getTodoByKey } from "../../services/TodoService";
import TodoElementComponent from "./TodoElementComponent";

import { BiSolidEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import styles from "../../styles/TodoDetails.module.css";
import { getAllElements, saveNewTodoElement } from "../../services/TodoElementService";

function TodoDetails() {

    const { todoUniqueKey } = useParams();
    const navigator = useNavigate();
    const username = sessionStorage.getItem("authenticatedUser");
    const [name, setName] = useState("");
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
            setName(responce.data.name);
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

    }, [elementList.length]);

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
            navigator(`/todos/${username}`)
        }).catch(error => console.error(error));
    }

    function saveNewTodoElementHandler(event) {
        event.preventDefault();

        //const todoElement = { elementName, elementComleted };


        console.log("===========array size - " + elementList)
        saveNewTodoElement(todoUniqueKey, { elementName, elementComleted }).then((responce) => {
            console.log(responce.data);
            setElementList([...elementList, { elementName, elementComleted }]);
            console.log("===========array size - " + elementList)

            setElementName("");
        }).catch(error => console.error(error));
        // window.location.reload();


    }

    function todoDescription(todoProgress) {
        if (todoProgress === 100) {

            return (
                <div className={`${styles.completedContainer}`}>
                    <span >Do you want completed todo?</span>
                    <div>
                        <button className={`${styles.completedButton}`} onClick={() => changeStatusHandler(todoUniqueKey)}>Completed</button>
                    </div>
                </div>)
        } else {
            return <span className={`${styles.span}`}>{description}</span>
        }
    }

    function showProgress(todoProgress) {
        if (isNaN(todoProgress)) {
            return 0
        }
        else if (todoProgress == undefined) {
            return 0
        } else {
            return todoProgress;
        }
    }

    return (
        <div className={`${styles.container}`}>

            <div className={`${styles.todoCard}`}>

                <label>Complete status </label>
                <div className={`${styles.progressContainer}`}>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        {
                            console.log("var BEFORE - " + todoProgress + "   elementList - " + elementList)
                        }
                        <CircularProgress size="120px" sx={{ color: "#fe8804" }} variant="determinate" value={todoProgress} />
                        <Box sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Typography variant="caption" component="div" sx={{
                                color: "white",
                                fontSize: "large"
                            }}>
                                {`${~~showProgress(todoProgress)}%`}
                            </Typography>

                        </Box>
                    </Box>
                </div>
            </div>

            <div className={`${styles.todoCard}`}>
                <span className={`${styles.span}`}>{name}</span>
            </div>

            <div className={`${styles.todoCard}`}>
                <div className={`${styles.elementsContainer}`}>
                    <form onSubmit={(e) => saveNewTodoElementHandler(e)}>

                        <input className={`${styles.input}`}
                            placeholder="Enter todo element name"
                            value={elementName}
                            onChange={(e) => setElementName(e.target.value)} type="text" />

                        <button className={`${styles.elementButton}`} type="submit">Submit</button>
                    </form>
                    <label>Check list:</label>

                    <div className={`${styles.elementsBox}`}>
                        {
                            elementList.map((todoElement) => <TodoElementComponent
                                key={todoElement.id}
                                todoElement={todoElement} />)
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
                {
                    todoDescription(todoProgress)
                }
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