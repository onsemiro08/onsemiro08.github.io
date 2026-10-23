const filterOpen = document.querySelector(".filter_open");
const filterPanel = document.querySelector(".filter_panel");
const filterClose = document.querySelector(".filter_close");
const filterOverlay = document.querySelector(".filter_overlay");

const productList = document.querySelector("#productList");
const productCount = document.querySelector(".product_count");
const filterApply = document.querySelector(".filter_apply");

const filterAll = document.querySelector(".filter_all");
const filterQuartz = document.querySelector(".filter_quartz");
const filterAutomatic = document.querySelector(".filter_automatic");
const filterReset = document.querySelector(".filter_reset");

const movementTitle = document.querySelector(".movement_title");
const movementContent = document.querySelector(".filter_movement");
const movementIcon = document.querySelector(".movement_icon");

const colorTitle = document.querySelector(".color_title");
const colorContent = document.querySelector(".filter_color");
const colorIcon = document.querySelector(".color_icon");

const colorAll = document.querySelector(".color_all");
const colorBlue = document.querySelector(".color_blue");
const colorWhite = document.querySelector(".color_white");
const colorGray = document.querySelector(".color_gray");
const colorBlack = document.querySelector(".color_black");
const colorGreen = document.querySelector(".color_green");

const colorButtons = [
    colorAll,
    colorBlue,
    colorWhite,
    colorGray,
    colorBlack,
    colorGreen
];

// 필터 패널 열기 / 닫기
filterOpen.addEventListener("click", function () {
    if (filterPanel.style.display === "block") {
        filterPanel.style.display = "none";
        filterOverlay.style.display = "none";
        document.body.style.overflow = "auto";
    } else {
        filterPanel.style.display = "block";
        filterOverlay.style.display = "block";
        document.body.style.overflow = "hidden";
    }
});

filterClose.addEventListener("click", function () {
    filterPanel.style.display = "none";
    filterOverlay.style.display = "none";
    document.body.style.overflow = "auto";
});

filterOverlay.addEventListener("click", function () {
    filterPanel.style.display = "none";
    filterOverlay.style.display = "none";
    document.body.style.overflow = "auto";
});

filterApply.addEventListener("click", function () {
    filterPanel.style.display = "none";
    filterOverlay.style.display = "none";
    document.body.style.overflow = "auto";
});


// 무브먼트 열기 / 닫기
movementTitle.addEventListener("click", function () {
    if (movementContent.style.display === "block") {
        movementContent.style.display = "none";
        movementIcon.innerHTML = "&plus;";
    } else {
        movementContent.style.display = "block";
        movementIcon.innerHTML = "&minus;";
    }
});

colorTitle.addEventListener("click", function () {
    if (colorContent.style.display === "block") {
        colorContent.style.display = "none";
        colorIcon.innerHTML = "&plus;";
    } else {
        colorContent.style.display = "block";
        colorIcon.innerHTML = "&minus;";
    }
});

// 상품 JSON 시작

fetch("./data/tissot_products_16_with_images.json")
    .then(function (response) {
        if (!response.ok) {
            throw new Error("상품 데이터를 불러오지 못했습니다.");
        }

        return response.json();
    })

    .then(function (products) {
        // 상품 목록 페이지에 표시할 제품만 가져오기
        const listProducts = products.filter(function (product) {
            return product.display.productList === true;
        });

        let selectedMovement = "all";
        let selectedColor = "all";

        function showProducts() {
            productList.innerHTML = "";

            let count = 0;

            listProducts.forEach(function (product) {
                const movementMatch = selectedMovement === "all" ||
                    product.movement === selectedMovement ||
                    (selectedMovement === "오토매틱" && product.movement.includes("오토매틱"));

                const colorMatch = selectedColor === "all" ||
                    product.dialColor.includes(selectedColor) ||
                    (selectedColor === "그레이" && product.dialColor === "진회색");

                if (movementMatch && colorMatch) {
                    count++;

                    const productCard = document.createElement("a");
                    productCard.href = `./detail.html?id=${product.id}`;

                    productCard.classList.add("product_card", "product_" + product.id, "clickable");

                    productCard.innerHTML = `
                        <div class="product_img_box">
                            <img
                                src="${product.images.thumbnail}"
                                alt="${product.name.ko}">
                        </div>

                        <h3 class="product_name">
                            ${product.name.ko}
                        </h3>

                        <p class="product_spec">
                            ${product.movement} ·
                            ${product.caseSize} ·<br class="mobile_br">
                            ${product.caseMaterial}
                        </p>

                        <p class="product_price">
                            ${product.price.toLocaleString("ko-KR")}원
                        </p>
                    `;

                    productList.appendChild(productCard);
                }
            });

            productCount.textContent = count + " PRODUCTS";
            filterApply.textContent = count + "개 제품 보기";
        }

        function setMovementActive(activeButton) {
            filterAll.classList.remove("active");
            filterQuartz.classList.remove("active");
            filterAutomatic.classList.remove("active");

            activeButton.classList.add("active");
        }

        function setColorActive(activeButton) {
            colorButtons.forEach(function (button) {
                button.classList.remove("active");
            });

            activeButton.classList.add("active");
        }

        showProducts();

        // 무브먼트 필터
        filterAll.addEventListener("click", function () {
            selectedMovement = "all";
            setMovementActive(filterAll);
            showProducts();
        });

        filterQuartz.addEventListener("click", function () {
            selectedMovement = "쿼츠";
            setMovementActive(filterQuartz);
            showProducts();
        });

        filterAutomatic.addEventListener("click", function () {
            selectedMovement = "오토매틱";
            setMovementActive(filterAutomatic);
            showProducts();
        });

        // 컬러 필터
        colorAll.addEventListener("click", function () {
            selectedColor = "all";
            setColorActive(colorAll);
            showProducts();
        });

        colorBlue.addEventListener("click", function () {
            selectedColor = "블루";
            setColorActive(colorBlue);
            showProducts();
        });

        colorWhite.addEventListener("click", function () {
            selectedColor = "화이트";
            setColorActive(colorWhite);
            showProducts();
        });

        colorGray.addEventListener("click", function () {
            selectedColor = "그레이";
            setColorActive(colorGray);
            showProducts();
        });

        colorBlack.addEventListener("click", function () {
            selectedColor = "블랙";
            setColorActive(colorBlack);
            showProducts();
        });

        colorGreen.addEventListener("click", function () {
            selectedColor = "그린";
            setColorActive(colorGreen);
            showProducts();
        });

        // 초기화
        filterReset.addEventListener("click", function () {
            selectedMovement = "all";
            selectedColor = "all";

            setMovementActive(filterAll);
            setColorActive(colorAll);

            showProducts();
        });
    })

    .catch(function (error) {
        console.log(error);

        productList.innerHTML = `
            <p>상품 정보를 불러올 수 없습니다.</p>
        `;
    });

// 상품 JSON 끝