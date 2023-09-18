import { RiDeleteBin2Line, RiRefreshLine } from 'react-icons/ri';
import styles from '../../styles/TodosActions.module.css';

import Button from "../UI/Button";

function TodosActions(props) {

    const { resetTodos, deleteCompletedTodos, completedTodosExists } = props;

    return (
        <div className={styles.todosActionsContainer}>
            <Button title="Clear comleted Todos" onClick={deleteCompletedTodos} disabled={!completedTodosExists}>
                <RiDeleteBin2Line />
            </Button>
            <Button title="Reset Todos" onClick={resetTodos}>
                <RiRefreshLine />
            </Button>
        </div>
    )
}

export default TodosActions;