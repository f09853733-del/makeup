
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const bubblesContainer = document.getElementById("bubbles");

  // Loading screen
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hidden"), 700);
  });

  // اگر صفحه هنوز کامل بارگذاری نشده بود
  setTimeout(() => loader.classList.add("hidden"), 2500);

  // Create floating ocean bubbles
  for (let i = 0; i < 28; i++) {
    const bubble = document.createElement("span");
    bubble.className = "bubble";

    const size = Math.random() * 17 + 5;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${Math.random() * 12 + 9}s`;
    bubble.style.animationDelay = `${Math.random() * -20}s`;

    bubblesContainer.appendChild(bubble);
  }

  // Mobile menu
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.textContent = isOpen ? "×" : "☰";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Reveal sections when scrolling
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(element => revealObserver.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add("visible"));
  }

  // Animated counters
  const counters = document.querySelectorAll(".counter");

  function animateCounter(counter) {
    const target = Number(counter.dataset.target);
    const duration = 1600;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(target * eased);

      counter.textContent = value.toLocaleString("en-US");

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  } else {
    counters.forEach(animateCounter);
  }

  // Creature information modal
  const infoModal = document.getElementById("infoModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalClose = document.getElementById("modalClose");

  function openInfoModal(name, description) {
    modalTitle.textContent = name;
    modalDescription.textContent = description;
    infoModal.classList.add("open");
    infoModal.setAttribute("aria-hidden", "false");
    modalClose.focus();
  }

  function closeInfoModal() {
    infoModal.classList.remove("open");
    infoModal.setAttribute("aria-hidden", "true");
  }

  document.querySelectorAll(".more-button").forEach(button => {
    button.addEventListener("click", () => {
      openInfoModal(button.dataset.name, button.dataset.description);
    });
  });

  modalClose.addEventListener("click", closeInfoModal);

  infoModal.addEventListener("click", event => {
    if (event.target === infoModal) closeInfoModal();
  });

  // Gallery lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");

  document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
      lightboxImage.src = item.dataset.image;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      lightboxClose.focus();
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  }

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
  });

  // Keyboard support
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeInfoModal();
      closeLightbox();
      navLinks.classList.remove("open");
      menuToggle.textContent = "☰";
    }
  });

  // Dive interaction
  const diveButton = document.getElementById("diveButton");
  const diveMessage = document.getElementById("diveMessage");
  const messages = [
    "عمق ۱۰۰ متر: نور خورشید آرام‌آرام محو می‌شود... 🌊",
    "عمق ۵۰۰ متر: به دنیای آبی تیره‌تر خوش آمدی... 🪼",
    "عمق ۱۰۰۰ متر: اینجا تاریکی و نورهای زیستی با هم می‌رقصند... ✨",
    "اکتشاف آغاز شد! رازهای اقیانوس هنوز تمام نشده‌اند... 🐠"
  ];

  let diveIndex = 0;

  diveButton.addEventListener("click", () => {
    diveMessage.textContent = messages[diveIndex];
    diveIndex = (diveIndex + 1) % messages.length;

    diveButton.textContent = "ادامه اکتشاف ↓";

    document.querySelector(".depth-banner").animate(
      [
        { boxShadow: "0 0 0 rgba(114,245,243,0)" },
        { boxShadow: "0 0 45px rgba(114,245,243,.18)" },
        { boxShadow: "0 0 0 rgba(114,245,243,0)" }
      ],
      { duration: 1000, easing: "ease-in-out" }
    );
  });

  // Back to top
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 450);
  }, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Current year in footer
  document.getElementById("year").textContent = new Date().getFullYear();
});
