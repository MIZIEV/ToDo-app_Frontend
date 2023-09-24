import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getTodoByKey } from "../../services/TodoService";

function TodoDetails() {

    const { todoUniqueKey } = useParams();
    const navigator = useNavigate();
    const [text, setText] = useState("");
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        getTodoByKey(todoUniqueKey).then((responce) => {

            console.log(responce)
            setText(responce.data.text);
            setCompleted(responce.data.completed)

        }).catch(error => console.error(error));
    }, []);


    function editHandler(todoUniqueKey) {
        navigator(`/update-todo/${todoUniqueKey}`)
    }

    return (
        <div>
            <h1>Todo details</h1>

            <div>
                <label >Todo name: </label>
                <span>{text}</span>
            </div>
            <div>
                <label >is completed: </label>
                <span>{" "+ completed}</span>
            </div>

            <button onClick={() => editHandler(todoUniqueKey)}>Edit</button>

        </div>
    )
}

export default TodoDetails;