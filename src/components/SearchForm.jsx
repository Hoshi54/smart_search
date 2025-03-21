import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    baggage: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Очистка ошибки поля при вводе
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.origin) newErrors.origin = 'Укажите город отправления';
    if (!formData.destination) newErrors.destination = 'Укажите город прибытия';
    if (!formData.departDate) newErrors.departDate = 'Выберите дату вылета';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSearch(formData);
    }
  };

  // Форматирование даты для отображения
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  return (
    <div className="search-form-container bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Поиск авиабилетов</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Город отправления */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Откуда
            </label>
            <input
              type="text"
              name="origin"
              placeholder="Город отправления"
              value={formData.origin}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-md border ${errors.origin ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.origin && <p className="text-red-500 text-sm mt-1">{errors.origin}</p>}
          </div>

          {/* Город прибытия */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Куда
            </label>
            <input
              type="text"
              name="destination"
              placeholder="Город прибытия"
              value={formData.destination}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-md border ${errors.destination ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Дата отправления */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Туда
            </label>
            <input
              type="date"
              name="departDate"
              value={formData.departDate}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-md border ${errors.departDate ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
            {errors.departDate && <p className="text-red-500 text-sm mt-1">{errors.departDate}</p>}
          </div>

          {/* Дата возвращения */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Обратно (необязательно)
            </label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Количество пассажиров */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Пассажиры
            </label>
            <select
              name="passengers"
              value={formData.passengers}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <option key={num} value={num}>{num} пассажир{num > 1 ? (num < 5 ? 'а' : 'ов') : ''}</option>
              ))}
            </select>
          </div>

          {/* Багаж */}
          <div className="flex items-center h-full pt-8">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="baggage"
                checked={formData.baggage}
                onChange={handleChange}
                className="h-5 w-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
              />
              <span className="ml-2 text-gray-700">С багажом</span>
            </label>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md text-lg transition-colors duration-200"
          >
            Найти билеты
          </button>
        </div>
      </form>

      {/* Краткая информация о текущем поиске */}
      {formData.origin && formData.destination && formData.departDate && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Ваш поиск:</h3>
          <div className="flex flex-wrap items-center text-gray-600">
            <span className="mr-2 font-medium">{formData.origin}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mx-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="mr-4 font-medium">{formData.destination}</span>
            <span className="mx-2">
              {formatDate(formData.departDate)}
              {formData.returnDate && ` - ${formatDate(formData.returnDate)}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchForm;