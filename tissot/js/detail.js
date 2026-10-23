const params = new URLSearchParams(location.search);
const productId = Number(params.get("id")) || 2;

const productName = document.querySelector(".product_name");
const productDescription = document.querySelector(".product_description");
const productPrice = document.querySelector(".product_price");
const recommendedList = document.querySelector(".recommended_list");
const move = document.querySelector(".slider_move");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const currentNumber = document.querySelector(".current_number");
const totalNumber = document.querySelector(".total_number");
const productArrow = document.querySelector(".product_arrow");
const mainGalleryItems = document.querySelectorAll(".main_gallery");
const thumbnailItems = document.querySelectorAll(".thumbnail_item");

let index = 0;
let sliderImages = [];

function formatPrice(price) {
    return `${price.toLocaleString("ko-KR")}원`;
}

function moveSlider() {
    if (!move || sliderImages.length === 0) {
        return;
    }

    move.style.transform = `translateX(-${index * 25}%)`;

    if (currentNumber) {
        currentNumber.textContent = index + 1;
    }

    if (totalNumber) {
        totalNumber.textContent = sliderImages.length;
    }

    thumbnailItems.forEach(function (item, itemIndex) {
        item.classList.toggle("active", itemIndex === index);
    });
}

function setProductImages(product) {
    const mainImageList = product.images?.main ?? [];
    const thumbnailImage = product.images?.thumbnail ?? "";

    sliderImages = mainImageList.length > 0
        ? mainImageList
        : thumbnailImage
            ? [thumbnailImage]
            : [];

    index = 0;

    mainGalleryItems.forEach(function (gallery, galleryIndex) {
        const image = gallery.querySelector("img");
        const imagePath = sliderImages[galleryIndex];

        if (!image) {
            return;
        }

        if (imagePath) {
            gallery.style.display = "flex";
            image.src = imagePath;
            image.alt = `${product.name.detail} ${galleryIndex + 1}번 이미지`;

            image.onclick = function () {
                window.open(image.src, "_blank");
            };
        } else {
            gallery.style.display = "none";
            image.removeAttribute("src");
        }
    });

    const galleryImageList = product.images?.gallery ?? [];
    const galleryImages = galleryImageList.length > 0
        ? [product.images.thumbnail, ...galleryImageList]
        : sliderImages;

    thumbnailItems.forEach(function (thumbnail, thumbnailIndex) {
        const image = thumbnail.querySelector("img");
        const imagePath = galleryImages[thumbnailIndex];

        if (!image) {
            return;
        }

        if (imagePath && thumbnailIndex < sliderImages.length) {
            thumbnail.style.display = "flex";
            image.src = imagePath;
            image.alt = `${product.name.detail} 썸네일 ${thumbnailIndex + 1}`;

            thumbnail.onclick = function () {
                index = thumbnailIndex;
                moveSlider();
            };
        } else {
            thumbnail.style.display = "none";
            image.removeAttribute("src");
        }
    });

    const hasMultipleImages = sliderImages.length > 1;

    if (prev) {
        prev.style.display = hasMultipleImages ? "" : "none";
    }

    if (next) {
        next.style.display = hasMultipleImages ? "" : "none";
    }

    if (productArrow) {
        productArrow.style.display = hasMultipleImages ? "flex" : "none";
    }

    if (!hasMultipleImages) {
        thumbnailItems.forEach(function (thumbnail) {
            thumbnail.style.display = "none";
        });
    }

    moveSlider();
}

// 다음 이미지
if (next) {
    next.addEventListener("click", function () {
        if (sliderImages.length <= 1) {
            return;
        }

        index++;

        if (index >= sliderImages.length) {
            index = 0;
        }

        moveSlider();
    });
}

// 이전 이미지
if (prev) {
    prev.addEventListener("click", function () {
        if (sliderImages.length <= 1) {
            return;
        }

        index--;

        if (index < 0) {
            index = sliderImages.length - 1;
        }

        moveSlider();
    });
}

// 상품 정보 및 추천 상품
fetch("./data/tissot_products_16_with_images.json")
    .then(function (response) {
        if (!response.ok) {
            throw new Error("상품 데이터를 불러오지 못했습니다.");
        }
        return response.json();
    })

    .then(function (products) {
        const product = products.find(function (item) {
            return item.id === productId;
        });

        if (!product) {
            throw new Error("상품을 찾을 수 없습니다.");
        }

        if (productName) {
            productName.textContent = product.name.detail;
        }

        if (productDescription) {
            productDescription.textContent = `${product.movement} · ${product.caseSize} · ${product.caseMaterial}`;
        }

        if (productPrice) {
            productPrice.textContent = formatPrice(product.price);
        }

        setProductImages(product);

        const recommendedProducts = products.filter(function (item) {
            return item.display?.recommended === true && item.id !== productId;
        });

        if (!recommendedList) {
            return;
        }

        recommendedList.innerHTML = "";

        recommendedProducts.slice(0, 5).forEach(function (item) {
            const recommendedItem = document.createElement("div");
            recommendedItem.classList.add("recommended_item");
            const recommendedImage = item.images?.thumbnail ?? "";

            recommendedItem.innerHTML = `
                <a href="./detail.html?id=${item.id}">
                    <div class="recommended_img">
                        ${recommendedImage
                            ? `<img src="${recommendedImage}" alt="${item.name.ko}">`
                            : `<p class="image_empty">이미지 준비 중</p>`
                        }
                    </div>
                    <p class="recommended_name">${item.name.ko}</p>
                    <p class="recommended_description">${item.movement} · ${item.caseSize}</p>
                    <p class="recommended_price">${formatPrice(item.price)}</p>
                </a>
            `;

            recommendedList.appendChild(recommendedItem);
        });
    })

    .catch(function (error) {
        console.error("상세 페이지 오류:", error);

        if (productName) {
            productName.textContent = "상품 정보를 불러올 수 없습니다.";
        }
    });

// 아코디언
const accordionTitles = document.querySelectorAll(".accordion_title");

accordionTitles.forEach(function (title) {
    title.addEventListener("click", function () {
        const accordionItem = title.parentElement;
        const accordionIcon = title.querySelector(".accordion_icon");

        accordionItem.classList.toggle("active");

        if (!accordionIcon) {
            return;
        }

        accordionIcon.textContent = accordionItem.classList.contains("active") ? "−" : "+";
    });
});
