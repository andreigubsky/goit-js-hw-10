// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';



const radioButtons = document.querySelectorAll("input[type='radio']");
const button = document.querySelector('button');

function getSelectedRadioValue() {
    for (const radio of radioButtons) {
        if (radio.checked) return radio.value;
    }
    return '';
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

const makePromise = ({ delay, shouldResolve }) => {
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
    const delayObj = document.querySelector("input[name='delay']");
    const choosedOption = getSelectedRadioValue();
    const delay = Number(delayObj.value);

    if (!delay || isNaN(delay)) {
        iziToast.error({
            message: '❗ Введіть коректне число для затримки',
            messageColor: '#ffffff',
            backgroundColor: '#fe5549',
            progressBar: false,
            timeout: 2000,
            position: 'topRight',
        });
        return;
    }
    if (!choosedOption) {
        iziToast.error({
            message: '❗ Оберіть fulfilled або rejected',
            messageColor: '#ffffff',
            backgroundColor: '#fe5549',
            progressBar: false,
            timeout: 2000,
            position: 'topRight',
        });
        return;
    }

    const shouldResolve = choosedOption === "fulfilled";

    makePromise({ delay, shouldResolve })
        .then((delay) => {
            showFulfilled(delay);
        })
        .catch((delay) => {
            showRejected(delay);
        });

    delayObj.value = '';
    unSelectRadios();

});