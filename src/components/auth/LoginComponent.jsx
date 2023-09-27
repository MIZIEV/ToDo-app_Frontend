import React, { useState } from "react";
import { loginApiCall, saveLoggedInUser, storeToken } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Login.module.css";

function LoginComponent() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigator = useNavigate();

    async function handleLoginForm(e) {
        e.preventDefault();
        const loginObj = [username, password];
        console.log(loginObj);

        await loginApiCall(username, password).then((responce) => {
            console.log(responce.data)

            const token = "Bearer " + responce.data.accessToken;
            const role = responce.data.role;

            storeToken(token);

            saveLoggedInUser(username, role);

            navigator(`/todos/${username}`)
            window.location.reload(false);
        }).catch(error => console.error(error));

    }


    return (
        <div className={`${styles.divConatiner}`}>

            <form className={`${styles.form}`}>

                <div className={`${styles.divFields}`}>
                    <div>
                        <label className={`${styles.label}`}>Username</label>
                    </div>
                    <input
                        className={`${styles.input}`}
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                    ></input>
                </div>

                <div className={`${styles.divFields}`}>
                    <div>
                        <label className={`${styles.label}`}>Password</label>
                    </div>
                    <input
                        className={`${styles.input}`}
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    ></input>
                </div>

                <div>
                    <button className={`${styles.button}`} type="button" onClick={(e) => handleLoginForm(e)}>Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginComponent;