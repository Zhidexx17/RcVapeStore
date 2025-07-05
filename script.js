// Cek apakah ada user yang sedang login saat DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (currentUser) {
    showProfile(currentUser);
  }
  updateCartCount(); // Pastikan jumlah item keranjang diperbarui saat halaman dimuat
});

// Fungsi untuk menampilkan/menyembunyikan side menu
function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  const overlay = document.getElementById("overlay");
  const isShown = menu.classList.contains("show");
  document.body.style.overflow = isShown ? 'auto' : 'hidden'; // Mengatur overflow body
  menu.classList.toggle("show");
  overlay.classList.toggle("show");
}

// Fungsi untuk menampilkan/menyembunyikan panel login atau profil
function toggleLogin() {
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (currentUser) {
    showProfile(currentUser);
  } else {
    const login = document.getElementById("loginPanel");
    const overlay = document.getElementById("overlay");
    const isShown = login.classList.contains("show");
    document.body.style.overflow = isShown ? 'auto' : 'hidden'; // Mengatur overflow body
    login.classList.toggle("show");
    overlay.classList.toggle("show");
  }
}

// Fungsi untuk menutup semua menu (side menu, login/profil panel)
function closeAllMenus() {
  document.getElementById("sideMenu").classList.remove("show");
  document.getElementById("loginPanel").classList.remove("show");
  document.getElementById("profilePanel").classList.remove("show"); // Pastikan profil juga tertutup
  document.getElementById("overlay").classList.remove("show");
  document.body.style.overflow = 'auto'; // Mengembalikan overflow body
}

// Fungsi untuk mengganti tab di side menu (Categories/Menu)
function switchTab(tabName) {
  const tabButtons = document.querySelectorAll('.tab-header .tab');
  tabButtons.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`.tab[onclick*="${tabName}"]`).classList.add('active');
  document.getElementById('categoriesTab').style.display = tabName === 'categories' ? 'block' : 'none';
  document.getElementById('menuTab').style.display = tabName === 'menu' ? 'block' : 'none';
}

// Fungsi untuk menampilkan form login
function showLoginForm() {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('registerForm').style.display = 'none';
  document.getElementById('loginTitle').style.display = 'block';
  document.getElementById('registerTitle').style.display = 'none';
}

// Fungsi untuk menampilkan form registrasi
function showRegisterForm() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('registerForm').style.display = 'block';
  document.getElementById('loginTitle').style.display = 'none';
  document.getElementById('registerTitle').style.display = 'block';
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
  const notif = document.getElementById("notification");
  notif.innerText = message;
  notif.style.display = "block";
  setTimeout(() => {
    notif.style.display = "none";
  }, 3000);
}

// Fungsi untuk menangani registrasi
function handleRegister(e) {
  e.preventDefault();
  const email = document.getElementById('regEmail').value;
  const pass = document.getElementById('regPass').value;
  const age = parseInt(document.getElementById('regAge').value);
  const phone = document.getElementById('regPhone').value;

  if (age < 20) {
    showNotification('Umur minimal harus 20 tahun ke atas.');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const existing = users.find(u => u.email === email);
  if (existing) {
    showNotification('Email sudah terdaftar!');
    return;
  }

  users.push({ email, pass, age, phone });
  localStorage.setItem('users', JSON.stringify(users));
  showNotification('Registrasi berhasil! Silakan login.');
  showLoginForm();
}

// Fungsi untuk menangani login
function handleLogin(e) {
  e.preventDefault();
  const userInput = document.getElementById('loginUser').value;
  const passInput = document.getElementById('loginPass').value;
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  const user = users.find(u => u.email === userInput && u.pass === passInput);
  if (user) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    showNotification('Login berhasil! Selamat datang, ' + user.email);
    closeAllMenus();
    showProfile(user);
  } else {
    showNotification('Email atau password salah!');
  }
}

// Fungsi untuk menampilkan panel profil
function showProfile(user) {
  document.getElementById("profileName").innerText = user.name || user.username || user.email; // Gunakan email jika nama/username tidak ada
  document.getElementById("profileEmail").innerText = user.email;
  document.getElementById("profilePanel").classList.add("show");
  document.getElementById("overlay").classList.add("show");
  document.body.style.overflow = 'hidden';
}

// Fungsi untuk menutup panel profil
function closeProfile() {
  document.getElementById("profilePanel").classList.remove("show");
  document.getElementById("overlay").classList.remove("show");
  document.body.style.overflow = 'auto';
}

// Fungsi untuk menangani logout
function handleLogout() {
  localStorage.removeItem("loggedInUser");
  closeProfile();
  showNotification("Anda telah logout.");
}

