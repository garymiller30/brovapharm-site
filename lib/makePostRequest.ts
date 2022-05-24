export const makePostRequest = (url: string, details: any) => {
    return fetch(url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(details),
        })
        .then((response) => response.json());
};