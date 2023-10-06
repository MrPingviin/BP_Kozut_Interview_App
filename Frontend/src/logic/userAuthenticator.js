const userAuthenticator = async () => {
    let userNotFound, googleID;
    const URLParams = new URLSearchParams(window.location.search);

    if (localStorage.getItem("googleID") != null) {
        googleID = localStorage.getItem("googleID")
    } else {
        googleID = "";
    }
    if (!URLParams.get("user_not_found") && !URLParams.get("server_error")) {
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ googleID: googleID })
            };
            const response = await fetch("http://localhost:3000/user", options);

            if (response.status === 404) {
                userNotFound = true;
                throw new Error("User not found!");
            }

            if (response.ok) {
                return await response.json()
            }

            throw new Error("Server error!")
        } catch (err) {
            if (userNotFound === true) {
                window.location.replace("/?user_not_found=true");
            } else {
                window.location.replace("/?server_error=true");
            }
        }
    }
}

export default userAuthenticator;
