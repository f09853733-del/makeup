
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuToggle.setAttribute(
    'aria-expanded',
    navLinks.classList.contains('open')
  );
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// فیلتر محصولات
const filters = document.querySelectorAll('.filter');
const products = document.querySelectorAll('.product-card');

filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(item => item.classList.remove('active'));
    button.classList.add('active');

    const category = button.dataset.filter;

    products.forEach(product => {
      const show = category === 'all' ||
        product.dataset.category === category;

      product.classList.toggle('hidden', !show);
    });
  });
});

// سبد خرید نمایشی
let cart = [];

const cartStatus = document.getElementById('cart-status');
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

document.querySelectorAll('.add-button').forEach(button => {
  button.addEventListener('click', () => {
    cart.push(button.dataset.name);
    cartStatus.textContent =
      `سبدت ${cart.length} آیتم داره ♡ ${cart.join('، ')}`;

    showToast(`🍓 ${button.dataset.name} به سبدت اضافه شد!`);
  });
});

// فرم خبرنامه؛ نمایشی و بدون ارسال واقعی
document.getElementById('newsletter-form').addEventListener('submit', event => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  document.getElementById('newsletter-status').textContent =
    `ممنون از همراهیت ♡ (دموی سایت برای ${email})`;

  event.target.reset();
});

// دکمه بازگشت به بالا
const backTop = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 400);
});

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// انیمیشن ورود بخش‌ها هنگام اسکرول
const animatedItems = document.querySelectorAll(
  '.product-card, .perks > div, .story, .gallery-grid img, .section-heading'
);

animatedItems.forEach(item => item.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animatedItems.forEach(item => observer.observe(item));
} else {
  animatedItems.forEach(item => item.classList.add('in-view'));
}
