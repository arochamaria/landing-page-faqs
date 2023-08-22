/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */

const navbarList = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// Build the navigation
function populateNavigation() {
  sections.forEach((section) => {
    const navbarItem = document.createElement("li");
    const navbarLink = document.createElement("a");

    const sectionText = section.dataset.nav;
    navbarLink.textContent = sectionText;
    navbarLink.classList.add("navbar__item");
    navbarLink.href = `#${section.id}`;
    navbarItem.appendChild(navbarLink);
    navbarList.appendChild(navbarItem);
  });
}

// Add .active to navigation elements depending on section
let currentSection = document.getElementById("section1");

function activeNavigation() {
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 500) {
      currentSection = section;
    }
  });

  const navElements = document.querySelectorAll(".navbar__item");

  navElements.forEach((navElement) => {
    if (navElement.href.includes(currentSection.id)) {
      navElement.classList.add("active");
    } else {
      navElement.classList.remove("active");
    }
  });
}

// Add class 'active' to section when near top of viewport
function activeSection() {
  const topSection = navbarList;
  const navbarPosition = topSection.getBoundingClientRect();
  const navbarVertical = navbarPosition.y;
  if (window.scrollY <= navbarVertical) {
    currentSection.classList.add("section--active");
  } else {
    currentSection.classList.remove("section--active");
  }
}

// Collapsable section
function collapseContent(event) {
  event.preventDefault();
  const activeClass = "topic__content--active";

  const $me = event.target;
  const $mySection = $me.closest(".topic");
  const $myContent = $mySection.querySelector(".topic__content");
  const hasClass = $myContent.classList.contains(activeClass);

  const topicContents = document.querySelectorAll(".topic__content");

  if (!hasClass) {
    $myContent.classList.toggle(activeClass);
  } else {
    $myContent.classList.toggle(activeClass);
  }
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
populateNavigation();
window.addEventListener("scroll", activeNavigation);

//Set sections as active
window.addEventListener("scroll", activeSection);

// Toggle collapsible content
const buttons = document.querySelectorAll(".btn__collapse");
if (buttons && buttons.length) {
  buttons.forEach((button) => {
    button.addEventListener("click", collapseContent);
  });
}
