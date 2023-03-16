const loader = document.querySelector('#loader');

export async function fetchWithHandle(
    url,
    options,
    successHandler,
    errorHandler
) {
    try {
        loader.style.display = 'inline-block';
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Ошибка запроса: ${response.status}`);
        }
        const data = await response.json();
        successHandler(data);
    } catch (e) {
        errorHandler(e);
    } finally {
        loader.style.display = 'none';
    }
}
