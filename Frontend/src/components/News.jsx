import "./News.scss";
import NewsItem from "./NewsItem.jsx";
import { useEffect, useState } from "react";

const News = () => {

    const [articles, setArticles] = useState([]);
    const [downloadState, setDownloadState] = useState(true);

    const getArticles = async () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "googleID": `${localStorage.getItem("googleID")}`
            },
            body: JSON.stringify({})
        }
        const response = await fetch("http://localhost:3000/download/articles", options);
        const data = await response.json();

        return data;
    }

    useEffect(() => {
        (async () => {
            const articles = await getArticles();
            setArticles(articles.reverse());
            setDownloadState(false);

            console.log("Articles => ", articles)
        })();
    }, [])

    return (
        <section id="News" className="News">
            <div id="TitleSection" className="TitleSection">
                <h1>Hírek és bejelentések</h1>
            </div>

            <div id="NewsSection" className="NewsSection">
                <div id="NewsSection__Container" className="NewsSection__Container">
                    {downloadState && <h1>Töltés...</h1>}
                    {!downloadState && articles.map((article, index) => {
                        return <NewsItem key={index} image={`${"http://localhost:3000" + article.imageURL}`} article={article} />
                    })}

                    {articles.length === 0 && !downloadState && <h1>Nincsenek hírek</h1>}

                </div>
            </div>
        </section>
    )
};

export default News;