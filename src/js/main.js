window.addEventListener('DOMContentLoaded', () => {

    //TABS
    const tabContent = document.querySelectorAll('.tabcontent'),
        tabLinksWrapper = document.querySelector('.tabheader__items'),
        tabLinks = tabLinksWrapper.querySelectorAll('.tabheader__item')

    const hideTabs = () => {
        tabContent.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show', 'fade')
        })

        tabLinks.forEach(item => {
            item.classList.remove('tabheader__item_active')
        })
    }

    const showTab = (i = 0) => {
        tabContent[i].classList.add('show', 'fade')
        tabContent[i].classList.remove('hide')
        tabLinks[i].classList.add('tabheader__item_active')
    }

    hideTabs();
    showTab();

    tabLinksWrapper.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target
        if (target && target.classList.contains('tabheader__item')) {
            tabLinks.forEach((item, i) => {
                if (target == item) {
                    hideTabs();
                    showTab(i)
                }
            })
        }
    })


    //TIMER

    // const deadline = "2021-03-25";
    const deadline = '2021-04-17';

    function getTimeDiff(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()) //get difference from deadline and current time

        const days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / 1000 * 60 * 60) % 24), //get hours with floor of 24 hours (нам нужен именно хвост, поэтому от полученных общих часов берем остаток от деления на 24 часа
            // т.е если было 150 часов ,то после деление 150 % 24, останется хвост в 6 часов, а дни отбросятся
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60)

        // Return time in object format
        return {
            'total': t,
            days,
            hours,
            minutes,
            seconds
        }
    }

    // Function to setup timer on page

    function setClock(selector, deadline) {
        //get elements from page
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');
        //initialize clock to prevent it from renewal on page after 1 sec
        updateClock();
        //fill elements with new params from function getTimeDiff
        function updateClock() {
            const timeLeft = getTimeDiff(deadline);
            days.textContent = `${addZeros(timeLeft.days)}`;
            hours.textContent = `${addZeros(timeLeft.hours)}`;
            minutes.textContent = `${addZeros(timeLeft.minutes)}`;
            seconds.textContent = `${addZeros(timeLeft.seconds)}`;
            //if time is over stop updating clock
            if (timeLeft.total <= 0) {
                clearInterval(timerId)
                // document.querySelector('.promotion__timer').remove() //удаляем элемент с акцией, если таймер истек
            }
        }
        //update clock every second
        const timerId = setInterval(updateClock, 1000)

        //function helper to add zeros to digit that lower than 10
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

    setClock('.timer', deadline)

    //Modal

    const modal = document.querySelector('.modal'),
        modalTrigger = document.querySelectorAll('[data-modal]'),
        modalClose = document.querySelector('.modal__close')

    //function helper to show modal window
    function showModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    //open modal window on trigger
    function openModal(modal, triggers) {
        triggers.forEach(btn => {
            btn.addEventListener('click', () => {
                showModal(modal);
            })
        })
    }

    //close modal window

    //function helper to close 
    function close() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        clearInterval(timerId); //resest timeouted Modal if user already saw modal
        window.removeEventListener('scroll', showModalByScroll); // and remove modal trigger on scroll to bottom
        //if user closes modal himself then return modal dialog to initial state
        if (document.querySelector('.modal__thanks')) {
            document.querySelector('.modal__thanks').remove();
            document.querySelector('.modal__dialog').classList.remove('hide');

        }
    }

    function closeModal(modal, closeTrigger) {
        closeTrigger.addEventListener('click', () => {
            close();
        });

        //close on outside click of modal dialog
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                close()
            }
        });

        //close on Escape button
        document.addEventListener('keydown', (e) => {
            //call function only if modal is opened
            if (e.code === "Escape" && modal.style.display == 'block') {
                close();
            }
        });

    }

    openModal(modal, modalTrigger);
    closeModal(modal, modalClose);

    //show modal after some time

    const timerId = setTimeout(() => {
        showModal(modal)
    }, 50000);

    //show modal after scroll to bottom

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modal);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);


    // Menu

    class Menu {
        constructor(src, alt, title, descr, price, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
        }
        //render item on page
        render() {
            const menuItem = document.createElement('div');
            //add classes to new element
            //check if we have any classes, if not set default class
            if (this.classes.length === 0) {
                this.classes = ['menu__item']
            } else {
                this.classes.forEach(item => menuItem.classList.add(item))
            }

            menuItem.innerHTML = `<img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`;

            const parent = document.querySelector('.menu__field .container');
            parent.append(menuItem)
        }
    }

    const getCards = async (url) => {
        const response = await fetch(url);

        //if error throw error
        if (!response.ok) {
            throw new Error(`Could not get data from ${url}. Error: ${response.status}`)
        }
        return await response.json();
    }

    //dynamically create menu cards that we get from server
    getCards('http://localhost:3000/menu')
        .then(data => {
            console.log(data)
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new Menu(img, altimg, title, descr, price, 'menu__item').render()
            })
        })


    //Form Post

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/spinner/Spinner78px.svg',
        success: 'Спасибо! Мы свяжемся с вами как можно быстрее!',
        error: 'Возникла непредвиденная ошибка, попробуйте позже.'
    }

    forms.forEach(item => {
        bindPostData(item);
    })


    //universal function for post data from form
    const postData = async (url, data) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await response.json();


    }

    //function to bind event listener on form and process fetch results
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            //create spinner while request is in loading stage
            const spinner = document.createElement('img');
            spinner.src = message.loading;
            spinner.classList.add('spinner');
            form.insertAdjacentElement('afterend', spinner);

            //take form info
            const formData = new FormData(form);
            //transform to json
            //simple method
            // const object = {};
            // formData.forEach(function (value, key) {
            //     object[key] = value;
            // });

            //more Advanced method
            const object = JSON.stringify(Object.fromEntries(formData.entries()));


            //show thanks modal if success or error message on error
            //and reset form + remove spinner
            postData('http://localhost:3000/requests', object)
                .then((data) => {
                    console.log(data)
                    showThanksModal(message.success)
                }).catch(() => {
                    showThanksModal(message.error);
                }).finally(() => {
                    form.reset();
                    spinner.remove();
                })

        })
    }

    //dynamically add thanks modal
    function showThanksModal(msg) {
        const prevModal = document.querySelector('.modal__dialog');
        prevModal.classList.add('hide');
        showModal(modal);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog', 'modal__thanks');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__title">${msg}</div>
        </div>`;
        modal.append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModal.classList.remove('hide');
            close();
        }, 4000)

    }

    //SLIDER
    //Simple Slider
    // const sliders = document.querySelectorAll('.offer__slide'),
    //     prev = document.querySelector('.offer__slider-prev'),
    //     next = document.querySelector('.offer__slider-next'),
    //     current = document.querySelector('#current'),
    //     total = document.querySelector('#total');

    // let sliderIndex = 1;

    // //add zeros to to total slider counter 
    // if (sliders.length < 10) {
    //     total.textContent = `0${sliders.length}`;
    // } else {
    //     total.textContent = `${sliders.length}`;
    // }

    // //function helper to add zeros to current
    // function plusZeros(num) {
    //     if (num < 10) {
    //         num = `0${num}`;
    //     }

    //     return num;
    // }

    // //function to help show slides on needed index
    // function showSlide(i) {
    //     sliders.forEach(item => {
    //         item.style.display = 'none';
    //     })
    //     sliders[i - 1].style.display = 'block';
    //     current.textContent = `${plusZeros(i)}`
    // }

    // next.addEventListener('click', () => {
    //     if (sliderIndex === sliders.length) {
    //         sliderIndex = 0;
    //     }
    //     sliderIndex++;
    //     showSlide(sliderIndex);
    // })

    // prev.addEventListener('click', () => {
    //     sliderIndex--;
    //     if (sliderIndex < 1) {
    //         sliderIndex = sliders.length;
    //     }
    //     showSlide(sliderIndex);
    // })
    // //initialize slider
    // showSlide(sliderIndex);

    //More Advanced slider
    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        sliderWrapper = document.querySelector('.offer__slider-wrapper'),
        sliderInner = document.querySelector('.offer__slider-inner'),
        sliderWidth = window.getComputedStyle(sliderWrapper).width;

    let slideIndex = 1;
    //Перемення для отступа
    let offset = 0;

    //внутренняя обертка будет занимать большое пространство и передвигать слайды, добавляем ей свойства  
    sliderInner.style.cssText = `display: flex; transition: 0.5s all; width: ${100*slides.length}%`
    //Скрываем элементы у враппера слайдов,которые не попадают в область видимости
    sliderWrapper.style.overflow = "hidden";
    //слайды должны быть фиксированной и одинаковой ширины,чтобы влезать
    slides.forEach(slide => {
        slide.style.width = sliderWidth;
    })
    //Передвижение slider'a
    next.addEventListener('click', () => {
        //сдвигаем в ноль если дошли до последнего слайда
        if (offset === +sliderWidth.slice(0, sliderWidth.length - 2) * (slides.length - 1)) {
            offset = 0;
            slideIndex = 1;
        } else {
            offset += +sliderWidth.slice(0, sliderWidth.length - 2);
            slideIndex++;
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;
        current.textContent = `${plusZeros(slideIndex)}`;

        dotsArr.forEach(dot => {
            dot.style.opacity = '.5';
        })
        dotsArr[slideIndex - 1].style.opacity = '1';
    })

    prev.addEventListener('click', () => {
        //сдвигаем в конец если дошли до первого слайда
        if (offset === 0) {
            offset = +sliderWidth.slice(0, sliderWidth.length - 2) * (slides.length - 1);
            slideIndex = slides.length;
        } else {
            //не добавляем,а отнимаем , поскольку двигаемся назад
            offset -= +sliderWidth.slice(0, sliderWidth.length - 2);
            slideIndex--;
        }
        current.textContent = `${plusZeros(slideIndex)}`
        sliderInner.style.transform = `translateX(-${offset}px)`
        dotsArr.forEach(dot => {
            dot.style.opacity = '.5';
        });
        dotsArr[slideIndex - 1].style.opacity = '1';
    })

    //function helper to add zeros to current
    function plusZeros(num) {
        if (num < 10) {
            num = `0${num}`;
        }

        return num;
    }
    //set total slides total counter and current 
    if (slides.length < 10) {
        total.textContent = `${plusZeros(slides.length)}`;
        current.textContent = `${plusZeros(slideIndex)}`;
    } else {
        total.textContent = `${slides.length}`;
        current.textContent = `${slideIndex}`;
    }

    //DOTS for slider
    slider.style.position = "relative";

    const dots = document.createElement('ol'),
          dotsArr = [];
    dots.classList.add('carousel-indicators');
    slider.append(dots);

    //create dots , set Attributes, classes, and append to parent and push to dotsArr so we can easy manipulate them
    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        dots.append(dot);
        if (i === 0) {
            dot.style.opacity = '1';
        }
        dotsArr.push(dot);
    }
    //event listeners for dots
    dotsArr.forEach(dot => {
        dot.addEventListener('click', (e) => {
            //get Attribute from dot and set it to slideindex and change offset
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            //Устанавливаем отступ, двигаем слайдер в зависимости от полученного аттрибута
            offset = +sliderWidth.slice(0, sliderWidth.length - 2) * (slideTo - 1);
            sliderInner.style.transform = `translateX(-${offset}px)`;
            //set styles for active dot
            dotsArr.forEach(dot => {
                dot.style.opacity = '.5';
            })
            dotsArr[slideIndex - 1].style.opacity = '1';
            //set current slide counter
            current.textContent = `${plusZeros(slideIndex)}`
        })
    })



})