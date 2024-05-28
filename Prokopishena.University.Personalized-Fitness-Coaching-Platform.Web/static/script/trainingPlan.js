document.addEventListener('DOMContentLoaded', () => {
    const weeklySessionsInput = document.getElementById('weekly-sessions');
    const sessionDaysDiv = document.getElementById('session-days');

    weeklySessionsInput.addEventListener('input', () => {
        sessionDaysDiv.innerHTML = '';

        const weeklySessions = parseInt(weeklySessionsInput.value);

        for (let i = 0; i < weeklySessions; i++) {
            const dayLabel = document.createElement('label');
            dayLabel.textContent = `Session ${i + 1} Day: `;
            const dayInput = document.createElement('input');
            dayInput.setAttribute('type', 'text');
            dayInput.setAttribute('name', `session-${i + 1}-day`);
            sessionDaysDiv.appendChild(dayLabel);
            sessionDaysDiv.appendChild(dayInput);
            sessionDaysDiv.appendChild(document.createElement('br'));
        }
    });
});
