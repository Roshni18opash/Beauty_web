const track = document.getElementById('productsTrack');
const thumb = document.getElementById('scrollThumb');

document.querySelectorAll('.btn-cart').forEach((btn) => {
  btn.innerHTML = '<span>' + btn.textContent.trim() + '</span>';
});

document.getElementById('prevBtn').onclick = () => {
  const w = track.querySelector('.product-card').offsetWidth + 16;
  track.scrollBy({ left: -w, behavior: 'smooth' });
};

document.getElementById('nextBtn').onclick = () => {
  const w = track.querySelector('.product-card').offsetWidth + 16;
  track.scrollBy({ left: w, behavior: 'smooth' });
};

function updateBar() {
  const max = track.scrollWidth - track.clientWidth;
  if (max <= 0) return;
  const w = (track.clientWidth / track.scrollWidth) * 100;
  thumb.style.width = w + '%';
  thumb.style.left = (track.scrollLeft / max) * (100 - w) + '%';
}

track.onscroll = updateBar;
window.onresize = updateBar;
updateBar();

document.querySelectorAll('.tab').forEach((tab) => {
  tab.onclick = () => {
    document.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
  };
});
