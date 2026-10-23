const tabs = document.querySelectorAll('.featured_tab');
const panels = document.querySelectorAll('.featured_panel');
const featuredSection = document.querySelector('.featured_products');
const sectionClasses = [
    'featured_products_banana',
    'featured_products_melona',
    'featured_products_samanco',
    'featured_products_almond'
];

const newsSlider = document.querySelector('.news_wrap');
const sliderBttons = document.querySelectorAll('.news_button');

tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () {
        tabs.forEach(function (tab) {
            tab.classList.remove('active');
        });

        panels.forEach(function (panel) {
            panel.classList.remove('active');
        });

        sectionClasses.forEach(function (className) {
            featuredSection.classList.remove(className);
        });

        tab.classList.add('active');
        panels[index].classList.add('active');
        featuredSection.classList.add(sectionClasses[index]);
    });
});

sliderBttons.forEach(function (sliderBtton, index) {
    sliderBtton.addEventListener('click', function () {
        newsSlider.style.transform = 'translateX(-' + (942 * index) + 'px)';

        sliderBttons.forEach(function (button) {
            button.classList.remove('active');
        });

        sliderBtton.classList.add('active');
    });
});

const hamburger = document.querySelector('.hamburger');
const headerInner = document.querySelector('.header_inner');

hamburger.addEventListener('click', function () {
    headerInner.classList.toggle('menu_open');
    document.body.classList.toggle('menu_open');

    if (headerInner.classList.contains('menu_open')) {
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.setAttribute('aria-label', '전체 메뉴 닫기');
    } else {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', '전체 메뉴 열기');
    }
});
