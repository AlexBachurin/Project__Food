//universal function for post data from form
const postData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await response.json();


}

//function to get data from server
const getData = async (url) => {
    const response = await fetch(url);

    //if error throw error
    if (!response.ok) {
        throw new Error(`Could not get data from ${url}. Error: ${response.status}`)
    }
    return await response.json();
}

export {postData};
export {getData};