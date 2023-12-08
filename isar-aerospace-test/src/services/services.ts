export const get = (url: string) => {
    const headerDefault = { contentType: 'application/json' }
    return fetch(url, {
        method: 'GET',
        headers: {
            ...headerDefault
        }
    })
    .then((response) => response.json())
    .catch((error) => {
        console.log('error', error)
        return error
    })
}