import React, { useState } from "react";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { changeCompleteStatus, deleteTodo } from "../../services/TodoService";
import sound from "../../sounds/check_box_sound.mp3";
import { BsXSquareFill } from "react-icons/bs";
import styles from "../../styles/Todo.module.css";


function Todo(props) {

    const { todo } = props;
    const [checked, setChecked] = useState(todo.completed);

    function changeStatusHandler(event) {
        playSound();
        setChecked(event.target.checked);

        changeCompleteStatus(todo.id).then((responce) => {
            console.log(responce.data);
            props.onChange();

        }).catch(error => console.error(error));
    }

    function playSound() {
        new Audio(sound).play();
    }

    function removeTodoHandler(id) {
        deleteTodo(id).then((response) => {
            console.log(response.data);
            props.onChange();
        }).catch(error => console.error(error));
    }

    return (
        <div>
            <FormGroup className={styles.formGrup}>
                <FormControlLabel control={<Checkbox
                    sx={{
                        color: "white",
                        '&.Mui-checked': {
                            color: "#fe8804"
                        }
                    }}

                    checked={checked}
                    onChange={(e) => changeStatusHandler(e)} />}

                    label={<span>{todo.todoName}
                        <button
                            className={styles.deleteButton}
                            onClick={() => removeTodoHandler(todo.id)}>
                            <BsXSquareFill className={styles.deleteIcon} />
                        </button></span>} />
            </FormGroup>

        </div>
    )
}

export default Todo;