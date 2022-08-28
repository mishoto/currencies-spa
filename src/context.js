import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

const url = 'https://exchange-rates.abstractapi.com/v1/live';
const api_key = '?api_key=5019c070a8364c20985ce781e4abd551';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchBase, setSearchBase] = useState('USD');
  const [currencies, setCurrencies] = useState([]);
  const [lsKeys, setLsKeys] = useState([]);
  const [lsValues, setLsValues] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [targetCurrencies, setTargetCurrencies] = useState([
    'EUR',
    'AUD',
    'CAD',
    'CHF',
    'NZD',
    'BGN',
  ]);

  const fetchCurrenciesData = async (baseUrl, targetUrlCurrencies) => {
    setLoading(true);
    try {
      const response = await axios(
        `${url}${api_key}&base=${baseUrl}&target=${targetUrlCurrencies}`,
      );
      const data = await response.data;
      const { base, last_updated, exchange_rates } = data;
      saveCurrenciesDataToLocalStorage(exchange_rates, base);
      setCurrencies(exchange_rates);
     
     
      getCurrenciesDataFromLocalStorage();
      setLoading(false);
     
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const saveCurrenciesDataToLocalStorage = (data, base) => {
    const TARGET_KEYS = Object.keys(data);
    TARGET_KEYS.unshift(base);
    const TARGET_VALUES = Object.values(data);
    TARGET_VALUES.unshift(1.000001);
    navigator.storage.persist();
    localStorage.setItem('TARGET_KEYS', JSON.stringify(TARGET_KEYS));
    localStorage.setItem('TARGET_VALUES', JSON.stringify(TARGET_VALUES));
    setIsEmpty(false);
  };

  const getCurrenciesDataFromLocalStorage = () => {
    const targetKeysFromLS = localStorage.getItem('TARGET_KEYS');
    const targetValuesFromLS = localStorage.getItem('TARGET_VALUES');
    setLsKeys(JSON.parse(targetKeysFromLS));
    setLsValues(JSON.parse(targetValuesFromLS));
   
  };

  useEffect(() => {
    if (localStorage.length === 0) {
      fetchCurrenciesData(searchBase, targetCurrencies);
      
      return ()=>{
    getCurrenciesDataFromLocalStorage();
    setLsKeys([]);
    setLsValues([]);
      }
    }

    getCurrenciesDataFromLocalStorage();
  }, [searchBase, targetCurrencies]);

  return (
    <AppContext.Provider
      value={{
        loading,
        currencies,
        searchBase,
        lsKeys,
        lsValues,
        targetCurrencies,
        isEmpty,
        setSearchBase,
        setTargetCurrencies,
        setLsKeys,
        setLsValues,
        setIsEmpty,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
