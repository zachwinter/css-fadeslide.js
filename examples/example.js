$(function() {
    $('.btn.fade').click(function() {
        var $content = $('.content .fade');

        if($content.hasClass('hidden')) {
            $(this).text('Fade Out!');
            $content.removeClass('hidden');
            $content.fadeIn(500, function() {
                console.log('Fade in complete!');
            });
        } else {
            $(this).text('Fade In!');
            $content.addClass('hidden');
            $content.fadeOut(500, function() {
                console.log('Fade out complete!');
            });
        }
    });

    $('.btn.slide').click(function() {
        var $content = $('.content .slide');

        if($content.hasClass('hidden')) {
            $(this).text('Slide Up!');
            $content.removeClass('hidden');
            $content.slideDown(500, function() {
                console.log('Slide down complete!');
            });
        } else {
            $(this).text('Slide Down!');
            $content.addClass('hidden');
            $content.slideUp(500, function() {
                console.log('Slide up complete!');
            });
        }
    });
});