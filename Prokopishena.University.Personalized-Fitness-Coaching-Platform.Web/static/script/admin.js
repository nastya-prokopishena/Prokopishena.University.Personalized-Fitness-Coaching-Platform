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
  const createQuoteForm = document.getElementById('createQuoteForm');
        const quoteList = document.querySelector('.quote-list');

        // Function to fetch quotes from server and display them
        function fetchQuotes() {
            fetch('/quotes')
                .then(response => response.json())
                .then(quotes => {
                    quoteList.innerHTML = ''; // Clear existing list
                    quotes.forEach(quote => {
                        const quoteElement = document.createElement('div');
                        quoteElement.textContent = quote.quote_text;

                        // Create delete button
                        const deleteButton = document.createElement('button');
                        deleteButton.textContent = 'Delete';
                        deleteButton.addEventListener('click', function () {
                            deleteQuote(quote.quote_id);
                        });

                        // Append delete button to quote element
                        quoteElement.appendChild(deleteButton);

                        // Append quote element to quote list
                        quoteList.appendChild(quoteElement);
                    });
                })
                .catch(error => console.error('Error fetching quotes:', error));
        }

        // Function to delete a quote
        function deleteQuote(quoteId) {
            fetch(`/quotes/${quoteId}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete quote');
                    }
                    return response.json();
                })
                .then(() => {
                    fetchQuotes(); // Refresh quote list after deleting quote
                })
                .catch(error => console.error('Error deleting quote:', error));
        }

        // Event listener for quote submission form
        createQuoteForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const quoteText = document.getElementById('quoteText').value;

            fetch('/quotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quoteText })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to add quote');
                    }
                    return response.json();
                })
                .then(() => {
                    fetchQuotes(); // Refresh quote list after adding new quote
                    document.getElementById('quoteText').value = ''; // Clear input field
                })
                .catch(error => console.error('Error adding quote:', error));
        });

        // Initial fetch of quotes when the page loads
        fetchQuotes();
    });
