// For GB video
var video = document.getElementById("layer1-bgvideo");
var btn = document.getElementById("myBtn");

function myFunction() {
  if (video.paused) {
    video.play();
    btn.innerHTML = "Pause";
  } else {
    video.pause();
    btn.innerHTML = "Play";
  }
}

// // video menu
// document
//   .getElementById("navbar-video")
//   .addEventListener("click", showMenuVideo); // Animation
// document
//   .getElementById("btn-video")
//   .addEventListener("mouseover", showMenuVideo); // Animation

// function showMenuVideo() {
//   document.getElementById("layer3-video").style.display = "block";
//   document.getElementById("layer3-video").classList.remove("animate__fadeOut");
//   document.getElementById("layer3-video").classList.add("animate__fadeIn");
//   document.getElementById("layer3-video").classList.remove("animate__delay-2s");
//   document.getElementById("layer3-video").classList.add("animate__delay-1s");

//   document.getElementById("menu-video-close").style.display = "block";

//   document
//     .getElementById("menu-video-close")
//     .addEventListener("click", closeShowMenuVideo, false);
//   closeNav();
// }

// function closeShowMenuVideo() {
//   document.getElementById("layer3-video").style.display = "none";
//   document.getElementById("layer3-video").classList.remove("animate__fadeIn");
//   document.getElementById("layer3-video").classList.add("animate__fadeOut");
//   document.getElementById("layer3-video").classList.remove("animate__delay-1s");
//   document.getElementById("layer3-video").classList.add("animate__delay-2s");

// }
