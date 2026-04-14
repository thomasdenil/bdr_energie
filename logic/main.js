function toggleMenu() {
  document.getElementById("nav").classList.toggle("active");
}

// home diensten sectie

document.addEventListener("DOMContentLoaded", function() {
  
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2 
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        
        const delay = target.getAttribute('data-delay') || 0;

        setTimeout(() => {
          target.classList.add('is-visible');
        }, delay);

        observer.unobserve(target);
      }
    });
  }, observerOptions);

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