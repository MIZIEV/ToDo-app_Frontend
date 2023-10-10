import React, { useEffect, useState } from "react";
import styles from "../../styles/Profile.module.css";
import { deleteUser, getUser } from "../../services/UserService";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProfileComponent() {

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const navigator = useNavigate();

    useEffect(() => {
        getCurrentUser();
    }, [])


    function getCurrentUser() {

        const username = sessionStorage.getItem("authenticatedUser");
        getUser(username).then((responce) => {
            setName(responce.data.name);
            setUsername(responce.data.username);
            setEmail(responce.data.email);
        }).catch(error => console.error(error));
    }

    function deleteUserHandler(event) {
        event.preventDefault();
        deleteUser(username);
        sessionStorage.clear();
        navigator("/login");
    }

    function editUserrHandler(event) {
        event.preventDefault();
        navigator(`/profile/update/${username}`);
    }

    return (
        <div className={`${styles.mainContainer}`}>
            <div className={`${styles.profileCard}`}>
                <div className={`${styles.cardContent}`}>

                    <div className={`${styles.icon}`}>
                        <FaUserAlt className={`${styles.icon}`} />
                    </div>

                    <div >
                        <span className={`${styles.titleSpan}`}>Username: </span>
                        <span >{username}</span>
                        <hr />
                    </div>

                    <div >
                        <span className={`${styles.titleSpan}`}>Name: </span>
                        <span >{name}</span>
                        <hr />
                    </div>

                    <div >
                        <span className={`${styles.titleSpan}`}>Email: </span>
                        <span >{email}</span>
                        <hr />
                    </div>

                    <div className={`${styles.buttonsContainer}`}>
                        <button className={`${styles.editButton}`} onClick={(e) => editUserrHandler(e)}>Edit prifile</button>
                        <button className={`${styles.deleteButton}`} onClick={(e) => deleteUserHandler(e)}>Delete profile</button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ProfileComponent;