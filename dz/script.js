// Получение данных из localStorage или установка значений по умолчанию
function getActivitiesData() {
    const data = localStorage.getItem('activitiesData');
    if (data) {
        return JSON.parse(data);
    }
    return [  
        {
            title: 'Йога',
            time: '9:00 - 10:00',
            maxParticipants: 20,
            currentParticipants: 15,
            isEnrolled: false,
        },
        {
            title: 'Пилатес',
            time: '10:00 - 11:00',
            maxParticipants: 15,
            currentParticipants: 15,
            isEnrolled: false,
        },
        {
            title: 'Бокс',
            time: '11:00 - 12:00',
            maxParticipants: 10,
            currentParticipants: 8,
            isEnrolled: false,
        },
        {
            title: 'Кардио',
            time: '12:00 - 13:00',
            maxParticipants: 25,
            currentParticipants: 20,
            isEnrolled: false,
        },
    ];
}

function safeActivitiesData() {
    localStorage.setItem('activitiesData', JSON.stringify(activitiesData));
}

let activitiesData = getActivitiesData();
let selectedActivityIndex = null;
let actionType = null;



// Функция для отображения занятий
function renderActivities() {
    const activitiesContainer = document.getElementById('activities');
    activitiesContainer.innerHTML = '';

    activitiesData.forEach((activity, index) => {
        const activityEl = document.createElement('div');
        activityEl.classList.add('activity', 'card', 'p-3', 'col-md-4', 'mb-4');

        const titleEl = document.createElement('h2');
        titleEl.classList.add('card-title');
        titleEl.textContent = activity.title;

        const timeEl = document.createElement('p');
        timeEl.classList.add('card-text');
        timeEl.textContent = `время: ${activity.time}`;

        const participansEl = document.createElement('p');
        participansEl.classList.add('card-text');
        participansEl.textContent = `Всего мест: ${activity.maxParticipants}`;

        const currentParticipantsEl = document.createElement('p');
        currentParticipantsEl.classList.add('card-text');
        currentParticipantsEl.textContent = `Записано: ${activity.currentParticipants}`;

        const btnContainer = document.createElement('div');
        btnContainer.classList.add('d-flex', 'justify-content-between');

        const enrollBtn = document.createElement('button');
        enrollBtn.classList.add('btn', 'btn-primary');
        enrollBtn.style.backgroundColor = activity.isEnrolled ? 'green' : '#0d6efd';
        enrollBtn.textContent = activity.isEnrolled ? 'Вы записаны!' : 'Записаться'
        enrollBtn.disabled = activity.currentParticipants >= activity.maxParticipants || activity.isEnrolled;
        enrollBtn.addEventListener('click', () => {selectedActivityIndex = index;
        actionType = 'enroll';
        const enrollModal = new bootstrap.Modal(document.getElementById('enrollModal'));
        enrollModal.show(); 
    });

        const cancelBtn = document.createElement('button');
        cancelBtn.classList.add('btn', 'btn-secondary');
        cancelBtn.textContent = 'Отменить запись';
        cancelBtn.disabled =!activity.isEnrolled;
        cancelBtn.addEventListener('click', () => {selectedActivityIndex = index; actionType = 'cancel'; 
        const cancelModal = new bootstrap.Modal(document.getElementById('cancelModal'));
        cancelModal.show();
        });

        btnContainer.append(enrollBtn, cancelBtn);

        activityEl.append(titleEl, timeEl, participansEl, btnContainer, currentParticipantsEl);
        activitiesContainer.append(activityEl);
    })
};

// Обработчик для кнопки подтверждения записи
document.getElementById('confirmEnroll').addEventListener('click', () => {
    if (selectedActivityIndex !== null && actionType === 'enroll') {
        activitiesData[selectedActivityIndex].currentParticipants++;
        activitiesData[selectedActivityIndex].isEnrolled = true;
        safeActivitiesData();
        renderActivities();
    }
    const enrollModal = bootstrap.Modal.getInstance(document.getElementById('enrollModal'));
    enrollModal.hide();
    
});

// Обработчик для кнопки подтверждения отмены записи
document.getElementById('confirmCancel').addEventListener('click', () => {
    if (selectedActivityIndex !== null && actionType === 'cancel') {
        activitiesData[selectedActivityIndex].currentParticipants--;
        activitiesData[selectedActivityIndex].isEnrolled = false;
        safeActivitiesData();
        renderActivities();
    }
    const cancelModal = bootstrap.Modal.getInstance(document.getElementById('cancelModal'));
    cancelModal.hide();
    
});

// Загрузка данных и рендеринг при загрузке страницы
window.onload = function() {
    renderActivities()
};