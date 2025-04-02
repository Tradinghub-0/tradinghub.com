document.addEventListener('DOMContentLoaded', function () {
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");
  const signInButton = document.getElementById("signInButton");
  const form = document.getElementById("signInForm");

  // Function to validate inputs
  function validateInputs() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    let isValid = true;

    // Validate email
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      emailInput.classList.add("is-invalid");
      isValid = false;
    } else {
      emailInput.classList.remove("is-invalid");
    }

    // Validate password
    if (password.length < 8) {
      passwordInput.classList.add("is-invalid");
      isValid = false;
    } else {
      passwordInput.classList.remove("is-invalid");
    }

    // Enable or disable the Sign In button
    signInButton.disabled = !isValid;
  }

  // Attach input validation
  emailInput.addEventListener("input", validateInputs);
  passwordInput.addEventListener("input", validateInputs);

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!signInButton.disabled) {
      // Redirect to earn.html
      console.log("Redirecting to earn.html");
      window.location.href = "earn.html"; // Update path as necessary
    } else {
      console.error("Form is invalid. Redirection prevented.");
    }
  });
});
