document.addEventListener("DOMContentLoaded", function () {
    const filterBtn = document.querySelector('.filter-btn');
    const searchInput = document.querySelector('.search-input');
    const historyBody = document.getElementById('history-body');

    // Example Conversion History Data
    const conversionHistory = [
        { id: "#12345", date: "2024-12-25", amount: 500, crypto: "Bitcoin", rate: "1 BTC = $500", status: "Success" },
        { id: "#12346", date: "2024-12-24", amount: 250, crypto: "Ethereum", rate: "1 ETH = $2000", status: "Pending" },
        // Add more transactions as needed
    ];

    // Populate the table
    function populateHistory() {
        historyBody.innerHTML = ""; // Clear previous rows
        conversionHistory.forEach((transaction) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${transaction.id}</td>
                <td>${transaction.date}</td>
                <td>$${transaction.amount.toFixed(2)}</td>
                <td>${transaction.crypto}</td>
                <td>${transaction.rate}</td>
                <td class="status-${transaction.status.toLowerCase()}">${transaction.status}</td>
            `;
            historyBody.appendChild(row);
        });
    }

    // Filter functionality
    filterBtn.addEventListener('click', function () {
        const query = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('.history-table tbody tr');

        rows.forEach((row) => {
            const textContent = row.textContent.toLowerCase();
            row.style.display = textContent.includes(query) ? '' : 'none';
        });
    });

    // Initialize the table with data
    populateHistory();
});
