
$('.right_area').on('scroll', function () {
    let scrollTop = $(this).scrollTop();
    let containerTop = $(this).offset().top;
    let currentSection = null;

    $('.page_section').each(function () {
        let sectionTop = $(this).offset().top - containerTop + scrollTop;
        let sectionHeight = $(this).outerHeight();
        let sectionId = $(this).attr('id');

        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });

    if (currentSection) {
        $('.project_index a, .project_list a').removeClass('active');
        $('.project_list a[href="#' + currentSection + '"]').addClass('active');

        $('.other_works_toggle').toggleClass(
            'has_active_project',
            $('#other_project_menu a[href="#' + currentSection + '"]').length > 0
        );

        let mainSection;

        if (currentSection === 'about') {
            mainSection = 'about';
        } else if (currentSection === 'end') {
            mainSection = 'end';
        } else {
            mainSection = 'project_bingrae';
        }

        $('.project_index a[href="#' + mainSection + '"]').addClass('active');
    }
});

const otherWorksToggle = document.querySelector('.other_works_toggle');
const otherWorksMenu = document.getElementById('other_project_menu');

if (otherWorksToggle && otherWorksMenu) {
    const otherWorks = otherWorksMenu.querySelectorAll('a');
    const count = otherWorks.length;
    const toggleText = otherWorksToggle.querySelector('.other_works_action');

    function updateToggleText() {
        const isOpen = otherWorksToggle.getAttribute('aria-expanded') === 'true';

        if (isOpen) {
            otherWorksMenu.hidden = false;
            toggleText.innerHTML = 'Show Less <span class="other_works_symbol">−</span>';
        } else {
            otherWorksMenu.hidden = true;
            toggleText.innerHTML = `Show ${count} More Works <span class="other_works_symbol">+</span>`;
        }
    }

    updateToggleText();

    otherWorksToggle.addEventListener('click', function () {
        const isOpen = otherWorksToggle.getAttribute('aria-expanded') === 'true';

        if (isOpen) {
            otherWorksToggle.setAttribute('aria-expanded', 'false');
        } else {
            otherWorksToggle.setAttribute('aria-expanded', 'true');
        }

        updateToggleText();
    });
}

$('.project_intro video').on('ended', function () {
    $('.project_intro').hide();
});

$('.hamburger_wrap').on('click', function () {
    $('.project_index, .project_list').toggleClass('menu_open');
    $('.left_area').toggleClass('menu_open');
    $('body').toggleClass('scroll_lock');
});

$('.project_index a, .project_list a').on('click', function () {
    $('.project_index, .project_list').removeClass('menu_open');
    $('.left_area').removeClass('menu_open');
    $('body').removeClass('scroll_lock');
});

$(window).on('scroll', function () {
    if ($(this).scrollTop() > 10) {
        $('.hamburger_wrap').addClass('scroll');
    } else {
        $('.hamburger_wrap').removeClass('scroll');
    }
});
