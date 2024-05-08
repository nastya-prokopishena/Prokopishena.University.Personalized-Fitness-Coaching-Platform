window.onload = function() {
    // Завантаження відео з сервера
    fetch('/instructionVideos')
    .then(response => response.json())
    .then(data => {
        displayVideos(data);
        addSwitchButtons(data);
    })
    .catch(error => console.error('Error fetching videos:', error));

    // Відображення відео на сторінці
    function displayVideos(videos) {
        var videoContainer = document.getElementById('video-container');
        var maxVideosToShow = 4;

        // Відображення першої сторінки відео
        displayPage(1, maxVideosToShow, videos, videoContainer);
    }

    // Додавання кнопок перемикання між відео
    function addSwitchButtons(videos) {
        var switchButtonContainer = document.createElement('div');
        switchButtonContainer.classList.add('switch-button-container');
        document.body.appendChild(switchButtonContainer);

        var maxVideosToShow = 4;
        var totalPages = Math.ceil(videos.length / maxVideosToShow);

        for (var i = 1; i <= totalPages; i++) {
            var button = document.createElement('button');
            button.textContent = i;
            button.addEventListener('click', function() {
                var pageNumber = parseInt(this.textContent);
                var videoContainer = document.getElementById('video-container');
                displayPage(pageNumber, maxVideosToShow, videos, videoContainer);
            });
            switchButtonContainer.appendChild(button);
        }
    }

    // Відображення відео на певній сторінці
    function displayPage(pageNumber, maxVideosToShow, videos, container) {
        container.innerHTML = ''; // Очистити контейнер

        var startIndex = (pageNumber - 1) * maxVideosToShow;
        var endIndex = startIndex + maxVideosToShow;

        var videosToShow = videos.slice(startIndex, endIndex);
        videosToShow.forEach(function(video) {
            var videoHtml = '<div class="video-item">' +
                                '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + extractVideoId(video.youtube_url) + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>' +
                                '<p class="video-title">' + video.title + '</p>' +
                            '</div>';

            // Додавання відео до контейнера
            container.innerHTML += videoHtml;
        });
    }

    // Видобуття ідентифікатора відео з URL YouTube
    function extractVideoId(url) {
        var videoId = url.split('v=')[1];
        var ampersandPosition = videoId.indexOf('&');
        if(ampersandPosition !== -1) {
            videoId = videoId.substring(0, ampersandPosition);
        }
        return videoId;
    }
};
