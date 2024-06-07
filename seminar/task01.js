// 1. Определение текущего размера окна браузера:
// ○ Напишите функцию, которая будет выводить текущую
// ширину и высоту окна браузера при его изменении.
window.addEventListener('resize', () => {
    console.log(window.innerWidth, window.innerHeight);
});

// 2. Подтверждение закрытия страницы:
// ○ Создайте всплывающее окно или диалоговое окно,
// которое появляется при попытке закрыть вкладку
// браузера и спрашивает пользователя, уверен ли он в
// своем решении закрыть страницу.
// window.addEventListener('beforeunload', (event) => {
//     event.returnValue = ''; // Отмена события по умолчанию

//     const confirmDialog = document.createElement('div');
//     confirmDialog.classList.add('confir-dialog');
//     confirmDialog.style.cssText = `
//         position: fixed;
//         top: 50%;
//         left: 50%;
//         transform: translate(-50%, -50%);
//         background-color: #FFFFFF;
//         padding: 20px;
//         border: 1px solid #ccc;
//         border-radius: 5px;
//         box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
//         z-index: 1000;
//         width: 300px;
//         display: none;
//     `;

//     const messageElement = document.createElement('p');
//     messageElement.textContent = 'Вы уверены, что хотите закрыть страницу?';

//     const buttonContainer = document.createElement('div');
//     buttonContainer.style.cssText = `
//         display: flex;
//         justify-content: space-between;
//     `;

//     const stayButton = document.createElement('button');
//     stayButton.textContent = 'Остаться';
//     stayButton.addEventListener('click', () => {
//         confirmDialog.remove();
//         event.returnValue = false;
//     });

//     const leaveButton = document.createElement('button');
//     leaveButton.textContent = 'Выйти';
//     leaveButton.addEventListener('click', () => {
//         confirmDialog.remove();
//         event.returnValue = true;
//     });

//     buttonContainer.append(stayButton, leaveButton);
//     confirmDialog.append(messageElement, buttonContainer);

//     document.body.append(confirmDialog);
// });

const confirmDialog = document.querySelector('#confirmDialog');
const stayButton = document.querySelector('.stay-button');
const leaveButton = document.querySelector('.leave-button');

let isConfirmed = false;

// Обработчик клика по кнопке "Остаться"
stayButton.addEventListener('click', () => {
    isConfirmed = false;
    confirmDialog.style.display = 'none';
});

// Обработчик клика по кнопке "Выйти"
leaveButton.addEventListener('click', () => {
    isConfirmed = true;
    confirmDialog.style.display = 'none';
    window.removeEventListener('beforeunload', handleBeforeUnload);
});

function handleBeforeUnload(event) {
    if (!isConfirmed) {
        event.preventDefault();
        event.returnValue = ''; 
        confirmDialog.style.display = 'block';
        return '';
    }
}

// Присоединение слушателя события beforeunload
window.addEventListener('beforeunload', handleBeforeUnload);



// 3. Управление историей переходов:
// ○ Используйте объект history для управления историей
// переходов на веб-странице. Создайте кнопки "Назад" и
// "Вперед" для перемещения по истории.

const backButton = document.querySelector('.backButton');
const forwardButton = document.querySelector('.forwardButton');

backButton.addEventListener('click', () => {
  if (!isConfirmed) {
    confirmDialog.style.display = 'block';
  } else {
    window.history.back();
  }
});

forwardButton.addEventListener('click', () => {
  if (!isConfirmed) {
    confirmDialog.style.display = 'block';
  } else {
    window.history.forward();
  }
});

