import tabs from './modules/tabs';
import timer from './modules/timer';
import menucards from './modules/menucards';
import slider from './modules/slider';
import calc from './modules/calc';
import form from './modules/forms';
import modal from './modules/modal';
import {showModal} from './modules/modal';


window.addEventListener('DOMContentLoaded', () => {
    //show modal after some time
    const modalWindow = document.querySelector('.modal');
    const timerId = setTimeout(() => {
        showModal(modalWindow)
    }, 50000);


    tabs('.tabcontent', '.tabheader__items', '.tabheader__item', 'tabheader__item_active');
    modal('[data-modal]', '.modal', '.modal__close', timerId);
    timer('2021-04-17', '.timer');
    menucards();
    slider({
        container : '.offer__slider',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        currentCounter: '#current',
        totalCounter: '#total',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    calc('.calculating__result span');
    form('form', '.modal');
})
