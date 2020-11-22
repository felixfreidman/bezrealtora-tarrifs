const screenWidth = window.screen.width;
let radioButton3Days = document.getElementById("3daysPeriod"),
  radioButton7Days = document.getElementById("7daysPeriod"),
  radioButton14Days = document.getElementById("14daysPeriod"),
  radioButton30Days = document.getElementById("30daysPeriod"),
  secondRateButton = document.getElementById("secondRateButton"),
  rateFirstPrice = document.getElementById("ratePriceFirst"),
  rateSecondPrice = document.getElementById("ratePriceSecond"),
  selectCity = document.getElementById("rateChosenCity"),
  rateSwitchSection = document.querySelector(".main_rate-toggle"),
  firstRateSwitch = document.querySelector(".rate-toggle_first-toggle"),
  secondRateSwitch = document.querySelector(".rate-toggle_second-toggle");

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

let firstCard = document.getElementById("firstCard");
let secondCard  = document.getElementById('secondCard');




// SWIPE EVENT

/**
 * Object.assign() polyfill
 */
Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(a,b){"use strict";if(void 0===a||null===a)error("Cannot convert first argument to object");for(var c=Object(a),d=1;d<arguments.length;d++){var e=arguments[d];if(void 0!==e&&null!==e)for(var f=Object.keys(Object(e)),g=0,h=f.length;g<h;g++){var i=f[g],j=Object.getOwnPropertyDescriptor(e,i);void 0!==j&&j.enumerable&&(c[i]=e[i])}}return c}});

/**
 * CustomEvent() polyfill
 */
!function(){if("function"==typeof window.CustomEvent)return;function t(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n}t.prototype=window.Event.prototype,window.CustomEvent=t}();


/**
 * Функция определения события swipe на элементе.
 * @param {Object} el - элемент DOM.
 * @param {Object} settings - объект с предварительными настройками.
 */
