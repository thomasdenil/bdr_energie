let isAnimating = false;


function scrollReviews(direction) {
    if (isAnimating) return;
    
    const track = document.getElementById("reviewsTrack");
    const cards = track.querySelectorAll(".review");
    
    const style = window.getComputedStyle(track);
    const gap = parseInt(style.gap) || 20;
    const step = cards[0].offsetWidth + gap;
    
    isAnimating = true;
    
    if (direction === 1) {
        track.style.transition = "transform 0.5s ease";
        track.style.transform = `translateX(-${step}px)`;
        
        setTimeout(() => {
            track.style.transition = "none";
            track.appendChild(track.firstElementChild);
            track.style.transform = "translateX(0)";
            isAnimating = false;
        }, 500);
        
    } else {
        track.style.transition = "none";
        track.prepend(track.lastElementChild);
        track.style.transform = `translateX(-${step}px)`;
        
        track.offsetHeight; // force reflow
        
        track.style.transition = "transform 0.5s ease";
        track.style.transform = "translateX(0)";
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
}

let autoSlide = setInterval(() => {
  scrollReviews(1);
}, 2000); // elke 2 seconden

const wrapper = document.querySelector(".recensies-wrapper");

wrapper.addEventListener("mouseenter", () => {
  clearInterval(autoSlide);
});

wrapper.addEventListener("mouseleave", () => {
  autoSlide = setInterval(() => {
    scrollReviews(1);
  }, 2000);
});