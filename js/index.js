const fetchUserInfo = (useId) => {  
  fetch(`https://api.github.com/users/${encodeURIComponent(useId)}`)
    .then(response => {
      if (response.ok) {
        console.log(response.status);
  
        response.json().then(userInfo => {
          console.log(userInfo, 222);

          const view = escapeHTML`
            <h4>${userInfo.name} (@${userInfo.login})</h4>
            <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
            <dl>
                <dt>Location</dt>
                <dd>${userInfo.location}</dd>
                <dt>Repositories</dt>
                <dd>${userInfo.public_repos}</dd>
            </dl>
          `;

          const result = document.getElementById("result");
          result.innerHTML = view;
        });
      } else {
        console.error("error response", response);
      }
    })
    .catch(err => {
      console.log(err);
    });
}

const escapeSpecialChars = (str) => {
  return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
}

const escapeHTML = (strings, ...values) => {
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];

    if (typeof value === "string") {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  })
}
