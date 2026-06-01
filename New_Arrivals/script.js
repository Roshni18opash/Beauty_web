const track = document.getElementById('productsTrack');
const thumb = document.getElementById('scrollThumb');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const tabs = document.querySelectorAll('.tab');

// Cart button fill text wrap
document.querySelectorAll('.btn-cart').forEach((btn) => {
  btn.innerHTML = '<span>' + btn.textContent.trim() + '</span>';
});

// Scroll arrows
prevBtn.addEventListener('click', () => {
  const card = track.querySelector('.product-card');
  track.scrollBy({ left: -(card.offsetWidth + 14), behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
  const card = track.querySelector('.product-card');
  track.scrollBy({ left: card.offsetWidth + 14, behavior: 'smooth' });
});

// Progress bar
function updateThumb() {
  const max = track.scrollWidth - track.clientWidth;
  if (max <= 0) {
    thumb.style.left = '0';
    return;
  }
  const percent = track.scrollLeft / max;
  thumb.style.left = percent * 65 + '%';
}

track.addEventListener('scroll', updateThumb);
window.addEventListener('resize', updateThumb);
updateThumb();

// Tabs
tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
  });
});
