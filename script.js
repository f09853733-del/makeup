
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const menuCards = document.querySelectorAll(".menu-card");
  const emptyMessage = document.getElementById("emptyMessage");
  const toast = document.getElementById("toast");
  const backToTop = document.getElementById("backToTop");

  let activeFilter = "all";
  let toastTimer;

  // نمایش پیام زیبا در پایین صفحه
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }

  // منوی موبایل
  menuToggle.setAttribute("aria-expanded", "false");

  menuToggle.addEventListener("click", () => {
    const opened = navMenu.classList.toggle("open");

    menuToggle.textContent = opened ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", String(opened));
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // فیلتر کردن منوی کافه
  function filterMenu(category) {
    activeFilter = category;
    let visibleItems = 0;

    menuCards.forEach(card => {
      const matches =
        category === "all" || card.dataset.category === category;

      card.hidden = !matches;

      if (matches) visibleItems++;
    });

    filterButtons.forEach(button => {
      const active = button.dataset.filter === category;

      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    emptyMessage.hidden = visibleItems !== 0;
  }

  filterButtons.forEach(button => {
    button.setAttribute(
      "aria-pressed",
      String(button.classList.contains("active"))
    );

    button.addEventListener("click", () => {
      filterMenu(button.dataset.filter);
    });
  });

  // سفارش نمایشی
  const orders = [];

  document.querySelectorAll(".order-btn").forEach(button => {
    button.addEventListener("click", () => {
      const productName = button.dataset.name;
      orders.push(productName);

      button.textContent = "✓ اضافه شد";

      showToast(`🍓 ${productName} به سفارش نمایشی تو اضافه شد!`);

      setTimeout(() => {
        button.textContent = "+ سفارش";
      }, 1200);
    });
  });

  // فرم خبرنامه؛ بدون ارسال واقعی ایمیل
  const newsletterForm = document.getElementById("newsletterForm");
  const emailInput = document.getElementById("emailInput");
  const newsletterMessage =
    document.getElementById("newsletterMessage");

  newsletterForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!emailInput.checkValidity()) {
      emailInput.reportValidity();
      return;
    }

    newsletterMessage.textContent =
      "چه عالی! 💌 فرم نمایشی با موفقیت تکمیل شد.";

    newsletterForm.reset();
  });

  // دکمه بازگشت به بالا
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 350);
  }, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // نمایش نرم بخش‌ها هنگام ورود به صفحه
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(
      ".features > div, .menu-card, .story-copy, .gallery-grid img"
    ).forEach(element => observer.observe(element));
  }

  // شروع با نمایش تمام آیتم‌ها
  filterMenu(activeFilter);
});
