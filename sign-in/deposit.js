// Configuration
const apiUrl = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,tether&vs_currencies=usd";
let rates = {};

// Fetch live rates
async function fetchRates() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // Debugging: Check API response structure

        rates = {
            ETH: data.ethereum?.usd,
            BTC: data.bitcoin?.usd,
            USDT: data.tether?.usd,
        };

        if (!rates.ETH || !rates.BTC || !rates.USDT) {
            throw new Error("Invalid data structure. Missing cryptocurrency rates.");
        }

        localStorage.setItem("cryptoRates", JSON.stringify(rates));
        updateCryptoList(data);
    } catch (error) {
        console.error("Error fetching rates:", error);

        const cachedRates = localStorage.getItem("cryptoRates");
        if (cachedRates) {
            rates = JSON.parse(cachedRates);
            updateCryptoList(rates);
        } else {
            showAlert("Failed to fetch cryptocurrency rates. Please try again later.", "error");
        }
    }
}

// Retry mechanism for fetch
async function fetchWithRetry(url, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch");
            return await response.json();
        } catch (error) {
            if (i < retries - 1) await new Promise(res => setTimeout(res, delay));
        }
    }
    throw new Error("Max retries reached");
}

// Update the cryptocurrency prices list dynamically
function updateCryptoList(data) {
    const cryptoList = document.getElementById("crypto-list");
    if (!data || !data.ethereum || !data.bitcoin || !data.tether) {
        cryptoList.innerHTML = "<li>Failed to load cryptocurrency prices. Please refresh.</li>";
        return;
    }

    cryptoList.innerHTML = `
        <li><strong>Ethereum (ETH):</strong> $${data.ethereum.usd.toFixed(2)}</li>
        <li><strong>Bitcoin (BTC):</strong> $${data.bitcoin.usd.toFixed(2)}</li>
        <li><strong>Tether (USDT):</strong> $${data.tether.usd.toFixed(2)}</li>
    `;
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
}

// Convert USD to the selected cryptocurrency
function convertToCrypto() {
    const dollars = parseFloat(document.getElementById("dollars").value);
    const currencySelect = document.getElementById("currency");
    const selectedSymbol = currencySelect.options[currencySelect.selectedIndex]?.getAttribute("data-symbol");
    const cryptoInput = document.getElementById("crypto");
    const dollarFeedback = document.getElementById("dollar-feedback");
    const feedback = document.getElementById("conversion-feedback");

    if (isNaN(dollars) || dollars <= 0) {
        cryptoInput.value = "";
        dollarFeedback.textContent = "Please enter a valid positive amount.";
        feedback.textContent = "";
        return;
    } else {
        dollarFeedback.textContent = "";
    }

    if (!selectedSymbol || !rates[selectedSymbol]) {
        cryptoInput.value = "";
        feedback.textContent = "Cryptocurrency rates not available or invalid selection.";
        return;
    }

    const cryptoAmount = (dollars / rates[selectedSymbol]).toFixed(8);
    cryptoInput.value = cryptoAmount;

    feedback.textContent = `${dollars} USD is approximately ${cryptoAmount} ${selectedSymbol}`;
}

// Log conversion history
function logConversion(dollars, cryptoAmount, selectedSymbol) {
    const history = document.getElementById("conversion-history");
    const timestamp = new Date().toLocaleString();
    const log = `<li>${timestamp}: ${dollars} USD = ${cryptoAmount} ${selectedSymbol}</li>`;
    history.innerHTML += log;
}

// Helper function to show alert messages
function showAlert(message, type) {
    const existingAlert = document.querySelector(".alert-box");
    if (existingAlert) existingAlert.remove(); // Avoid duplicate alerts

    const alertBox = document.createElement("div");
    alertBox.className = `alert-box ${type}`;
    alertBox.innerText = message;
    document.body.appendChild(alertBox);
}

// Initialize the application
window.onload = () => {
    fetchRates(); // Fetch initial rates

    const darkModePreference = localStorage.getItem("darkMode");
    if (darkModePreference === "enabled") {
        document.body.classList.add("dark-mode");
    }

    document.getElementById("dollars").addEventListener("input", convertToCrypto);
    document.getElementById("currency").addEventListener("change", convertToCrypto);
    document.getElementById("dark-mode-toggle")?.addEventListener("click", toggleDarkMode);
};
