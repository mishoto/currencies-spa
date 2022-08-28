import React, { useState, useRef } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { useGlobalContext } from '../../context';
import { generateNewUrlTargetArray } from '../../utils/rates';
import style from './Dropdown.module.css';

const Dropdown = () => {
  const { searchBase, setSearchBase, targetCurrencies, setTargetCurrencies, setIsEmpty } =
    useGlobalContext();

  const [isActive, setIsActive] = useState(false);
  const selected = useRef(searchBase);

  const selectHandler = (rate) => {
    setTargetCurrencies(
      generateNewUrlTargetArray(targetCurrencies, searchBase, rate),
    );
    setSearchBase(rate);
    setIsActive(false);
    localStorage.clear();
    selected.current = rate;
    setIsEmpty(true);
  };

  return (
    <section className={style.dropdown}>
      <div
        className={style.dropdown_btn}
        onClick={(e) => {
          setIsActive(!isActive);
        }}>
        Base currency: {selected.current}
        <span>
          <FaCaretDown />
        </span>
      </div>
      
      <div className={style.dropdown_content}>
        {isActive && (
          <div className={style.dropdown_content}>
            {targetCurrencies.map((rate) => {
              return (
                <div
                  key={rate}
                  className={style.dropdown_item}
                  onClick={() => {
                    selectHandler(rate);
                  }}>
                  {rate}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Dropdown;
