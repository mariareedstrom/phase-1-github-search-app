const form = document.querySelector("#github-form");

form.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const search = event.target.search.value;
  searchGithub(search).then((data) => {
    //   replace list of users
    replaceUserList(data.items);
  });
  form.reset();
}

// searchGithub(search): [result, ...]
function searchGithub(search) {
  return fetch("https://api.github.com/search/users?q=" + search, {
    headers: { Accept: "application/vnd.github.v3+json" },
  }).then((resp) => resp.json());
}

function handleClickTitle(event) {
  const user = event.target.dataset.user;
  // get, then display repo
  getUserRepos(user).then(displayRepos);
}

function replaceUserList(users) {
  // map over list
  const items = users.map((user) => {
    // transform into li items
    // create li with username, avatar, link
    const item = document.createElement("li");
    const id = `name-repo-${user.login}`;
    item.innerHTML = `    
    <h3 id="${id}" data-user="${user.login}">User name: ${user.login}</h3>    
    <div class="user-avatar">
        <img src="${user.avatar_url}" />
    </div>
    <a href="${user.html_url}" target="_blank">Profile</a>
    `;

    const title = item.querySelector(`#${id}`);
    title.addEventListener("click", handleClickTitle);

    return item;
  });

  const container = document.querySelector("#user-list");
  container.replaceChildren(...items);
}

// function to get user repo
function getUserRepos(users) {
  return fetch("https://api.github.com/users/" + users + "/repos", {
    headers: { Accept: "application/vnd.github.v3+json" },
  }).then((resp) => resp.json());
}

// display all repos of that user
function displayRepos(repos) {
  // map over repos
  const items = repos.map((repo) => {
    // transform into li items
    // create li item with repo name and link
    const item = document.createElement("li");
    item.innerHTML = `<h3>User Repositiory: ${repo.name}</h3>`;
    return item;
  });
  const container = document.querySelector("#repos-list");
  container.replaceChildren(...items);
}
