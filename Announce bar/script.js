// Beginner-friendly JS: update the message when country changes
document.addEventListener('DOMContentLoaded', function () {
  var select = document.getElementById('country-select');
  var message = document.querySelector('.center .message');

  if (!select || !message) return;

  select.addEventListener('change', function () {
    var v = select.value;
    if (v === 'us') {
      message.textContent = 'Free Express Shipping on orders $120!';
    } else if (v === 'ca') {
      message.textContent = 'Free Express Shipping on orders CAD $160!';
    } else if (v === 'uk') {
      message.textContent = 'Free Express Shipping on orders £90!';
    }
  });
});
