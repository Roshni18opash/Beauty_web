const track = document.getElementById('productsTrack');
const thumb = document.getElementById('scrollThumb');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// thumb settings
const MIN_THUMB_WIDTH = 30; // start width in percent
const MAX_THUMB_WIDTH = 100; // maximum width in percent
const GAP_BETWEEN_CARDS = 16; // same as --gap in CSS

thumb.style.width = MIN_THUMB_WIDTH + '%';
thumb.style.left = '0%';

function setThumbWidth(width) {
  const safeWidth = Math.min(MAX_THUMB_WIDTH, Math.max(MIN_THUMB_WIDTH, width));
  thumb.style.width = safeWidth + '%';
}

function getThumbStep(scrollAmount) {
  const totalWidth = track.scrollWidth;
  return Math.round((scrollAmount / totalWidth) * 100 * 100) / 100;
}

function updateButtons() {
  const maxScroll = track.scrollWidth - track.clientWidth;
  const atStart = track.scrollLeft <= 1;
  const atEnd = track.scrollLeft >= maxScroll - 1;

  prevBtn.disabled = atStart;
  nextBtn.disabled = atEnd;

  if (atStart) {
    setThumbWidth(MIN_THUMB_WIDTH);
  } else if (atEnd) {
    setThumbWidth(MAX_THUMB_WIDTH);
  }
}

function scrollByCard(amount) {
  track.scrollBy({ left: amount, behavior: 'smooth' });
}

prevBtn.onclick = () => {
  if (track.scrollLeft <= 1) return;

  const cardWidth = track.querySelector('.product-card').offsetWidth + GAP_BETWEEN_CARDS;
  const scrollAmount = Math.min(cardWidth, track.scrollLeft);
  scrollByCard(-scrollAmount);

  const step = getThumbStep(scrollAmount);
  setThumbWidth(parseFloat(thumb.style.width) - step);

  setTimeout(updateButtons, 500);
};

nextBtn.onclick = () => {
  const maxScroll = track.scrollWidth - track.clientWidth;
  if (track.scrollLeft >= maxScroll - 1) return;

  const cardWidth = track.querySelector('.product-card').offsetWidth + GAP_BETWEEN_CARDS;
  const scrollAmount = Math.min(cardWidth, maxScroll - track.scrollLeft);
  scrollByCard(scrollAmount);

  const step = getThumbStep(scrollAmount);
  setThumbWidth(parseFloat(thumb.style.width) + step);

  setTimeout(updateButtons, 500);
};

track.addEventListener('scroll', updateButtons);
window.addEventListener('resize', updateButtons);
updateButtons();

document.querySelectorAll('.tab').forEach((tab) => {
  tab.onclick = () => {
    document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
  };
});
