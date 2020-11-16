const screenWidth = window.screen.width;
let radioButton3Days = document.getElementById("3daysPeriod"),
  radioButton7Days = document.getElementById("7daysPeriod"),
  radioButton14Days = document.getElementById("14daysPeriod"),
  radioButton30Days = document.getElementById("30daysPeriod"),
  secondRateButton = document.getElementById("secondRateButton"),
  rateFirstPrice = document.getElementById("ratePriceFirst"),
  rateSecondPrice = document.getElementById("ratePriceSecond"),
  selectCity = document.getElementById("rateChosenCity");

radioButton3Days.addEventListener("click", () => {
  rateFirstPrice.textContent = "199 ₽";
});
radioButton7Days.addEventListener("click", () => {
  rateFirstPrice.textContent = "399 ₽";
});
radioButton14Days.addEventListener("click", () => {
  rateFirstPrice.textContent = "599 ₽";
});
radioButton30Days.addEventListener("click", () => {
  rateFirstPrice.textContent = "899 ₽";
});
// Работает почти без отклонений
selectCity.addEventListener("mouseout", () => {
  let chosenCity = selectCity.value;
  switch (chosenCity) {
    case '0':
        rateSecondPrice.textContent = "от 1.199 ₽";
        break;
    case '2':
      rateSecondPrice.textContent = "2.199 ₽";
      break;
    case '3':
      rateSecondPrice.textContent = "1.599 ₽";
      break;
    default:
        rateSecondPrice.textContent = "1.299 ₽";
      break;
  }
});


// SWIPE EVENT



