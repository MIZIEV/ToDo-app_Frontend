import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isUserLoggedIn, logout } from "../../services/AuthService";
import styles from "../../styles/Header.module.css"

function HeaderComponent() {

    const isAuth = isUserLoggedIn();
    const navigator = useNavigate();

    function addNewTodo() {
        navigator("/add-todo");
    }

    function handleLogout() {
        logout();
        navigator("/login");
    }

    function registrationHandler() {
        navigator("/register")
    }

    return (

        <header className={`${styles.header}`}>
            <div className={`${styles.maindiv}`}>
                <div className={`${styles.divleft}`}>
                    <h3>Todo manager</h3>
                </div>

                {
                    //   isAuth &&
                    // <button onClick={addNewTodo}>Add new todo</button>
                }
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
                    </div>
                }
            </div>
        </header>

    )
}

export default HeaderComponent;