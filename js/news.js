const newsLoad = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data.news_category))
        .catch(error => console.log(error))
}
const displayNews = newses => {
    const newsContainer = document.getElementById('news-container');
    newses.forEach(news => {
        console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.innerHTML = `
        <div class="d-flex">
        <div class="col-md-4">
            <img src="..." class="card-img-top" alt="...">
        </div>
        <div class="col-md-8 card-body">
            <h5 class="card-title">${news.category_name}</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.</p>
        </div>
        </div>
                
        `;
        newsContainer.appendChild(newsDiv);
    })
};

newsLoad();