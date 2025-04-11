const newsList = document.getElementById("news-list");
const searchInput = document.getElementById("search");
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
