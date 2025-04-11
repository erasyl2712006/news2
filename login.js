const form = document.getElementById("login-form");
const result = document.getElementById("login-result");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "1234") {
    localStorage.setItem("role", "admin");
    result.innerHTML = `<p>Вы вошли как <strong>админ</strong>. <a href="admin.html">Перейти в админку</a></p>`;
  } else {
    localStorage.setItem("role", "user");
    result.innerHTML = `<p>Вы вошли как пользователь.</p>`;
  }

  form.reset();
});
