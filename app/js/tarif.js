const BURGER_BUTTON = document.getElementById("burgerMenu");
const MAIN_LAYER = document.querySelector(".layer");
const MOBILE_MENU = document.querySelector(".header-top_menu-mobile");
BURGER_BUTTON.addEventListener("click", () => {
    MAIN_LAYER.classList.toggle("hide");
    MOBILE_MENU.classList.toggle("hide");
    BURGER_BUTTON.classList.toggle("hide");
});

MAIN_LAYER.addEventListener("click", () => {
    MAIN_LAYER.classList.toggle("hide");
    MOBILE_MENU.classList.toggle("hide");
    BURGER_BUTTON.classList.toggle("hide");
});
