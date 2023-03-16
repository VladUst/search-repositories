const repoList = document.querySelector('#repositories-list');
const statusBlock = document.querySelector('#status');

export function showRepositories(repositories) {
    if (!repositories.items.length) {
        statusBlock.textContent = 'Ничего не найдено';
    }
    repositories = repositories.items.slice(0, 10);
    repositories.forEach((repo) => {
        const name = repo.full_name;
        const url = repo.html_url;
        const description = repo.description;
        const stars = repo.stargazers_count;
        const repoNode = generateRepoNode(name, url, stars, description);
        repoList.appendChild(repoNode);
    });
}

function generateRepoNode(name, url, stars, description) {
    const repoItem = document.createElement('li');
    const repoUrl = document.createElement('a');
    const repoStars = document.createElement('p');
    const repoDescription = document.createElement('p');
    repoUrl.setAttribute('href', url);
    repoUrl.setAttribute('target', '_blank');
    repoUrl.textContent = name;
    repoStars.style.color = 'rgb(159, 97, 4)';
    repoStars.textContent = `${stars} stars`;
    repoDescription.textContent = description;
    repoItem.append(repoUrl, repoStars, repoDescription);
    return repoItem;
}
