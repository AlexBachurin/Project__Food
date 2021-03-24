import {getData} from '../services/services';

function menuCards() {
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

    //dynamically create menu cards that we get from server
    getData('http://localhost:3000/menu')
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

}

export default menuCards;