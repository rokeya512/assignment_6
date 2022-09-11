const newsCategoryLoad = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsCategory(data.data.news_category))
        .catch(error => console.log(Data not load because ${ error }))
}
const displayNewsCategory = categories => {
    //console.log(categories);
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('container-fluid');
        categoryDiv.innerHTML = `
        <a class="navbar-brand blog navbar" onclick="newsLoad('${category.category_id}')" href="#">${category.category_name}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        `;
        categoryContainer.appendChild(categoryDiv);
    })
};

const newsLoad = (categoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(error => console.log(Data not load because ${ error }));
}

const displayNews = newses => {
    const newsContainer = document.getElementById('news-container');
    newses.forEach(news => {
        console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card');
        newsDiv.innerHTML = `
        <div class="d-flex">
        <div class="col-md-4 p-2">
            <img src="${news.thumbnail_url}" class="card-img-top" alt="...">
        </div>
        <div class="col-md-8 card-body p-2">
            <h5 class="card-title">${news.title ? news.title : 'No title found!'}</h5>
            <p class="card-text">${news.details.slice(0, 270)}...</p>
        <div class="col-sm-4">

        <div class="d-flex">
        <div>
            <img src="${news.author.img}" class="author-img img-fluid rounded-circle alt="...">
        </div>
        <div>
            <p>${news.author.name}</p>
            <p>${news.author.published_date}</p>
        </div>
        <div>

        <div>
            <p><i class="fa-light fa-eye"></i> 
            ${news.total_view} </p>
        </div>
        <div>
            <p>
                <i class="fa-solid fa-star-half-stroke"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
            </p>
        </div>
        <div>
            <a href="#"><i class="fa-solid fa-arrow-right" onclick="loadNewsDetails()"></i></a>
        </div>
        
            
        </div>
        </div>
        </div>

        `;
        newsContainer.appendChild(newsDiv);
    })
};

const loadNewsDetails = () => {

}

newsCategoryLoad();