import Resct, { useEffect, useState } from "react";
import styles from "../../styles/EditProfile.module.css"
import { getUser, updateUser } from "../../services/UserService";
import { useNavigate } from "react-router-dom";

function EditProfileComponent() {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigator = useNavigate();

    function editProfileHandler(event) {
        event.preventDefault();
        const usernameForUpdating = sessionStorage.getItem("authenticatedUser");
        const user = { name, username, email, password };

        updateUser(usernameForUpdating, user).then((response) => {
            console.log(response.data);
        }).catch(error => console.error(error));

        sessionStorage.clear();
        navigator("/login");
    }

    useEffect(() => {
        const username = sessionStorage.getItem("authenticatedUser");

        getUser(username).then((response) => {
            setName(response.data.name);
            setUsername(response.data.username);
            setEmail(response.data.email);
            setPassword(response.data.password);
        });

    }, [])


    return (
        <div className={styles.divConatiner}>

            <form className={styles.form}>

                <div className={styles.divFields}>

                    <div>
                        <label className={styles.label}>Name</label>
                    </div>

                    <input
                        className={styles.input}
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    ></input>
                </div>

                <div className={styles.divFields}>

                    <div>
                        <label className={styles.label}>Username</label>
                    </div>

                    <input
                        className={styles.input}
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                    ></input>
                </div>

                <div className={styles.divFields}>

                    <div>
                        <label className={styles.label}>Email</label>
                    </div>

                    <input
                        className={styles.input}
                        type="text"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    ></input>
                </div>

                <div className={styles.divFields}>

                    <div>
                        <label className={styles.label}>Password</label>
                    </div>

                    <input
                        className={styles.input}
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    ></input>
                </div>

                <div>
                    <button className={styles.button} type="button" onClick={(e) => editProfileHandler(e)}>Edit</button>
                </div>

            </form>
        </div>
    )
}

export default EditProfileComponent;