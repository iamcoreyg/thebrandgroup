$(document).ready(function() {

    //page navigation
    var scrollToPage = function(page) {
        $("html, body").animate({ scrollTop: $('#'+page).offset().top }, 1500);
    }

    $("#main-nav a").on('click', function(){
        var page = $(this).data('page')
        scrollToPage(page)
        return false
    })

    //detect if load is too long
    setTimeout(function(){
        $("#floatingCirclesG").each(function() {
            $(this).addClass("error").html('An error has occurred. Please refresh the page or wait. It is up to you really.')
        })
    }, 25000)

    //getParams.js
    $.extend({
        getUrlVars: function(){
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++)
            {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        getUrlVar: function(name){
            return $.getUrlVars()[name];
        }
    });

    //isPage.js
    var pageIs = function (pageName) {
        var currentPage = window.location.pathname
        if (currentPage.match(pageName)) {
            return true
        } else {
            return false
        }
    }

    //getFunctions.js
    var getPageContent = function(pages) {
        $.each(pages, function(i, pageName) {
            $.getJSON('http://thebrandgroup.la/api/core/get_page/?slug=' + pageName, function(data) {
                var template = $('#' + pageName + 'Tpl').html()
                var html = Mustache.to_html(template, data)
                $('#' + pageName + '-content').html(html)
            })
        })
    }

    var getCategoryContent = function(catName) {
        $.getJSON('http://thebrandgroup.la/api/core/get_category_posts/?slug=' + catName, function(data) {
            var template = $('#' + catName + 'Tpl').html()
            var html = Mustache.to_html(template, data)
            $('#' + catName + '-content').html(html)
        })
    }

    //function takes (post slug, template)
    var loadEventPageContent = function(slug, tplName) {
        $.getJSON('http://thebrandgroup.la/api/core/get_post/?slug=' + slug, function(data) {
            var template = $('#eventTpl').html()
            var html = Mustache.to_html(template, data)
            $('#event-content').html(html)
            $('#event-content').find('p').appendTo( '#event-info' )

            $('#event-content').find("img")
                               .addClass('slideshow-img')
                               .wrap('<div class="item"></div>')
                               .imagesLoaded( function() {
                                   $('#event-images').masonry({
                                       itemSelector: '.item'
                                   });

                                   $('.item img').on('click', function() {
                                       var $this = $(this)
                                       var slideWrap = $('#slideshow-wrap'),
                                       slideWrapImg = slideWrap.find('img')

                                       slideWrapImg.attr('src', $this.attr('src'))
                                       slideWrap.removeClass('hide-slideshow')
                                       $(".main-wrap, nav").addClass('blur')
                                   })
                                });
        })
    }


    //main.js

    if (pageIs('event')) {
        var eventName = $.getUrlVar('event');
        loadEventPageContent(eventName, 'event')
    } else {
        getPageContent(['about', 'clients'])
        getCategoryContent('events')
    }
})
