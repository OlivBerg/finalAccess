// SPA Navigation Function
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

function showPage(page) {
  // Show only the requested view
  document.querySelectorAll(".page-view").forEach((view) => {
    view.style.display = "none";
  });

  const pageView = document.getElementById(`${page}-view`);
  if (pageView) {
    pageView.style.display = "block";
  }

  updatePageTitle(page);
  updateActiveNavLink(page);
}

// Navigate to a given "page"
function navigateTo(page) {
  showPage(page);

  // Push state into history, Back/Forward
  history.pushState({ page }, "", `#${page}`);
}

// Handle browser Back/Forward navigation
window.addEventListener("popstate", (event) => {
  const state = event.state;
  const page = state ? state.page : "home";
  showPage(page);
});

document.addEventListener("DOMContentLoaded", () => {
  const initialPage = location.hash.replace("#", "") || "home";
  showPage(initialPage);
  history.replaceState({ page: initialPage }, "", `#${initialPage}`);

  // Checkbox toggle behavior
  const speakerCheckbox = document.getElementById("customCheck2");
  if (speakerCheckbox) {
    speakerCheckbox.addEventListener("change", function () {
      const textareaDiv = document.getElementById("speakerDetails");
      textareaDiv.style.display = this.checked ? "block" : "none";
    });
  }
});

// Validation and Submission
document
  .getElementById("scheduleForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const email = document.getElementById("emailAddress").value.trim();
    const phone = document.getElementById("phoneNumber").value.trim();
    const messageDiv = document.getElementById("formMessage");
    const messageText = document.getElementById("messageText");

    // Reset message
    messageDiv.style.display = "none";
    messageDiv.classList.remove("alert-danger", "alert-success");

    // Validation
    let errors = [];

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.push("Email is required.");
    } else if (!emailRegex.test(email)) {
      errors.push(
        "Please enter a valid email address (e.g., you@example.com)."
      );
    }

    // Phone validation
    if (phone) {
      const phoneRegex =
        /^(\d{3}[-.\s]?\d{3}[-.\s]?\d{4}|\(\d{3}\)\s?\d{3}[-.\s]?\d{4})$/;
      if (!phoneRegex.test(phone)) {
        errors.push(
          "Phone number must be in format: 613-123-1234 or (613) 123-1234."
        );
      }
    }

    // Display errors or success
    if (errors.length > 0) {
      messageText.textContent = errors.join(" ");
      messageDiv.classList.add("alert-danger");
      messageDiv.style.display = "block";
      messageDiv.classList.add("show");
    } else {
      messageText.textContent =
        "✓ Success! We'll contact you soon to schedule your call.";
      messageDiv.classList.add("alert-success");
      messageDiv.style.display = "block";
      messageDiv.classList.add("show");

      // Reset form after successful submission
      setTimeout(() => {
        document.getElementById("scheduleForm").reset();
        messageDiv.style.display = "none";
      }, 3000);
    }
  });
