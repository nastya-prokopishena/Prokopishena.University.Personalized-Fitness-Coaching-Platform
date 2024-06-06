document.addEventListener('DOMContentLoaded', function() {
  const userId = localStorage.getItem('user_id');
  // Fetch user role
  fetch(`/user-role/${userId}`)
    .then(response => response.json())
    .then(data => {
      const userRole = data.role;
      if (userRole === 'Trainer') {
        document.getElementById('createPlan').style.display = 'block';
        document.getElementById('createRecommendation').style.display = 'block';
        document.getElementById('recommendationsList').style.display = 'block';
      } else {
        document.getElementById('createPlan').style.display = 'none';
        document.getElementById('createRecommendation').style.display = 'none';
        document.getElementById('recommendationsList').style.display = 'none';

      }
    })
    .catch(error => console.error(error));
  fetch(`/get-trainer-id/${userId}`)
    .then(response => response.json())
    .then(data => {
      const trainerId = data.trainer_id;
      localStorage.setItem('trainer_id', trainerId);
      return fetch(`/trainer/${trainerId}/clients`);
    })
    .then(response => response.json())
    .then(clients => {
      const clientSelect = document.getElementById('clientSelect');
      clients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.client_id;
        option.dataset.clientId = client.client_id;
        option.textContent = `${client.name} ${client.surname}`;
        clientSelect.appendChild(option);
      });

      return fetch('/exercises');
    })
    .then(response => response.json())
    .then(exercises => {
      const exerciseSelects = document.querySelectorAll('.exerciseSelect');
      exerciseSelects.forEach(select => {
        exercises.forEach(exercise => {
          const option = document.createElement('option');
          option.value = exercise.exercise_id;
          option.textContent = exercise.exercise_name;
          select.appendChild(option);
        });
      });
    })
    .catch(error => console.error(error));

  document.getElementById('addExercise').addEventListener('click', function() {
    const container = document.getElementById('exercisesContainer');
    const newExercise = container.cloneNode(true);
    newExercise.querySelectorAll('input').forEach(input => input.value = '');
    container.parentNode.insertBefore(newExercise, container.nextSibling);
  });

  document.getElementById('createPlan').addEventListener('submit', function(event) {
    event.preventDefault();
    const trainerId = localStorage.getItem('trainer_id');
    const clientId = document.getElementById('clientSelect').value;
    const exercises = Array.from(document.querySelectorAll('#exercisesContainer')).map(container => {
      return {
        exercise_id: container.querySelector('.exerciseSelect').value,
        repetitions: container.querySelector('.repetitions').value,
        sets: container.querySelector('.sets').value
      };
    });

    fetch(`/trainer/${trainerId}/clients/${clientId}/plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ exercises })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Training plan created:', data);
      alert('Training plan created successfully');

      document.getElementById('clientSelect').selectedIndex = 0;
      const exerciseContainers = document.querySelectorAll('#exercisesContainer');
      exerciseContainers.forEach((container, index) => {
        if (index === 0) {
          container.querySelector('.exerciseSelect').selectedIndex = 0;
          container.querySelector('.repetitions').value = '';
          container.querySelector('.sets').value = '';
        } else {
          container.remove();
        }
      });
    })
    .catch(error => console.error(error));
  });
});
