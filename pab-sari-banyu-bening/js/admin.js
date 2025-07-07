document.addEventListener('DOMContentLoaded', function() {
    // Simulasi data admin
    const adminData = {
        'gndadnan@gmail.com': {
            password: 'atmin1',
            name: 'Admin Utama'
        },
        'staff@pab.com': {
            password: 'staff123',
            name: 'Staff Admin'
        }
    };
    
    // Simulasi data pelanggan
    let customers = [
        { id: 1, name: 'Budi Santoso', address: 'Jl. Merdeka No. 10', ID: '08123456789', email: 'budi@example.com' },
        { id: 2, name: 'Ani Wijaya', address: 'Jl. Sudirman No. 5', ID: '08234567890', email: 'ani@example.com' }
    ];
    
    // Simulasi data tagihan
    let bills = [
        { customerId: 1, amount: 75000, month: 'Januari 2023', status: 'Lunas' },
        { customerId: 2, amount: 85000, month: 'Januari 2023', status: 'Belum Lunas' }
    ];
    
    // Login admin
    const adminLoginForm = document.getElementById('admin-login-form');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('admin-email').value;
            const password = document.getElementById('admin-password').value;
            
            if (adminData[email] && adminData[email].password === password) {
                localStorage.setItem('adminEmail', email);
                localStorage.setItem('adminName', adminData[email].name);
                window.location.href = 'dashboard.html';
            } else {
                alert('Email atau password salah!');
            }
        });
    }
    
    // Cek session admin
    const adminEmail = localStorage.getItem('adminEmail');
    if (!adminEmail && window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'index.html';
    }
    
    // Dashboard functionality
    if (window.location.pathname.includes('dashboard.html')) {
        // Update stats
        document.getElementById('total-customers').textContent = customers.length;
        
        const currentMonthBills = bills.filter(bill => bill.month.includes('Januari'));
        const totalCurrentBills = currentMonthBills.reduce((sum, bill) => sum + bill.amount, 0);
        document.getElementById('current-bills').textContent = `Rp ${totalCurrentBills.toLocaleString()}`;
        
        const lastPayment = bills.find(bill => bill.status === 'Lunas');
        document.getElementById('last-payment').textContent = lastPayment ? `Rp ${lastPayment.amount.toLocaleString()}` : 'Rp 0';
        
        // Toggle forms
        document.getElementById('add-admin').addEventListener('click', function() {
            document.getElementById('add-admin-form').classList.remove('hidden');
            document.getElementById('add-member-form').classList.add('hidden');
        });
        
        document.getElementById('add-member').addEventListener('click', function() {
            document.getElementById('add-member-form').classList.remove('hidden');
            document.getElementById('add-admin-form').classList.add('hidden');
        });
        
        document.getElementById('cancel-add-admin').addEventListener('click', function() {
            document.getElementById('add-admin-form').classList.add('hidden');
        });
        
        document.getElementById('cancel-add-member').addEventListener('click', function() {
            document.getElementById('add-member-form').classList.add('hidden');
        });
        
        // Add new admin
        document.getElementById('new-admin-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('new-admin-email').value;
            const name = document.getElementById('new-admin-name').value;
            const password = document.getElementById('new-admin-password').value;
            
            adminData[email] = { password, name };
            alert(`Admin ${name} berhasil ditambahkan!`);
            this.reset();
            document.getElementById('add-admin-form').classList.add('hidden');
        });
        
        // Add new member
        document.getElementById('new-member-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newMember = {
                id: customers.length + 1,
                name: document.getElementById('member-name').value,
                address: document.getElementById('member-address').value,
                phone: document.getElementById('member-phone').value,
                email: document.getElementById('member-email').value
            };
            
            customers.push(newMember);
            bills.push({
                customerId: newMember.id,
                amount: 75000,
                month: 'Februari 2023',
                status: 'Belum Lunas'
            });
            
            alert(`Anggota ${newMember.name} berhasil ditambahkan!`);
            this.reset();
            document.getElementById('add-member-form').classList.add('hidden');
            
            // Update stats
            document.getElementById('total-customers').textContent = customers.length;
        });
    }
});