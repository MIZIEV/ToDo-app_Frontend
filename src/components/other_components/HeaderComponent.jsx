import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isUserLoggedIn, logout } from "../../services/AuthService";
import styles from "../../styles/Header.module.css"

function HeaderComponent() {

    const isAuth = isUserLoggedIn();
    const navigator = useNavigate();
    const username = sessionStorage.getItem("authenticatedUser");

    function addNewTodo() {
        navigator(`/add-todo/`);
    }

    function archiveHandler() {
        navigator(`/todos-completed/${username}`);
    }

    function handleLogout() {
        logout();
        navigator("/login");
    }

    function registrationHandler() {
        navigator("/register");
    }

    function todoListHandler() {
        navigator(`/todos/${username}`);
    }

    function profileHandler() {
        navigator(`/profile/${username}`);
    }

    return (

        <header className={`${styles.header}`}>
            <div className={`${styles.maindiv}`}>
                <div className={`${styles.divleft}`}>
                    <div>
                        <h3>Todo manager</h3>
                    </div>
                    {
                        isAuth &&
                        <div>
                            <button className={`${styles.buttonNewTodo}`} onClick={todoListHandler}>Todo list</button>
                            <button className={`${styles.buttonNewTodo}`} onClick={addNewTodo}>Add new todo</button>
                            <button className={`${styles.buttonNewTodo}`} onClick={archiveHandler}>Archive</button>
                        </div>
                    }
                </div>

                {
                    !isAuth &&
                    <div className={`${styles.divright}`}>
                        <div className={`${styles.divNavLink}`}>
                            <NavLink className={`${styles.navlinksignin}`} to="/login">Sing in</NavLink>
                        </div>

                        <div className={`${styles.divNavLink}`}>
                            <button className={`${styles.button}`} onClick={() => registrationHandler()}>Sing up</button>
                        </div>
                    </div>
                }
                {
                    isAuth &&
                    <div className={`${styles.divright}`}>
                        <NavLink className={`${styles.navlinklogout}`} to="/login" onClick={handleLogout}>Logout</NavLink>

                        <div className={`${styles.divNavLink}`}>
                            <button className={`${styles.button}`} onClick={() => profileHandler()}>Profile</button>
                        </div>
                    </div>

                }
            </div>
        </header>

    )
}

export default HeaderComponent;