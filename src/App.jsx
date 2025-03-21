import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import FlightResults from './components/FlightResults';
import './index.css';

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState({
    origin: '',
    destination: '',
    departDate: '',
    returnDate: '',
    passengers: 1,
    baggage: false
  });

  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    try {
      const response = await fetch('/process_query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_age: 30, // Можно добавить выбор возраста в форму
          user_location: query.origin,
          user_query: `Найти рейсы из ${query.origin} в ${query.destination} на ${query.departDate}${query.returnDate ? ` и обратно ${query.returnDate}` : ''} для ${query.passengers} пассажиров${query.baggage ? ' с багажом' : ' без багажа'}`
        }),
      });

      const data = await response.json();
      setSearchResults(data.results);
      window.location.href = '/results';
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <Router>
      <div className="app bg-gray-100 min-h-screen">
        <Header />
        <div className="container mx-auto p-4">
          <Routes>
            <Route 
              path="/" 
              element={<SearchForm onSearch={handleSearch} />} 
            />
            <Route 
              path="/results" 
              element={
                searchResults ? (
                  <FlightResults 
                    results={searchResults} 
                    searchQuery={searchQuery}
                  />
                ) : (
                  <Navigate to="/" />
                )
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;