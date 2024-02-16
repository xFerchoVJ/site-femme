/**
 * Template Name: Append
 * Updated: Sep 18 2023 with Bootstrap v5.3.2
 * Template URL: https://bootstrapmade.com/append-bootstrap-website-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  //Agregar lazy load a todas las imgs
  const imgs = document.querySelectorAll("img");
  imgs.forEach((img) => {
    img.setAttribute("loading", "lazy");
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  const selectBody = document.querySelector("body");
  const selectHeader = document.querySelector("#header");
  const selectLogoWhite = document.querySelector("#white-logo");
  const selectLogoBlack = document.querySelector("#black-logo");
  const navbarButton = document.querySelector(".mobile-nav-toggle");
  const indexPage = document.querySelector(".index-page");
  function toggleScrolled() {
    const headerClasses = selectHeader.classList;
    const isSticky =
      headerClasses.contains("scroll-up-sticky") ||
      headerClasses.contains("sticky-top") ||
      headerClasses.contains("fixed-top");
    const isScrollYGreaterThan100 = window.scrollY > 100;

    if (!isSticky) return;

    selectBody.classList.toggle("scrolled", isScrollYGreaterThan100);

    if (indexPage) {
      selectLogoWhite.style.display = isScrollYGreaterThan100
        ? "none"
        : "block";
      selectLogoBlack.style.display = isScrollYGreaterThan100
        ? "block"
        : "none";
      const buttonClasses = navbarButton.classList;
      buttonClasses.toggle("black-navtoggle", isScrollYGreaterThan100);
      buttonClasses.toggle("white-navtoggle", !isScrollYGreaterThan100);
    }
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Scroll up sticky header to headers with .scroll-up-sticky class
   */
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    if (!selectHeader.classList.contains("scroll-up-sticky")) return;

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty("position", "sticky", "important");
      selectHeader.style.top = `-${header.offsetHeight + 50}px`;
    } else if (scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty("position", "sticky", "important");
      selectHeader.style.top = "0";
    } else {
      selectHeader.style.removeProperty("top");
      selectHeader.style.removeProperty("position");
    }
    lastScrollTop = scrollTop;
  });

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .has-dropdown i").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      if (document.querySelector(".mobile-nav-active")) {
        e.preventDefault();
        this.parentNode.classList.toggle("active");
        this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
        e.stopImmediatePropagation();
      }
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  function initIsotopeLayout() {
    document
      .querySelectorAll(".isotope-layout")
      .forEach(function (isotopeItem) {
        let layout = isotopeItem.getAttribute("data-layout") ?? "packery";
        let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
        let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

        let initIsotope = new Isotope(
          isotopeItem.querySelector(".isotope-container"),
          {
            itemSelector: ".isotope-item",
            layoutMode: layout,
            filter: filter,
            sortBy: sort,
          }
        );

        isotopeItem
          .querySelectorAll(".isotope-filters li")
          .forEach(function (filters) {
            filters.addEventListener(
              "click",
              function () {
                isotopeItem
                  .querySelector(".isotope-filters .filter-active")
                  .classList.remove("filter-active");
                this.classList.add("filter-active");
                initIsotope.arrange({
                  filter: this.getAttribute("data-filter"),
                });
                if (typeof aosInit === "function") {
                  aosInit();
                }
              },
              false
            );
          });
      });
  }
  window.addEventListener("load", initIsotopeLayout);

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".swiper").forEach(function (swiper) {
      if (!document.querySelector(".swiper-config")) return;
      let config = JSON.parse(
        swiper.querySelector(".swiper-config").innerHTML.trim()
      );
      new Swiper(swiper, config);
    });
  }
  window.addEventListener("load", initSwiper);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
  );
  const popoverList = [...popoverTriggerList].map(
    (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
  );

  //When one popover is already open close others
  document.addEventListener("show.bs.popover", function (event) {
    popoverList.forEach((popover) => {
      if (popover._element !== event.target) {
        popover.hide();
      }
    });
  });

  /**
   * Add Drawing Shape effect to the Upcoming Events Section
   */
  // Función para activar el efecto de dibujo propio en la sección de "Upcoming Events"
  function activateSelfDrawingBorder(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("self-drawing-border"); // Agregamos la clase para el efecto de dibujo propio
        observer.unobserve(entry.target); // Dejamos de observar una vez que se activa el efecto
      }
    });
  }
  // Creamos una instancia del IntersectionObserver
  const upcomingEventsObserver = new IntersectionObserver(
    activateSelfDrawingBorder,
    { threshold: 0.5 }
  );

  // Obtenemos la sección de "Upcoming Events" por su ID
  const upcomingEventsSection = document.getElementById("upcoming-events");

  // Observamos la sección de "Upcoming Events" para activar el efecto cuando esté visible en la pantalla
  if (upcomingEventsSection) {
    upcomingEventsObserver.observe(upcomingEventsSection);
  }
});
