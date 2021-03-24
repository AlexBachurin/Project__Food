function timer(targetTime, timerSelector) {
    //TIMER
    // const deadline = "2021-03-25";
    const deadline = targetTime;

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

    setClock(timerSelector, deadline)

}

export default timer;