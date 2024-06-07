document.addEventListener('DOMContentLoaded', function() {
  const userId = localStorage.getItem('user_id');

  fetch(`/get-trainer-id/${userId}`)
      .then(response => response.json())
      .then(data => {
          const trainerId = data.trainer_id;
          localStorage.setItem('trainer_id', trainerId);
          return fetch(`/trainer/${trainerId}/clients`);
      })
      .then(response => response.json())
      .then(clients => {
          const clientSelectRecommendation = document.getElementById('clientSelectRecommendation');
          clients.forEach(client => {
              const option = document.createElement('option');
              option.value = client.client_id;
              option.dataset.clientId = client.client_id;
              option.textContent = `${client.name} ${client.surname}`;
              clientSelectRecommendation.appendChild(option);
          });
      })
      .catch(error => console.error(error));

  document.getElementById('createRecommendation').addEventListener('submit', function(event) {
      event.preventDefault();
      const trainerId = localStorage.getItem('trainer_id');
      const clientId = document.getElementById('clientSelectRecommendation').value;
      const recommendationText = document.getElementById('recommendationText').value;

      fetch('/nutrition-recommendations', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ trainer_id: trainerId, client_id: clientId, recommendation_text: recommendationText })
      })
      .then(response => response.json())
      .then(data => {
          console.log('Recommendation created:', data);
          alert('Nutrition recommendation created successfully');
          fetchRecommendations();
      })
      .catch(error => console.error(error));
  });

  function fetchRecommendations() {
      const trainerId = localStorage.getItem('trainer_id');

      fetch(`/nutrition-recommendations/${trainerId}`)
          .then(response => response.json())
          .then(recommendations => {
              const container = document.getElementById('recommendationsContainer');
              const recommendationsList = document.getElementById('recommendationsList');
              if (recommendations.length === 0) {
                  recommendationsList.querySelector('h2').textContent = 'Recommendations have not been created yet';
                  container.innerHTML = '';
              } else {
                  recommendationsList.querySelector('h2').textContent = 'Nutrition Recommendations';
                  container.innerHTML = '';
                  recommendations.forEach(recommendation => {
                      const clientName = `${recommendation.client.user.name} ${recommendation.client.user.surname}`;
                      const li = document.createElement('li');
                      li.className = 'recommendation__list-item';
                      li.innerHTML = `
                          <div class="recommendation__item-header">
                              <span class="recommendation__item-title">${clientName}</span>
                              <button class="recommendation__delete-button">Delete</button>
                          </div>
                          <div class="recommendation__item-description">${recommendation.recommendation_text}</div>
                      `;
                      li.querySelector('.recommendation__delete-button').addEventListener('click', () => deleteRecommendation(recommendation.recommendation_id));
                      container.appendChild(li);
                  });
              }
          })
          .catch(error => console.error(error));
  }

  function deleteRecommendation(recommendationId) {
      fetch(`/nutrition-recommendations/${recommendationId}`, {
          method: 'DELETE'
      })
      .then(() => {
          console.log('Recommendation deleted');
          fetchRecommendations();
      })
      .catch(error => console.error(error));
  }

  fetchRecommendations();
});