var swipe = function(el, settings) {

    // настройки по умолчанию
    var settings = Object.assign({}, {
        minDist: 60,  // минимальная дистанция, которую должен пройти указатель, чтобы жест считался как свайп (px)
        maxDist: 120, // максимальная дистанция, не превышая которую может пройти указатель, чтобы жест считался как свайп (px)
        maxTime: 700, // максимальное время, за которое должен быть совершен свайп (ms)
        minTime: 50   // минимальное время, за которое должен быть совершен свайп (ms)
    }, settings);

    // коррекция времени при ошибочных значениях
    if (settings.maxTime < settings.minTime) settings.maxTime = settings.minTime + 500;
    if (settings.maxTime < 100 || settings.minTime < 50) {
        settings.maxTime = 700;
        settings.minTime = 50;
    }

    var dir,                // направление свайпа (horizontal, vertical)
        swipeType,            // тип свайпа (up, down, left, right)
        dist,                 // дистанция, пройденная указателем
        isMouse = false,      // поддержка мыши (не используется для тач-событий)
        isMouseDown = false,  // указание на активное нажатие мыши (не используется для тач-событий)
        startX = 0,           // начало координат по оси X (pageX)
        distX = 0,            // дистанция, пройденная указателем по оси X
        startY = 0,           // начало координат по оси Y (pageY)
        distY = 0,            // дистанция, пройденная указателем по оси Y
        startTime = 0,        // время начала касания
        support = {           // поддерживаемые браузером типы событий
            pointer: !!("PointerEvent" in window || ("msPointerEnabled" in window.navigator)),
            touch: !!(typeof window.orientation !== "undefined" || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || "ontouchstart" in window || navigator.msMaxTouchPoints || "maxTouchPoints" in window.navigator > 1 || "msMaxTouchPoints" in window.navigator > 1)
        };

    /**
     * Опредление доступных в браузере событий: pointer, touch и mouse.
     * @returns {Object} - возвращает объект с доступными событиями.
     */
    var getSupportedEvents = function() {
        switch (true) {
            case support.pointer:
                events = {
                    type:   "pointer",
                    start:  "PointerDown",
                    move:   "PointerMove",
                    end:    "PointerUp",
                    cancel: "PointerCancel",
                    leave:  "PointerLeave"
                };
                // добавление префиксов для IE10
                var ie10 = (window.navigator.msPointerEnabled && Function('/*@cc_on return document.documentMode===10@*/')());
                for (var value in events) {
                    if (value === "type") continue;
                    events[value] = (ie10) ? "MS" + events[value] : events[value].toLowerCase();
                }
                break;
            case support.touch:
                events = {
                    type:   "touch",
                    start:  "touchstart",
                    move:   "touchmove",
                    end:    "touchend",
                    cancel: "touchcancel"
                };
                break;
            default:
                events = {
                    type:  "mouse",
                    start: "mousedown",
                    move:  "mousemove",
                    end:   "mouseup",
                    leave: "mouseleave"
                };
                break;
        }
        return events;
    };


    /**
     * Объединение событий mouse/pointer и touch.
     * @param e {Event} - принимает в качестве аргумента событие.
     * @returns {TouchList|Event} - возвращает либо TouchList, либо оставляет событие без изменения.
     */
    var eventsUnify = function(e) {
        return e.changedTouches ? e.changedTouches[0] : e;
    };


    /**
     * Обрабочик начала касания указателем.
     * @param e {Event} - получает событие.
     */
    var checkStart = function(e) {
        var event = eventsUnify(e);
        if (support.touch && typeof e.touches !== "undefined" && e.touches.length !== 1) return; // игнорирование касания несколькими пальцами
        dir = "none";
        swipeType = "none";
        dist = 0;
        startX = event.pageX;
        startY = event.pageY;
        startTime = new Date().getTime();
        if (isMouse) isMouseDown = true; // поддержка мыши
    };

    /**
     * Обработчик движения указателя.
     * @param e {Event} - получает событие.
     */
    var checkMove = function(e) {
        if (isMouse && !isMouseDown) return; // выход из функции, если мышь перестала быть активна во время движения
        var event = eventsUnify(e);
        distX = event.pageX - startX;
        distY = event.pageY - startY;
        if (Math.abs(distX) > Math.abs(distY)) dir = (distX < 0) ? "left" : "right";
        else dir = (distY < 0) ? "up" : "down";
    };

    /**
     * Обработчик окончания касания указателем.
     * @param e {Event} - получает событие.
     */
    var checkEnd = function(e) {
        if (isMouse && !isMouseDown) { // выход из функции и сброс проверки нажатия мыши
            isMouseDown = false;
            return;
        }
        var endTime = new Date().getTime();
        var time = endTime - startTime;
        if (time >= settings.minTime && time <= settings.maxTime) { // проверка времени жеста
            if (Math.abs(distX) >= settings.minDist && Math.abs(distY) <= settings.maxDist) {
                swipeType = dir; // опредление типа свайпа как "left" или "right"
            } else if (Math.abs(distY) >= settings.minDist && Math.abs(distX) <= settings.maxDist) {
                swipeType = dir; // опредление типа свайпа как "top" или "down"
            }
        }
        dist = (dir === "left" || dir === "right") ? Math.abs(distX) : Math.abs(distY); // опредление пройденной указателем дистанции

        // генерация кастомного события swipe
        if (swipeType !== "none" && dist >= settings.minDist) {
            var swipeEvent = new CustomEvent("swipe", {
                bubbles: true,
                cancelable: true,
                detail: {
                    full: e, // полное событие Event
                    dir:  swipeType, // направление свайпа
                    dist: dist, // дистанция свайпа
                    time: time // время, потраченное на свайп
                }
            });
            el.dispatchEvent(swipeEvent);
        }
    };

    // добавление поддерживаемых событий
    var events = getSupportedEvents();

    // проверка наличия мыши
    if ((support.pointer && !support.touch) || events.type === "mouse") isMouse = true;

    // добавление обработчиков на элемент
    el.addEventListener(events.start, checkStart);
    el.addEventListener(events.move, checkMove);
    el.addEventListener(events.end, checkEnd);
    if(support.pointer && support.touch) {
        el.addEventListener('lostpointercapture', checkEnd);
    }
};




var examples = {
    simpleLeft: {
        el: firstCard,
        callback: function() {
          firstCard.classList.toggle("hide");
          secondCard.classList.toggle("hide");
          firstRateSwitch.classList.toggle("rate-toogle_toggle-checked");
          secondRateSwitch.classList.toggle("rate-toogle_toggle-checked");
        }
    },
    simpleRight: {
        el: secondCard,
        callback: function() {
          secondCard.classList.add("hide");
          firstCard.classList.remove("hide");
          firstRateSwitch.classList.toggle("rate-toogle_toggle-checked");
          secondRateSwitch.classList.toggle("rate-toogle_toggle-checked");
        }
    }
};

for (var example in examples) {
    var el = examples[example].el;
    swipe(el, examples[example].set);
    el.addEventListener("swipe", examples[example].callback);
}



if(screenWidth < 720) {
  secondCard.classList.add("hide");
  rateSwitchSection.classList.remove("hide");
}

if(screenWidth >= 720) {
    rateSwitchSection.classList.add("hide");
} 


