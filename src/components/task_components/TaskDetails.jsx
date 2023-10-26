import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { changeTaskCompleteStatus, deleteTask, getTaskByKey } from "../../services/TaskService";
import Todo from "./Todo";

import { BiSolidEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import styles from "../../styles/TaskDetails.module.css";
import { getAllTodos, saveNewTodo } from "../../services/TodoService";

function TaskDetails() {

    const { taskUniqueKey } = useParams();
    const navigator = useNavigate();
    const username = sessionStorage.getItem("authenticatedUser");
    const [name, setName] = useState("");
    const [completed, setCompleted] = useState(false);
    const [description, setDescription] = useState("")

    const [todoName, setTodoName] = useState("");
    const [todoComleted, setTodoCompleted] = useState(false);
    const [todoList, setTodoList] = useState([]);
    const [taskProgress, setTaskProgress] = useState(0);

    function progressResult(todoList) {
        const onePercent = 100 / todoList.length;

        let progress = todoList.filter((todo) => todo.completed === true);

        let result = onePercent * progress.length;

        return result;
    }

    useEffect(() => {
        getTaskByKey(taskUniqueKey).then((response) => {

            console.log(response.data)
            setName(response.data.name);
            setCompleted(response.data.completed);
            setDescription(response.data.description);

        }).catch(error => console.error(error));

    }, []);

    useEffect(() => {
        getAllTodos(taskUniqueKey).then((response) => {

            setTodoList(response.data);
            console.log(response.data);

            setTaskProgress(progressResult(response.data));
        }).catch(error => console.error(error));

    }, [todoList.length]);

    function editHandler(taskUniqueKey) {
        navigator(`/update-task/${taskUniqueKey}`)
    }

    function deleteHandler(taskUniqueKey) {
        deleteTask(taskUniqueKey).then((response) => {
            console.log(response.data);
            navigator(`/tasks/${username}`)
        }).catch(error => console.error(error));
    }

    function changeStatusHandler(taskUniqueKey) {
        changeTaskCompleteStatus(taskUniqueKey).then((response) => {
            console.log(response.data);
            navigator(`/Tasks/${username}`)
        }).catch(error => console.error(error));
    }

    function saveNewTodoHandler(event) {
        event.preventDefault();

        saveNewTodo(taskUniqueKey, { todoName, todoComleted }).then((response) => {
            console.log(response.data);
            setTodoList([...todoList, { todoName, todoComleted }]);
            setTodoName("");
        }).catch(error => console.error(error));
    }

    function taskDescription(taskProgress) {
        if (taskProgress === 100) {

            return (
                <div className={styles.completedContainer}>
                    <span >Do you want completed task?</span>
                    <div>
                        <button className={styles.completedButton} onClick={() => changeStatusHandler(taskUniqueKey)}>Completed</button>
                    </div>
                </div>)
        } else {
            return <span className={styles.span}>{description}</span>
        }
    }

    function showProgress(taskProgress) {
        if (isNaN(taskProgress)) {
            return 0
        }
        else if (taskProgress == undefined) {
            return 0
        } else {
            return taskProgress;
        }
    }

    function testFunction() {
        getAllTodos(taskUniqueKey).then((response) => {

            setTodoList(response.data);
            setTaskProgress(progressResult(response.data));

        }).catch(error => console.error(error))
    }

    return (
        <div className={styles.container}>

            <div className={styles.taskCard}>

                <label>Complete status </label>
                <div className={styles.progressContainer}>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>

                        <CircularProgress size="120px" sx={{ color: "#fe8804" }} variant="determinate" value={taskProgress} />

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
                                {`${~~showProgress(taskProgress)}%`}
                            </Typography>

                        </Box>
                    </Box>
                </div>
            </div>

            <div className={styles.taskCard}>
                <span className={styles.span}>{name}</span>
            </div>

            <div className={styles.taskCard}>
                <div className={styles.todoContainer}>
                    <form onSubmit={(e) => saveNewTodoHandler(e)}>

                        <input className={styles.input}
                            placeholder="Enter todo name"
                            value={todoName}
                            onChange={(e) => setTodoName(e.target.value)} type="text" />

                        <button className={styles.todoButton} type="submit">Submit</button>
                    </form>
                    <label>Todo list:</label>

                    <div className={styles.todoBox}>
                        {
                            todoList.map((todo, index) => <Todo
                                onChange={testFunction}
                                todoIndex={index}
                                todoList={todoList}

                                key={todo.id}
                                todo={todo} />)
                        }
                    </div>

                </div>
            </div>

            <div className={styles.taskCard}>
                <button className={styles.button} onClick={() => editHandler(taskUniqueKey)}>
                    <BiSolidEdit className={styles.iconEdit} />
                </button>
            </div>

            <div className={styles.taskCard}>
                {
                    taskDescription(taskProgress)
                }
            </div>

            <div className={styles.taskCard}>
                <button className={styles.button} onClick={() => deleteHandler(taskUniqueKey)}>
                    <AiFillDelete className={styles.iconDelete} />
                </button>
            </div>

        </div>
    )
}

export default TaskDetails;