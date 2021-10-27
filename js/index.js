const main = async () => {
  try {
    const userId = getUserId();
    const userInfo = await fetchUserInfo(userId);
    const view = createView(userInfo);
    displayView(view);
  } catch (err) {
    console.error(err);
  }
}

const fetchUserInfo = (userId) => {  
  return fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error(`${response.status}: ${response.statusText}`));
      } else {
        return response.json();
      }
    });
};

const createView = (userInfo) => {
  return escapeHTML`
    <h4>${userInfo.name} (@${userInfo.login})</h4>
    <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
    <dl>
        <dt>Location</dt>
        <dd>${userInfo.location}</dd>
        <dt>Repositories</dt>
        <dd>${userInfo.public_repos}</dd>
    </dl>
  `;
};

const displayView = (view) => {
  const result = document.getElementById("result");
  result.innerHTML = view;
};

const getUserId = () => {
  return document.getElementById("userId").value;
}

const escapeSpecialChars = (str) => {
  return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
};

const escapeHTML = (strings, ...values) => {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];

    if (typeof value === "string") {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  })
};
