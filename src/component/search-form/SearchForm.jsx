import React, { useState, useRef, useEffect } from 'react';
import { useGlobalContext } from '../../context';
import {
  ratePairGenerator,
  filterAllPairsByCurrency,
  filterSelectedWithDifference,
  filterRemainingPairs,
} from '../../utils/rates';

import style from './SearchForm.module.css';

const SearchForm = () => {
  const { lsKeys, lsValues, searchBase } = useGlobalContext();
  const [currency, setCurrency] = useState(searchBase);
  const [arrayLength, setArrayLength] = useState(0);
  const [maxDifferenceArray, setMaxDifferenceArray] = useState([]);
  const searchValue = useRef('');
  

  const resultArray = ratePairGenerator(lsKeys, lsValues);
  const filteredArray = filterAllPairsByCurrency(resultArray, currency);

  const arrayWithDifference = filterSelectedWithDifference(filteredArray, 0.5);

  const searchCurrency = () => {
    setCurrency(searchValue.current.value);
    setArrayLength(arrayWithDifference.length);
    setMaxDifferenceArray(arrayWithDifference);
    setTimeout(()=>{
      setCurrency('');
      setArrayLength(0);
      setMaxDifferenceArray([]);
      searchValue.current.value = '';
    },3000);
    
  };

  useEffect(() => {
    searchValue.current.focus();
  }, [searchBase]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className={style.search}>
      <form className={style.search_form} onSubmit={handleSubmit}>
        <div className={style.form_control}>
          <label className={style.form_control_label} htmlFor='name'>
            search currency
          </label>

          <input
            className={style.form_control_input}
            type='text'
            id='name'
            ref={searchValue}
            onChange={() => searchCurrency()}
          />
          <label 
          className={style.form_control_label} htmlFor='name'>
            result: {arrayLength}
          </label>
        </div>
      </form>
      <article className={style.filter_result}>
        <div className={style.array_container}>
          <h4>
            {currency} <span>{` max Math.abs() <= 0.5`}</span>{' '}
          </h4>
        </div>

        <div className={style.result_container}>
          {!searchValue.current.value
            ? ''
            : maxDifferenceArray.map((pair, index) => {
                return (
                  <>
                    <div>
                      <ul key={index}>
                        <li>
                          {pair[0]} : {pair[1]}
                        </li>
                      </ul>
                    </div>
                  </>
                );
              })}
        </div>
      </article>
    </section>
  );
};

export default SearchForm;
