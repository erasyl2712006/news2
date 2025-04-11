document.addEventListener("DOMContentLoaded", () => {
    const newsList = document.getElementById("news-list");
    const searchInput = document.getElementById("search");
  
    function getNews() {
      return JSON.parse(localStorage.getItem("news") || "[]");
    }
  
    function renderNews(filter = "") {
      const news = getNews();
      const filtered = news.filter(n =>
        n.title.toLowerCase().includes(filter.toLowerCase()) ||
        n.content.toLowerCase().includes(filter.toLowerCase())
      );
  
      newsList.innerHTML = "";
      if (filtered.length === 0) {
        newsList.innerHTML = "<p>Ничего не найдено.</p>";
        return;
      }
  
      filtered.forEach(n => {
        const div = document.createElement("div");
        div.className = "news-card";
        div.innerHTML = `
          <h2>${n.title}</h2>
          <p><strong>${n.category}</strong> | ${n.author} | ${n.date}</p>
          <p>${n.content.slice(0, 150)}...</p>
        `;
        newsList.appendChild(div);
      });
    }
  
    searchInput.addEventListener("input", () => {
      renderNews(searchInput.value);
    });
  
    renderNews();
  });