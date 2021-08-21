export function getAuthForm() {
  return `
      <form class="mui-form" id="auth-form">
        <div class="mui-textfield mui-textfield--float-label">
          <input id="email" required type="email">
          <label for="email">Email</label>
        </div>
        <div class="mui-textfield mui-textfield--float-label">
          <input id="password" required type="password">
          <label for="password">Password</label>
        </div>
        <button
          class="mui-btn mui-btn--raised mui-btn--primary"
          type="submit"
        >Sing in
        </button>
      </form>
  `
}

// 43
export function authWithEmailAndPassword(email, password) {
  const apiKey = "AIzaSyAtl8xyVPlUh5jNU3u4tfdz9QT0msGa-3A"
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method : 'POST',
    body   : JSON.stringify({
      email, password,
      returnSecureToken: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => data.idToken)
}