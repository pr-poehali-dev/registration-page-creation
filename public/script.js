const form = document.getElementById('registration-form');
const successMessage = document.getElementById('success-message');

function saveToFile(name, email, password) {
    const existingData = localStorage.getItem('registrations') || '';
    const newRecord = `\n--- Новая регистрация ---\nИмя: ${name}\nEmail: ${email}\nПароль: ${password}\nДата: ${new Date().toLocaleString()}\n`;
    const allData = existingData + newRecord;
    
    localStorage.setItem('registrations', allData);
    
    const blob = new Blob([allData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'registrations.txt';
    link.click();
    URL.revokeObjectURL(url);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (name && email && password) {
        saveToFile(name, email, password);
        
        form.classList.add('hidden');
        successMessage.classList.remove('hidden');
        
        setTimeout(() => {
            form.classList.remove('hidden');
            successMessage.classList.add('hidden');
            form.reset();
        }, 2000);
    }
});