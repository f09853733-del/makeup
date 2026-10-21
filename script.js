
const languageButton = document.getElementById("language");
let language = "en";

languageButton.addEventListener("click", () => {
  language = language === "en" ? "fa" : "en";

  document.documentElement.lang = language;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  document.body.dir = document.documentElement.dir;

  document.querySelectorAll("[data-en][data-fa]").forEach(element => {
    element.textContent = element.dataset[language];
  });

  languageButton.textContent = language === "fa" ? "English" : "فارسی";
});

// Makeup mood suggestions
const suggestions = {
  en: {
    natural: "Your match: Natural Glow ✨ Try a light base, soft blush and a hint of lip tint.",
    glam: "Your match: Soft Glam ✨ Explore champagne shimmer, softly defined eyes and luminous skin.",
    bold: "Your match: Bold Beauty ✨ Try a statement lip or graphic eyeliner and express your creativity."
  },
  fa: {
    natural: "پیشنهاد تو: درخشش طبیعی ✨ آرایش سبک، رژگونه ملایم و کمی تینت لب را امتحان کن.",
    glam: "پیشنهاد تو: سافت گلم ✨ سایه شامپاینی، چشم‌های خوش‌حالت و پوستی درخشان را تجربه کن.",
    bold: "پیشنهاد تو: زیبایی جسورانه ✨ رژلب چشمگیر یا خط چشم گرافیکی را امتحان کن."
  }
};

document.querySelectorAll(".moods button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".moods button").forEach(item => {
      item.classList.remove("selected");
    });

    button.classList.add("selected");

    document.getElementById("result").textContent =
      suggestions[language][button.dataset.mood];
  });
});

// Gallery cards gently appear when scrolled into view
const cards = document.querySelectorAll(".card");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.animate(
          [
            { opacity: 0, transform: "translateY(18px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          { duration: 650, easing: "ease-out", fill: "both" }
        );
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => observer.observe(card));
}
