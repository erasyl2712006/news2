const urlParams = new URLSearchParams(window.location.search);
const newsId = urlParams.get("id");
const newsDetail = document.getElementById("news-detail");
const commentForm = document.getElementById("comment-form");
const commentsSection = document.getElementById("comments-section");

newsDetail.innerHTML = `<h2>Новость #${newsId}</h2><p>Детали по новости номер ${newsId}...</p>`;

function renderComments(comments = null, container = commentsSection, parentId = null) {
  if (!comments) {
    comments = JSON.parse(localStorage.getItem("comments-" + newsId) || "[]");
  }

  container.innerHTML = "";
  const filtered = comments.filter(c => c.parentId === parentId);

  filtered.forEach(c => {
    const div = document.createElement("div");
    div.className = "news-card";
    div.innerHTML = `
      <strong>${c.name}</strong> (${c.email})<br>
      <p>${c.text}</p>
      <button class="reply-btn" data-id="${c.id}">Ответить</button>
      <div class="reply-form-container"></div>
      <div class="replies"></div>
    `;
    container.appendChild(div);

    const repliesContainer = div.querySelector(".replies");
    renderComments(comments, repliesContainer, c.id);
  });
}

function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

commentForm.addEventListener("submit", e => {
  e.preventDefault();
  const newComment = {
    id: generateId(),
    parentId: null,
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

commentsSection.addEventListener("click", e => {
  if (e.target.classList.contains("reply-btn")) {
    const parentId = e.target.dataset.id;
    const replyFormContainer = e.target.nextElementSibling;

    if (replyFormContainer.children.length > 0) return;

    const form = document.createElement("form");
    form.innerHTML = `
      <input type="text" placeholder="ФИО" required class="reply-name">
      <input type="email" placeholder="Email" required class="reply-email">
      <textarea placeholder="Ваш ответ..." required class="reply-text"></textarea>
      <button type="submit">Ответить</button>
    `;

    form.addEventListener("submit", ev => {
      ev.preventDefault();

      const newComment = {
        id: generateId(),
        parentId: parentId,
        name: form.querySelector(".reply-name").value,
        email: form.querySelector(".reply-email").value,
        phone: "", // Можно добавить поле при желании
        text: form.querySelector(".reply-text").value
      };

      const comments = JSON.parse(localStorage.getItem("comments-" + newsId) || "[]");
      comments.push(newComment);
      localStorage.setItem("comments-" + newsId, JSON.stringify(comments));
      renderComments();
    });

    replyFormContainer.appendChild(form);
  }
});

renderComments();