// Fungsi untuk membuka panel RC Point
function openPointPanel() {
  document.getElementById("pointPanel").classList.add("show");
  document.body.style.overflow = 'hidden';
}

// Fungsi untuk menutup panel RC Point
function closePointPanel() {
  document.getElementById("pointPanel").classList.remove("show");
  document.body.style.overflow = 'auto';
}

// Fungsi untuk membuka panel Voucher
function openVoucherPanel() {
  document.getElementById("voucherPanel").classList.add("show");
  document.body.style.overflow = 'hidden';
}

// Fungsi untuk menutup panel Voucher
function closeVoucherPanel() {
  document.getElementById("voucherPanel").classList.remove("show");
  document.body.style.overflow = 'auto';
}

// Fungsi untuk membuka halaman Liquid
function openLiquidPage() {
  document.getElementById("liquidPage").classList.add("show");
  document.body.style.overflow = 'hidden';
  closeAllMenus(); // Tutup side menu dan menu lainnya jika terbuka
}

// Fungsi untuk menutup halaman Liquid
function closeLiquidPage() {
  document.getElementById("liquidPage").classList.remove("show");
  document.body.style.overflow = 'auto';
}

// Fungsi untuk membuka halaman POD
function openPODPage() {
  document.getElementById("PODPage").classList.add("show");
  document.body.style.overflow = 'hidden';
  closeAllMenus(); // Tutup side menu dan menu lainnya jika terbuka
}

// Fungsi untuk menutup halaman POD
function closePODPage() {
  document.getElementById("PODPage").classList.remove("show");
  document.body.style.overflow = 'auto';
}

// Tambahkan ke keranjang
function addToCart(name, priceStr, image) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  // Menghilangkan 'Rp ' dan titik ribuan, lalu konversi ke integer
  const price = parseInt(priceStr.replace(/Rp /g, '').replace(/\./g, ''));
  cart.push({ name, price, image });
  localStorage.setItem('cart', JSON.stringify(cart));
  showNotification('Produk ditambahkan ke keranjang!');
  updateCartCount();
}

// Buka keranjang
function openCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");
  cartContainer.innerHTML = ""; // Bersihkan konten keranjang sebelumnya

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p style='text-align: center; margin-top: 20px; color: #555;'>Keranjang masih kosong.</p>";
    totalEl.textContent = "Rp 0";
  } else {
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price;

      const el = document.createElement("div");
      el.className = "point-product-item"; // Menggunakan styling yang sudah ada
      el.style.width = '100%'; // Membuat item keranjang mengambil lebar penuh
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'space-between';
      el.style.marginBottom = '10px';
      el.style.padding = '10px';
      el.style.border = '1px solid #eee';
      el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
      el.innerHTML = `
        <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; margin-right: 10px;">
        <div style="flex-grow: 1; text-align: left;">
            <p style="margin: 0; font-size: 15px; font-weight: bold;">${item.name}</p>
            <span class="price-rp" style="font-size: 14px;">Rp ${item.price.toLocaleString('id-ID')}</span>
        </div>
        <button onclick="removeFromCart(${index})" style="background:red; color:white; padding:6px 12px; border:none; border-radius:5px; cursor:pointer; font-size:12px;">Hapus</button>
      `;
      cartContainer.appendChild(el);
    });

    totalEl.textContent = `Rp ${total.toLocaleString('id-ID')}`;
  }

  document.getElementById("cartPanel").classList.add("show");
  document.body.style.overflow = "hidden";
}

// Tutup keranjang
function closeCart() {
  document.getElementById("cartPanel").classList.remove("show");
  document.body.style.overflow = "auto";
}

// Hapus item dari keranjang
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1); // Hapus item pada indeks yang spesifik
  localStorage.setItem('cart', JSON.stringify(cart));
  openCart(); // Refresh tampilan keranjang
  updateCartCount();
}

// Hitung total item di keranjang dan perbarui badge
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const badge = document.getElementById("cartCount");
  badge.innerText = cart.length;
  badge.style.display = cart.length > 0 ? 'inline-block' : 'none';
}

// Checkout keranjang
function checkoutCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert("Keranjang Anda kosong.");
    return;
  }

  // Logika checkout: Bisa dikembangkan untuk proses pembayaran, konfirmasi, dll.
  alert("Checkout berhasil! Terima kasih telah berbelanja.");
  localStorage.removeItem('cart'); // Kosongkan keranjang setelah checkout
  closeCart(); // Tutup panel keranjang
  updateCartCount(); // Perbarui jumlah item di badge keranjang
}