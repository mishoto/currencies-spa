import React, { useState, useRef, useEffect } from 'react';
import { useGlobalContext } from '../../context';
import {
  ratePairGenerator,
  filterAllPairsByCurrency,
  calculateMaxArrayLengthWithDiff,
} from '../../utils/rates';

import style from './SearchForm.module.css';

const SearchForm = () => {
  const { lsKeys, lsValues } = useGlobalContext();
  const [inputCurrency, setInputCurrency] = useState('');
  const [arrayLength, setArrayLength] = useState(0);
  const [filteredArray, setFilteredArray] = useState([]);
  const searchValue = useRef('');

  const resultArray = ratePairGenerator(lsKeys, lsValues);
  const filterByCurrencyArray = filterAllPairsByCurrency(
    resultArray,
    inputCurrency,
  );

  const sortFilteredArray = filterByCurrencyArray.sort((a, b) => {
    return a[1] - b[1];
  });
  const maxArrayLength = calculateMaxArrayLengthWithDiff(
    sortFilteredArray,
    0.5,
  );

  const searchCurrency = () => {
    setInputCurrency(searchValue.current.value);
    setArrayLength(maxArrayLength);
    setFilteredArray(filterByCurrencyArray);
    setTimeout(() => {
      setInputCurrency('');
      setArrayLength(0);
      setFilteredArray([]);
      searchValue.current.value = '';
    }, 5000);
  };

  useEffect(() => {
    searchValue.current.focus();
  }, [inputCurrency]);

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
          <label className={style.form_control_label} htmlFor='name'>
            result: {arrayLength}
          </label>
        </div>
      </form>
      <article className={style.filter_result}>
        <div className={style.array_container}>
          <h4>
            {searchValue.current.value} <span>{` max Math.abs() <= 0.5`}</span>
          </h4>
        </div>

        <div className={style.result_container}>
          {!searchValue.current.value
            ? ''
            : filteredArray.map((pair, index) => {
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
          <h4>{filteredArray.length}</h4>
        </div>
      </article>
    </section>
  );
};

export default SearchForm;
