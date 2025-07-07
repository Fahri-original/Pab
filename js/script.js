document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navUl = document.querySelector('nav ul');
    
    mobileMenu.addEventListener('click', function() {
        navUl.classList.toggle('show');
    });

    // Hide admin link if not admin
    const adminEmails = ['gndadnan@gmail.com', 'gandafahrialadnan@gmail.com']; // Ganti dengan email admin yang valid
    const userEmail = localStorage.getItem('userEmail'); // Ini hanya simulasi
    
    const adminLink = document.getElementById('admin-link');
    
   if (!adminEmails.includes(userEmail)) {
        adminLink.style.display = 'null';
    } 

    // Payment form handling
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const noPelanggan = document.getElementById('no-pelanggan').value;
            const nama = document.getElementById('nama').value;
            const jumlah = document.getElementById('jumlah').value;
            const metode = document.getElementById('metode').value;
            
            // Simpan data pembayaran (simulasi)
            const paymentData = {
                noPelanggan,
                nama,
                jumlah,
                metode,
                tanggal: new Date().toLocaleString()
            };
            
            localStorage.setItem('lastPayment', JSON.stringify(paymentData));
            
            alert('Pembayaran berhasil diproses!');
            paymentForm.reset();
        });
    }
});