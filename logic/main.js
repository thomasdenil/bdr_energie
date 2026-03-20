function toggleMenu() {
  document.getElementById("nav").classList.toggle("active");
}

// home diensten sectie

document.addEventListener("DOMContentLoaded", function() {
  
  // Selecteer alle elementen die moeten animeren
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  // Opties voor de observer: activeer als 20% van het element in beeld is
  const observerOptions = {
    root: null, // gebruik de viewport
    rootMargin: '0px',
    threshold: 0.2 
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        
        // Haal de vertraging op uit de HTML (data-delay)
        const delay = target.getAttribute('data-delay') || 0;

        // Pas de vertraging toe en voeg de zichtbaarheids-class toe
        setTimeout(() => {
          target.classList.add('is-visible');
        }, delay);

        // Stop met observeren na de eerste keer (zodat het niet telkens opnieuw animeert)
        observer.unobserve(target);
      }
    });
  }, observerOptions);

  // Start de observer voor elk element
  animatedElements.forEach(el => {
    observer.observe(el);
  });

});

function toggleFormFields() {
  const type = document.getElementById('aanvraag-type').value;
  const extraFields = document.getElementById('extra-offerte-velden');
  
  if (type === 'offerte') {
    extraFields.classList.add('show');
  } else {
    extraFields.classList.remove('show');
  }
}

window.onload = toggleFormFields;