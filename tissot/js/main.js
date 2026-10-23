// 메인 슬라이더
const move = document.querySelector(".slider_move");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let index = 0;
const sliderCount = 3;
const sliderWidth = 1420;

next.addEventListener("click", function () {
    index++;

    if (index >= sliderCount) {
        index = 0;
    }

    move.style.transform = `translateX(-${index * sliderWidth}px)`;
});

prev.addEventListener("click", function () {
    index--;

    if (index < 0) {
        index = sliderCount - 1;
    }

    move.style.transform = `translateX(-${index * sliderWidth}px)`;
});

// 메인 컬렉션
const collectionList = document.querySelector(".collection_list");

fetch("./data/tissot_products_16_with_images.json")
    .then(function (response) {
        if (!response.ok) {
            throw new Error("JSON 파일을 불러오지 못했습니다.");
        }
        return response.json();
    })

    .then(function (products) {
        const mainProducts = products.filter(function (product) {
            return product.display?.main === true;
        });

        collectionList.innerHTML = "";

        mainProducts.forEach(function (product) {
            const collectionCard = document.createElement("a");
            collectionCard.href = `./detail.html?id=${product.id}`;
            collectionCard.classList.add("collection_card", `product_${product.id}`);

            collectionCard.innerHTML = `
                <img src="${product.images.thumbnail}" alt="${product.name.ko}">
                <div class="collection_text">
                    ${product.display.best === true ? `<p class="best_label">BEST</p>` : ""}
                    <h2 class="collection_title">${product.name.ko}</h2>
                    <p class="collection_type">${product.name.short}</p>
                    <p class="collection_price">${product.price.toLocaleString("ko-KR")}원</p>
                </div>
            `;

            collectionList.appendChild(collectionCard);
        });
    })

    .catch(function (error) {
        console.error(error);
        collectionList.innerHTML = `<p>컬렉션 정보를 불러올 수 없습니다.</p>`;
    });

// 메인 컬렉션 끝
