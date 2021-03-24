function calc(resultSelector) {
    //Calculator

    const result = document.querySelector(resultSelector);
    let height, weight, age, sex, activity;
    //set default values for choose boxes from local storage
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('activity')) {
        activity = localStorage.getItem('activity');
    } else {
        activity = 1.375;
        localStorage.setItem('activity', 1.375);
    }

    calcResult();
    //function to initialize active classes on calc on page start,take values from local storage
    //if none, then set default values
    function initLocalSettings(selector, activeClass) {
        const elems = document.querySelectorAll(`${selector} div`);
        const localActivity = localStorage.getItem('activity') || activity;
        const localSex = localStorage.getItem('sex') || sex;
        elems.forEach(elem => {
            elem.classList.remove(activeClass)
            if (elem.getAttribute('data-activity') === localActivity) {
                elem.classList.add(activeClass);
            } else if (elem.getAttribute('data-sex') === localSex) {
                elem.classList.add(activeClass);
            }

        })
    }

    initLocalSettings('#gender', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big', 'calculating__choose-item_active');

    //get result based on formula
    function calcResult() {
        //if something is not choosed type placeholder
        if (!sex || !height || !weight || !age || !activity) {
            result.textContent = "...";
            return;
        }
        //different formulas for different genders
        if (sex === 'female') {
            result.textContent = ((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity).toFixed(2);
        } else {
            result.textContent = ((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity).toFixed(2);
        }
    }


    //get info from choose boxes
    function getCalcInfo(parentSelector, activeClass) {
        //get elems based on parent selector
        const elements = document.querySelectorAll(`${parentSelector} div`);
        //set event listeners for each element
        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-activity')) {
                    activity = +e.target.getAttribute('data-activity');
                    localStorage.setItem('activity', +e.target.getAttribute('data-activity'));
                    calcResult();
                } else {
                    sex = e.target.getAttribute('data-sex');
                    localStorage.setItem('sex', e.target.getAttribute('data-sex'));
                    calcResult();
                }

                console.log(activity, sex);
                //add active class on clicked element
                elements.forEach((elem) => {
                    elem.classList.remove(activeClass)
                    if (e.target === elem) {
                        elem.classList.add(activeClass)
                    }
                })
            })
        })
    }

    //get input infos
    function getInputInfo(selector) {
        const inputs = document.querySelectorAll(`${selector} input`);
        //set event listeners on input and write values into variables 
        //and dont forget to call calc function on each input
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                //проверить что вводим числа и окрашиваем фон, если не числа
                if (input.value.match(/\D/g)) {
                    input.style.backgroundColor = 'red';
                } else {
                    input.style.backgroundColor = '#fff';
                }

                let target = e.target;
                if (target.getAttribute('id') == 'height') {
                    height = +target.value;
                } else if (target.getAttribute('id') === 'weight') {
                    weight = +target.value;
                } else if (target.getAttribute('id') === 'age') {
                    age = +target.value;
                }
                calcResult();
            })
        });



    }
    //call func with 2 parents as we have 2 blocks of choose boxes
    getCalcInfo('#gender', 'calculating__choose-item_active');
    getCalcInfo('.calculating__choose_big', 'calculating__choose-item_active');
    //call func with inputs
    getInputInfo('.calculating__choose_medium');
}

export default calc;