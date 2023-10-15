import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isUserLoggedIn, logout } from "../../services/AuthService";
import { BiArchive } from "react-icons/bi";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { MdFormatListBulletedAdd } from "react-icons/md";
import styles from "../../styles/Header.module.css"


function HeaderComponent() {

    const isAuth = isUserLoggedIn();
    const navigator = useNavigate();
    const username = sessionStorage.getItem("authenticatedUser");
    const windowWidth = window.screen.width;

    const mobileVersion = mobileVersionFunc();

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


    function mobileVersionFunc() {
        if (windowWidth < 600) {
            return false;
        }
        else { return true };
    }

    function buttonsPanel() {
        if (mobileVersionFunc()) {
            return (

                <div>
                    <button className={`${styles.buttonNewTodo}`} onClick={todoListHandler}>Todo list</button>
                    <button className={`${styles.buttonNewTodo}`} onClick={addNewTodo}>Add new todo</button>
                    <button className={`${styles.buttonNewTodo}`} onClick={archiveHandler}>Archive</button>
                </div>
            )
        } else {
            return (
                <div>
                    <AiOutlineUnorderedList onClick={todoListHandler} className={styles.mobileIcon} />
                    <MdFormatListBulletedAdd onClick={addNewTodo} className={styles.mobileIcon} />
                    <BiArchive onClick={archiveHandler} className={styles.mobileIcon} />
                </div>
            )
        }
    }

    return (

        <header className={styles.header}>
            <div className={styles.maindiv}>
                <div className={styles.divleft}>
                    {mobileVersion &&
                        <div>
                            <h3>Todo manager</h3>
                        </div>
                    }
                    {
                        isAuth &&
                        buttonsPanel()
                    }
                </div>

                {
                    !isAuth &&
                    <div className={styles.divright}>
                        <div className={styles.divNavLink}>
                            <NavLink className={styles.navlinksignin} to="/login">Sing in</NavLink>
                        </div>

                        <div className={styles.divNavLink}>
                            <button className={styles.button} onClick={() => registrationHandler()}>Sing up</button>
                        </div>
                    </div>
                }
                {
                    isAuth &&
                    <div className={styles.divright}>
                        <NavLink className={styles.navlinklogout} to="/login" onClick={handleLogout}>Logout</NavLink>

                        <div className={styles.divNavLink}>
                            <button className={styles.button} onClick={() => profileHandler()}>Profile</button>
                        </div>
                    </div>

                }
            </div>
        </header >
    )
}

export default HeaderComponent;