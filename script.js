function toggleTheme() {
  document.body.classList.toggle('dark');
}

function showProductDetails(product) {
  const productDetails = document.getElementById('product-details');
  productDetails.innerHTML = ''; // Clear previous

  if (product === 'sewabot') {
    productDetails.innerHTML = `
      <div class="details-card center">
        <h3>Sewa Bot WhatsApp</h3>
        <label for="sewaSelect">Pilih Durasi:</label>
        <select id="sewaSelect" onchange="updatePrice('sewaSelect')">
          <option value="">-- Pilih Durasi --</option>
          <option value="3k">7 Hari</option>
          <option value="5k">15 Hari</option>
          <option value="10k">30 Hari</option>
          <option value="30k">365 Hari</option>
          <option value="50k">Permanen</option>
        </select>
        <p id="sewaPrice" class="price"></p>
        <button class="buy-now" onclick="window.location.href='https://wa.me/6288983163720?text=Sewa%20Bot'">Buy Now</button>
      </div>`;
  } else if (product === 'scriptbot') {
    productDetails.innerHTML = `
      <div class="details-card center">
        <h3>Script Bot WhatsApp</h3>
        <label for="scriptSelect">Pilih Script:</label>
        <select id="scriptSelect" onchange="updatePrice('scriptSelect')">
          <option value="">-- Pilih --</option>
          <option value="50k">Akari - Free Update</option>
          <option value="30k">Akari - No Update</option>
          <option value="45k">Yue - Free Update</option>
          <option value="30k">Yue - No Update</option>
        </select>
        <p id="scriptPrice" class="price"></p>
        <button class="buy-now" onclick="window.location.href='https://wa.me/6288983163720?text=Script%20Bot'">Buy Now</button>
      </div>`;
  } else if (product === 'panel') {
    productDetails.innerHTML = `
      <div class="details-card center">
        <h3>Panel Pterodactyl</h3>
        <label for="panelSelect">Pilih Paket:</label>
        <select id="panelSelect" onchange="updatePrice('panelSelect')">
          <option value="">-- Pilih --</option>
          <option value="10k">1-10GB</option>
          <option value="11k">Unli</option>
          <option value="15k">ADP</option>
          <option value="12k">Reseller</option>
        </select>
        <p id="panelPrice" class="price"></p>
        <button class="buy-now" onclick="window.location.href='https://wa.me/6288983163720?text=Panel%20Pterodactyl'">Buy Now</button>
      </div>`;
  } else if (product === 'vps') {
    productDetails.innerHTML = `
      <div class="details-card center">
        <h3>VPS Digital Ocean</h3>
        <p>Harga belum tersedia.</p>
        <button class="buy-now" onclick="window.location.href='https://wa.me/6288983163720?text=VPS%20Digital%20Ocean'">Hubungi Kami</button>
      </div>`;
  }
}

function updatePrice(selectId) {
  const select = document.getElementById(selectId);
  const price = select.value;
  const priceDisplay = document.getElementById(selectId.replace('Select', 'Price'));

  if (price) {
    priceDisplay.textContent = `Harga: ${price}`;
  } else {
    priceDisplay.textContent = '';
  }
}

window.onload = function () {
  setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
    document.body.style.overflow = 'auto';
  }, 5000);
};
