const newsContents = document.querySelector('.news_contents');
const newsCountNumber = document.querySelector('.news_count_number');
const hamburger = document.querySelector('.hamburger');
const headerInner = document.querySelector('.header_inner');

fetch('./data/news.json')
    .then(function (response) {
        if (!response.ok) {
            throw new Error('뉴스 데이터를 불러오지 못했습니다.');
        }
        return response.json();
    })

    .then(function (data) {
        const newsList = data.news_list;
        newsCountNumber.textContent = newsList.length;

        newsList.forEach(function (news) {
            const newsItem = document.createElement('article');
            newsItem.classList.add('news_item');

            newsItem.innerHTML = `
                <figure class="news_image">
                    <img src="${news.image}" alt="${news.title}">
                </figure>
                <div class="news_info">
                    <h3 class="news_item_title">${news.title}</h3>
                    <time datetime="${news.datetime}">${news.date}</time>
                </div>
            `;

            newsContents.appendChild(newsItem);
        });
    })

    .catch(function (error) {
        console.log(error);
        newsContents.innerHTML = `<p class="news_error">뉴스 정보를 불러올 수 없습니다.</p>`;
    });

hamburger.addEventListener('click', function () {
    headerInner.classList.toggle('menu_open');
    document.body.classList.toggle('menu_open');
});
