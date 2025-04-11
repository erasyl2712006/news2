const container = document.getElementById("admin-comments");
const role = localStorage.getItem("role");
if (role !== "admin") {
  container.innerHTML = "<p>Нет доступа. Войдите как админ через login.html</p>";
} else {
  const commentKeys = Object.keys(localStorage).filter(k => k.startsWith("comments-"));
  commentKeys.forEach(key => {
    const newsId = key.split("-")[1];
    const comments = JSON.parse(localStorage.getItem(key) || "[]");
    if (comments.length > 0) {
      const block = document.createElement("div");
      block.className = "news-card";
      block.innerHTML = `<h3>Комментарии к новости #${newsId}</h3>`;
      comments.forEach((c, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <p><strong>${c.name}</strong> (${c.email})<br>${c.text}</p>
          <button onclick="deleteComment('${key}', ${index})">Удалить</button>
          <hr>`;
        block.appendChild(div);
      });
      container.appendChild(block);
    }
  });
}

function deleteComment(key, index) {
  const comments = JSON.parse(localStorage.getItem(key) || "[]");
  comments.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(comments));
  location.reload();
}
