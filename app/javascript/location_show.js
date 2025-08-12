document.addEventListener("DOMContentLoaded", function () {
  const mainImage = document.getElementById("main-image");
  const thumbnails = document.querySelectorAll(".image-thumbnail");

  thumbnails.forEach(function (image) {
    image.addEventListener("click", function (e) {
      mainImage.src = e.target.src;
    });
  });
});
