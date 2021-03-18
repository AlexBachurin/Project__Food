/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

window.addEventListener('DOMContentLoaded', () => {
  //TABS
  const tabContent = document.querySelectorAll('.tabcontent'),
        tabLinksWrapper = document.querySelector('.tabheader__items'),
        tabLinks = tabLinksWrapper.querySelectorAll('.tabheader__item');

  const hideTabs = () => {
    tabContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabLinks.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  };

  const showTab = (i = 0) => {
    tabContent[i].classList.add('show', 'fade');
    tabContent[i].classList.remove('hide');
    tabLinks[i].classList.add('tabheader__item_active');
  };

  hideTabs();
  showTab();
  tabLinksWrapper.addEventListener('click', e => {
    e.preventDefault();
    const target = e.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabLinks.forEach((item, i) => {
        if (target == item) {
          hideTabs();
          showTab(i);
        }
      });
    }
  }); //TIMER
  // const deadline = "2021-03-25";

  const deadline = '2021-04-17';

  function getTimeDiff(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()); //get difference from deadline and current time

    const days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(t / 1000 * 60 * 60 % 24),
          //get hours with floor of 24 hours (нам нужен именно хвост, поэтому от полученных общих часов берем остаток от деления на 24 часа
    // т.е если было 150 часов ,то после деление 150 % 24, останется хвост в 6 часов, а дни отбросятся
    minutes = Math.floor(t / 1000 / 60 % 60),
          seconds = Math.floor(t / 1000 % 60); // Return time in object format

    return {
      'total': t,
      days,
      hours,
      minutes,
      seconds
    };
  } // Function to setup timer on page


  function setClock(selector, deadline) {
    //get elements from page
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'); //initialize clock to prevent it from renewal on page after 1 sec

    updateClock(); //fill elements with new params from function getTimeDiff

    function updateClock() {
      const timeLeft = getTimeDiff(deadline);
      days.textContent = `${addZeros(timeLeft.days)}`;
      hours.textContent = `${addZeros(timeLeft.hours)}`;
      minutes.textContent = `${addZeros(timeLeft.minutes)}`;
      seconds.textContent = `${addZeros(timeLeft.seconds)}`; //if time is over stop updating clock

      if (timeLeft.total <= 0) {
        clearInterval(timerId); // document.querySelector('.promotion__timer').remove() //удаляем элемент с акцией, если таймер истек
      }
    } //update clock every second


    const timerId = setInterval(updateClock, 1000); //function helper to add zeros to digit that lower than 10

    function addZeros(timerItem) {
      if (timerItem < 10 && timerItem >= 0) {
        timerItem = '0' + timerItem;
      }

      if (timerItem < 0) {
        timerItem = 0;
      }

      return timerItem;
    }
  }

  setClock('.timer', deadline);
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map