import "./NewsItem.scss";
import { useState, useEffect } from "react";

const NewsItem = (props) => {
  const [imageError, setImageError] = useState(false);
  const [author, setAuthor] = useState("");
  const [editor, setEditor] = useState("");
  const [loadingState, setLoadingState] = useState(true);
  const date = "🕒 " + props.article.createdAtDisplayDate + " - ";

  const titleFormatter = (title) => {
    return title.substring(0, 100) + "...";
  }

  const contentFormatter = (text) => {
    return date + text.substring(0, 750) + "...";
  }

  const getAuthor = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "googleID": `${props.article.createdBy}`
      },
      body: JSON.stringify({})
    }
    const response = await fetch("http://localhost:3000/download/user", options);
    const data = await response.json();
    setAuthor(`${data[0].firstName} ${data[0].lastName}`);
  }

  const getEditor = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "googleID": `${props.article.modifiedBy}`
      },
      body: JSON.stringify()
    }
    const response = await fetch("http://localhost:3000/download/user", options);
    const data = await response.json();
    setEditor(`${data[0].firstName} ${data[0].lastName}`);

  }

  const userRender = async () => {
    if (props.article.modifiedBy) {
      await getAuthor();
      await getEditor();
      setLoadingState(false);
    } else {
      await getAuthor();
      setLoadingState(false);
    }
  }

  // Initiates userRender which gets the author and editor
  useEffect(() => {
    userRender()
  }, [])

  // Checks if image exists
  useEffect(() => {
    const imgElement = new Image();
    imgElement.src = props.image;
    imgElement.onerror = () => {
      setImageError(true);
    };
    return () => {
      imgElement.onerror = null;
    };
  }, [props.image]);


  const deleteHandler = async () => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "googleID": `${localStorage.getItem("googleID")}`,
        "articleID": `${props.article.articleID}`
      },
      body: JSON.stringify({})
    }
    const response = await fetch("http://localhost:3000/delete/post", options);
    if (!response.ok) {
      throw new Error("Error! Looks like the API is down.");
    } else {
      window.location.reload();
    }
  };

  const deleteConfirmer = () => {
    if (confirm("Biztosan törölni szeretné ezt a cikket?")) {
      deleteHandler();
    }
  }

  return (
    <>
      {!loadingState && (
        <div className="NewsItem">
          <div className="EditorBar">
            <>
              <h1>Szerkesztői eszköztár</h1>
            </>
            <div className="EditorBar__Options">
              <a href={`/newswriter?edit=true&article_id=${props.article.articleID}`}>
                <span>Szerkesztés</span>
              </a>
              <span className="Clickable" onClick={deleteConfirmer}>Törlés</span>
            </div>
          </div>
          <div className="Divider">
            <div id="NewsItem__ImageSection" className="NewsItem__ImageSection">
              {(props.image === undefined || props.image === "" || imageError) ? <h2>Nincs kép :c</h2>
                : <img src={props.image} alt="Hír képe" className="NewsItem__Image" />}
            </div>
            <div id="NewsItem__ContentSection" className="NewsItem__ContentSection">
              <div className="NewsItem__ContentSection__Content">
                <h2>{(props.article.title.length > 100) ? titleFormatter(props.article.title) : props.article.title}</h2>
                <p>{(props.article.text.length > 750) ? contentFormatter(props.article.text) : date + props.article.text}</p>
              </div>
              <div className="NewsItem__Footer">
                <span>Szerző: {author}</span>
                {props.article.modifiedBy && (
                  <div className="NewsItem__Footer__Edited">
                    <span>📝 {props.article.modifiedAtDisplayDate}</span>
                    <span>Általa: {editor}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
};

export default NewsItem;