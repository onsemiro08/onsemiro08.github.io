$(function(){
//----------------------------
$('.main_slider').slick({
    arrows:false, // 버튼 삭제
    autoplay:true, // 자동으로 넘어감
    pauseOnHover:false,
    // vertical:true, 위로 올라가는 슬라이드
    // fade:true, 장면 전환
    });

$('#main_visual span.left').on('click',function(){
    $('.main_slider').slick('slickPrev');
});
$('#main_visual span.right').on('click',function(){
    $('.main_slider').slick('slickNext');
});

$('#main_visual .list li').on('click',function(){
    var idx=$(this).index();
    console.log(idx);
    $('.main_slider').slick('slickGoTo',idx);
    $(this).addClass('on').siblings().removeClass('on')
});

var z=1;
$('.main_slider').on('afterChange',function(e,s,c){console.log(c);
    $('#main_visual .list li').eq(c).addClass('on').siblings().removeClass('on');
    $('#main_visual .photo').css({transform:'rotate('+120*z+'deg)'});
    z++;
});

//제품 슬라이드
$('.pr_slider').slick({
        slidesToShow: 4, // 슬라이드 쇼 몇 개 돌아갈 지, 돌아가는 예비 복사해둬야 함
        arrows:false,
        autoplay:true,
        dots:true, // 버튼 리스트 생성
    });
$('#content01 .btn i.xi-arrow-left').on('click', function(){
    $('.pr_slider').slick('slickPrev');
});    
$('#content01 .btn i.xi-arrow-right').on('click', function(){
    $('.pr_slider').slick('slickNext');
});
//----------------------------
});