const hideLoader = function () {
    $("#loading").hide();
};
const openNav = function () {
    $("#right-menu-overlay-close-btn").show();
    $("#right-home-btn").hide();
    $("#logo-btn").hide();
    $("#mySidenav").attr("style", "width:100%");
    $("#navbarToggler-right-home-menu").attr("style", "display:block");
    $("#navbarNavDropdown").attr("style", "display:block");
    $("#mySidenav").addClass("animate__fadeIn");
};
const closeNav = function () {
    $("#mySidenav").attr("style", "width:0");
    $("#mySidenav").removeClass("animate__fadeIn");
    $("#navbarToggler-right-home-menu").show();
    $("#right-home-btn").show();
    $("#logo-btn").show();
    $("#right-menu-overlay-close-btn").hide();
};
const bindeffects = function () {
    $("#videos-link").mouseenter(function () {
        $("#video-col").removeClass("col-md-4");
        $("#blog-col").removeClass("col-md-4");
        $("#picture-col").removeClass("col-md-4");
        $("#blog-link").removeClass("link");
        $("#aboutus-link").removeClass("aboutuslink");
        $(".bottom-line").addClass("video-bottom-line");
        $(".top-line").addClass("video-top-line");
        $("#blog-col").addClass('homepage');
        $("#picture-col").addClass('homepage');
        $("#video-col").addClass("col-md-6");
        $("#blog-col").addClass("col-md-3");
        $("#picture-col").addClass("col-md-3");
        $("#blog-link").addClass("link-one");
        $("#aboutus-link").addClass("aboutuslink-one");
        $("#video-section").attr("style", "opacity:1;object-fit: cover;");
    });
    $("#videos-link").mouseleave(function () {
        $("#video-col").removeClass("col-md-6");
        $("#blog-col").removeClass("col-md-3");
        $("#picture-col").removeClass("col-md-3");
        $("#blog-link").removeClass("link-one");
        $("#aboutus-link").removeClass("aboutuslink-one");
        $(".bottom-line").removeClass("video-bottom-line");
        $(".top-line").removeClass("video-top-line");
        $("#blog-col").removeClass('homepage');
        $("#picture-col").removeClass('homepage');
        $("#video-col").addClass("col-md-4");
        $("#blog-col").addClass("col-md-4");
        $("#picture-col").addClass("col-md-4");
        $("#blog-link").addClass("link");
        $("#aboutus-link").addClass("aboutuslink");
        $("#video-section").attr("style", "opacity:0;object-fit: cover;");
    });
    $("#picture-link").mouseenter(function () {
        $("#video-col").removeClass("col-md-4");
        $("#blog-col").removeClass("col-md-4");
        $("#picture-col").removeClass("col-md-4");
        $("#blog-link").removeClass("link");
        $("#aboutus-link").removeClass("aboutuslink");
        $(".bottom-line").addClass("picture-bottom-line");
        $(".top-line").addClass("picture-top-line");
        $(".image-slider").removeClass("dn");
        $("#blog-col").addClass('homepage');
        $("#video-col").addClass('homepage');
        $("#video-col").addClass("col-md-3");
        $("#blog-col").addClass("col-md-3");
        $("#picture-col").addClass("col-md-6");
        $("#blog-link").addClass("link-one");
        $("#aboutus-link").addClass("aboutuslink-one");
        $("#picture-section").attr("style", "opacity:1;object-fit: cover;");
    });
    $("#picture-link").mouseleave(function () {
        $("#video-col").removeClass("col-md-3");
        $("#blog-col").removeClass("col-md-3");
        $("#picture-col").removeClass("col-md-6");
        $("#blog-link").removeClass("link-one");
        $("#aboutus-link").removeClass("aboutuslink-one");
        $(".bottom-line").removeClass("picture-bottom-line");
        $(".top-line").removeClass("picture-top-line");
        $("#blog-col").removeClass('homepage');
        $("#video-col").removeClass('homepage');
        $("#video-col").addClass("col-md-4");
        $("#blog-col").addClass("col-md-4");
        $("#picture-col").addClass("col-md-4");
        $("#blog-link").addClass("link");
        $("#aboutus-link").addClass("aboutuslink");
        $(".image-slider").addClass("dn");
        $("#picture-section").attr("style", "opacity:0;object-fit: cover;");
    });
    $("#aboutus-link").mouseenter(function () {
        $("#video-col").removeClass("col-md-4");
        $("#blog-col").removeClass("col-md-4");
        $("#picture-col").removeClass("col-md-4");
        $("#video-col").addClass("col-md-3");
        $("#blog-col").addClass("col-md-6");
        $("#picture-col").addClass("col-md-3");
        $("#blog-col").addClass("main-aboutus-section");
        $("#video-col").addClass('homepage');
        $("#picture-col").addClass('homepage');
        $("#aboutus-link").addClass("top-5per");
        $("#aboutus-link").addClass("b-0");
        $("#blog-link").hide();
        $(".top-line").hide();
        $("#mohit-detail").addClass("dn");
        $("#oshank-detail").addClass("dn");
        $("#harshit-detail").addClass("dn");
        $(".about-us-image").removeClass("dn");
        $("#aboutus-section").show();
    });
    $("#blog-col").mouseleave(function () {
        $("#video-col").removeClass("col-md-3");
        $("#blog-col").removeClass("col-md-6");
        $("#picture-col").removeClass("col-md-3");
        $("#aboutus-section").removeClass("main-aboutus");
        $("#blog-col").removeClass("main-aboutus-section");
        $("#video-col").removeClass('homepage');
        $("#picture-col").removeClass('homepage');
        $("#video-col").addClass("col-md-4");
        $("#blog-col").addClass("col-md-4");
        $("#picture-col").addClass("col-md-4");
        $("#aboutus-link").removeClass("top-5per");
        $("#aboutus-link").removeClass("b-0");
        $("#aboutus-section").hide();
        $("#blog-link").show();
        $(".top-line").show();
        $(".btn-row").removeClass("dn");
    });
    $(".detail-image").mouseleave(function () {
        $("#mohit-detail").addClass("dn");
        $("#oshank-detail").addClass("dn");
        $("#harshit-detail").addClass("dn");
        $(".btn-row").removeClass("dn");
    });
};
var index = 0;
var slides = document.querySelectorAll(".slides");
const changeSlide = function () {
    if (index < 0) {
        index = slides.length - 1;
    }
    if (index > slides.length - 1) {
        index = 0;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[index].style.display = "block";
    index++;
    setTimeout(changeSlide, 4000);
};
$(document).ready(function () {
    setTimeout(hideLoader, 4000);
    $("#right-home-btn,#right-home-btn-burgur").click(function () {
        openNav();
    });
    $("#right-menu-overlay-close-btn").click(function () {
        closeNav();
    });
    bindeffects();
    changeSlide();
});