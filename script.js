
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const categoryButtons = document.querySelectorAll(".category-card");
  const productCards = document.querySelectorAll(".product-card");
  const searchInput = document.getElementById("searchInput");
  const searchToggle = document.getElementById("searchToggle");
  const searchBox = document.getElementById("searchBox");
  const cartCount = document.getElementById("cartCount");
  const cartButton = document.getElementById("cartButton");
  const toast = document.getElementById("toast");
  const emptyMessage = document.getElementById("emptyMessage");
  const backToTop = document.getElementById("backToTop");

  let activeCategory = "all";
  let cart = [];
  let toastTimer;

  // پیام کوتاه پایین صفحه
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2400);
  }

  // منوی موبایل
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });

  // نمایش جست‌وجو
  searchToggle.addEventListener("click", () => {
    searchBox.classList.toggle("search-open");

    searchBox.style.display =
      searchBox.style.display === "block" ? "" : "block";

    if (searchBox.style.display === "block") {
      searchInput.focus();
      document.getElementById("products").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });

  // فیلتر و جست‌وجوی هم‌زمان
  function filterProducts() {
    const query = searchInput.value.trim().toLocaleLowerCase("fa");
    let visibleCount = 0;

    productCards.forEach(card => {
      const category = card.dataset.category;
      const name = card.dataset.name.toLocaleLowerCase("fa");

      const matchesCategory =
        activeCategory === "all" || category === activeCategory;

      const matchesSearch = name.includes(query);
      const isVisible = matchesCategory && matchesSearch;

      card.hidden = !isVisible;

      if (isVisible) visibleCount++;
    });

    emptyMessage.hidden = visibleCount !== 0;
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.filter;

      filterButtons.forEach(item => {
        item.classList.toggle("active", item === button);
      });

      filterProducts();
    });
  });

  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;

      filterButtons.forEach(item => {
        item.classList.toggle(
          "active",
          item.dataset.filter === activeCategory
        );
      });

      filterProducts();

      document.getElementById("products").scrollIntoView({
        behavior: "smooth"
      });
    });
  });

  searchInput.addEventListener("input", filterProducts);

  // علاقه‌مندی‌ها
  document.querySelectorAll(".favorite").forEach(button => {
    button.setAttribute("aria-pressed", "false");

    button.addEventListener("click", () => {
      const isFavorite = button.classList.toggle("is-favorite");

      button.textContent = isFavorite ? "♥" : "♡";
      button.setAttribute("aria-pressed", String(isFavorite));

      const productName =
        button.closest(".product-card").dataset.name;

      showToast(
        isFavorite
          ? `♡ ${productName} به علاقه‌مندی‌ها اضافه شد`
          : `${productName} از علاقه‌مندی‌ها حذف شد`
      );
    });
  });

  // سبد خرید نمایشی
  document.querySelectorAll(".add-cart").forEach(button => {
    button.addEventListener("click", () => {
      cart.push(button.dataset.product);
      cartCount.textContent = cart.length;

      button.classList.add("added");
      showToast(`✿ ${button.dataset.product} به سبد خرید اضافه شد`);

      setTimeout(() => {
        button.classList.remove("added");
      }, 400);
    });
  });

  cartButton.addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("سبد خریدت هنوز خالیه! ♡");
      return;
    }

    const summary = cart.reduce((result, product) => {
      result[product] = (result[product] || 0) + 1;
      return result;
    }, {});

    const details = Object.entries(summary)
      .map(([name, quantity]) => `${name} × ${quantity}`)
      .join("، ");

    showToast(`سبد خرید (${cart.length} مورد): ${details}`);
  });

  // فرم عضویت نمایشی
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
      "ممنون از همراهیت! 💌 این فرم در نسخه نمایشی است.";

    newsletterForm.reset();
  });

  // بازگشت به بالای صفحه
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 400);
  }, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // ورود نرم کارت‌ها هنگام اسکرول
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
      ".category-card, .product-card, .about-content"
    ).forEach(element => observer.observe(element));
  }
});
