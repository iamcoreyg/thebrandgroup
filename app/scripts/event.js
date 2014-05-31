$(window).load(function(){
    $('.close-slideshow-btn').on('click', function() {
        $('#slideshow-wrap').addClass('hide-slideshow')
        $('.main-wrap, nav').removeClass('blur')
    })
})
