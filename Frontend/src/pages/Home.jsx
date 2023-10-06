import "./Home.scss";
import Navbar from "../components/Navbar.jsx";
import News from "../components/News.jsx";
import userAuthenticator from "../logic/userAuthenticator.js";
import { useEffect, useState } from "react";

const Home = () => {
    const URL = new URLSearchParams(window.location.search);
    const id = URL.get("googleID");
    URL.delete("googleID");
    const newURL = `${window.location.pathname}${URL.toString()}`;
    window.history.replaceState({}, document.title, newURL);

    if (id) {
        localStorage.setItem("googleID", id);
    }

    const [user, setUser] = useState(null);
    const [userLoaded, setUserLoaded] = useState(false);
    useEffect(() => {
        (async () => {
            const user = await userAuthenticator();
            setUser(user);
        })();
    }, [])

    useEffect(() => {
        if (user) {
            setUserLoaded(true);
        }
    }, [user])


    return (
        <section id="HomePage" className="HomePage">
            <div id="HomePage__Container" className="HomePage__Container">
                <div id="HomePage__Container__Content" className="HomePage__Container__Content">
                    {!userLoaded && (
                        <>
                            <h1>*Jövőbeni töltőképernyő*..</h1>
                        </>
                    )}
                    {userLoaded && (
                        <>
                            <Navbar user={user} />
                            <News />
                        </>
                    )}
                </div>
            </div>
        </section>
    )
};

export default Home;