class Request {
    get = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    };

    logIn = async (url, data) => {
    };

    // POST Request
    post = async (url, data, authorization) => {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                ...(authorization && {
                    authorization: `Bearer: ${JSON.parse(
                        localStorage.getItem("Bearer")
                    )}`,
                }),
                "Content-type": "application/json; charset=UTF-8",
            },
        }); // Response object
        const resdata = await response.json();
        return resdata;
    };

    profileImageUpload = async (data, authorization) => {
        const response = await fetch(`http://localhost:5400/api/auth/upload`, {
            method: "POST",
            headers: {
                ...(authorization && {
                    authorization: `Bearer: ${JSON.parse(
                        localStorage.getItem("Bearer")
                    )}`,
                }),
            },
            body: data,
        });
        const resData = response.json();
        return resData;
    };

    messageSeen = async (messageId, authorization) => {
        const response = await fetch(
            `http://localhost:5400/api/messages/seen/${messageId}`,
            {
                method: "GET",
                headers: {
                    ...(authorization && {
                        authorization: `Bearer: ${JSON.parse(
                            localStorage.getItem("Bearer")
                        )}`,
                    }),
                },
            }
        );
        const resData = response.json();
        return resData;
    };

    seenAllMessageByConversationId = async (conversationId, authorization) => {
        const response = await fetch(
            `http://localhost:5400/api/messages/seenAllTwoUser/${conversationId}`,
            {
                method: "GET",
                headers: {
                    ...(authorization && {
                        authorization: `Bearer: ${JSON.parse(
                            localStorage.getItem("Bearer")
                        )}`,
                    }),
                },
            }
        );
        const resData = response.json();
        return resData;
    };
    seenAllMessageByConversationIdAndUserId = async (conversationId, userId, authorization) => {
        const response = await fetch(
            `http://localhost:5400/api/messages/seenAllOneUser/${conversationId}/${userId}`,
            {
                method: "GET",
                headers: {
                    ...(authorization && {
                        authorization: `Bearer: ${JSON.parse(
                            localStorage.getItem("Bearer")
                        )}`,
                    }),
                },
            }
        );
        const resData = response.json();
        return resData;
    };

    getPage = async (url, authorization) => {
        const response = await fetch(`http://localhost:5400/${url}`, {
            method: 'GET',
            headers: {
                ...(authorization && {
                    authorization: `Bearer: ${JSON.parse(
                        localStorage.getItem("Bearer")
                    )}`,
                }),
            }
        })
        return response.json()
    }

}
