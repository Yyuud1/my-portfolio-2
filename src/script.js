const serviceID = "service_79q41qw";
const templateID = "template_6qrlm0n";
const publicKey = "-Q7GRfV-9x928wvce";

/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", (event) => {
      nav.classList.toggle("show");
      event.stopPropagation();
    });

    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) {
        nav.classList.remove("show");
      }
    });
  }
};

showMenu("nav-toggle", "nav-menu");

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*===== EMAIL JS =====*/
emailjs.init(publicKey);

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();

    if (!name || !email || !message) {
      Swal.fire({
        toast: "true",
        position: "top-end",
        icon: "warning",
        title: "Oops...",
        text: "Please fill out the form before pressing the send button.",
      });
      return;
    }

    const formData = { name, email, message };

    emailjs
      .send(serviceID, templateID, formData)
      .then(() => {
        Swal.fire({
          toast: "true",
          position: "top-end",
          icon: "success",
          title: "Success!",
          text: "Message sent successfully!",
        });
        this.reset();
      })
      .catch((error) => {
        Swal.fire({
          toast: "true",
          position: "top-end",
          icon: "error",
          title: "Failed!",
          text: "Failed to send message.",
          footer: `<small>Error: ${error.text}</small>`,
        });
        console.error("EmailJS Error:", error);
      });
  });

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", scrollActive);

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");
    const link = document.querySelector(
      ".nav__menu a[href*=" + sectionId + "]"
    );

    if (link) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    }
  });
}

/*===== SCROLL REVEAL ANIMATION =====*/
if (typeof ScrollReveal !== "undefined") {
  const sr = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 2000,
    reset: false,
  });

  /*SCROLL HOME*/
  sr.reveal(".home__title", {});
  sr.reveal(".home__scroll", { delay: 200 });
  sr.reveal(".home__img", { origin: "right", delay: 300 });

  /*SCROLL ABOUT*/
  sr.reveal(".about__img", { delay: 100 });
  sr.reveal(".about__subtitle", { delay: 200 });
  sr.reveal(".about__profession", { delay: 300 });
  sr.reveal(".about__text", { delay: 300 });
  sr.reveal(".about__social-icon", { delay: 300, interval: 300 });

  /*SCROLL SKILLS*/
  sr.reveal(".skills__subtitle", {});
  sr.reveal(".skills__name", { distance: "20px", delay: 50, interval: 100 });
  sr.reveal(".skills__img", { delay: 200 });

  /*SCROLL PORTFOLIO*/
  sr.reveal(".portfolio__img", { interval: 200 });

  /*SCROLL CONTACT*/
  sr.reveal(".contact__subtitle", {});
  sr.reveal(".contact__text", { interval: 200 });
  sr.reveal(".contact__input", { delay: 200 });
  sr.reveal(".contact__button", { delay: 200 });
}

/*===== PRELOADER =====*/
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.classList.add("hidden");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }
});

/*===== PRELOADER =====*/
window.onscroll = function () {
  updateProgressBar();
};

function updateProgressBar() {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollPercentage = (scrollTop / scrollHeight) * 100;
  document.getElementById("progress-bar").style.width = scrollPercentage + "%";
}
