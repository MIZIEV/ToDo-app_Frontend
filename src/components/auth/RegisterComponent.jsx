import React, { useState } from "react";

import { registerApiCall } from "../../services/AuthService";

function RegisterComponent() {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleRegistrationForm(e) {
        e.preventDefault();

        const register = { name, username, email, password };
        registerApiCall(register).then((responce) => {
            console.log(responce.data);
        }).catch(error => console.error(error));
    }

    return (
        <div>
            <h1>Register Component</h1>

            <h3>Registe form</h3>
            <form>

                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    ></input>
                </div>

                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                    ></input>
                </div>

                <div>
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    ></input>
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    ></input>
                </div>

                <div>
                    <button type="button" onClick={(e) => handleRegistrationForm(e)}>Submit</button>
                </div>

            </form>
        </div>
    )
}

export default RegisterComponent;