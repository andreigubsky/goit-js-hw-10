// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";



const button = document.querySelector("[data-start]");
const daysCounter = document.querySelector("[data-days]");
const hoursCounter = document.querySelector("[data-hours]");
const minutesCounter = document.querySelector("[data-minutes]");
const secondsCounter = document.querySelector("[data-seconds]");
let timerId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = new Date().getTime();
    const timeInter = selectedDates[0].getTime() - currentTime;
    checkDate(timeInter);
  },
};
const fp = flatpickr("#datetime-picker", options);
button.disabled = true;
// Натисканням на кнопку «Start» починається зворотний 
// відлік часу до обраної дати з моменту натискання.

button.addEventListener("click", () => { timer(fp.latestSelectedDateObj.getTime()) });

function timer(endTime) {
  timerId = setInterval(() => {

    const currentTime = new Date().getTime();
    const timeInterval = endTime - currentTime;
    if (timeInterval > 0) {

      // Після запуску таймера натисканням кнопки Старт кнопка Старт 
      // і інпут стають неактивним, щоб користувач не міг обрати нову дату, 
      // поки йде відлік часу.
      button.disabled = true;
      fp.input.disabled = true;

      daysCounter.textContent = addLeadingZero(String(convertMs(timeInterval).days));
      hoursCounter.textContent = addLeadingZero(String(convertMs(timeInterval).hours));
      minutesCounter.textContent = addLeadingZero(String(convertMs(timeInterval).minutes));
      secondsCounter.textContent = addLeadingZero(String(convertMs(timeInterval).seconds));
    }
    else {
      clearInterval(timerId);

      //  Після зупинки таймера інпут стає активним, 
      // щоб користувач міг обрати наступну дату. Кнопка залишається не активною.

      button.disabled = false;
      fp.input.disabled = false;

      daysCounter.textContent = '00';
      hoursCounter.textContent = '00';
      minutesCounter.textContent = '00';
      secondsCounter.textContent = '00';
    }

  }, 1000);
``
}

// Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.

// Кнопка «Start» повинна бути неактивною доти, 
// доки користувач не вибрав дату в майбутньому. 

//   Якщо користувач вибрав дату в минулому, покажи window.alert() 
// з текстом "Please choose a date in the future" і зроби кнопку «Start» не активною.

// Зверни увагу, що при обранні валідної дати, 
// не запуску таймера і обранні потім невалідної дати, 
// кнопка після розблокування має знову стати неактивною.

function checkDate(distance) {

  if (distance > 0) {
    document.querySelector('[data-start]').disabled = false;
    return;
  }
  iziToast.show({
    message: 'Please choose a date in the future',
    messageColor: '#000000',
    backgroundColor: '#ff8080',
    timeout: 3000,
    position: 'topRight',
  });
  document.querySelector('[data-start]').disabled = true;
  return;

}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2, "0");
}