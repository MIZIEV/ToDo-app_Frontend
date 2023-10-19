import React, { useState } from "react";

import { registerApiCall } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import sound from "../../sounds/main_buttons_sound.mp3";
import styles from "../../styles/Register.module.css";

function RegisterComponent() {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigator = useNavigate();

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

    function handleRegistrationForm() {

        const register = { name, username, email, password };

        playSound();

        registerApiCall(register).then((responce) => {
            console.log(responce.data);

            toast.success('User registered successfully!!!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            navigator("/login");

        }).catch(error => console.error(error));
    }

    function playSound() {
        new Audio(sound).play();
    }

    return (
        <div className={styles.divConatiner}>

            <form onSubmit={handleSubmit(() => handleRegistrationForm())} className={styles.form}>

                <div className={styles.divFields}>

                    <div>
                        <label className={styles.label}>Name</label>
                    </div>

                    <input
                        {...register("name", {
                            required: "Field musn't be empty!!!",
                            minLength: {
                                value: 4,
                                message: "Name musn't be less 5 characters!!!"
                            }
                        })}

                        className={styles.input}
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    ></input>
                </div>

                <div>
                    {
                        errors?.name && <label className={styles.erroMessage}>{errors?.name?.message || "Error"}</label>
                    }
                </div>

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
                        <label className={styles.label}>Email</label>
                    </div>

                    <input

                        {...register("email", {
                            required: "Field musn't be empty!!!",
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Invalid email address"
                            }
                        })}

                        required
                        className={styles.input}
                        type="text"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    ></input>
                </div>
                <div>
                    {
                        errors?.email && <label className={styles.erroMessage}>{errors?.email?.message || "Error"}</label>
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
                                value: 5,
                                message: "Password musn't be less 5 characters!!!"
                            }
                        })}

                        className={styles.input}
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    ></input>
                    <div>
                        {
                            errors?.password && <label className={styles.erroMessage}>{errors?.password?.message || "Error"}</label>
                        }
                    </div>
                </div>

                <div>
                    <button className={styles.button} type="submit" disabled={!isValid}>Register</button>
                </div>

            </form>
        </div>
    )
}

export default RegisterComponent;