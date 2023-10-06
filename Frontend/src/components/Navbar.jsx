import "./Navbar.scss";
import { useState, useEffect } from "react";

const Navbar = (props) => {
    const [actualPage, setActualPage] = useState(props.actualPage);

    useEffect(() => {
        if (props.actualPage === undefined) {
            setActualPage("Intranet");
        }
    }, [])

    return (
        <>
            <div id="Contact" className="Contact">
                <span>Figyelem! Ez egy fitkív weboldal! Készült a <a href="https://www.budapestkozut.hu/" rel="noreferrer" target="_blank" >Budapest Közútnak</a> felvételi feladat címszó alatt.</span>
                <span>Email: budapestkozut@budapestkozut.hu</span>
            </div>
            <div id="Navbar" className="Navbar">
                <div id="LogoSection" className="LogoSection">
                    <a href="/home"><img src="/img/kozutlogo.webp" alt="Budapest Közút logó" /></a>
                    <h1>| {actualPage}</h1>
                </div>

                <div id="MenuSection" className="MenuSection">
                    <ul id="Menu" className="Menu">
                        <li><a href="/home">Főoldal</a></li>
                        <li><a href="/home">Hírek</a></li>
                        <li><a href="#">Segítség</a></li>
                        <li><a href="#">Beállítások</a></li>
                        <li><a href="/newswriter">Új bejegyzés</a></li>
                    </ul>
                </div>

                <div id="UserSection" className="UserSection">
                    <h3>Üdvözöljük, {`${props.user.lastName} ${props.user.firstName}`}!</h3>
                    <img src={props.user.avatarURL} alt="User Avatar" id="ProfileAvatar" className="ProfileAvatar" />
                </div>
            </div>
        </>
    )
};

export default Navbar;