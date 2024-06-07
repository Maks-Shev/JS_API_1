// Вы должны создать веб-страницу, которая позволяет пользователю динамически
// управлять элементами на странице. Ниже приведены основные требования и
// функциональность:
// 1. На странице должны быть кнопки "Добавить элемент", "Удалить элемент" и
// "Клонировать элемент".
// 2. При нажатии на кнопку "Добавить элемент" на страницу добавляется новый
// квадратный элемент (<div>) с размерами 100x100 пикселей. Этот элемент
// должен иметь класс .box и содержать текст, указывающий порядковый номер
// элемента (1, 2, 3 и так далее).
// 3. При нажатии на кнопку "Удалить элемент" удаляется последний добавленный
// элемент, если таковой имеется.
// 4. При нажатии на кнопку "Клонировать элемент" создается копия последнего
// добавленного элемента и добавляется на страницу.
// 5. Все элементы имеют класс .box и стилизованы с помощью CSS (см. пример).
// 6. Элементы могут быть добавлены, удалены и клонированы в любом порядке и в
// любом количестве.


const containerEl = document.createElement('div');
containerEl.classList.add('container');
containerEl.style.cssText = `
    display: flex;
    flex-wrap: wrap;
`
document.body.append(containerEl);

const btnContainer = document.createElement('div');
btnContainer.classList.add('btn_container');

document.body.append(btnContainer);

const btnAdd = document.createElement('button');
btnAdd.classList.add('btn_add');
btnAdd.textContent = 'Add';
btnAdd.style.cssText = `
    width: 60px;
    height: 30px;
    margin: 20px;
`
btnContainer.append(btnAdd);

const btnRemove = document.createElement('button');
btnRemove.classList.add('btn_remove');
btnRemove.textContent = 'Remove';
btnRemove.style.cssText = `
    width: 60px;
    height: 30px;
    margin: 20px;
`;
btnContainer.append(btnRemove);

const btnClone = document.createElement('button');
btnClone.classList.add('btn_clone');
btnClone.textContent = 'Clone';
btnClone.style.cssText = `
    width: 60px;
    height: 30px;
    margin: 20px;
`;
btnContainer.append(btnClone);

const divEl = document.createElement('div');
divEl.classList.add('div_block')
divEl.style.cssText = `
    width: 100px;
    height: 100px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
`;
divEl.textContent = '1';
containerEl.append(divEl);

if (localStorage.getItem('containerEl')) {
    containerEl.innerHTML = localStorage.getItem('containerEl');
}

let nextBlockNumber = containerEl.children.length + 1;

btnAdd.addEventListener('click', () => {
        const divEl = document.createElement('div');
        divEl.classList.add('div_block')
        divEl.style.cssText = `
            width: 100px;
            height: 100px;
            border: 1px solid #ccc;
            display: flex;
            justify-content: center;
            align-items: center;
        `;
        divEl.textContent = nextBlockNumber;
        containerEl.append(divEl);
        localStorage.setItem('containerEl', containerEl.innerHTML);
        nextBlockNumber++;
});

btnRemove.addEventListener('click', () => {
   if (containerEl.children.length > 0) {
    containerEl.removeChild(containerEl.lastElementChild);
    localStorage.setItem('containerEl', containerEl.innerHTML);
    nextBlockNumber--;
   }
   // Проверка, если все блоки удалены, обновить nextBlockNumber на 1
   if (containerEl.children.length === 0) {
        nextBlockNumber = 1;
   }
});

btnClone.addEventListener('click', () => {
    if (containerEl.children.length > 0) {
        const lastDivEl = containerEl.lastElementChild.cloneNode(true);
        containerEl.append(lastDivEl);
        localStorage.setItem('containerEl', containerEl.innerHTML);
    }
})

