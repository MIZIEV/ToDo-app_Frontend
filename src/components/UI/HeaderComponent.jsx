import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isUserLoggedIn, logout } from "../../services/AuthService";

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

    return (
        <div>
            <h1>HEADER</h1>
            {
                isAuth &&
                <button onClick={addNewTodo}>Add new todo</button>
            }
            {
                isAuth &&
                <NavLink to="/login" onClick={handleLogout}>Logout</NavLink>
            }
        </div>
    )
}

export default HeaderComponent;