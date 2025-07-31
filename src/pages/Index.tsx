import React, { useState } from 'react';

const Index = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [saved, setSaved] = useState(false);

  const saveToFile = () => {
    const data = `Имя: ${name}\nEmail: ${email}\nПароль: ${password}\nДата: ${new Date().toLocaleString()}`;
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'registration.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      saveToFile();
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setName('');
        setEmail('');
        setPassword('');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-sm w-full max-w-md">
        <h1 className="text-2xl font-light text-center mb-8">Регистрация</h1>
        
        {saved ? (
          <div className="text-center">
            <div className="text-green-600 text-4xl mb-4">✓</div>
            <p>Данные сохранены!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Имя</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-black outline-none"
                placeholder="Ваше имя"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-black outline-none"
                placeholder="example@mail.com"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-black outline-none"
                placeholder="Введите пароль"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800"
            >
              Зарегистрироваться
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Index;