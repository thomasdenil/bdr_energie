function toggleMenu() {
  document.getElementById("nav").classList.toggle("active");
}

function scrollReviews(direction) {
  const track = document.getElementById("reviewsTrack");
  const scrollAmount = 320;

  track.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth"
  });
}