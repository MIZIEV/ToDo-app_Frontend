import React, { useState } from "react";

function LoginComponent() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    return (
        <div>
            <h1>LoginComponent</h1>

            <h3>Login form</h3>
            <form>

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
                    <button type="button">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default LoginComponent;