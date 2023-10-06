import "./NewsWriter.scss";
import Navbar from "../components/Navbar.jsx";
import Form from "../components/Form.jsx";
import userAuthenticator from "../logic/userAuthenticator.js";
import { useEffect, useState } from "react";

const NewsWriter = () => {

    const [user, setUser] = useState(null);
    const [userLoaded, setUserLoaded] = useState(false);
    const [article, setArticle] = useState(null);
    const [articleLoaded, setArticleLoaded] = useState(false);
    const URLParams = new URLSearchParams(window.location.search);
    const edit = URLParams.get("edit");

    const getArticle = async () => {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "articleID": URLParams.get("article_id") || "",
                    "googleID": localStorage.getItem("googleID") || ""
                },
                body: JSON.stringify({})
            }
            const raw = await fetch(`http://localhost:3000/download/article`, options);
            const response = await raw.json();
            setArticle(response[0]);
            setArticleLoaded(true);
        } catch (err) {
            throw new Error("Error! Looks like the API is down.");
        }
    }

    useEffect(() => {
        (async () => {
            await getArticle()
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
        <section id="NewsCreatorPage" className="NewsCreatorPage">
            <div id="NewsCreatorPage__Container" className="NewsCreatorPage__Container">
                <div id="NewsCreatorPage__Container__Content" className="NewsCreatorPage__Container__Content">
                    {(userLoaded && articleLoaded) && (
                        <>
                            <Navbar user={user} />
                            <Form edit={edit} article={article} user={user} />
                        </>
                    )}

                </div>
            </div>
        </section>
    )
};

export default NewsWriter;