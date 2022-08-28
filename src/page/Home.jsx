import React from 'react';
import CurrenciesList from '../component/currencies-list/CurrenciesList';
import Dropdown from '../component/drop-down/Dropdown';
import Navbar from '../component/navbar/Navbar';
import SearchForm from '../component/search-form/SearchForm';

const Home = () => {
  return (
    <main>
      <Navbar />
      <SearchForm />
      <Dropdown />
      <CurrenciesList />
    </main>
  );
};

export default Home;
