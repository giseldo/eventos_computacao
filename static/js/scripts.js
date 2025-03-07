document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/events')
        .then(response => response.json())
        .then(events => {
            const eventsGrid = document.getElementById('events-grid');
            events.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.className = 'event-card';
                eventCard.innerHTML = `
                    <h2>${event.name}</h2>
                    <p><strong>Dates:</strong> ${event.dates}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                    <p><strong>Abstract Deadline:</strong> ${event.abstract_deadline}</p>
                    <p><strong>Submission Deadline:</strong> ${event.submission_deadline}</p>
                    <div class="tags">
                        ${event.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                `;
                eventsGrid.appendChild(eventCard);
            });
        });
});
