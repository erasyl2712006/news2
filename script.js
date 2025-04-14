const newsList = document.getElementById("news-list");
const searchInput = document.getElementById("searchInput");
const loadMoreBtn = document.getElementById("load-more");

let allNews = [...Array(20).keys()].map(i => ({
  id: i + 1,
  title: `Новость #${i + 1}`,
  text: `Подробности казахстанской новости номер ${i + 1}...`
}));

let visibleNews = 0;
const perPage = 5;

function renderNews() {
  const filtered = allNews.filter(n => n.title.toLowerCase().includes(searchInput.value.toLowerCase()));
  const slice = filtered.slice(0, visibleNews + perPage);
  newsList.innerHTML = "";
  slice.forEach(n => {
    const div = document.createElement("div");
    div.className = "news-card";
    div.innerHTML = `<h3><a href="news.html?id=${n.id}">${n.title}</a></h3><p>${n.text}</p>`;
    newsList.appendChild(div);
  });
}

searchInput.addEventListener("input", () => {
  visibleNews = 0;
  renderNews();
});

loadMoreBtn.addEventListener("click", () => {
  visibleNews += perPage;
  renderNews();
});

visibleNews = perPage;
renderNews();

const toggleBtn = document.getElementById('toggleTheme');
toggleBtn?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

searchInput?.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();

  const newsCards = document.querySelectorAll('.news-card');
  newsCards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const text = card.querySelector('p').textContent.toLowerCase();

    const matches = title.includes(query) || text.includes(query);
    card.style.display = matches ? 'block' : 'none';
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".news-card");
  if (cards.length > 0) {
    const randomIndex = Math.floor(Math.random() * cards.length);
    cards[randomIndex].style.border = "2px solid #007bff";
  }
});
