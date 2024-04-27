document.addEventListener('DOMContentLoaded', () => {
    const createInstructionVideoForm = document.getElementById('createInstructionVideoForm');
  
    createInstructionVideoForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const formData = {
        title: createInstructionVideoForm.title.value,
        youtube_url: createInstructionVideoForm.youtubeUrl.value
      };
  
      try {
        const response = await fetch('/instructionVideos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          console.error('Error creating instruction video:', response.statusText);
          return;
        }
  
        alert('Instruction video created successfully!');
        createInstructionVideoForm.reset(); 
        location.reload(); 
      } catch (error) {
        console.error('Error creating instruction video:', error);
      }
    });
    fetchVideos();

  // Функція для завантаження відео
  function fetchVideos() {
    var request = new XMLHttpRequest();
    request.open('GET', '/instructionVideos', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var videos = JSON.parse(request.responseText);
        displayVideos(videos);
      } else {
        console.error('Error fetching videos:', request.statusText);
      }
    };

    request.onerror = function() {
      console.error('Error fetching videos:', request.statusText);
    };

    request.send();
  }

  // Функція для відображення відео
  // Функція для відображення відео
function displayVideos(videos) {
    var videoList = document.querySelector('.video-list');
    videoList.innerHTML = ''; // Очищення списку відео перед відображенням
  
    // Створюємо таблицю
    var table = document.createElement('table');
  
    videos.forEach(function(video) {
      // Створюємо рядок таблиці
      var row = document.createElement('tr');
  
  
      // Додаємо посилання в другий стовпчик
      var linkCell = document.createElement('td');
      var link = document.createElement('a');
      link.textContent = video.title; // Використовуємо назву відео як текст посилання
      link.href = video.youtube_url;
      link.target = '_blank';
      linkCell.appendChild(link);
      row.appendChild(linkCell);
  
      // Додаємо рядок у таблицю
      table.appendChild(row);
    });
  
    // Додаємо таблицю до списку відео
    videoList.appendChild(table);
  
    // Якщо відео більше 20, ініціалізуємо слайдер
    if (videos.length > 10) {
      $('.video-list').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      });
    }
  }
  
  });
  