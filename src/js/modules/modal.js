 //function helper to show modal window
function showModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
   
}

//function helper to close 
function closeModalHelp(modal, modalTimerId) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
    window.removeEventListener('scroll', showModalByScroll); // and remove modal trigger on scroll to bottom
    //if user closes modal himself then return modal dialog to initial state
    if (document.querySelector('.modal__thanks')) {
        document.querySelector('.modal__thanks').remove();
        document.querySelector('.modal__dialog').classList.remove('hide');

    }
    
}
//show modal after scroll to bottom
const showModalByScroll = () => {
    const modal = document.querySelector('.modal');
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        showModal(modal);
        window.removeEventListener('scroll', showModalByScroll);
    }
}

function modal(triggerSelector, modalSelector, closeTriggerSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector),
        modalTrigger = document.querySelectorAll(triggerSelector),
        modalClose = document.querySelector(closeTriggerSelector)


    //open modal window on trigger
    function openModalOnTrigger(modal, triggers) {
        triggers.forEach(btn => {
            btn.addEventListener('click', () => {
                showModal(modal);
            })
        })
    }

    //close modal window

    function closeModal(modal, closeTrigger) {
        closeTrigger.addEventListener('click', () => {
            closeModalHelp(modal, modalTimerId);
        });

        //close on outside click of modal dialog
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalHelp(modal, modalTimerId)
            }
        });

        //close on Escape button
        document.addEventListener('keydown', (e) => {
            //call function only if modal is opened
            if (e.code === "Escape" && modal.style.display == 'block') {
                closeModalHelp(modal, modalTimerId);
            }
        });

    }

    openModalOnTrigger(modal, modalTrigger);
    closeModal(modal, modalClose);


    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {showModal};
export {closeModalHelp};
export {showModalByScroll};