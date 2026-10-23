$('.right_area').on('scroll', function () {
    let scrollTop = $(this).scrollTop();

    $('.page_section').each(function () {
        let sectionTop = $(this).position().top + scrollTop;
        let sectionHeight = $(this).outerHeight();
        let sectionId = $(this).attr('id');

        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            $('.project_index a, .project_list a').removeClass('active');
            $('a[href="#' + sectionId + '"]').addClass('active');

            if (sectionId === 'project_bingrae' || sectionId === 'project_tissot' || sectionId === 'project_jeep') {
                $('.project_index a[href="#project_bingrae"]').addClass('active');
            }
        }
    });
});

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
