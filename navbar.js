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


$(document).ready(function () {
    $("#right-home-btn,#right-home-btn-burgur").click(function (event) {
        openNav();
        event.preventDefault();
    });

    $("#right-menu-overlay-close-btn").click(function (event) {
        closeNav();
        event.preventDefault();
    });
});

