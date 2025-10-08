// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';


const delayObj = document.querySelector("input[name='delay']");
const radioButtons = document.querySelectorAll("input[type='radio']");
const button = document.querySelector('button');

function getSelectedRadioValue() {
    let selectedValue = '';

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            selectedValue = radioButtons[i].value;
            break;
        }
    }
    return selectedValue;
}
function unSelectRadios() {
    radioButtons.forEach(radio => {
        radio.checked = false;
    });
}

function showRejected(delay) {
    iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        messageColor: '#ffffff',
        backgroundColor: '#fe5549',
        progressBar: false,
        timeout: 5000,
        position: 'topRight',
    });
}
function showFulfilled(delay) {
    iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        messageColor: '#ffffff',
        backgroundColor: '#31c581',
        progressBar: false,
        timeout: 5000,
        position: 'topRight',
    });
}

const makePromise = ({ delay, shouldResolve = true }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve(delay)
            } else {
                reject(delay)
            }
        }, delay);
    });
};


button.addEventListener('click', event => {
    event.preventDefault();

    const choosedOption = getSelectedRadioValue();
    const delay = delayObj.value;

    if (delay > 0 && choosedOption === "fulfilled") {
        makePromise({ delay: delay })
            .then(delay => showFulfilled(delay))
            .catch(error => console.log(error));
    }
    if (delay > 0 && choosedOption === "rejected") {
        makePromise({ value: choosedOption, delay: delay })
            .then(delay => showRejected(delay))
            .catch(error => console.log(error));
    }
    delayObj.value = '';
    unSelectRadios('state');

});

















