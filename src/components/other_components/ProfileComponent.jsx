import React from "react";

function ProfileComponent() {

    const username = sessionStorage.getItem("authenticatedUser");

    return (
        <div>
            <h2>{username}</h2>
        </div>
    )
}

export default ProfileComponent;