
const html = document.documentElement;
const languageToggle = document.getElementById("languageToggle");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const toast = document.getElementById("toast");

let currentLanguage = "fa";
let toastTimer;

const translations = {
  natural: {
    fa: {
      title: "درخشش طبیعی",
      text: "رنگ‌های ملایم، آرایش سبک و ظاهری تازه را امتحان کن."
    },
    en: {
      title: "Natural Glow",
      text: "Try soft colors, light makeup, and a fresh everyday look."
    }
  },
  glam: {
    fa: {
      title: "گلم ملایم",
      text: "با سایه‌های درخشان و جلوه‌ای شیک، استایلت را کامل کن."
    },
    en: {
      title: "Soft Glam",
      text: "Complete your style with luminous shades and elegant details."
    }
  },
  bold: {
    fa: {
      title: "زیبایی جسورانه",
      text: "رنگ‌های قوی و جزئیات متفاوت را برای یک استایل خاص امتحان کن."
    },
    en: {
      title: "Bold Beauty",
      text: "Experiment with expressive colors and striking details."
    }
  },
  bridal: {
    fa: {
      title: "درخشش عروس",
      text: "یک استایل لطیف و رمانتیک با جلوه‌ای ماندگار انتخاب کن."
    },
    en: {
      title: "Bridal Glow",
      text: "Discover a romantic, delicate look with timeless elegance."
    }
  }
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

function changeLanguage(language) {
  currentLanguage = language;

  html.lang = language;
  html.dir = language === "fa" ? "rtl" : "ltr";
  document.body.classList.toggle("english", language === "en");

  document.querySelectorAll("[data-fa][data-en]").forEach(element => {
    const value = element.dataset[language];

    if (value !== undefined) {
      // The main hero and about headings intentionally contain <em> or <br>.
      if (
        element.matches(".hero h1, .about-section h2")
      ) {
        element.innerHTML = value;
      } else {
        element.textContent = value;
      }
    }
  });

  languageToggle.textContent = language === "fa" ? "EN" : "FA";
  languageToggle.setAttribute(
    "aria-label",
    language === "fa" ? "Switch to English" : "تغییر به فارسی"
  );

  menuToggle.setAttribute(
    "aria-label",
    language === "fa" ? "باز کردن منو" : "Open menu"
  );

  // Keep the selected filter highlighted after switching languages.
  updateFilters();
}

languageToggle.addEventListener("click", () => {
  changeLanguage(currentLanguage === "fa" ? "en" : "fa");
});

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Makeup category filters
let activeFilter = "all";

function updateFilters() {
  document.querySelectorAll(".filter-btn").forEach(button => {
    const isActive = button.dataset.filter === activeFilter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  document.querySelectorAll(".look-card").forEach(card => {
    const matches =
      activeFilter === "all" ||
      card.dataset.category === activeFilter;

    card.hidden = !matches;
  });
}

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    updateFilters();
  });
});

// Favorite buttons
document.querySelectorAll(".favorite-btn").forEach(button => {
  button.setAttribute("aria-pressed", "false");

  button.addEventListener("click", () => {
    const isSaved = button.classList.toggle("saved");

    button.textContent = isSaved ? "♥" : "♡";
    button.setAttribute("aria-pressed", String(isSaved));

    const message = currentLanguage === "fa"
      ? (isSaved ? "به علاقه‌مندی‌ها اضافه شد ♥" : "از علاقه‌مندی‌ها حذف شد")
      : (isSaved ? "Added to favorites ♥" : "Removed from favorites");

    showToast(message);
  });
});

// Beauty mood quiz
const quizResult = document.getElementById("quizResult");

document.querySelectorAll(".mood-btn").forEach(button => {
  button.addEventListener("click", () => {
    const mood = button.dataset.mood;
    const result = translations[mood][currentLanguage];

    document.querySelectorAll(".mood-btn").forEach(option => {
      const selected = option === button;
      option.classList.toggle("selected", selected);
      option.setAttribute("aria-pressed", String(selected));
    });

    quizResult.replaceChildren();

    const title = document.createElement("strong");
    title.textContent = currentLanguage === "fa"
      ? `پیشنهاد ما: ${result.title}`
      : `Our pick: ${result.title}`;

    const description = document.createElement("span");
    description.textContent = result.text;

    quizResult.append(title, description);
    quizResult.hidden = false;

    // Scroll the recommendation into view on small screens.
    quizResult.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  });
});

// Scroll to the selected makeup style from its arrow button.
document.querySelectorAll(".arrow-btn").forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.look;
    updateFilters();

    document.getElementById("looks").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

// Automatically update the footer year.
document.getElementById("year").textContent =
  new Date().getFullYear();

// Initialize the site in Persian.
changeLanguage("fa");
updateFilters();
