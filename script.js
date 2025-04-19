function toggleTheme() {
  document.body.classList.toggle('dark');
}

function showProductDetails(product) {
  let productDetails = document.getElementById('product-details');
  productDetails.innerHTML = ''; // Clear previous details

  if (product === 'sewabot') {
    productDetails.innerHTML = `
      <div class="details-card">
        <h3>Sewa Bot WhatsApp</h3>
        <p>Pilih Durasi:</p>
        <ul>
          <li>7 Hari: 3k</li>
          <li>15 Hari: 5k</li>
          <li>30 Hari: 10k</li>
          <li>365 Hari: 30k</li>
          <li>Permanen: 50k</li>
        </ul>
        <button class="buy-now" onclick="window.location.href='https://wa.me/6288983163720?text=Sewa%20Bot'">Buy Now</button>
      </div>`;
  } else if (product === 'scriptbot') {
    productDetails.innerHTML = `
      <div class="details-card">
        <h3>Script Bot WhatsApp</h3>
        <p>Akari (Type: Plugins Esm)</p>
        <ul>
          <li>Free Update: 50k</li>
          <li>No Free Update: 30k</li>
        </ul>
        <p>Yue (Type: Plugins Cjs)</p>
        <ul>
          <li>Free Update: 45k</li>
          <li>No Free Update: 30k</li>
        </ul>
        <button class="buy-now" onclick="window.location.href='https://wa.me/6288983163720?text=Script%20Bot'">Buy Now</button>
      </div>`;
  } else if (product === 'panel') {
    productDetails.innerHTML = `
      <div class="details-card">
        <h3>Panel Pterodactyl</h3>
        <ul>
          <li>1GB: 10k</li>
          <li>2GB: 10k</li>
          <li>3GB: 10k</li>
          <li>5GB: 10k</li>
          <li>6GB: 10k</li>
          <li>7GB: 10k</li>
          <li>8GB: 10k</li>
          <li>9GB: 10k</li>
          <li>10GB: 10k</li>
          <li>Unli: 11k</li>
          <li>ADP: 15k</li>
          <li>Reseller: 12k</li>
        </ul>
        <button class="buy-now" onclick="window.location.href='https://wa.me/6288983163720?text=Panel%20Pterodactyl'">Buy Now</button>
      </div>`;
  } else if (product === 'vps') {
  productDetails.innerHTML = `
      <div class="details-card">
        <h3>VPS Digital Ocean</h3>
        <p>Harga VPS belum tersedia saat ini.</p>
        <button class="buy-now" onclick="window.location.href='https://wa.me/6288983163720?text=VPS%20Digital%20Ocean'">Hubungi Kami</button>
      </div>`;
  }
}

// Loading screen animation
window.onload = function() {
  setTimeout(function() {
    document.getElementById('loading').style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling after loading is done
  }, 5000); // Simulate 5 seconds of loading time before showing the content
};