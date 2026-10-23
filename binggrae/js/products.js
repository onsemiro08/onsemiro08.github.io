const categoryButtons = document.querySelectorAll(".category_btn");
const productList = document.querySelector(".product_list");
const categoryMore = document.querySelector(".category_more");
const introImage = document.querySelector(".products_intro_visual img");
const categorySection = document.querySelector("#category");

const keywordFilter = document.querySelector(".keyword_filter");
const keywordButtons = document.querySelectorAll(".keyword_btn");
const keywordReset = document.querySelector(".keyword_reset");

let selectedCategory = "new";
let selectedKeyword = "all";

const categoryImages = {
    new: "./images/new_the_danbaek.png",
    icecream: "./images/icecream_melona.png",
    milk: "./images/dairy_banana_milk.png",
    yogurt: "./images/yoplait_original_strawberry.png",
    coffee: "./images/coffee_acafela_240.png",
    drink: "./images/new_ttaom_twist.png"
};

const promoImages = {
    new: "./images/promo_new.jpg",
    icecream: "./images/promo_icecream.jpg",
    milk: "./images/promo_milk.jpg",
    yogurt: "./images/promo_yogurt.jpg",
    coffee: "./images/promo_coffee.jpg",
    drink: "./images/promo_drink.jpg"
};

Promise.all([
    fetch("./data/products.json").then(function (response) {
        if (!response.ok) {
            throw new Error("상품 데이터를 불러오지 못했습니다.");
        }
        return response.json();
    }),
    fetch("./data/detail.json").then(function (response) {
        if (!response.ok) {
            throw new Error("상세 데이터를 불러오지 못했습니다.");
        }
        return response.json();
    })
])
    .then(function ([data, detailData]) {
        const categoriesList = data.categories_list;
        const detailProducts = detailData.products;

        function hasDetailData(product) {
            return product && (
                product.description ||
                product.capacity ||
                product.serving ||
                product.calorie ||
                product.nutrition.length > 0 ||
                product.accordion.length > 0
            );
        }

        function showProducts(category) {
            productList.innerHTML = "";
            const products = categoriesList[category];
            products.forEach(function (product) {
                const keywordMatch = selectedKeyword === "all" || product.keywords.includes(selectedKeyword);
                if (keywordMatch) {
                    const productId = product.link.split("id=")[1];
                    const detailProduct = detailProducts.find(function (item) {
                        return item.id === productId;
                    });
                    const productCard = document.createElement(hasDetailData(detailProduct) ? "a" : "div");
                    productCard.classList.add("product_card");
                    if (hasDetailData(detailProduct)) {
                        productCard.href = product.link;
                    }
                    productCard.innerHTML = `
                        <div class="product_img_box">
                            <img
                                src="${product.image}"
                                alt="${product.name}">
                        </div>
                        <h3 class="product_name">
                            ${product.name}
                        </h3>
                    `;
                    productList.appendChild(productCard);
                }
            });

            const promoCard = document.createElement("div");
            promoCard.classList.add("promo_card");
            promoCard.innerHTML = `
                <img
                    src="${promoImages[category]}"
                    alt="${category} 프로모션 배너">
            `;
            productList.appendChild(promoCard);
        }

        function setCategoryActive(activeButton) {
            categoryButtons.forEach(function (button) {
                button.classList.remove("active");
            });
            activeButton.classList.add("active");
        }

        function setKeywordActive(activeButton) {
            keywordButtons.forEach(function (button) {
                button.classList.remove("active");
            });
            activeButton.classList.add("active");
        }


        categoryButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                selectedCategory = button.dataset.category;
                selectedKeyword = "all";
                setCategoryActive(button);
                keywordButtons.forEach(function (keywordButton) {
                    keywordButton.classList.remove("active");
                });
                categorySection.classList.remove("new", "icecream", "milk", "yogurt", "coffee", "drink");

                categorySection.classList.add(selectedCategory);
                introImage.src = categoryImages[selectedCategory];
                showProducts(selectedCategory);
            });
        });


        keywordReset.addEventListener("click", function () {
            selectedKeyword = "all";

            keywordButtons.forEach(function (button) {
                button.classList.remove("active");
            });
            showProducts(selectedCategory);
        });

        categoryMore.addEventListener("click", function () {
            keywordFilter.classList.toggle("open");

            if (keywordFilter.classList.contains("open")) {
                categoryMore.textContent = "취향으로 골라보기 -";
            } else {
                categoryMore.textContent = "취향으로 골라보기 +";
            }
        });

        keywordButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                if (selectedKeyword === button.dataset.keyword && button.classList.contains("active")) {
                    selectedKeyword = "all";
                    button.classList.remove("active");
                } else {
                    selectedKeyword = button.dataset.keyword;
                    setKeywordActive(button);
                }
                showProducts(selectedCategory);
            });
        });


        categorySection.classList.add(selectedCategory);
        showProducts(selectedCategory);
    })
    .catch(function (error) {
        console.log(error);
        productList.innerHTML = `
            <p>상품 정보를 불러올 수 없습니다.</p>
        `;
    });

const hamburger = document.querySelector(".hamburger");
const headerInner = document.querySelector(".header_inner");

hamburger.addEventListener("click", function () {
    headerInner.classList.toggle("menu_open");
    document.body.classList.toggle("menu_open");
});
