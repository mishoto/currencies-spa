import React, { useEffect } from 'react';
import { useGlobalContext } from '../../context';
import { ratePairGenerator } from '../../utils/rates';

import style from './CurrenciesList.module.css';

const CurrenciesList = () => {
  const { lsKeys, lsValues } = useGlobalContext();

  const resultArray = ratePairGenerator(lsKeys, lsValues);

  useEffect(()=>{
},[{}])

  const filterMinRates = resultArray
    .filter((item) => item[1] < 1)
    .sort((a, b) => a[1] - b[1]);

  const filterMedianRates = resultArray
    .filter((item) => item[1] >= 1.000005 && item[1] < 1.5)
    .sort((a, b) => a[1] - b[1]);

  const filterMaxRates = resultArray
    .filter((item) => item[1] >= 1.5)
    .sort((a, b) => a[1] - b[1]);

  const rateListFilteredMin = filterMinRates.map((rate) => {
    const pairName = rate[0];
    const pairValue = rate[1];
    return (
      <ul key={rate[0]}>
        <li className={style.list_pair}>
          {pairName} : {pairValue}
        </li>
      </ul>
    );
  });

  const rateListFilteredMedian = filterMedianRates.map((rate) => {
    const pairName = rate[0];
    const pairValue = rate[1];

    return (
      <ul key={rate[0]}>
        <li className={style.list_pair}>
          {pairName} : {pairValue}
        </li>
      </ul>
    );
  });

  const rateListFilteredMax = filterMaxRates.map((rate) => {
    const pairName = rate[0];
    const pairValue = rate[1];
    return (
      <ul key={rate[0]}>
        <li className={style.list_pair}>
          {pairName} : {pairValue}
        </li>
      </ul>
    );
  });

  return (
    <section className={style.grid_container}>
      <article className={style.rate_list}>
        <h4>Rates: {` < 1`} </h4>
        {rateListFilteredMin}
        <h5>Count: {rateListFilteredMin.length}</h5>
      </article>
      <article className={style.rate_list}>
        <h4>Rates: {` >= 1 && < 1.5`} </h4>
        {rateListFilteredMedian}
        <h5>Count: {rateListFilteredMedian.length}</h5>
      </article>
      <article className={style.rate_list}>
        <h4>Rates: {` >= 1.5`} </h4>
        {rateListFilteredMax}
        <h5>Count: {rateListFilteredMax.length}</h5>
      </article>
    </section>
  );
};

export default CurrenciesList;
