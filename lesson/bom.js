console.log(navigator.userAgent);
console.log(navigator.cookieEnabled);
console.log(navigator.doNotTrack);
console.log(navigator.geolocation);

// userAgent - информация о браузере
// cookieEnabled - включены ли cookie
// doNotTrack - включена ли опция запрета на отслеживание
// geolocation - геолокаци, в данном случае не активированная


// Напишите функцию findClosestCity(userLocation, cities), которая принимает текущее местоположение пользователя в формате [latitube, longitube] и массив городов с их координатами в формате {name: 'City', location: [latitube, longitube]}. Функция должна вернкть название ближайшего города к пользователю.

// console.log(location);
// location.href = './first.html'; // переход на страницу
function calculateDistance(location1, location2) {
    const [lat1, lon1] = location1; // Разбирает координаты первого местоположения на широту и долготу
    const [lat2, lon2] = location2; // Разбирает координаты второго местоположения на широту и долготу

    const toRad = value => (value * Math.PI) / 180; // Преобразует значение в радианы
    const R = 6371; // Радиус Земли в километрах

    const dLat = toRad(lat2 - lat1); // Вычисляет разницу широты и долготы
    const dLon = toRad(lon2 - lon1); // Вычисляет разницу  долготы и радианы
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + // Вычисляет квадрат синуса половины разницы широты
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLat / 2); // Вычисляет квадрат синуса половины разницы долготы и учитывает конусы широт
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Вычисляет центральный угол между двумя местоположениями
    const distance = R * c; // Вычисляет расстояние между двумя местоположениями на сфере земли

    return distance; // Возвращает расстояние между двумя местоположениями
}

function findClosestCity(cities) {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) { // Проверяет поддержку геолокации в браузере
            navigator.geolocation.getCurrentPosition(
                position => {
                    const userLocation = [position.coords.latitude, position.coords.longitude]; // Получает текущие координаты пользователя
                    let closestCity = null; // Переменная для хранения ближайшего города
                    let shortesDistance = Infinity; // Переменная  для хранения кратчайшего расстояния

                    cities.forEach(city => { // Перебирает все города из массива cities
                        const distance = calculateDistance(userLocation, city.location) // Вычисляет расстояние  между местоположением пользователя и текущим городом
                        if (distance < shortesDistance) { // Если расстояние меньше кратчайшего расстояния
                            shortesDistance = distance; // Записывает расстояние в кратчайшее расстояние
                            closestCity = city.name; // Записывает название ближайшего города
                        }
                    });
                    resolve(closestCity); // Возвращает ближайший город
                },
                error => {
                    if (error.code === error.PERMISSION_DENIED) {
                        reject(new Error('Пользователь отказал в доступе к геолокации')); // Возвращает ошибку
                    } else {
                        reject(new Error('Ошибка при получении местоположения')); // Возвращает ошибку
                    }
                } 
                );
            } else {
                reject(new Error('Ваш браузер не поддерживает геолокацию')); // Возвращает ошибку
            }  
            
    });
}

// Пример использования
const cities = [
    { name: 'Москва', location: [55.755826, 37.6173] },
    { name: 'Санкт-Петербург', location: [59.939095, 30.315868] },
    { name: 'Новосибирск', location: [55.041529, 82.934601] },
    { name: 'Екатеринбург', location: [56.838926, 60.604017] },
    { name: 'Нижний Новгород', location: [56.328651, 44.002055] },
];

findClosestCity(cities)
    .then(closestCity => console.log(`Ближайший город: ${closestCity}`))
    .catch(error => console.error(error));