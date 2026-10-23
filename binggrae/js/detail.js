const params = new URLSearchParams(location.search);
const productId = params.get("id") || "banana-milk";

const productName = document.querySelector(".detail_product_name");
const productDescription = document.querySelector(".detail_product_description");
const productImage = document.querySelector(".detail_product_image img");
const accordion = document.querySelector(".detail_accordion");
const capacityBadge = document.querySelector(".capacity_badge");
const servingText = document.querySelector(".serving_text");
const calorieText = document.querySelector(".calorie_text");
const nutritionBody = document.querySelector(".nutrition_table tbody");
const nutritionTable = document.querySelector(".nutrition_table");
const relatedTags = document.querySelector(".related_tags");
const relatedList = document.querySelector(".related_list");
const categoryButtons = document.querySelectorAll(".detail_category_btn");

const hamburger = document.querySelector(".hamburger");
const headerInner = document.querySelector(".header_inner");

const categories = ["new", "icecream", "milk", "yogurt", "coffee", "drink"];

fetch("./data/detail.json")
    .then(function (response) {
        if (!response.ok) {
            throw new Error("상품 데이터를 불러오지 못했습니다.");
        }

        return response.json();
    })

    .then(function (data) {
        const products = data.products;

        function hasDetailData(item) {
            return item && (
                item.description ||
                item.capacity ||
                item.serving ||
                item.calorie ||
                item.nutrition.length > 0 ||
                item.accordion.length > 0
            );
        }

        const product = products.find(function (item) {
            return item.id === productId;
        });

        if (!product) {
            throw new Error("상품을 찾을 수 없습니다.");
        }

        productName.textContent = product.name;
        productDescription.textContent = product.description;
        productImage.src = product.image;
        productImage.alt = product.name;

        categoryButtons.forEach(function (button, index) {
            button.classList.remove("active");

            if (categories[index] === product.category) {
                button.classList.add("active");
            }
        });

        accordion.innerHTML = "";

        if (product.accordion.length > 0) {
            product.accordion.forEach(function (item) {
                const accordionItem = document.createElement("div");
                accordionItem.classList.add("accordion_item");

                accordionItem.innerHTML = `
                    <button class="accordion_title" type="button">
                        <span>${item.title}</span>
                        <span class="accordion_icon">+</span>
                    </button>
                    <div class="accordion_content">
                        <p>${item.content}</p>
                    </div>
                `;

                accordion.appendChild(accordionItem);
            });

            const firstAccordionItem = document.querySelector(".accordion_item");

            if (firstAccordionItem) {
                firstAccordionItem.classList.add("active");
                firstAccordionItem.querySelector(".accordion_icon").textContent = "−";
            }
            const accordionTitles = document.querySelectorAll(".accordion_title");

            accordionTitles.forEach(function (title) {
                title.addEventListener("click", function () {
                    const accordionItem = title.parentElement;
                    const isActive = accordionItem.classList.contains("active");

                    document.querySelectorAll(".accordion_item").forEach(function (item) {
                        item.classList.remove("active");
                        item.querySelector(".accordion_icon").textContent = "+";
                    });

                    if (!isActive) {
                        accordionItem.classList.add("active");
                        accordionItem.querySelector(".accordion_icon").textContent = "−";
                    }
                });
            });
        }

        const capacityWrap = document.querySelector(".info_capacity");

        if (product.capacity) {
            capacityBadge.textContent = product.capacity;
        } else {
            capacityWrap.style.display = "none";
        }

        if (product.serving) {
            servingText.textContent = product.serving;
        } else {
            servingText.style.display = "none";
        }

        if (product.calorie) {
            calorieText.textContent = "열량 " + product.calorie;
        } else {
            calorieText.style.display = "none";
        }

        nutritionBody.innerHTML = "";

        if (product.nutrition.length > 0) {
            product.nutrition.forEach(function (nutrition) {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${nutrition.name}</td>
                    <td>${nutrition.amount}</td>
                    <td>${nutrition.daily_value}</td>
                `;

                nutritionBody.appendChild(row);
            });
        } else {
            nutritionTable.style.display = "none";
        }

        relatedTags.textContent = product.keywords
            .map(function (keyword) {
                return "#" + keyword;
            })
            .join("  ");

        const relatedProducts = products
            .filter(function (item) {
                if (item.id === product.id || !hasDetailData(item)) return false;

                const sameCategory = item.category === product.category;

                const sameKeyword = item.keywords.some(function (keyword) {
                    return product.keywords.includes(keyword);
                });

                return sameCategory || sameKeyword;
            })
            .slice(0, 4);

        relatedList.innerHTML = "";

        relatedProducts.forEach(function (item) {
            const relatedItem = document.createElement("a");
            relatedItem.classList.add("related_item");
            relatedItem.href = "./detail.html?id=" + item.id;

            relatedItem.innerHTML = `
                <div class="related_image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <p class="related_name">${item.name}</p>
            `;

            relatedList.appendChild(relatedItem);
        });
    })

    .catch(function (error) {
        console.error("상세 페이지 오류:", error);
        productName.textContent = "상품 정보를 불러올 수 없습니다.";
    });

hamburger.addEventListener("click", function () {
    headerInner.classList.toggle("menu_open");
    document.body.classList.toggle("menu_open");
});
