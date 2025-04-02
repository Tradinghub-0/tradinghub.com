document.getElementById("getReferralBtn").addEventListener("click", () => {
  const referralLink = `https://tradinghub.com/referral?code=${generateCode()}`;
  const referralInput = document.getElementById("referralLink");
  referralInput.value = referralLink;
  referralInput.setAttribute("readonly", "true"); // Ensure the input is read-only
});

document.getElementById("copyBtn").addEventListener("click", () => {
  const referralInput = document.getElementById("referralLink");
  referralInput.select();
  navigator.clipboard.writeText(referralInput.value).then(
    () => alert("Referral link copied to clipboard!"),
    (err) => console.error("Could not copy text: ", err)
  );
});

function generateCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 19 }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
}
const notificationBtn = document.getElementById("notification-btn");
const notificationDot = document.getElementById("notification-dot");
const messageContainer = document.getElementById("message-container");

// Event listener for showing notification
notificationBtn.addEventListener("click", () => {
  try {
    messageContainer.style.opacity = "1"; // Ensure full opacity for fade-in effect
    messageContainer.style.display = "block"; // Display the toast container
    notificationDot.style.display = "none"; // Hide notification dot

    // Automatically dismiss the notification with fade-out effect after 3 seconds
    setTimeout(() => {
      messageContainer.style.transition = "opacity 1s ease"; // Add fade-out transition
      messageContainer.style.opacity = "0"; // Start fade-out

      // After fade-out, hide the element completely
      setTimeout(() => {
        messageContainer.style.display = "none";
        messageContainer.style.transition = "none"; // Reset transition for next use
      }, 3000); // Match duration of fade-out
    }, 6000);
  } catch (error) {
    console.error("Error displaying the notification:", error);
  }
});

// Extra safeguard to ensure messageContainer behaves like a toast
if (messageContainer) {
  messageContainer.className = "toast";
  messageContainer.setAttribute("role", "alert");
}
 function openSidebar() {
    document.getElementById('sidebarMenu').classList.add('open');
  }

  function closeSidebar() {
    document.getElementById('sidebarMenu').classList.remove('open');
  }