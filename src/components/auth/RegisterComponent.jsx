import React, { useState } from "react";

import { registerApiCall, saveLoggedInUser } from "../../services/AuthService";
import styles from "../../styles/Register.module.css";
import { useNavigate } from "react-router-dom";
import sound from "../../sounds/main_buttons_sound.mp3";

function RegisterComponent() {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigator = useNavigate();

    function handleRegistrationForm(e) {
        e.preventDefault();

        const register = { name, username, email, password };

        playSound();

        registerApiCall(register).then((responce) => {
            console.log(responce.data);
            navigator(`/todos/${username}`);

            saveLoggedInUser(username, "ROLE_USER");
            window.location.reload(false);
        }).catch(error => console.error(error));
    }

    function playSound() {
        new Audio(sound).play();
    }

    return (
        <div className={`${styles.divConatiner}`}>

            <form className={`${styles.form}`}>

                <div className={`${styles.divFields}`}>

                    <div>
                        <label className={`${styles.label}`}>Name</label>
                    </div>

                    <input
                        className={`${styles.input}`}
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    ></input>
                </div>

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
                        <label className={`${styles.label}`}>Email</label>
                    </div>

                    <input
                        className={`${styles.input}`}
                        type="text"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
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
                    <button className={`${styles.button}`} type="button" onClick={(e) => handleRegistrationForm(e)}>Register</button>
                </div>

            </form>
        </div>
    )
}

export default RegisterComponent;