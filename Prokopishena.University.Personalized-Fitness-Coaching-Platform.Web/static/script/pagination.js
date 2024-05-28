// Функція для перемикання до наступного пункту
function moveToNext(trainers, currentIndex) {
    trainers[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % trainers.length;
    trainers[currentIndex].classList.add("active");
    return currentIndex;
}

// Функція для перемикання до попереднього пункту
function moveToPrevious(trainers, currentIndex) {
    trainers[currentIndex].classList.remove("active");
    currentIndex = (currentIndex - 1 + trainers.length) % trainers.length;
    trainers[currentIndex].classList.add("active");
    return currentIndex;
}

// Основна функція для ініціалізації пагінації
export function initPagination() {
    // ваш код для отримання списку тренерів

    const trainerList = document.getElementById('trainer-list');
    const trainers = trainerList.getElementsByTagName("li");

    if (trainers.length > 5) {
        let currentIndex = 0;

        const nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.addEventListener("click", function() {
            currentIndex = moveToNext(trainers, currentIndex);
        });
        trainerList.parentElement.insertBefore(nextButton, trainerList.nextElementSibling);

        const prevButton = document.createElement("button");
        prevButton.textContent = "Previous";
        prevButton.addEventListener("click", function() {
            currentIndex = moveToPrevious(trainers, currentIndex);
        });
        trainerList.parentElement.insertBefore(prevButton, trainerList.nextElementSibling);

        trainers[currentIndex].classList.add("active");
    }
}
