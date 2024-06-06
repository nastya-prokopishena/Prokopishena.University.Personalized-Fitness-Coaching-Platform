document.addEventListener("DOMContentLoaded", function() {
    const userId = localStorage.getItem("user_id"); 
    fetch(`/user-role/${userId}`)
    .then(response => response.json())
    .then(data => {
      const userRole = data.role;
      if (userRole === 'Client') {
        document.getElementById('clientRecommendationsList').style.display = 'block';
        document.getElementById('clientTrainingPlansList').style.display = 'block';
      } else {
        document.getElementById('clientRecommendationsList').style.display = 'none';
        document.getElementById('clientTrainingPlansList').style.display = 'none';

      }
    })
    .catch(error => console.error(error));
    if (userId) {
        fetch(`/get-client-training-data/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                displayTrainingPlans(data);
            })
            .catch(error => {
                console.error('Помилка отримання даних:', error);
                document.getElementById('clientTrainingPlansList').innerHTML = `<p>${error.message}</p>`;
            });

        fetch(`/get-client-nutrition-data/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                displayNutritionRecommendations(data);
            })
            .catch(error => {
                console.error('Помилка отримання даних:', error);
                document.getElementById('clientRecommendationsList').innerHTML = `<p>${error.message}</p>`;
            });
    } else {
        document.getElementById('clientTrainingPlansList').innerHTML = '<p>userId не знайдено в localStorage</p>';
        document.getElementById('clientRecommendationsList').innerHTML = '<p>userId не знайдено в localStorage</p>';
    }
});

async function calculateOverallProgress(plans) {
    const overallProgress = {};
    for (const plan of plans) {
        const totalExercises = plan.TrainingExercises.length;
        const completedExercises = plan.TrainingExercises.filter(exercise => exercise.status === 'completed').length;
        const progress = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;
        overallProgress[plan.plan_id] = progress;
    }
    return overallProgress;
}

function displayOverallProgressChart(overallProgress) {
    const canvas = document.getElementById('overall-progress-chart');
    const ctx = canvas.getContext('2d');

    const labels = Object.keys(overallProgress).map(planId => `Plan ${planId}`);
    const data = Object.values(overallProgress);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Overall Progress',
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}



function displayTrainingPlans(plans) {
    const container = document.getElementById('clientTrainingPlansContainer');
    container.innerHTML = ''; 

    plans.forEach((plan, index) => {
        const progress = calculateProgress(plan);

        const planItem = document.createElement('li');
        planItem.innerHTML = `
        <div class="plan-header">
            <h3 class="training-plan__title">Training Plan ${index + 1}</h3>
            <span class="completed-status">${plan.status === 'completed' ? 'completed' : new Date(plan.created_at).toLocaleDateString()}</span>
        </div>
        <ul class="training-plan__exercise-list" style="${plan.status === 'completed' ? 'display: none;' : ''}">
            ${plan.TrainingExercises.map(exercise => `
                <li class="training-plan__exercise-item">
                    <div class="training-plan__exercise-header">
                        <p class="training-plan__item-header">Exercise: ${exercise.Exercise.exercise_name}</p>
                        <p class="training-plan__item-repetitions">Repetitions: ${exercise.repetitions}</p>
                        <p class="training-plan__item-sets">Sets: ${exercise.sets}</p>
                        <input type="checkbox" class="exercise-status-checkbox" data-exercise-id="${exercise.training_exercise_id}" ${exercise.status === 'completed' ? 'checked' : ''}>
                    </div>
                    <div class="training-plan__exercise-details" style="display: none;">
                        <p class="training-plan__item-description">${exercise.Exercise.description}</p>
                    </div>
                </li>
            `).join('')}
        </ul>
        <div class="progress">
            <div class="progress-bar" style="width: ${progress}%"></div>
        </div>
        <button class="complete-plan-button" data-plan-id="${plan.plan_id}" style="${plan.status === 'completed' ? 'display: none;' : ''}">Complete Plan</button>
        `;
        container.appendChild(planItem);
    });

    document.querySelectorAll('.complete-plan-button').forEach(button => {
        button.addEventListener('click', function() {
            const planId = this.getAttribute('data-plan-id');
            fetch(`/complete-training-plan/${planId}`, { method: 'PUT' })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    alert(data.message);
                    document.location.reload(true);
                })
                .catch(error => {
                    console.error('Помилка підтвердження плану:', error);
                });
        });
    });
    document.querySelectorAll('.plan-header').forEach(title => {
        title.addEventListener('click', function() {
            const list = this.nextElementSibling;
            list.style.display = list.style.display === 'none' ? 'block' : 'none';
        });
    });


    document.querySelectorAll('.training-plan__exercise-item').forEach(item => {
        item.addEventListener('click', function(event) {
            if (!event.target.matches('input[type="checkbox"]')) {
                const details = this.querySelector('.training-plan__exercise-details');
                details.style.display = details.style.display === 'none' ? 'block' : 'none';
            }
        });
    });

    document.querySelectorAll('.exercise-status-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const exerciseId = this.getAttribute('data-exercise-id');
            const status = this.checked ? 'completed' : 'not completed';
            fetch(`/update-exercise-status/${exerciseId}`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: status })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                alert(data.message);
                const planId = data.exercise.plan_id;
                const progressBar = document.querySelector(`#progress-bar-${planId}`);
                updateProgressBar(planId, progressBar);
            })
            .catch(error => {
                console.error('Помилка зміни статусу вправи:', error);
            });
        });
    });
    
    async function updateProgressBar(planId, progressBar) {
        try {
            const response = await fetch(`/get-plan/${planId}`);
            if (!response.ok) {
                throw new Error('Помилка отримання даних плану');
            }
            const plan = await response.json();
    
            const progress = calculateProgress(plan);
    
            progressBar.style.width = `${progress}%`;
        } catch (error) {
            console.error('Помилка оновлення прогрес-бару:', error);
        }
    }
    
    
    function calculateProgress(plan) {
        const totalExercises = plan.TrainingExercises.length;
        const completedExercises = plan.TrainingExercises.filter(exercise => exercise.status === 'completed').length;
        const progress = (completedExercises / totalExercises) * 100;
        return progress.toFixed(2); 
    }
    
    
}
function displayNutritionRecommendations(recommendations) {
    const container = document.getElementById('clientRecommendationsContainer');
    container.innerHTML = ''; 

    recommendations.forEach((recommendation, index) => {
        const recommendationItem = document.createElement('li');
        recommendationItem.innerHTML = `
        <div class="recommendation__item-header">
            <h3 class="recommendation__item-title">Recommendation ${index + 1}</h3>
            <p class="recommendation__item-date">${new Date(recommendation.recommendation_date).toLocaleDateString()}</p>
        </div>
        <p class="recommendation__item-description">${recommendation.recommendation_text}</p>
        `;
        container.appendChild(recommendationItem);
    });
}
