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
document.addEventListener("DOMContentLoaded", () => {
  const newsForm = document.getElementById("news-form");
  const newsList = document.getElementById("admin-news-list");

  function getNews() {
    return JSON.parse(localStorage.getItem("news") || "[]");
  }

  function saveNews(news) {
    localStorage.setItem("news", JSON.stringify(news));
  }

  function renderAdminNews() {
    const news = getNews();
    newsList.innerHTML = "";
    news.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "news-card";
      div.innerHTML = `
        <h3>${item.title}</h3>
        <p><strong>${item.category}</strong> | ${item.author} | ${item.date}</p>
        <p>${item.content}</p>
        <button onclick="editNews(${index})">Редактировать</button>
        <button onclick="deleteNews(${index})">Удалить</button>
      `;
      newsList.appendChild(div);
    });
  }

  window.editNews = function(index) {
    const news = getNews()[index];
    document.getElementById("news-id").value = index;
    document.getElementById("news-title").value = news.title;
    document.getElementById("news-category").value = news.category;
    document.getElementById("news-author").value = news.author;
    document.getElementById("news-content").value = news.content;
  };

  window.deleteNews = function(index) {
    const news = getNews();
    if (confirm("Удалить эту новость?")) {
      news.splice(index, 1);
      saveNews(news);
      renderAdminNews();
    }
  };

  newsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const news = getNews();
    const id = document.getElementById("news-id").value;
    const data = {
      title: document.getElementById("news-title").value,
      category: document.getElementById("news-category").value,
      author: document.getElementById("news-author").value,
      content: document.getElementById("news-content").value,
      date: new Date().toLocaleDateString()
    };

    if (id) {
      news[parseInt(id)] = data;
    } else {
      news.unshift(data);
    }

    saveNews(news);
    newsForm.reset();
    renderAdminNews();
  });

  renderAdminNews();
});