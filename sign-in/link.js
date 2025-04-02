document.addEventListener("DOMContentLoaded", () => {
    // Toast functionality
    const toastTrigger = document.getElementById("liveToastBtn");
    const toastLiveExample = document.getElementById("liveToast");

    if (toastTrigger) {
        toastTrigger.addEventListener("click", () => {
            const toast = new bootstrap.Toast(toastLiveExample);
            toast.show();
        });
    }

    // Form elements
    const form = document.querySelector("#signupForm");
    const signupButton = document.getElementById("signupButton");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const termsCheck = document.getElementById("termsCheck");
    const progressBar = document.querySelector(".progress-bar");

    // Validation patterns
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%.*?&#])[A-Za-z\d@$!%.*?&#]{8,}$/;
    const phonePattern = /^[0-9]{10,15}$/;

    // Calculate password strength
    function calculatePasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[@$!.%*?&#]/.test(password)) strength += 25;
        return strength;
    }

    // Update progress bar
    function updateProgressBar(password) {
        const strength = calculatePasswordStrength(password);
        progressBar.style.width = `${strength}%`;
        progressBar.ariaValueNow = strength;

        progressBar.classList.remove('bg-danger', 'bg-warning', 'bg-success');
        if (strength < 33) {
            progressBar.classList.add('bg-danger');
        } else if (strength < 66) {
            progressBar.classList.add('bg-warning');
        } else {
            progressBar.classList.add('bg-success');
        }
    }

    // Validate form
    function validateForm() {
        const isPasswordValid = passwordPattern.test(passwordInput.value);
        const isConfirmPasswordValid = confirmPasswordInput.value === passwordInput.value;
        const isEmailValid = emailInput.checkValidity();
        const isPhoneValid = phonePattern.test(phoneInput.value);
        const isTermsChecked = termsCheck.checked;

        signupButton.disabled = !(isPasswordValid && isConfirmPasswordValid && isEmailValid && isPhoneValid && isTermsChecked);
    }

    // Add event listeners
    passwordInput.addEventListener("input", () => {
        updateProgressBar(passwordInput.value);
        passwordInput.classList.toggle("is-valid", passwordPattern.test(passwordInput.value));
        passwordInput.classList.toggle("is-invalid", !passwordPattern.test(passwordInput.value));

        confirmPasswordInput.classList.toggle("is-valid", confirmPasswordInput.value === passwordInput.value);
        confirmPasswordInput.classList.toggle("is-invalid", confirmPasswordInput.value !== passwordInput.value);

        validateForm();
    });

    confirmPasswordInput.addEventListener("input", () => {
        confirmPasswordInput.classList.toggle("is-valid", confirmPasswordInput.value === passwordInput.value);
        confirmPasswordInput.classList.toggle("is-invalid", confirmPasswordInput.value !== passwordInput.value);
        validateForm();
    });

    emailInput.addEventListener("input", validateForm);
    phoneInput.addEventListener("input", validateForm);
    termsCheck.addEventListener("change", validateForm);

    // Form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!signupButton.disabled) {
        const firstname = document.getElementById("firstName")?.value;
        if (firstname) {
            localStorage.setItem("user_firstname", firstname);
            showAlert("Form successfully submitted! Welcome to Trading Hub!", "success");
            window.location.href = "earn.html";
        } else {
            showAlert("Please fill out your firstname.", "error");
        }
    } else {
        showAlert("Please complete the form correctly before submitting.", "error");
    }
});

// Helper function to show centered alert messages
function showAlert(message, type) {
    const alertBox = document.createElement("div");
    alertBox.className = `alert-box ${type}`;
    alertBox.innerText = message;
    document.body.appendChild(alertBox);

    // Remove alert after 3 seconds
    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}

    // Load firstname on earn page
    const firstnameDisplay = document.getElementById("firstname-display");
    if (firstnameDisplay) {
        const firstname = localStorage.getItem("user_firstname");
        firstnameDisplay.textContent = firstname || "Guest";
    }
});
