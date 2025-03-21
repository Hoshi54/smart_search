import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FlightResults = ({ results, searchQuery }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('price'); // 'price', 'duration', 'departure'

  // Имитация данных рейсов (в реальности данные будут из API)
  const exampleFlights = [
    {
      id: 1,
      flightNumber: 'S7 2051',
      origin: searchQuery.origin || 'Новосибирск',
      originCode: 'OVB',
      destination: searchQuery.destination || 'Санкт-Петербург',
      destinationCode: 'LED',
      departureDate: searchQuery.departDate || '2025-04-07',
      departureTime: '12:10',
      arrivalTime: '12:50',
      duration: '4ч 40м',
      direct: true,
      price: 11499,
      originalPrice: 12930,
      hasPromo: false,
      hasLuggage: true,
    },
    {
      id: 2,
      flightNumber: 'S7 2053',
      origin: searchQuery.origin || 'Новосибирск',
      originCode: 'OVB',
      destination: searchQuery.destination || 'Санкт-Петербург',
      destinationCode: 'LED',
      departureDate: searchQuery.departDate || '2025-04-07',
      departureTime: '15:05',
      arrivalTime: '15:40',
      duration: '4ч 35м',
      direct: true,
      price: 11499,
      originalPrice: null,
      hasPromo: false,
      hasLuggage: false,
    },
    {
      id: 3,
      flightNumber: 'S7 2066',
      origin: searchQuery.origin || 'Новосибирск',
      originCode: 'OVB',
      destination: searchQuery.destination || 'Санкт-Петербург',
      destinationCode: 'LED',
      departureDate: searchQuery.departDate || '2025-04-07',
      departureTime: '08:15',
      arrivalTime: '11:05',
      duration: '6ч 50м',
      direct: false,
      connections: [
        { 
          airport: 'Москва', 
          code: 'DME',
          waitTime: '1ч 20м' 
        }
      ],
      price: 11322,
      originalPrice: 12930,
      hasPromo: false,
      hasLuggage: true,
    },
    {
      id: 4,
      flightNumber: 'S7 2028',
      origin: searchQuery.origin || 'Новосибирск',
      originCode: 'OVB',
      destination: searchQuery.destination || 'Санкт-Петербург',
      destinationCode: 'LED',
      departureDate: searchQuery.departDate || '2025-04-08',
      departureTime: '14:30',
      arrivalTime: '18:45',
      duration: '8ч 15м',
      direct: false,
      connections: [
        { 
          airport: 'Екатеринбург', 
          code: 'SVX',
          waitTime: '2ч 05м' 
        }
      ],
      price: 16484,
      originalPrice: 19302,
      hasPromo: true,
      promoText: 'Для молодежи и пенсионеров',
      hasLuggage: true,
    },
  ];

  // Используем мок данные или настоящие данные из пропсов
  const flights = results || exampleFlights;
  
  // Фильтры
  const filteredFlights = flights.filter(flight => {
    if (activeFilter === 'direct') return flight.direct;
    if (activeFilter === 'connections') return !flight.direct;
    return true; // 'all'
  });

  // Сортировка
  const sortedFlights = [...filteredFlights].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'duration') {
      // Преобразуем длительность в минуты для сравнения
      const getMinutes = (duration) => {
        const [hours, minutes] = duration.replace(/[^0-9]/g, ' ').trim().split(' ');
        return parseInt(hours) * 60 + parseInt(minutes);
      };
      return getMinutes(a.duration) - getMinutes(b.duration);
    }
    // По времени вылета
    return a.departureTime.localeCompare(b.departureTime);
  });

  // Форматирование даты
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  // Форматирование цены
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(price);
  };

  return (
    <div className="flight-results-container max-w-4xl mx-auto">
      {/* Инфопанель поиска */}
      <div className="search-info bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="flex items-center text-gray-600 mb-2">
          <h2 className="text-xl font-semibold text-gray-800 mr-4">
            {searchQuery.origin || 'Новосибирск'} ({flights[0]?.originCode || 'OVB'}) → {searchQuery.destination || 'Санкт-Петербург'} ({flights[0]?.destinationCode || 'LED'})
          </h2>
        </div>
        <div className="text-gray-600">
          <span className="mr-4">{formatDate(searchQuery.departDate || '2025-04-07')}</span>
          <span>{searchQuery.passengers || 1} пассажир{searchQuery.passengers > 1 ? (searchQuery.passengers < 5 ? 'а' : 'ов') : ''}</span>
        </div>
      </div>

      {/* Фильтры */}
      <div className="filters bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => setActiveFilter('all')} 
            className={`py-2 px-4 rounded-full transition-colors ${activeFilter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Все рейсы
          </button>
          <button 
            onClick={() => setActiveFilter('direct')} 
            className={`py-2 px-4 rounded-full transition-colors ${activeFilter === 'direct' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Без пересадок
          </button>
          <button 
            onClick={() => setActiveFilter('connections')} 
            className={`py-2 px-4 rounded-full transition-colors ${activeFilter === 'connections' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            С пересадками
          </button>
        </div>
      </div>

      {/* Сортировка */}
      <div className="sorting bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="flex gap-4">
          <span className="text-gray-600">Сортировать:</span>
          <button 
            onClick={() => setSortBy('price')} 
            className={`text-sm font-medium ${sortBy === 'price' ? 'text-green-600 underline' : 'text-gray-700'}`}
          >
            по цене
          </button>
          <button 
            onClick={() => setSortBy('duration')} 
            className={`text-sm font-medium ${sortBy === 'duration' ? 'text-green-600 underline' : 'text-gray-700'}`}
          >
            по времени в пути
          </button>
          <button 
            onClick={() => setSortBy('departure')} 
            className={`text-sm font-medium ${sortBy === 'departure' ? 'text-green-600 underline' : 'text-gray-700'}`}
          >
            по времени вылета
          </button>
        </div>
      </div>

      {/* Список рейсов */}
      <div className="flights-list space-y-4">
        {sortedFlights.length > 0 ? (
          sortedFlights.map((flight) => (
            <div key={flight.id} className="flight-card bg-white shadow-md rounded-lg overflow-hidden">
              {/* Информация о рейсе */}
              <div className="flight-info p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flight-label text-gray-600">
                    {flight.direct ? (
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M4 4a1 1 0 011-1h4a1 1 0 011 1v1h5a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2h5V4z" />
                        </svg>
                        <span>Прямой</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>{flight.connections?.length || 1} пересадк{flight.connections?.length === 1 ? 'а' : 'и'}</span>
                      </div>
                    )}
                  </div>
                  <div className="flight-airline flex items-center">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                      S7
                    </div>
                    <span className="text-sm text-gray-600">{flight.flightNumber}</span>
                  </div>
                </div>
                
                <div className="flight-times flex justify-between items-center">
                  <div className="departure">
                    <div className="text-xl font-bold">{flight.departureTime}</div>
                    <div className="text-sm text-gray-600">{flight.originCode}</div>
                  </div>
                  
                  <div className="flight-path flex-1 mx-4">
                    <div className="text-xs text-center text-gray-500 mb-1">{flight.duration}</div>
                    <div className="relative flex items-center">
                      <div className="h-0.5 flex-1 bg-gray-300"></div>
                      {!flight.direct && (
                        <div className="connection-dot absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-orange-500 rounded-full"></div>
                      )}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="arrival text-right">
                    <div className="text-xl font-bold">{flight.arrivalTime}</div>
                    <div className="text-sm text-gray-600">{flight.destinationCode}</div>
                  </div>
                </div>
                
                {/* Пересадки */}
                {!flight.direct && flight.connections && (
                  <div className="connections mt-2 pl-4 border-l-2 border-orange-500">
                    {flight.connections.map((connection, index) => (
                      <div key={index} className="connection text-sm text-gray-600">
                        Пересадка в {connection.airport} ({connection.code}), {connection.waitTime}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Промо */}
              {flight.hasPromo && (
                <div className="promo bg-blue-50 p-2 border-t border-blue-100">
                  <div className="flex items-center">
                    <div className="promo-icon bg-blue-500 text-white p-1 rounded mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="promo-text text-sm text-blue-700">{flight.promoText}</div>
                  </div>
                </div>
              )}
              
              {/* Цена и кнопки */}
              <div className="flight-footer p-4 flex justify-between items-center border-t border-gray-100">
                <div className="price">
                  <div className="current-price text-2xl font-bold">{formatPrice(flight.price)} ₽</div>
                  {flight.originalPrice && (
                    <div className="original-price text-sm text-gray-500 line-through">
                      {formatPrice(flight.originalPrice)} ₽
                    </div>
                  )}
                  <div className="price-per-person text-xs text-gray-500">
                    за 1 пассажира
                  </div>
                </div>
                
                <button className="book-button bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-colors">
                  Выбрать
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results bg-white p-8 rounded-lg shadow-md text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Рейсы не найдены</h3>
            <p className="text-gray-600 mb-6">К сожалению, по вашему запросу не найдено доступных рейсов.</p>
            <Link to="/" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-colors">
              Изменить параметры поиска
            </Link>
          </div>
        )}
      </div>
      
      {/* Ссылка на возврат к поиску */}
      <div className="back-link mt-6 text-center">
        <Link to="/" className="text-green-600 hover:text-green-700 font-medium">
          ← Вернуться к поиску
        </Link>
      </div>
    </div>
  );
};

export default FlightResults;