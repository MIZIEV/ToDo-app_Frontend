import { RiDeleteBin2Line, RiRefreshLine } from 'react-icons/ri';

import Button from "../UI/Button";

function TodosActions() {
    return (
        <div>
            <Button title="Clear comleted Todos">
                <RiDeleteBin2Line />
            </Button>
            <Button title="Reset Todos">
                <RiRefreshLine />
            </Button>
        </div>
    )
}

export default TodosActions;