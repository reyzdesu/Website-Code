document.addEventListener("DOMContentLoaded", function() {
    let loadingBar = document.querySelector(".loading-bar");
    setTimeout(() => { loadingBar.style.width = "70%"; }, 500);
    setTimeout(() => { loadingBar.style.width = "85%"; }, 1500);
    setTimeout(() => { loadingBar.style.width = "100%"; }, 3000);
    setTimeout(() => { document.querySelector(".loading-bar-container").style.display = "none"; }, 3500);
});

let prices = {
    panel: 1000,
    scBot: 45000
};

let quantities = {
    panel: 1,
    scBot: 1
};

function updateQty(type, amount) {
    quantities[type] = Math.max(1, quantities[type] + amount);
    document.getElementById(`${type}-qty`).textContent = quantities[type];
    updateTotal();
}

function updateTotal() {
    let total = 0;
    let selectedProduct = document.getElementById('produk').value;
    let message = "Hallo Kak, Saya ingin membeli:\n\n";

    if (selectedProduct === "sewa-bot") {
        let durasiSelect = document.getElementById("sewa-bot-durasi");
        let durasiText = durasiSelect.options[durasiSelect.selectedIndex].text;
        let harga = durasiSelect.options[durasiSelect.selectedIndex].getAttribute("data-price");
        total = parseInt(harga);
        message += `Saya ingin menyewa bot dengan:\nDurasi: ${durasiText}\nHarga: Rp ${total.toLocaleString()}\n\nRespon secepatnya ya kak.`;
    } else if (selectedProduct === "panel") {
        total = quantities.panel * prices.panel;
        message += `Panel Pterodactyl:\nRAM: ${quantities.panel} GB\nTotal: Rp ${total.toLocaleString()}\n\nRespon secepatnya ya kak.`;
    } else if (selectedProduct === "sc-bot") {
        total = quantities.scBot * prices.scBot;
        message += `Script Bot WhatsApp:\nJumlah: ${quantities.scBot} Script\nTotal: Rp ${total.toLocaleString()}\n\nRespon secepatnya ya kak.`;
    }

    document.getElementById('total-price').textContent = total.toLocaleString();
    document.getElementById('total-price-container').style.display = 'block';

    document.getElementById('buy-now').onclick = function() {
        let waUrl = `https://wa.me/6288983163720?text=${encodeURIComponent(message)}`;
        window.location.href = waUrl;
    };
}