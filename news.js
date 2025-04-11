const urlParams = new URLSearchParams(window.location.search);
const newsId = urlParams.get("id");
const newsDetail = document.getElementById("news-detail");
const commentForm = document.getElementById("comment-form");
const commentsSection = document.getElementById("comments-section");

newsDetail.innerHTML = `<h2>Новость #${newsId}</h2><p>Детали по новости номер ${newsId}...</p>`;

function renderComments() {
  const comments = JSON.parse(localStorage.getItem("comments-" + newsId) || "[]");
  commentsSection.innerHTML = "";
  comments.forEach(c => {
    const div = document.createElement("div");
    div.className = "news-card";
    div.innerHTML = `<strong>${c.name}</strong> (${c.email})<br>${c.text}`;
    commentsSection.appendChild(div);
  });
}

commentForm.addEventListener("submit", e => {
  e.preventDefault();
  const newComment = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    text: document.getElementById("comment-text").value
  };
  const comments = JSON.parse(localStorage.getItem("comments-" + newsId) || "[]");
  comments.push(newComment);
  localStorage.setItem("comments-" + newsId, JSON.stringify(comments));
  commentForm.reset();
  renderComments();
});

renderComments();
