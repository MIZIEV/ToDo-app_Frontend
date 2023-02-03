import { RiDeleteBin2Line, RiRefreshLine } from 'react-icons/ri';

import Button from "../UI/Button";

function TodosActions(props) {

    const { resetTodos, deleteCompletedTodos } = props;

    return (
        <div>
            <Button title="Clear comleted Todos" onClick={deleteCompletedTodos}>
                <RiDeleteBin2Line />
            </Button>
            <Button title="Reset Todos" onClick={resetTodos}>
                <RiRefreshLine />
            </Button>
        </div>
    )
}

export default TodosActions;