import { fetchWithHandle } from './fetchWithHandle';
import { showRepositories } from './showRepositories';

const API_REPOS_URL = 'https://api.github.com/search/repositories';

const searchForm = document.querySelector('#search-form');
const searchText = searchForm.querySelector('#search-text');
const repoList = document.querySelector('#repositories-list');
const statusBlock = document.querySelector('#status');

searchForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    let isValid = validateData(new FormData(searchForm));
    if (!isValid) return;
    statusBlock.textContent = '';
    repoList.innerHTML = '';
    const name = searchText.value.trim();
    const url = new URL(API_REPOS_URL);
    const options = { method: 'GET' };
    url.searchParams.set('q', name);
    fetchWithHandle(url, options, showRepositories, showError);
});

function validateData(formData) {
    let isValid = true;
    const text = formData.get('search-text');
    if (!text.length) {
        const errorMessage = document.querySelector('#search-error');
        errorMessage.style.display = 'inline';
        errorMessage.textContent =
            'Название должно должно содержать более 1 символа';
        isValid = false;
    }
    return isValid;
}

searchText.addEventListener('input', function (e) {
    const errorMessage = document.querySelector('#search-error');
    if (errorMessage) {
        errorMessage.style.display = 'none';
    }
});

function showError(e) {
    statusBlock.textContent = e.message;
}
