const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&page=';
let currentPage = 1;
let totalMarketCap = 0;
let totalVolume = 0;
let selectedCoin = null;
let chartInstance = null;

// Fetch cryptocurrency data
async function fetchCryptoData(page = 1) {
  try {
    const response = await fetch(apiUrl + page);
    if (!response.ok) throw new Error('Failed to fetch data');
    
    const data = await response.json();
    updateStats(data);
    renderCryptoList(data);

    // Enable/disable pagination buttons
    document.getElementById('prev-btn').disabled = page === 1;
    document.getElementById('next-btn').disabled = data.length === 0;
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Failed to load cryptocurrency data. Please try again later.');
  }
}

// Update total market cap and volume stats
function updateStats(data) {
  totalMarketCap = data.reduce((acc, coin) => acc + coin.market_cap, 0);
  totalVolume = data.reduce((acc, coin) => acc + coin.total_volume, 0);

  document.getElementById('total-market-cap').textContent = `$${totalMarketCap.toLocaleString()}`;
  document.getElementById('total-volume').textContent = `$${totalVolume.toLocaleString()}`;
}

// Render cryptocurrency list
function renderCryptoList(data) {
  const cryptoList = document.getElementById('crypto-list');
  cryptoList.innerHTML = ''; // Clear existing content

  const fragment = document.createDocumentFragment();
  data.forEach((coin) => {
    const card = document.createElement('div');
    card.classList.add('crypto-card');
    card.innerHTML = `
      <h3>${coin.name} (${coin.symbol.toUpperCase()})</h3>
      <p class="price">$${coin.current_price.toLocaleString()}</p>
      <p>Market Cap: $${coin.market_cap.toLocaleString()}</p>
      <p>24h Volume: $${coin.total_volume.toLocaleString()}</p>
      <a href="https://www.coingecko.com/en/coins/${coin.id}" class="more-link" target="_blank">More Info</a>
    `;
    card.addEventListener('click', () => showPriceChart(coin.id));
    fragment.appendChild(card);
  });

  cryptoList.appendChild(fragment);
}

// Navigate between pages
function loadPage(page) {
  if (page < 1) return;
  currentPage = page;
  fetchCryptoData(currentPage);
}

// Display price chart for a selected coin
async function showPriceChart(coinId) {
  try {
    selectedCoin = coinId;
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`);
    if (!response.ok) throw new Error('Failed to fetch chart data');

    const data = await response.json();
    renderChart(data.prices);
  } catch (error) {
    console.error('Error fetching chart data:', error);
    alert('Failed to load chart data. Please try again later.');
  }
}

// Render the price chart
function renderChart(prices) {
  const ctx = document.getElementById('price-chart').getContext('2d');

  // Destroy existing chart if it exists
  if (chartInstance) chartInstance.destroy();

  const labels = prices.map((item) => new Date(item[0]).toLocaleDateString());
  const priceData = prices.map((item) => item[1]);

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Price (USD)',
        data: priceData,
        borderColor: '#34c4b6',
        backgroundColor: 'rgba(52, 196, 182, 0.2)',
        fill: true,
        lineTension: 0.2
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: false }
      }
    }
  });
}

// Filter cryptocurrencies based on search input
function searchCrypto() {
  const searchValue = document.getElementById('search-input').value.toLowerCase();
  const cryptoCards = document.querySelectorAll('.crypto-card');

  cryptoCards.forEach((card) => {
    const coinName = card.querySelector('h3').textContent.toLowerCase();
    card.style.display = coinName.includes(searchValue) ? 'block' : 'none';
  });
}

// Initialize the app
fetchCryptoData(currentPage);
