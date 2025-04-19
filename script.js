window.onload = () => {
  setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
  }, 5000);
};

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const newTheme = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
}

function selectProduct(product) {
  const details = document.getElementById("product-details");
  const options = document.getElementById("product-options");
  const price = document.getElementById("product-price");

  details.innerHTML = "";
  options.innerHTML = "";
  price.innerHTML = "";

  if (product === "sewabot") {
    details.innerHTML = `<h3>Sewa Bot</h3><p>Pilih Durasi:</p>`;
    options.innerHTML = `
      <select onchange="showPrice(this.value, 'sewabot')">
        <option value="">-- Pilih Durasi --</option>
        <option value="3k">7 Hari</option>
        <option value="5k">15 Hari</option>
        <option value="10k">30 Hari</option>
        <option value="30k">365 Hari</option>
        <option value="50k">Permanen</option>
      </select>`;
  }
  else if (product === "scriptbot") {
    details.innerHTML = `<h3>Script Bot WhatsApp</h3><p>Pilih Script:</p>`;
    options.innerHTML = `
      <select onchange="showPrice(this.value, 'scriptbot')">
        <option value="">-- Pilih Script --</option>
        <option value="50k">Akari - Free Update</option>
        <option value="30k">Akari - No Update</option>
        <option value="45k">Yue - Free Update</option>
        <option value="30">Yue - No Update</option>
      </select>`;
  }
  else if (product === "panel") {
    details.innerHTML = `<h3>Panel Pterodactyl</h3><p>Pilih Tipe:</p>`;
    options.innerHTML = `
      <select onchange="showPrice(this.value, 'panel')">
        <option value="">-- Pilih Tipe --</option>
        <option value="10k">1GB - 10GB</option>
        <option value="11k">Unlimited</option>
        <option value="15k">ADP</option>
        <option value="12k">Reseller</option>
      </select>`;
  }
  else if (product === "vps") {
    details.innerHTML = `<h3>VPS Digital Ocean</h3><p>Belum tersedia.</p>`;
  }
}

function showPrice(priceText, product) {
  if (!priceText) return;
  const price = document.getElementById("product-price");
  price.innerHTML = `<p>Harga: <strong>${priceText}</strong></p>
    <a href="https://wa.me/6288983163720?text=Halo%20saya%20ingin%20membeli%20produk%20${product}%20dengan%20harga%20${priceText}" target="_blank">
      <button class="buy">Buy Now</button>
    </a>`;
}
