const navbar = document.querySelector(".navbar");
const navLinks = Array.from(document.querySelectorAll(".navbar .nav-link"));
const sections = Array.from(
  document.querySelectorAll("#home, #about, #projects, #contact")
);

// Update both navbar size and the current-section marker.
function updateNavigation() {
  navbar.classList.toggle("compact", window.scrollY > 30);

  const atPageBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2;
  let currentSection = sections[0].id;
  const markerPosition = navbar.offsetHeight + 2;

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= markerPosition) {
      currentSection = section.id;
    }
  });

  // The last link must stay active at the very bottom of the page.
  if (atPageBottom) {
    currentSection = sections[sections.length - 1].id;
  }

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentSection}`
    );
  });
}

// Scroll by hand so the fixed navbar never covers a heading.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (targetId === "#") {
      event.preventDefault();
      return;
    }

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    const top =
      target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

window.addEventListener("scroll", updateNavigation, { passive: true });
window.addEventListener("resize", updateNavigation);
updateNavigation();

const track = document.querySelector(".carousel-track");
const slides = Array.from(document.querySelectorAll(".project-slide"));
const previousButton = document.querySelector(".carousel-button.previous");
const nextButton = document.querySelector(".carousel-button.next");
const slideCount = document.querySelector(".slide-count");
let currentSlide = 0;

function showSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  slideCount.textContent = `${String(currentSlide + 1).padStart(
    2,
    "0"
  )} / ${String(slides.length).padStart(2, "0")}`;

  slides.forEach((slide, slideIndex) => {
    slide.setAttribute("aria-hidden", slideIndex !== currentSlide);
  });
}

previousButton.addEventListener("click", () => showSlide(currentSlide - 1));
nextButton.addEventListener("click", () => showSlide(currentSlide + 1));

const modalOpenButtons = document.querySelectorAll(".modal-open");
const modals = document.querySelectorAll(".modal");
let lastFocusedElement = null;

function openModal(modal) {
  lastFocusedElement = document.activeElement;
  modal.hidden = false;
  document.body.classList.add("modal-opened");
  modal.querySelector(".modal-close").focus();
}

function closeModal(modal) {
  modal.hidden = true;
  document.body.classList.remove("modal-opened");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

modalOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.getElementById(button.dataset.modal);
    openModal(modal);
  });
});

modals.forEach((modal) => {
  modal
    .querySelector(".modal-close")
    .addEventListener("click", () => closeModal(modal));

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openModalElement = document.querySelector(".modal:not([hidden])");
    if (openModalElement) closeModal(openModalElement);
  }
});

document.getElementById("current-year").textContent = new Date().getFullYear();
