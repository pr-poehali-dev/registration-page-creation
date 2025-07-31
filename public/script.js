document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (name && email && password) {
        const data = `Имя: ${name}\nEmail: ${email}\nПароль: ${password}\nДата: ${new Date().toLocaleString()}\n\n`;
        
        const blob = new Blob([data], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'registration.txt';
        link.click();
        
        document.getElementById('registration-form').style.display = 'none';
        document.getElementById('success-message').style.display = 'block';
        
        setTimeout(() => {
            document.getElementById('registration-form').style.display = 'block';
            document.getElementById('success-message').style.display = 'none';
            document.getElementById('registration-form').reset();
        }, 2000);
    }
});