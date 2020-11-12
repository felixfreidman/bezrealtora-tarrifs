let radioButton3Days = document.getElementById("3daysPeriod");
let radioButton7Days = document.getElementById("7daysPeriod");
let radioButton14Days = document.getElementById("14daysPeriod");
let radioButton30Days = document.getElementById("30daysPeriod");
let rateFirstPrice= document.querySelector(".rate-price-first");

radioButton3Days.addEventListener("click", () => {
    rateFirstPrice.textContent  = "199 ₽";
});
radioButton7Days.addEventListener("click", () => {
    rateFirstPrice.textContent  = "399 ₽";
});
radioButton14Days.addEventListener("click", () => {
    rateFirstPrice.textContent  = "599 ₽";
});
radioButton30Days.addEventListener("click", () => {
    rateFirstPrice.textContent  = "899 ₽";
});