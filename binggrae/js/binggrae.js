const tabs = document.querySelectorAll('.tabs_button');
const contents = document.querySelectorAll('.brand_contents');
const intro = document.querySelector('#brand_intro');
const indicator = document.querySelector('.brand_tab_indicator');

const hamburger = document.querySelector('.hamburger');
const headerInner = document.querySelector('.header_inner');

const introStateClasses = [
    'history_active',
    'identity_active',
    'today_active'
];

tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function (e) {
        e.preventDefault();

        tabs.forEach(function (item) {
            item.classList.remove('active');
        });

        contents.forEach(function (content) {
            content.classList.remove('active');
        });

        intro.classList.remove('history_active', 'identity_active', 'today_active');
        tab.classList.add('active');
        contents[index].classList.add('active');
        intro.classList.add(introStateClasses[index]);

        if (window.innerWidth >= 600) {
            indicator.style.left = (125 + index * 272) + 'px';
        }
    });
});

hamburger.addEventListener('click', function () {
    headerInner.classList.toggle('menu_open');
    document.body.classList.toggle('menu_open');
});
