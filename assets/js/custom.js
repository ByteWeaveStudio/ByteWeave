$(function () {

    // Header Scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 60) {
            $("header").addClass("fixed-header");
        } else {
            $("header").removeClass("fixed-header");
        }
    });

    // Tooltip
    const tooltipTriggerList = Array.from(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });


    // Count
    $('.count').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 1000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });


    // ScrollToTop
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener("click", scrollToTop);

        window.addEventListener('scroll', function () {
            if (document.documentElement.scrollTop > 100 || document.body.scrollTop > 100) {
                scrollToTopBtn.style.display = "flex";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        });
    }


    // Aos
    AOS.init({
        once: true,
    });

    // Testimonial Owl Carousel
    $('.testimonial-carousel').owlCarousel({
        loop: true,
        rewind: false,
        margin: 24,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        autoplaySpeed: 800,
        smartSpeed: 800,
        slideBy: 1,
        dotsEach: 1,
        dots: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            992: {
                items: 2
            }
        }
    });
});
