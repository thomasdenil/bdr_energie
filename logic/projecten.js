let allProjects = [];
let filteredProjects = [];
let visibleCount = 6;

document.addEventListener('DOMContentLoaded', () => {
    fetch('./data/projecten.json')
        .then(response => {
            if (!response.ok) throw new Error("Kon JSON niet laden");
            return response.json();
        })
        .then(data => {
            allProjects = data;
            filteredProjects = allProjects;
            displayProjects();
        })
        .catch(error => {
            console.error('Fout:', error);
            const grid = document.getElementById('projectGrid');
            if(grid) grid.innerHTML = '<p>Er is een fout opgetreden bij het laden van de projecten.</p>';
        });
});

function displayProjects() {
    const grid = document.getElementById('projectGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadingIcon = document.getElementById('loading-icon');

    if (loadingIcon) loadingIcon.style.display = 'none';

    const projectsToShow = filteredProjects.slice(0, visibleCount);

    if (projectsToShow.length === 0) {
        grid.innerHTML = '<p>Geen projecten gevonden in deze categorie.</p>';
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        return;
    }

    grid.innerHTML = projectsToShow.map(project => `
        <div class="project-card ${project.category} animate-in">
            <div class="project-img">
                <img src="${project.image}" alt="${project.title}" loading="lazy" />
                <div class="project-tags">
                    ${Array.isArray(project.tag) 
                        ? project.tag.map(t => `<span class="tag">${t}</span>`).join('') 
                        : `<span class="tag">${project.tag}</span>`
                    }
                </div>
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

    if (loadMoreBtn) {
        if (visibleCount < filteredProjects.length) {
            loadMoreBtn.style.display = 'inline-block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
}

function filterProjects(e, category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    e.currentTarget.classList.add('active');

    // Reset de teller
    visibleCount = 6;

    if (category === 'all') {
        filteredProjects = allProjects;
    } else {
        filteredProjects = allProjects.filter(p => p.category === category);
    }
    
    displayProjects();
}

function loadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadingIcon = document.getElementById('loading-icon');

    if (loadingIcon) loadingIcon.style.display = 'block';
    if (loadMoreBtn) loadMoreBtn.style.display = 'none';

    setTimeout(() => {
        visibleCount += 3;
        displayProjects();
    }, 500);
}