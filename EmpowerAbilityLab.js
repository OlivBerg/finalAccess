// SPA Navigation Function
function navigateTo(page) {
  document.querySelectorAll(".page-view").forEach((view) => {
    view.style.display = "none";
  });

  const viewElement = document.getElementById(page + "-view");
  if (viewElement) {
    viewElement.style.display = "block";
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

document.getElementById("customCheck2").addEventListener("change", function () {
  const textareaDiv = document.getElementById("speakerDetails");
  if (this.checked) {
    textareaDiv.style.display = "block"; // show textarea
  } else {
    textareaDiv.style.display = "none"; // hide textarea
  }
});

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
