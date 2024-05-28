document.addEventListener('DOMContentLoaded', function() {
  const userId = localStorage.getItem('user_id');

  fetch(`/get-trainer-id/${userId}`)
    .then(response => response.json())
    .then(data => {
      const trainerId = data.trainer_id;
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
    })
    .catch(error => console.error(error));

  const planDurationInput = document.getElementById('planDuration');
  const trainingsPerWeekInput = document.getElementById('trainingsPerWeek');
  const trainingSessionsDiv = document.getElementById('trainingSessions');

  document.getElementById('createPlanForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const planDuration = formData.get('plan_duration');
    const trainingsPerWeek = formData.get('trainings_per_week');
    const clientId = document.getElementById('clientSelect').value;
    const trainerId = localStorage.getItem('trainer_id');

    const trainingSessions = [];
    const numTrainingsPerWeek = parseInt(trainingsPerWeek);
    for (let i = 0; i < numTrainingsPerWeek; i++) {
      const sessionIndex = i;
      const numExercises = parseInt(formData.get(`exercise_count_${i}`));
      const exercises = [];
      for (let j = 0; j < numExercises; j++) {
        const exerciseId = formData.get(`exercise_${i}_${j}`);
        const repetitions = formData.get(`repetitions_${i}_${j}`);
        exercises.push({ exercise_id: exerciseId, repetitions: repetitions });
      }
      trainingSessions.push({ session_number: i + 1, exercises: exercises });
    }

    fetch('/training-plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        trainer_id: trainerId,
        client_id: clientId,
        plan_duration: planDuration,
        trainings_per_week: trainingsPerWeek,
        training_sessions: trainingSessions
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Response from server:', data); // Вивід відповіді з сервера у консоль
    })
    .catch(error => {
      console.error(error);
      alert('Error creating training plan');
    });
  });

  document.getElementById('confirmDataButton').addEventListener('click', function() {
    if (planDurationInput.checkValidity() && trainingsPerWeekInput.checkValidity()) {
      generateTrainingSessions();
    } else {
      alert('Будь ласка, введіть коректні дані для підтвердження.');
    }
  });

  function generateTrainingSessions() {
    const numTrainingsPerWeek = parseInt(trainingsPerWeekInput.value);
    trainingSessionsDiv.innerHTML = '';

    for (let i = 0; i < numTrainingsPerWeek; i++) {
      const trainingSessionDiv = document.createElement('div');
      trainingSessionDiv.classList.add('trainingSession');
      const sessionHeader = document.createElement('h3');
      sessionHeader.textContent = `Тренування ${i + 1}`;
      trainingSessionDiv.appendChild(sessionHeader);
      const exerciseCountLabel = document.createElement('label');
      exerciseCountLabel.textContent = 'Кількість вправ в тренуванні:';
      const exerciseCountSelect = document.createElement('select');
      exerciseCountSelect.name = `exercise_count_${i}`;
      for (let j = 1; j <= 10; j++) {
        const option = document.createElement('option');
        option.value = j;
        option.textContent = j;
        exerciseCountSelect.appendChild(option);
      }
      trainingSessionDiv.appendChild(exerciseCountLabel);
      trainingSessionDiv.appendChild(exerciseCountSelect);
      const exercisesDiv = document.createElement('div');
      exercisesDiv.classList.add('exercises');
      trainingSessionDiv.appendChild(exercisesDiv);
      exerciseCountSelect.addEventListener('change', function() {
        generateExercisesFields(exercisesDiv, i, exerciseCountSelect.value);
      });
      generateExercisesFields(exercisesDiv, i, exerciseCountSelect.value);
      trainingSessionsDiv.appendChild(trainingSessionDiv);
    }
  }

  function generateExercisesFields(exercisesDiv, sessionIndex, numExercises) {
    exercisesDiv.innerHTML = '';

    fetch('/exercises')
      .then(response => response.json())
      .then(exercises => {
        for (let j = 0; j < numExercises; j++) {
          const exerciseWrapper = document.createElement('div');
          exerciseWrapper.classList.add('exerciseWrapper');
          const exerciseLabel = document.createElement('label');
          exerciseLabel.textContent = `Вправа ${j + 1}:`;
          exerciseWrapper.appendChild(exerciseLabel);
          const exerciseSelect = document.createElement('select');
          exerciseSelect.name = `exercise_${sessionIndex}_${j}`;
          exercises.forEach(exercise => {
            const option = document.createElement('option');
            option.value = exercise.exercise_id;
            option.textContent = exercise.exercise_name;
            exerciseSelect.appendChild(option);
          });
          exerciseWrapper.appendChild(exerciseSelect);
          const repetitionsLabel = document.createElement('label');
          repetitionsLabel.textContent = 'Кількість повторень:';
          exerciseWrapper.appendChild(repetitionsLabel);
          const repetitionsInput = document.createElement('input');
          repetitionsInput.type = 'number';
          repetitionsInput.name = `repetitions_${sessionIndex}_${j}`;
          repetitionsInput.min = 1;
          repetitionsInput.required = true;
          exerciseWrapper.appendChild(repetitionsInput);
          exercisesDiv.appendChild(exerciseWrapper);
        }
      })
      .catch(error => console.error(error));
  }
});
