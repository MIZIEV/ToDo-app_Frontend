import React, { useState } from "react";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { changeCompleteStatus } from "../../services/TodoElementService";

function TodoElementComponent(props) {

    const { todoElement } = props;
    const [checked, setChecked] = useState(todoElement.completed);

    function changeStatusHandler(event) {
        setChecked(event.target.checked);

        changeCompleteStatus(todoElement.id).then((responce) => {
            console.log(responce.data);
        }).catch(error => console.error(error));
    }

    return (
        <div>
            <FormGroup>
                <FormControlLabel control={<Checkbox checked={checked}
                    onChange={(e) => changeStatusHandler(e)} />} label={todoElement.elementName} />
            </FormGroup>
        </div>
    )
}

export default TodoElementComponent;