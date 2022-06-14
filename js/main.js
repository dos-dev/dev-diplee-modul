$(window).on('load', function () {
    window.setTimeout(hidePreloader, 3000);
});

function hidePreloader() {
    $('.dos-preloader').fadeOut(300, function () {
        $(this).remove();
    });
}


$(document).ready(function () {

    loadSettings();
    accessibilityMenu();
    scrollspyLinks();
    toggleInclusive();
    toggleTranscript();
    dictionaryNav();
    dictionaryLanding();
    affixedToTop();
    audioBtn();
    scrollToTop();
    searchOnMobile();
    tableScrollBars();
    contentScrollToLinks();


    if (!$('body').hasClass('dos-dictionary')) {
        if (window.matchMedia("(max-width: 1135px)").matches) {
            $('body').scrollspy({ target: '#dos-nav-scrollspy-mobile', offset: 150 });
            scrollspyReplaceStringMobile();
        } else {
            $('body').scrollspy({ target: '#dos-nav-scrollspy', offset: 150 });
            scrollspyReplaceString();
        }
    }

    /// MOBILE DROPDOWN WIDTH
    if (window.matchMedia("(max-width: 1135px)").matches) {
        $(window).on('show.bs.dropdown', function () {
            $vW = $(window).width() + 'px';
            $('button#dropdownMenu1 + .dropdown-menu').css('width', $vW);
        });
    }

    // Search mobile
    function searchOnMobile() {
        if (window.matchMedia("(max-width: 767px)").matches) {
            $(".dos-header-navigate > .dos-search").insertAfter(".dos-header-navigate");
        }
        $('.dos-header-insert .dos-col.dos-col-search-mobile').on('click', function () {
            $('.dos-header-navigate + .dos-search').toggleClass('active');
        });
    }

    // Dictionary scrollspy
    if ($('body').hasClass('dos-dictionary')) {
        $('body').scrollspy({ target: '.dos-dictionary-nav', offset: 300 });
    }

    function contentScrollToLinks() {
        $('.content-scroll-link').on('click', function (e) {
            //e.preventDefault();
            //$("html, body").animate({scrollTop: $(e.target.hash).offset().top - 100}, 500, function () {})

            $('html, body').animate(
                {
                    scrollTop: $(e.target.hash).offset().top - 100 // Scroll to this location.
                }, {
                // Set the duration long enough to allow time
                // to lazy load the elements.
                duration: 500,

                // At each animation step, check whether the target has moved.
                step: function (now, fx) {

                    // Where is the target now located on the page?
                    // i.e. its location will change as images etc. are lazy loaded
                    var newOffset = $(e.target.hash).offset().top - 100;

                    // If where we were originally planning to scroll to is not
                    // the same as the new offset (newOffset) then change where
                    // the animation is scrolling to (fx.end).
                    if (fx.end !== newOffset)
                        fx.end = newOffset;
                }
            }
            );

        });
    }

    function dictionaryLanding() {
        $(window).on('load', function () {
            if (window.location.hash && $('body').hasClass('dos-dictionary')) {
                if ($(window).width() > 767) {
                    $("html, body").animate({ scrollTop: $(window.location.hash).offset().top - 200 }, 100, function () { });
                } else {
                    $("html, body").animate({ scrollTop: $(window.location.hash).offset().top - 50 }, 100, function () { });
                }
            }

        });
    }

    //Dictionary nav
    function dictionaryNav() {
        if ($(window).width() > 767) {
            $(".dos-dictionary-nav a").on("click", function () {
                event.preventDefault();
                if (this.hash !== "") {
                    var hash = this.hash;
                    $("html, body").animate({ scrollTop: $(hash).offset().top - 250 }, 500, function () {
                    });
                }
            });
        } else {
            $(".dos-dictionary-nav a").on("click", function () {
                event.preventDefault();
                if (this.hash !== "") {
                    var hash = this.hash;
                    $("html, body").animate({ scrollTop: $(hash).offset().top - 50 }, 500, function () {
                    });
                }
            });
        }
    }

    function affixedToTop() {
        if ($(window).width() > 767) {
            $(window).on('scroll', function (event) {
                var scrollValue = $(window).scrollTop();
                if (scrollValue > 100) {
                    $('.dos-dictionary-nav').addClass('fixed-top');
                } else {
                    $('.dos-dictionary-nav').removeClass('fixed-top');
                }
            });
        }
    }

    function audioBtn() {
        $('body.dos-dictionary .btn-audio').on('click', function () {
            //$(this).children('audio')[0].play();
            $(this).closest('.term').find('.btn-audio-toggle').slideToggle();
            console.log($(this).closest('.term').find('.btn-audio-toggle'));
        });
    }

    function toggleInclusive() {
        $('.dos-toggle__btn input').on('click', function (event) {
            $id = event.target.id;
            $showContent = '.dos-inclusive-content[data-target="' + $id + '"]';
            if ($(this).is(":checked")) {
                $($showContent).addClass('on');
            } else {
                $($showContent).removeClass('on');
            }
        });
    }

    function toggleTranscript() {
        $('.dos-transcript .dos-btn-def-basic').on('click', function (event) {
            $id = event.target.id;
            $showContent = '.dos-transcript__content[data-target="' + $id + '"]';
            if ($($showContent).hasClass('show')) {
                $($showContent).removeClass('show');
                $($showContent).slideToggle(400);
            } else {
                $($showContent).slideToggle(400);
                $($showContent).addClass('show');
            }
        });
    }

    function scrollspyLinks() {
        $('#dos-nav-scrollspy').find("a").on("click", function (event) {
            if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;
                $("html, body").animate({ scrollTop: $(hash).offset().top - 120 }, 500, function () {
                    /* window.location.hash = hash */
                });
            }
        });
    }

    function scrollspyReplaceString() {
        $(window).on('activate.bs.scrollspy', function () {
            $navItem = $('#dos-nav-scrollspy li a.active').text();
            //console.log($navItem);
            $('.dos-header-title.scollspy-target strong').html($navItem);
        });
    }

    function scrollspyReplaceStringMobile() {
        $(window).on('activate.bs.scrollspy', function () {
            $navItem = $('#dos-nav-scrollspy-mobile li a.active').text();
            //console.log($navItem);
            $('.dos-header-title.scollspy-target-mobile strong').html($navItem);
        });
    }

    //accessibility menu
    function accessibilityMenu() {
        //Dyslexic font
        $('.dos-settings-list input#dos-dyslexic-font').change(function () {
            if (this.checked) {
                $("body").addClass("dyslexic-font");
                localStorage.DOS2020font = "dyslexic-font";
                $(this).attr({ 'aria-checked': true });
            } else {
                $("body").removeClass("dyslexic-font");
                localStorage.DOS2020font = "";
                $(this).attr({ 'aria-checked': false });
            }
        });
        $('.dos-settings-group.dos-dyslexic-font').on('keypress', function (event) {
            if (event.keycode == 13 || event.which == 13) {
                $('.dos-settings-list input#dos-dyslexic-font').trigger('click');
            }
        });
        //Dark mode
        $('.dos-settings-list input#dos-night').change(function () {
            if (this.checked) {
                $("body").addClass("dark-theme");
                localStorage.DOS2020darktheme = "dark-theme";
                $(this).attr({ 'aria-checked': true });
            } else {
                $("body").removeClass("dark-theme");
                localStorage.DOS2020darktheme = "";
                $(this).attr({ 'aria-checked': false });
            }
        });
        $('.dos-settings-group.dos-night').on('keypress', function (event) {
            if (event.keycode == 13 || event.which == 13) {
                $('.dos-settings-list input#dos-night').trigger('click');
            }
        });
        //Font size up
        $(".dos-settings-list button.dos-btn-max").on('click', function () {
            currentSize = parseInt($("body").css("font-size")) + 2;
            if (currentSize < 24) {
                $("body").css("font-size", currentSize);
                localStorage.DOS2020fontsize = currentSize;
            }
        });
        //Font size down
        $(".dos-settings-list button.dos-btn-min").on('click', function () {
            currentSize = parseInt($("body").css("font-size")) - 2;
            if (currentSize >= 14) {
                $("body").css("font-size", currentSize);
                localStorage.DOS2020fontsize = currentSize;
            }
        });
        //Reset
        $(".dos-settings-list .dos-settings-group--save button.dos-settings--reset").click(function () {
            $("body").attr("style", "");
            $("body").removeClass('dyslexic-font dark-theme');
            localStorage.DOS2020fontsize = "";
            localStorage.DOS2020font = "";
            localStorage.DOS2020darktheme = "";
            $('.dos-settings-list input#dos-dyslexic-font').prop('checked', false);
            $('.dos-settings-list input#dos-dyslexic-font').attr({ 'aria-checked': false });
            $('.dos-settings-list input#dos-night').prop('checked', false);
            $('.dos-settings-list input#dos-night').attr({ 'aria-checked': false });
        });
    }

    //Load accessibility settings
    function loadSettings() {
        //EDGE & IE don't support file protofol local storage
        //this escapes the break of the js file
        try {
            if (typeof (Storage) !== "undefined") {
                if (localStorage.DOS2020darktheme) {
                    $("body").addClass(localStorage.DOS2020darktheme);
                    $('.dos-settings-list input#dos-night').prop('checked', true);
                    $('.dos-settings-list input#dos-night').attr({ 'aria-checked': true });
                }
                if (localStorage.DOS2020font) {
                    $("body").addClass(localStorage.DOS2020font);
                    $('.dos-settings-list input#dos-dyslexic-font').prop('checked', true);
                    $('.dos-settings-list input#dos-dyslexic-font').attr({ 'aria-checked': true });
                }
                if (localStorage.DOS2020fontsize) {
                    $("body").css("font-size", localStorage.DOS2020fontsize + "px");
                }
            } else {
                console.log("Local storange not supported!");
            }

        }
        catch (e) {
            console.log("local storage is not available");
            return;
        }
        //console.log("this text is never shown in Chrome and Edge");
    }

    //header fixed
    var hHeader = $('.dos-header').outerHeight();
    $('.dos-line-header').css('padding-top', hHeader);

    $(window).resize(function () {
        if (window.matchMedia("(max-width: 767px)").matches) {
            floatHeader();
        }
    });

    function floatHeader() {
        var header = $('.dos-header'),
            scrollPrev = 0;

        $(window).scroll(function () {
            var scrolled = $(window).scrollTop();

            if (scrolled > 300 && scrolled > scrollPrev) {
                header.addClass('out');
            } else {
                header.removeClass('out');
            }

            scrollPrev = scrolled;
        });
    }
    //End header fixed

    function tableScrollBars() {
        if ($(window).width() < 767) {
            $('.table.table-common').doubleScroll(
                {
                    scrollCss: { 'height': '10px' },
                    resetOnWindowResize: true
                }
            );
            setTimeout(function () {
                $('.doubleScroll-scroll-wrapper').before('<svg class="icon-doublescroll" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><title>swipe-hand</title><path class="cls-1" style="fill:#010101;stroke:transparent;" d="M27.6,11.08h-.05A1.81,1.81,0,0,0,25.83,13v1.42a.49.49,0,0,1-.48.48.48.48,0,0,1-.48-.48V11.77a1.72,1.72,0,1,0-3.43,0v2.76A.49.49,0,0,1,21,15a.48.48,0,0,1-.48-.49V11a1.8,1.8,0,0,0-1.75-1.85h-.05A1.73,1.73,0,0,0,17,10.93v4a.48.48,0,0,1-.48.48A.47.47,0,0,1,16,14.9V1.9A1.82,1.82,0,0,0,14.28,0,1.81,1.81,0,0,0,12.55,1.9v15a.48.48,0,0,1-.32.45.47.47,0,0,1-.53-.15L9.9,15A2.72,2.72,0,0,0,8,14a2.2,2.2,0,0,0-1.73.44c-.33.26-.27,1.09-.13,1.56.33,1.16,5.65,11,5.65,11A5.49,5.49,0,0,0,16.61,30h7.15a5.78,5.78,0,0,0,5.56-6V19.93c0-2.82,0-3.87,0-7A1.8,1.8,0,0,0,27.6,11.08Z"/><path style="fill:#010101;stroke:#010101;" class="cls-1" d="M19,4.36h7.28L24.86,5.75a.48.48,0,0,0,0,.68.47.47,0,0,0,.67,0l2.21-2.2a.48.48,0,0,0,0-.68L25.53,1.34a.47.47,0,0,0-.67,0,.48.48,0,0,0,0,.68L26.23,3.4H19a.47.47,0,0,0-.48.48A.48.48,0,0,0,19,4.36Z"/><path style="fill:#010101;stroke:#010101;" class="cls-1" d="M2.28,4.36H9.5A.49.49,0,0,0,10,3.88.48.48,0,0,0,9.5,3.4H2.3L3.67,2A.48.48,0,0,0,3,1.34L.79,3.55a.48.48,0,0,0,0,.68L3,6.43a.48.48,0,0,0,.68-.68Z"/></svg>');
            }, 6000);
        }
    }

    /*** dos-dropdown **/
    $('.dos-share').on('click keypress', function (event) {
        if (event.type === 'click' || (event.type === 'keypress' && (event.keycode == 13 || event.which == 13))) {
            if ($(this).closest('.dos-dropdown').hasClass('show')) {
                $(this).closest('.dos-dropdown').removeClass('show');
                $(this).attr({ 'aria-pressed': false, 'aria-expanded': false });
            } else {
                $('.dos-settings').closest('.dos-dropdown').removeClass('show');
                $('.dos-settings').attr({ 'aria-pressed': false, 'aria-expanded': false });
                $(this).closest('.dos-dropdown').addClass('show');
                $(this).attr({ 'aria-pressed': true, 'aria-expanded': true });
            }
        }
    });

    $('.dos-settings').on('click keypress', function (event) {
        if (event.type === 'click' || (event.type === 'keypress' && (event.keycode == 13 || event.which == 13))) {
            if ($(this).closest('.dos-dropdown').hasClass('show')) {
                $(this).closest('.dos-dropdown').removeClass('show');
                $(this).attr({ 'aria-pressed': false, 'aria-expanded': false });
            } else {
                $('.dos-share').closest('.dos-dropdown').removeClass('show');
                $('.dos-share').attr({ 'aria-pressed': false, 'aria-expanded': false });
                $(this).closest('.dos-dropdown').addClass('show');
                $(this).attr({ 'aria-pressed': true, 'aria-expanded': true });
            }
        }
    });

    $('.dos-dropdown-btn').on('click', function (event) {
        $('.dos-dropdown-btn').removeClass('active');
        $('.dos-dropdown-btn').attr({ 'aria-pressed': false, 'aria-expanded': false });
        $(this).addClass('active');
        $(this).attr({ 'aria-pressed': true, 'aria-expanded': true });
    });

    $('.dos-settings-list__close').on('click', function (event) {
        $('.dos-settings').closest('.dos-dropdown').removeClass('show');
    });

    $('.dos-network-list a').on('click', function (event) {
        $('.dos-dropdown').removeClass('show');
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.dos-dropdown').length) {
            $('.dos-dropdown').removeClass('show');
            $('.dos-dropdown-btn').removeClass('active');
        }
        e.stopPropagation();
    });
    /*** End .dos-dropdown ***/

    $('.dos-main-information__nav').on('click', function (event) {
        $(this).closest('.dos-main-information').toggleClass('active');
        $(this).closest('.dos-main-information').find('.dos-main-information__view').slideToggle(400);
    });

    // dos-alert
    $('.dos-alert').on('click', function (event) {
        $(this).toggleClass('active');
        $(this).closest('.dos-alert-wrapper').toggleClass('show');
    });
    $('.dos-alert-popup__close').on('click', function (event) {
        $(this).closest('.dos-alert-wrapper').removeClass('show');
        $(this).closest('.dos-alert-wrapper').find('.dos-alert').removeClass('active');
    });
    // End dos-alert

    //dos-side-bar
    $('.dos-subtitle-btn').on('click', function (event) {
        if (window.matchMedia("(max-width: 991px)").matches) {
            $(this).closest('.dos-col-side').find('.dos-col-side-shell').slideToggle(400);
            $(this).closest('.dos-col-side').toggleClass('show');
            $(this).closest('.dos-col-side').find('h6').toggleClass('active');
        }
    });
    $(window).resize(function () {
        if (window.matchMedia("(min-width: 992px)").matches) {
            $('.dos-col-side-shell').removeAttr('style');
        }
    });

    $(window).resize(function () {
        if (window.matchMedia("(max-width: 991px)").matches) {
            $('.dos-col-side').addClass('show');
        }
    });//End dos-side-bar



    // dos-gallery-slider
    var $slider = $('.dos-gallery-slider');
    if ($slider.length) {
        $slider.slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            swipe: false,
            nextArrow: '<div class="dos-slide__next" title="Sljedeće"></div>',
            prevArrow: '<div class="dos-slide__prev" title="Prethodno"></div>',
            speed: 1000,
            dots: true,
            dotsClass: 'dos-slider-counter',
            fade: true,
            cssEase: 'linear',
            customPaging: function (slider, i) {
                console.log(slider);
                return (i + 1) + '/' + slider.slideCount;
            }
        });
        $slider.find(".slick-cloned a").removeAttr("data-fancybox");
    }// End dos-gallery-slider

    // dos-dyk-slider
    var $slider2 = $('.dos-dyk-slider');
    if ($slider2.length) {
        $slider2.slick({
            infinite: true,
            autoplay: true,
            autoplaySpeed: 6000,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            swipe: false,
            nextArrow: '<div class="dos-slide__next" title="Sljedeće"></div>',
            prevArrow: '<div class="dos-slide__prev" title="Prethodno"></div>',
            dots: true,
            dotsClass: 'dos-custom_paging',
            customPaging: function (slider, i) {
                console.log(slider);
                return (i + 1) + '/' + slider.slideCount;
            }
        });
    }// End dos-dyk-slider

    //fancybox settings
    $('[data-fancybox]').fancybox({
        buttons: [
            "thumbs",
            "close"
        ],
        thumbs: {
            autoStart: true, // Display thumbnails on opening
            hideOnClose: true, // Hide thumbnail grid when closing animation starts
            parentEl: ".fancybox-container", // Container is injected into this element
            axis: "x" // Vertical (y) or horizontal (x) scrolling
        },
        loop: true,
        arrows: true,
        preventCaptionOverlap: true,
        idleTime: false,
        lang: 'hr',
        i18n: {
            'hr': {
                CLOSE: 'Zatvori',
                THUMBS: 'Sličice',
                PLAY_START: 'Pokreni/Zaustavi automatsko listanje slika',
                ZOOM: 'Zoomiraj',
                NEXT: 'Sljedeća slika',
                PREV: 'Prethodna slika'
            }
        },
        beforeShow: function () {
            if ($(".fancybox-inner").find("img")) {
                $(".fancybox-stage").addClass("image-margins");
            }
        }
    });

    $('.dos-btn-solution').on('click', function (event) {
        $(this).closest('.doc-solution-wrapper').find('.doc-solution').slideToggle(0);
    });

    $('.dos-btn-solution').on('click', function (event) {
        $(this).closest('.dos-part-question').find('.question-help').slideToggle(0);
    });

    $('.dos-btn-def-basic_question').on('click', function (event) {
        $(this).closest('.dos-part-question').find('.dos-question-result').slideToggle(0);
    });

    //Scroll to top
    function scrollToTop() {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.dos-scroll-top').fadeIn();
            } else {
                $('.dos-scroll-top').fadeOut();
            }
        });
    }


    function isOnScreen(elem) {
        // if the element doesn't exist, abort
        if (elem.length == 0) {
            return;
        }
        var $window = jQuery(window);
        var viewport_top = $window.scrollTop();
        var viewport_height = $window.height();
        var viewport_bottom = viewport_top + viewport_height;
        var $elem = jQuery(elem);
        var top = $elem.offset().top;
        var height = $elem.height();
        var bottom = top + height;

        return (top >= viewport_top && top < viewport_bottom) ||
            (bottom > viewport_top && bottom <= viewport_bottom) ||
            (height > viewport_height && top <= viewport_top && bottom >= viewport_bottom);
    }

    if (window.matchMedia("(min-width: 767px)").matches) {
        window.addEventListener('scroll', function (e) {
            if (isOnScreen(jQuery('.dos-footer'))) {
                $('.dos-scroll-top').addClass('white');
            } else {
                $('.dos-scroll-top').removeClass('white');
            }
        });
    }


    //Click event to scroll to top
    $('.dos-scroll-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    // players
    const players = Plyr.setup('video', {
        tooltips: { controls: true, seek: true },
        controls: [
            'play', // Play/pause playback
            'current-time', // The current time of playback
            'duration', // The full duration of the media
            'progress', // The progress bar and scrubber for playback and buffering
            'mute', // Toggle mute
            'volume', // Volume control
            'airplay', // Airplay (currently Safari only)
            'captions',
            //'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
            'fullscreen', // Toggle fullscreen
        ],
        autopause: true,
        captions: { active: true, language: 'hr', update: false }, //autoplays captions
        i18n: {
            restart: 'Reset',
            rewind: 'Natrag {seektime}s',
            play: 'Pokreni',
            pause: 'Pauziraj',
            fastForward: 'Naprijed {seektime}s',
            seek: 'Traži',
            seekLabel: '{currentTime} od {duration}',
            played: 'Pokrenuto',
            buffered: 'Napunjeno',
            currentTime: 'Trenutno vrijeme',
            duration: 'Trajanje',
            volume: 'Glasnoća',
            mute: 'Ugasi zvuk',
            unmute: 'Upali zvuk',
            enableCaptions: 'Omogući titlove',
            disableCaptions: 'Onemogući titlove',
            download: 'Preuzmi',
            enterFullscreen: 'Otvori prikaz preko cijelog ekrana',
            exitFullscreen: 'Zatvori prikaz preko cijelog ekrana',
            frameTitle: '{title}',
            captions: 'Titlovi',
            settings: 'Postavke',
            menuBack: 'Natrag u prethodni meni',
            speed: 'Brzina',
            normal: 'Normalna',
            quality: 'Kvaliteta',
            loop: 'Loop',
            start: 'Početak',
            end: 'Kraj',
            all: 'Sve',
            reset: 'Reset',
            disabled: 'Onemogući',
            enabled: 'Omogući',
            pip: 'Slika u slici',
        }
    });
    // audios
    //if (!$('body').hasClass('dos-dictionary')) {
    const audios = Plyr.setup('audio', {
        tooltips: { controls: true, seek: true },
        controls: [
            'play', // Play/pause playback
            'current-time', // The current time of playback
            'duration', // The full duration of the media
            'progress', // The progress bar and scrubber for playback and buffering
            'mute', // Toggle mute
            'volume', // Volume control
            'airplay', // Airplay (currently Safari only)
            'fullscreen', // Toggle fullscreen
        ],
        i18n: {
            restart: 'Reset',
            rewind: 'Natrag {seektime}s',
            play: 'Pokreni',
            pause: 'Pauziraj',
            fastForward: 'Naprijed {seektime}s',
            seek: 'Traži',
            seekLabel: '{currentTime} od {duration}',
            played: 'Pokrenuto',
            buffered: 'Napunjeno',
            currentTime: 'Trenutno vrijeme',
            duration: 'Trajanje',
            volume: 'Glasnoća',
            mute: 'Ugasi zvuk',
            unmute: 'Upali zvuk',
            enableCaptions: 'Omogući titlove',
            disableCaptions: 'Onemogući titlove',
            download: 'Preuzmi',
            enterFullscreen: 'Otvori prikaz preko cijelog ekrana',
            exitFullscreen: 'Zatvori prikaz preko cijelog ekrana',
            frameTitle: '{title}',
            captions: 'Titlovi',
            settings: 'Postavke',
            menuBack: 'Natrag u prethodni meni',
            speed: 'Brzina',
            normal: 'Normalna',
            quality: 'Kvaliteta',
            loop: 'Loop',
            start: 'Početak',
            end: 'Kraj',
            all: 'Sve',
            reset: 'Reset',
            disabled: 'Onemogući',
            enabled: 'Omogući',
        },
    });
    //}

    //download add  attr
    if ($('.plyr').length) {
        $('[data-plyr="download"]').prop('download', '');
    }

    //stick
    if (window.matchMedia("(min-width: 992px)").matches) {
        $(".dos-col-side-stick").stick_in_parent({
            offset_top: 35,
        });
    }//End stick

    $('.dos-col-side-accordian h6').on('click', function (event) {
        $(this).closest('.dos-col-side__item').find('.list-disc').slideToggle(400);
        $(this).toggleClass('active');
    });


    var dosTasksSlider = $('.static-height .dos-collection-tasks-slider');
    dosTasksSlider.each(function () {
        //dosTasksSlider
        $(this).slick({
            infinite: true,
            lazyLoad: 'progressive',
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: true,
            swipe: false,
            nextArrow: '<div class="dos-slide__next" title="Sljedeće"></div>',
            prevArrow: '<div class="dos-slide__prev" title="Prethodno"></div>',
            appendDots: $(this).siblings('.dos-collection-tasks__title')
        });
    });

    //dosTasksSlider
    var dosTasksSliderV2 = $('.adaptive-height .dos-collection-tasks-slider');
    dosTasksSliderV2.each(function () {
        $(this).slick({
            infinite: false,
            lazyLoad: 'progressive',
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: true,
            swipe: false,
            nextArrow: '<div class="dos-slide__next" title="Sljedeće"></div>',
            prevArrow: '<div class="dos-slide__prev" title="Prethodno"></div>',
            adaptiveHeight: true,
            appendDots: $(this).siblings('.dos-collection-tasks__title')
        });
    });

    /** Dropdown Submenu **/
    $('.dropdown-menu .dropdown-toggle').on('click', function (e) {
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }

        var $subMenu = $(this).next(".dropdown-menu");
        $subMenu.toggleClass('show');


        $(this).parents('.dropdown.show').on('hidden.bs.dropdown', function (e) {
            $('.dropdown-submenu .show').removeClass("show");
        });
        return false;
    });
    /** End Dropdown Submenu **/

    //carousel arrow nav click scroll to top
    $('.dos-collection-tasks .slick-arrow').on("click", function () {
        $('html,body').animate({
            scrollTop: $(this).parent().parent().offset().top - 80
        });
    });
    $('.slick-dots button, .slick-dots li').on("click", function () {
        $('html,body').animate({
            scrollTop: $(this).parent().parent().offset().top - 100
        });
    });

    //adapt height to task toggles
    $('.dos-collection-tasks button[data-original-title="Pokaži pomoć"], .dos-collection-tasks button[data-original-title="Pokaži rješenje"], .dos-collection-tasks button[data-original-title="Provjeri"], .dos-collection-tasks button[data-original-title="Ponovi"], .dos-collection-tasks input[type="text"]').on('click', function (e) {
        //setTimeout(function(){
        var slickheight = $(e.currentTarget).closest('.dos-tasks-slide')[0].clientHeight;
        $(e.currentTarget).closest('.slick-list').css({ height: "" + slickheight + "px" });
        //}, 401);
    });

    // yellow theme ključni pojmovi
    $('.dos-key-terms__tabs a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 100
        }, 400);
    });

});