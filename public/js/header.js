document.addEventListener("DOMContentLoaded", function () {
  const userMenu = document.getElementById("user-menu");
  const userMenuButton = document.getElementById("user-menu-button");
  const closeButton = document.getElementById("mobile-menu-close");

  userMenuButton.addEventListener("click", function () {
    userMenu.classList.toggle("hide");
  });

  closeButton.addEventListener("click", function () {
    userMenu.classList.toggle("hide");
  });
});
