import React, { useState } from "react";
import { loginApiCall, saveLoggedInUser, storeToken } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Login.module.css";
import sound from "../../sounds/main_buttons_sound.mp3";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function LoginComponent() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
    } = useForm({
        mode: "onBlur"
    });

    const navigator = useNavigate();

    async function handleLoginForm() {
        localStorage.clear();
        const loginObj = [username, password];
        playSound();

        await loginApiCall(username, password).then((responce) => {
            console.log(responce.data)

            const token = "Bearer " + responce.data.accessToken;
            const role = responce.data.role;

            storeToken(token);

            saveLoggedInUser(username, role);

            navigator(`/tasks/${username}`)
        }).catch(error => {
            console.error(error);

            toast.error("Username or password incorect, try again!!!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        });
    }

    function playSound() {
        new Audio(sound).play();
    }

    return (
        <div className={styles.divConatiner}>

            <form className={styles.form} onSubmit={handleSubmit(() => handleLoginForm())} >

                <div className={styles.divFields}>

                    <div>
                        <label className={styles.label}>Username</label>
                    </div>

                    <input

                        {...register("username", {
                            required: "Field musn't be empty!!!",
                            minLength: {
                                value: 4,
                                message: "Username musn't be less 5 characters!!!"
                            }
                        })}
                        className={styles.input}
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                    ></input>
                </div>

                <div>
                    {
                        errors?.username && <label className={styles.erroMessage}>{errors?.username?.message || "Error"}</label>
                    }
                </div>

                <div className={styles.divFields}>

                    <div>
                        <label className={styles.label}>Password</label>
                    </div>

                    <input

                        {...register("password", {
                            required: "Field musn't be empty!!!",
                            minLength: {
                                value: 4,
                                message: "Password musn't be less 4 characters!!!"
                            }
                        })}
                        className={styles.input}
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    ></input>
                </div>

                <div>
                    {
                        errors?.password && <label className={styles.erroMessage}>{errors?.password?.message || "Error"}</label>
                    }
                </div>

                <div>
                    <button className={styles.button} type="submit" disabled={!isValid} >Login</button>
                </div>
            </form>
            <ToastContainer position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" />
        </div >
    )
}

export default LoginComponent;