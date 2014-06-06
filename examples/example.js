$(function() {
    $('.btn.fade').click(function() {
        var $content = $('.content .fade');

        if($content.hasClass('hidden')) {
            $(this).text('Fade Out!');
            $content.removeClass('hidden');
            $content.fadeIn(500);
        } else {
            $(this).text('Fade In!');
            $content.addClass('hidden');
            $content.fadeOut(500);
        }
    });

    $('.btn.slide').click(function() {
        var $content = $('.content .slide');

        if($content.hasClass('hidden')) {
            $(this).text('Slide Up!');
            $content.removeClass('hidden');
            $content.slideDown(500);
        } else {
            $(this).text('Slide Down!');
            $content.addClass('hidden');
            $content.slideUp(500);
        }
    });
});