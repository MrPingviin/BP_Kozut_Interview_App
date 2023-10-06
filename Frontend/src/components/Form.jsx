import "./Form.scss";

import { useState, useRef, useEffect } from "react";
import formValidator from "./Form.validator";
import { getCurrentDate, redirectUser } from "./Form.utility";

const Form = (props) => {
    const title = useRef("");
    const text = useRef("");
    const [image, setImage] = useState(null);
    const [uploadState, setUploadState] = useState(false);
    const [uploadSuccess, setUploadSuccessState] = useState(null);

    const uploadHandler = async (e, formData) => {
        try {
            setUploadSuccessState(null);
            setUploadState(true);
            const options = {
                method: "POST",
                headers: {
                    "googleID": `${props.user.googleID}`,
                    "title": `${title.current.value}`,
                    "text": `${text.current.value}`,
                    "displayDate": `${getCurrentDate()}`,
                    "date": `${Date.now()}`,
                    "createdBy": `${props.user.googleID}`,
                },
                body: formData
            }
            const response = await fetch("http://localhost:3000/upload/post", options);
            setUploadState(false);
            if (!response.ok) {
                setUploadSuccessState(false);
            } else {
                setUploadSuccessState(true);
            }
        } catch (err) {
            setUploadState(false);
            setUploadSuccessState(false);
            throw new Error("Error! Looks like the API is down.");
        }
    }

    const editHandler = async (e, formData) => {
        try {
            setUploadSuccessState(null);
            setUploadState(true);
            const options = {
                method: "PATCH",
                headers: {
                    "googleID": `${props.user.googleID}`,
                    "articleID": `${props.article.articleID}`,
                    "text": `${text.current.value}`,
                    "title": `${title.current.value}`
                },
                body: formData
            }
            const response = await fetch("http://localhost:3000/edit/post", options);
            setUploadState(false);
            if (!response.ok) {
                setUploadSuccessState(false);
            } else {
                setUploadSuccessState(true);
            }
        } catch (err) {
            setUploadState(false);
            setUploadSuccessState(false);
            throw new Error("Error! Looks like the API is down.");
        }
    }

    const handleSubmit__upload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        //formData.append("image", new Blob(), "empty-image-file.webp");
        if (formValidator(title.current.value, text.current.value)) {
            //formData.delete("image");
            formData.append('image', image);
            uploadHandler(e, formData);
        } else {
            alert("Hiba! A cím és/vagy a szöveg nincs kitöltve.");
        }
    };

    const handleSubmit__edit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", new Blob(), "empty-image-file.webp");
        if (formValidator(title.current.value, text.current.value)) {
            formData.delete("image");
            formData.append('image', image);
            editHandler(e, formData);
        } else {
            alert("Hiba! A cím és/vagy a szöveg nincs kitöltve.");
        }
    };

    useEffect(() => {
        (props.edit) && (title.current.value = props.article.title, text.current.value = props.article.text);
    }, [])

    useEffect(() => {
        (uploadSuccess) && redirectUser("/home");
    }, [uploadSuccess])

    return (
        <>
            {uploadState ? <h1 className="UploadingMessage">Feltöltés folyamatban...</h1> : <></>}
            {uploadSuccess === null ? <></>
                : uploadSuccess ? (<div className="SuccessMessage">
                    <h1>Sikeres feltöltés!</h1>
                    <span>Átirányítás 3 másodpercen belül..</span>
                </div>)
                    : <h1 className="ErrorMessage">Szerverhiba! Próbálkozzon újra!</h1>
            }
            <div id="NewsForm" className="NewsForm">
                {props.edit
                    ? <h1>Bejegyzés szerkesztése</h1>
                    : <h1>Új bejegyzés</h1>}
                <form
                    className="form"
                    action="#"
                    method="#"
                >
                    <>
                        <label htmlFor="title">Cím</label>
                        <input type="text" ref={title} id="title" name="title" placeholder="Cím" required />
                    </>
                    <>
                        <label htmlFor="image">Kép</label>
                        <input type="file" accept="image/png, image/jpeg" id="image" name="image" placeholder="Kép" onInput={(e) => setImage(e.target.files[0])} />
                    </>
                    <>
                        <label htmlFor="text">Szöveg</label>
                        <textarea name="text" ref={text} id="text" cols="50" rows="10" placeholder="Szöveg" required />
                    </>
                    {!uploadSuccess && (
                        <>
                            {(props.edit) && <button type="submit" onClick={(e) => handleSubmit__edit(e)}>Szerkesztés</button>}
                            {(!props.edit) && <button type="submit" onClick={(e) => handleSubmit__upload(e)}>Küldés</button>}
                        </>
                    )}
                </form>
            </div>
        </>
    )
};

export default Form;