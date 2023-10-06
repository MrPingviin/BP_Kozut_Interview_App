import "./Auth.scss";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback, useEffect } from "react";
import userAuthenticator from "../logic/userAuthenticator";
import tsParticlesConfig from "../utility/tsParticlesConfig";

const Auth = () => {

    const URL = new URLSearchParams(window.location.search);
    const googleID = localStorage.getItem("googleID");

    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async () => {
        tsParticles.load("tsparticles", tsParticlesConfig);
    }, []);

    useEffect(() => {
        (async () => {
            if (googleID && googleID != "") {
                const user = await userAuthenticator();
                if (user) {
                    window.location.replace("/home")
                }
            }
        })();
    }, [])

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <>
            {URL.get("user_not_found") &&
                <section id="ErrorMessage" className="ErrorMessage ErrorMassiveBackground">
                    <div id="UserNotFoundMessage">
                        <h1>Felhasználó nem található!</h1>
                        <span>Kérjük jelentkezzen be.</span>
                    </div>
                </section>
            }

            {URL.get("server_error") &&
                <section id="ErrorMessage" className="ErrorMessage ErrorMassiveBackground">
                    <div id="ServerErrorMessage">
                        <h1>Szerver nem elérhető!</h1>
                        <span>Kérjük próbálkozzon később.</span>
                    </div>
                </section>
            }
            <section id="AuthPage" className="AuthPage">
                <div id="CompanyLogo" className="CompanyLogo">
                    <img src="/img/kozutlogo.webp" alt="Budapest Közút Zrt. logó" />
                </div>
                <div id="AuthPage__Container" className="AuthPage__Container">
                    <div id="AuthPage__Container__Content" className="AuthPage__Container__Content">
                        <h1>Hitelesítés</h1>
                        <hr />
                        <span>A lentebbi gombra kattintva kérjük jelentkezzen be</span>
                        <span> a <strong>Google</strong> felhasználójával! </span>
                        {/* <button>Bejelentkezés</button> */}
                        <div id="g_id_onload"
                            data-client_id="953596239235-hgf34gbqvqnf8kpu5s9pdqa1s6nefvu5.apps.googleusercontent.com"
                            data-login_uri="http://localhost:3000/auth/google/callback"
                            data-auto_prompt="false">
                        </div>
                        <div className="g_id_signin"
                            data-type="standard"
                            data-size="large"
                            data-theme="outline"
                            data-text="sign_in_with"
                            data-shape="rectangular"
                            data-logo_alignment="left">
                        </div>
                    </div>
                </div>
            </section>
            <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} />
        </>
    );
}

export default Auth;