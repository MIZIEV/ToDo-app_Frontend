import React, { useState } from "react";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { changeCompleteStatus, deleteElement } from "../../services/TodoElementService";
import sound from "../../sounds/check_box_sound.mp3";
import { BsXSquareFill } from "react-icons/bs";
import styles from "../../styles/Element.module.css";


function TodoElementComponent(props) {

    const { todoElement } = props;
    const [checked, setChecked] = useState(todoElement.completed);

    function changeStatusHandler(event) {
        playSound();
        setChecked(event.target.checked);

        changeCompleteStatus(todoElement.id).then((responce) => {
            console.log(responce.data);

            window.location.reload();
            //todo: it is a temporary solution (window.location.reload()) must be removed

        }).catch(error => console.error(error));
    }

    function playSound() {
        new Audio(sound).play();
    }

    function removeElementHandler(id) {
        deleteElement(id).then((response) => {
            console.log(response.data);
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
                    label={<span>{todoElement.elementName}
                        <button className={styles.deleteButton} onClick={() => removeElementHandler(todoElement.id)}><BsXSquareFill className={styles.deleteIcon} /></button></span>} />
            </FormGroup>

        </div>
    )
}

export default TodoElementComponent;