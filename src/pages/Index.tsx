import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const Index = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const downloadAsFile = (data: FormData) => {
    const content = `Данные регистрации
==================

Имя: ${data.name}
Email: ${data.email}
Пароль: ${data.password}
Дата регистрации: ${new Date().toLocaleString('ru-RU')}

Файл создан автоматически системой регистрации.
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `registration_${data.name.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    // Сохраняем данные в текстовый файл
    downloadAsFile(formData);
    
    setIsSubmitted(true);
    
    // Сброс формы через 3 секунды
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', password: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mb-6">
            <div className="w-16 h-16 bg-black rounded-full mx-auto flex items-center justify-center mb-4">
              <Icon name="User" size={24} className="text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-light text-black mb-2">Регистрация</h1>
          <p className="text-sm text-gray-500">Создайте новый аккаунт</p>
        </div>

        {!isSubmitted ? (
          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-normal text-black">
                    Имя
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-12 border-gray-200 border-2 rounded-lg bg-white focus:border-black focus:ring-0 transition-colors duration-200"
                    placeholder="Введите ваше имя"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-normal text-black">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-12 border-gray-200 border-2 rounded-lg bg-white focus:border-black focus:ring-0 transition-colors duration-200"
                    placeholder="example@mail.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-normal text-black">
                    Пароль
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="h-12 border-gray-200 border-2 rounded-lg bg-white focus:border-black focus:ring-0 transition-colors duration-200"
                    placeholder="Введите пароль"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-black text-white hover:bg-gray-800 rounded-lg font-normal transition-colors duration-200"
                >
                  Зарегистрироваться
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="p-0 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center animate-scale-in">
                  <Icon name="Check" size={24} className="text-white" />
                </div>
                <h2 className="text-xl font-light text-black">Успешно!</h2>
                <p className="text-sm text-gray-500">
                  Данные сохранены в файл и загружены на ваш компьютер
                </p>
                <div className="text-xs text-gray-400">
                  Форма обновится через несколько секунд...
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            Уже есть аккаунт? <span className="text-black cursor-pointer hover:underline">Войти</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;