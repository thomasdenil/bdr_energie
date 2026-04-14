let allProjects = [];

document.addEventListener('DOMContentLoaded', () => {
    fetch('./data/projecten.json')
        .then(response => {
            if (!response.ok) throw new Error("Kon JSON niet laden");
            return response.json();
        })
        .then(data => {
            allProjects = data;
            displayProjects(allProjects);
        })
        .catch(error => {
            console.error('Fout:', error);
            document.getElementById('projectGrid').innerHTML = '<p>Er is een fout opgetreden bij het laden van de projecten.</p>';
        });
});

function displayProjects(projects) {
    const grid = document.getElementById('projectGrid');
    
    if (projects.length === 0) {
        grid.innerHTML = '<p>Geen projecten gevonden in deze categorie.</p>';
        return;
    }

    grid.innerHTML = projects.map(project => `
        <div class="project-card ${project.category}">
            <div class="project-img">
                <img src="${project.image}" alt="${project.title}" loading="lazy" />
                <div class="project-tag">${project.tag}</div>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <span class="project-location">
                    <i class="fas fa-map-marker-alt"></i> ${project.location}
                </span>
            </div>
        </div>
    `).join('');
}

function filterProjects(e, category) {
    // 1. Update de actieve knop styling
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    e.currentTarget.classList.add('active');

    if (category === 'all') {
        displayProjects(allProjects);
    } else {
        const filtered = allProjects.filter(p => p.category === category);
        displayProjects(filtered);
    }
}