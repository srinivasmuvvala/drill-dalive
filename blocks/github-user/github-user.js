// blocks/github-user/github-user.js

function repoListMarkup(repos) {
  if (!Array.isArray(repos) || repos.length === 0) {
    return '<p>No repositories</p>';
  }

  const items = repos
    .slice(0, 3)
    .map((repo) => `<li>${repo.name}</li>`)
    .join('');

  return `<ul>${items}</ul>`;
}

export default async function decorate(block) {
  const username = block.textContent.trim();
  block.textContent = '';

  const card = document.createElement('div');
  card.className = 'github-user-card';
  card.innerHTML = '<p>Loading profile...</p>';
  block.appendChild(card);

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos`),
    ]);
    if (!userRes.ok) throw new Error(`GitHub API error: ${userRes.status}`);

    const data = await userRes.json();
    const repos = reposRes.ok ? await reposRes.json() : [];

    card.innerHTML = `
      <img src="${data.avatar_url}" alt="${data.login}" class="avatar" />
      <div class="info">
        <h3>${data.name || data.login}</h3>
        <p>${data.bio || ''}</p>
        <p>${data.public_repos} repos · ${data.followers} followers</p>
        ${repoListMarkup(repos)}
      </div>
    `;
  } catch (err) {
    card.innerHTML = `<p class="error">Could not load profile for "${username}"</p>`;
    console.error(err);
  }
}
