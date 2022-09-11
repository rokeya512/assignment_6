const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
        .catch(error => console.log(error))
}
const displayCategory = categories => {
    //console.log(categories);
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('container-fluid');
        categoryDiv.innerHTML = `
        <a class="navbar-brand blog navbar" onclick="loadNews('${category.category_id}')" href="#">${category.category_name}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        `;
        categoryContainer.appendChild(categoryDiv);
    })

};


const loadNews = (category_id) => {
    // start loader or spinner
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch(error => console.log(error))
}

const displayNews = newses => {
    const newsContainer = document.getElementById('news-container');
    newses.forEach(news => {
        //console.log(news);
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

        
        <div class="row row-col-sm-4">
        <div class="d-flex">
        <div>
            <img src="${news.author.img}" class="author-img img-fluid rounded-circle alt="...">
        </div>
        <div class="ms-2">
            <p>${news.author.name}</p>
            <p>${news.author.published_date}</p>
        </div>
        </div>
        
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
            <a href="#"><i class="fa-solid fa-arrow-right" onclick="loadNewsDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#newsDetailModal"></i></a>
        </div>
        
            
        </div>
        </div>
        </div>

        `;
        newsContainer.appendChild(newsDiv);
    })
    // stop loader or spinner
    toggleSpinner(false);
};

const loadNewsDetails = (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data))
}

const displayNewsDetails = allNewsDetails => {
    const modalBody = document.getElementById('modal-body');

    allNewsDetails.forEach(newsDetails => {

        modalBody.innerHTML = `
        <div class="col-md-12">
        <img src="${newsDetails.image_url}" class="img-fluid rounded-start" alt="...">
      </div>
      <h2 class="card-title my-3">${newsDetails.title ? newsDetails.title : 'No Data Found'}</h2>
      <p class="card-text">${newsDetails.details ? newsDetails.details : 'No Data Found'}</p>

        <div class="card-text">

            <div>
                <div style="width:40px" class="d-inline-block">
                    <img src="${newsDetails.author.img ? newsDetails.author.img : 'No Data Found'}"
                        class="img-fluid rounded-circle ">
                </div>
                <span>${newsDetails.author.name ? newsDetails.author.name : 'No Data Found'}</span>
            </div>

            <div class="mt-4">
                <small class="p-3">Rating : ${newsDetails.rating.number}</small>
                <small class="p-3">Badge : ${newsDetails.rating.badge ? newsDetails.rating.badge : 'No Data Found'}</small>
            </div>

            <div>
                <p><i class="fa-light fa-eye"></i></p>
                <p>${newsDetails.total_view ? newsDetails.total_view : 'No Data Found'}</p>
            </div>
            </div>
 `;
    })
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
}

loadCategory();
loadNews();
loadNewsDetails();