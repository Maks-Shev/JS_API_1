// 1. Вы создаете веб-страницу для отображения списка статей. Каждая статья состоит из заголовка и
// текста. Вам необходимо использовать Bootstrap для стилизации элементов.
// 2. Используйте Bootstrap, чтобы стилизовать элементы:
// a. Заголовок статьи (<h2>)
// b. Текст статьи (<p>)
// c. Кнопки "Добавить статью", "Удалить" и "Редактировать".
// 3. Создайте начальный список статей, который будет загружаться при загрузке страницы. Используйте
// JSON-данные для определения заголовков и текстов статей.
// 4. Позвольте пользователю добавлять новые статьи. При нажатии на кнопку "Добавить статью" должна
// появиться новая статья с заголовком "Новая статья" и текстом "Введите содержание статьи...".
// 5. Реализуйте функциональность удаления статей. При нажатии на кнопку "Удалить" соответствующая
// статья должна быть удалена из списка.
// 6. Реализуйте функциональность редактирования статей. При нажатии на кнопку "Редактировать"
// пользователь должен иметь возможность изменить заголовок и текст статьи. Используйте
// всплывающее окно или prompt для ввода новых данных.
// 7. Все изменения (добавление, удаление, редактирование) должны быть сохранены в локальное
// хранилище браузера, чтобы они сохранялись после перезагрузки страницы.

const containerEl = document.createElement('div');
containerEl.classList.add('container');

const btnAdd = document.createElement('button');
btnAdd.classList.add('addArticle');
btnAdd.addEventListener('click', addArticle);
btnAdd.innerHTML = 'Добавить статью';

const articlesEl = document.createElement('div');
articlesEl.id = 'articles'

const editForm = document.createElement('form');
editForm.id = 'editForm';
editForm.style.display = 'none';
editForm.innerHTML = `
    <div class="container_form">
    <label for="editTitle">Заголовок:</label><br>
    <input type="text" id="editTitle" name="editTitle" placeholder="Новая статья"><br>
    <label for="editContent">Содержание:</label><br>
    <textarea id="editContent" name="editContent" placeholder="Введите содержание статьи..."></textarea><br><br>
    <button type="submit">Сохранить</button>
    <button type="button" onclick="cancelEdit()">Отмена</button>
    </div>    
`;


document.body.appendChild(containerEl);
containerEl.appendChild(btnAdd);
containerEl.append(articlesEl);
containerEl.appendChild(editForm);



let articlesData = [
    {
        title: 'Заголовок статьи 1',
        content: 'Текст статьи 1'
    },
    {
        title: 'Заголовок статьи 2',
        content: 'Текст статьи 2'
    },
];

loadFromLocalStorage();

// Функция для отображения списка статей
function renderArticles () {
    articlesEl.innerHTML = '';

    articlesData.forEach((article, index) => {
        const articleEl = document.createElement('div');
        articleEl.classList.add('article');

        const titleEl = document.createElement('h2');
        titleEl.innerHTML = article.title;

        const contentEl = document.createElement('p');
        contentEl.innerHTML = article.content;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('deleteArticle');
        deleteBtn.innerHTML = 'Удалить';
        deleteBtn.addEventListener('click', () => deleteArticle(index));

        const editBtn = document.createElement('button');
        editBtn.classList.add('editArticle');
        editBtn.innerHTML = 'Редактировать';
        editBtn.addEventListener('click', () => showEditForm(index));

        articleEl.appendChild(titleEl);
        articleEl.appendChild(contentEl);
        articleEl.appendChild(deleteBtn);
        articleEl.appendChild(editBtn);

        articlesEl.appendChild(articleEl);
    
    });
}

// Функция для добавления статьи
function addArticle () {
    const newArticle = {
        title: 'Заголовок',
        content: 'текст'
    };
    articlesData.push(newArticle);
    renderArticles();
    safeToLocalStorage();
}

// Функция для удаления статьи
function deleteArticle (index) {
    articlesData.splice(index, 1);
    renderArticles();
    safeToLocalStorage();
}

// Функция для отображения формы редактирования
function showEditForm(index) {
    const editTitleInput = document.getElementById('editTitle');
    const editContentInput = document.getElementById('editContent');

    editTitleInput.value = articlesData[index].title;
    editContentInput.value = articlesData[index].content;
    editForm.style.display = 'block';
    editForm.onsubmit = (event) => {
        event.preventDefault();
        articlesData[index].title = editTitleInput.value;
        articlesData[index].content = editContentInput.value;
        renderArticles();
        safeToLocalStorage();
        hideEditForm();
    };
}

// Функция для скрытия формы редактирования

function hideEditForm () {
    editForm.style.display = 'none';
}

// Функция для скрытия формы редактирования и отмены редактирования
function cancelEdit() {
    hideEditForm();
}

// Функция для сохранения данных в локальное хранилище
function safeToLocalStorage () {
    localStorage.setItem('articles', JSON.stringify(articlesData));
}

// Функция для загрузки данных из локального хранилища
function loadFromLocalStorage () {
    if (localStorage.getItem('articles')) {
        articlesData = JSON.parse(localStorage.getItem('articles'));
        renderArticles();
    }
}


// Функция для редактирования статьи
// function editArticle (index) {
//     
//     if (newTitle !== null && newContent !== null) {
//         articlesData[index].title = newTitle;
//         articlesData[index].content = newContent;
//         renderArticles();
//         safeToLocalStorage();
//     }
// }