import React, { useState } from "react";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { changeCompleteStatus } from "../../services/TodoElementService";

function TodoElementComponent(props) {

    const { todoElement } = props;

    //const [elementName, setElementName] = useState("");
    //const [completed, setCompleted] = useState(false);

    function changeStatusHandler() {
        changeCompleteStatus(todoElement.id).then((responce) => {
            console.log(responce.data);
        }).catch(error => console.error(error));

    }


    return (
        <div>
            <FormGroup>
                <FormControlLabel control={<Checkbox checked={todoElement.completed} onChange={changeStatusHandler} />} label={todoElement.elementName} />
            </FormGroup>
        </div>
    )
}

export default TodoElementComponent;