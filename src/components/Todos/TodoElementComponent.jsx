import React, { useState } from "react";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function TodoElementComponent(props) {

    const { todoElement } = props;

    //const [elementName, setElementName] = useState("");
    //const [completed, setCompleted] = useState(false);


    return (
        <div>
            <FormGroup>
                <FormControlLabel required control={<Checkbox />} label={todoElement.elementName} />
            </FormGroup>
        </div>
    )
}

export default TodoElementComponent;