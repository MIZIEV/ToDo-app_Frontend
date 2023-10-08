import React from "react";
import styles from "../../styles/Footer.module.css";
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import { FaSquareFacebook } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const LINK_TO_LINKEDIN = "https://www.linkedin.com/in/oleksandr-miziev-312835209/";
const LINK_TO_FACEBOOK = "https://www.facebook.com/profile.php?id=100007998483409";
const LINK_TO_INSTAGRAM = "https://www.instagram.com/olexandr_miziev/";
const LINK_TO_GITHUB = "https://github.com/MIZIEV";

function FooterComponent() {

    return (
        <footer className={`${styles.footer}`}>

            <div className={`${styles.maindiv}`}>

                <div className={`${styles.divleft}`}>
                    <div>
                        <h3>@2023 created by Olexandr Miziev</h3>
                    </div>
                </div>

                <div className={`${styles.divright}`}>

                    <div className={`${styles.iconContainer}`}>
                        <NavLink to={LINK_TO_LINKEDIN}>
                            <BsLinkedin className={`${styles.icon}`} />
                        </NavLink>
                    </div>

                    <div className={`${styles.iconContainer}`}>
                        <NavLink to={LINK_TO_FACEBOOK}>
                            <FaSquareFacebook className={`${styles.icon}`} />
                        </NavLink>
                    </div>

                    <div className={`${styles.iconContainer}`}>
                        <NavLink to={LINK_TO_INSTAGRAM}>
                            <BsInstagram className={`${styles.icon}`} />
                        </NavLink>
                    </div>

                    <div className={`${styles.iconContainer}`}>
                        <NavLink to={LINK_TO_GITHUB}>
                            <BsGithub className={`${styles.icon}`} />
                        </NavLink>
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default FooterComponent;