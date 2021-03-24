import {showModal, closeModalHelp, showModalByScroll} from './modal';
import {postData} from '../services/services'

function forms(form, modalWindow, modalTimerId) {
    const forms = document.querySelectorAll(form),
          modal = document.querySelector(modalWindow);

    const message = {
        loading: 'img/spinner/Spinner78px.svg',
        success: 'Спасибо! Мы свяжемся с вами как можно быстрее!',
        error: 'Возникла непредвиденная ошибка, попробуйте позже.'
    }

    forms.forEach(item => {
        bindPostData(item);
    })


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
            closeModalHelp(modal, modalTimerId);
        }, 4000)

    }
}

export default forms;