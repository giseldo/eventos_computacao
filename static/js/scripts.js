document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/events')
        .then(response => response.json())
        .then(events => {
            const eventsGrid = document.getElementById('events-grid');
            events.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.className = 'event-card';

                const timeRemaining = calculateTimeRemaining(event.submission_deadline);

                eventCard.innerHTML = `
                    <h2>${event.name}</h2>
                    <p><strong>Dates:</strong> ${event.dates}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                    <p><strong>Abstract Deadline:</strong> ${event.abstract_deadline}</p>
                    <p><strong>Submission Deadline:</strong> ${event.submission_deadline}</p>
                    <p class="time-remaining">${timeRemaining}</p>
                    <div class="tags">
                        ${event.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                `;
                eventCard.addEventListener('click', () => openModal(event, timeRemaining));
                eventsGrid.appendChild(eventCard);
            });
        });

    const modal = document.getElementById('event-modal');
    const closeButton = document.querySelector('.close-button');

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});

function calculateTimeRemaining(deadline) {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const timeDiff = deadlineDate - now;

    if (timeDiff <= 0) {
        return 'Deadline passed';
    }

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return `in about ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
}

function openModal(event, timeRemaining) {
    document.getElementById('modal-event-name').innerText = event.name;
    document.getElementById('modal-event-full-name').innerText = event.full_name; // Add this line
    document.getElementById('modal-event-dates').innerText = event.dates;
    document.getElementById('modal-event-location').innerText = event.location;
    document.getElementById('modal-event-abstract-deadline').innerText = event.abstract_deadline;
    document.getElementById('modal-event-submission-deadline').innerText = event.submission_deadline;
    document.getElementById('modal-event-time-remaining').innerText = timeRemaining;
    document.getElementById('modal-event-tags').innerHTML = event.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    document.getElementById('modal-event-link').href = event.link;

    const modal = document.getElementById('event-modal');
    modal.style.display = 'block';
}
