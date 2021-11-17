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

function replaceUserList(users) {
  // map over list
  const items = users.map((user) => {
    // transform into li items
    // create li with username, avatar, link
    const item = document.createElement("li");

    item.innerHTML = `
    <h3>User name: ${user.login}</h3>
    <div class="user-avatar">
        <img src="${user.avatar_url}" />
    </div>
    <a href="${user.html_url}" target="_blank">Profile</a>
    `;

    return item;
  });

  const container = document.querySelector("#user-list");
  container.replaceChildren(...items);
}

// create link when clocking user name
