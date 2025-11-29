// SPA Navigation Function
function navigateTo(page) {
  document.querySelectorAll(".page-view").forEach((view) => {
    view.style.display = "none";
  });

  const viewElement = document.getElementById(page + "-view");
  if (viewElement) {
    viewElement.style.display = "block";
  }

  // Moves focus to the main heading for accessibility 
  const heading = viewElement.querySelector("h1");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus();
    }
  

  updatePageTitle(page);
  updateActiveNavLink(page);
  window.scrollTo(0, 0);
}

function updatePageTitle(page) {
  let title = "Empower Ability Labs";
  switch (page) {
    case "home":
      title = "Home | Empower Ability Labs";
      break;
    case "services":
      title = "Services | Empower Ability Labs";
      break;
    case "schedule":
      title = "Schedule a Call | Empower Ability Labs";
      break;
    default:
      break;
  }
  document.title = title;
}

function updateActiveNavLink(page) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });

  const activeLink = document.querySelector(`[data-page="${page}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  navigateTo("home");
});
