import TodoComponent from "./TodoComponent";
import styles from '../../styles/TodoList.module.css'
import { getAllTodos } from "../../services/TodoService";
import { useEffect, useState } from "react";

function TodoList() {

    //const { todos, deleteTodo, toggleTodo } = props
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        listTodos();
    }, [])


    function listTodos() {
        console.log("get all todo func")
        getAllTodos().then((responce) => {
            console.log(responce.data);
            setTodos(responce.data);
        }).catch(error => console.error(error));
    }


    return (
        <div className={styles.todoListContainer}>
            {/*todos.length === 0 && <h3>Todo list is empty.</h3>*/}
            {todos.map((todo) => <TodoComponent key={todo.todoUniqueKey} todo={todo} />)}
        </div>
    )
}

export default TodoList;