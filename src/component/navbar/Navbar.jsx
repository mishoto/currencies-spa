import React from 'react'
import style from './Navbar.module.css'

const Navbar = () => {


  return (
    <nav className={style.navbar}>
      <div className={style.nav_center}>
        <h3>Currencies Spa</h3>
      </div>
    </nav>
  );
}

export default Navbar