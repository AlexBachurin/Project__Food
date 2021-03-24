function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    //More Advanced slider
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        current = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter),
        sliderWrapper = document.querySelector(wrapper),
        sliderInner = document.querySelector(field),
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
}

export default slider;