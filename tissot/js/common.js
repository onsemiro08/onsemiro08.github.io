const header = document.querySelector("header");
const logoImg = document.querySelector(".logo img");

if (header && logoImg) {
    header.addEventListener("mouseenter", function () {
        header.classList.add("open");

        if (logoImg.getAttribute("src") === "./img/logo_tissot_white.svg") {
            logoImg.src = "./img/logo_tissot_black.svg";
        }
    });

    header.addEventListener("mouseleave", function () {
        header.classList.remove("open");

        if (logoImg.getAttribute("src") === "./img/logo_tissot_black.svg") {
            logoImg.src = "./img/logo_tissot_white.svg";
        }
    });
}

const menuToggle = document.querySelector(".menu_toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
    const menuIcon = menuToggle.querySelector("img");

    menuToggle.addEventListener("click", function () {
        nav.classList.toggle("open");

        if (!menuIcon) return;

        if (nav.classList.contains("open")) {
            menuIcon.src = "./img/icon_filter_light.svg";
            menuIcon.alt = "메뉴 닫기";
        } else {
            menuIcon.src = "./img/icon_filter_dark.svg";
            menuIcon.alt = "메뉴 열기";
        }
    });
}