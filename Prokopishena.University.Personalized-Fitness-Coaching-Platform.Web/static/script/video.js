window.onload = function() {
    // Завантаження відео з сервера
    fetch('/instructionVideos')
    .then(response => response.json())
    .then(data => displayVideos(data))
    .catch(error => console.error('Error fetching videos:', error));

    // Відображення відео на сторінці
    function displayVideos(videos) {
        var videoContainer = document.getElementById('video-container');

        videos.forEach(function(video) {
            // Створення HTML-коду для відео з посиланням на окрему сторінку
            var videoHtml = '<div class="video-item">' +
                                '<a href="/video?id=' + video.id + '" target="_blank">' + video.title + '</a>' +
                            '</div>';

            // Додавання відео до контейнера
            videoContainer.innerHTML += videoHtml;
        });
    }
};
