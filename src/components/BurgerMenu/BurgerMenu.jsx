import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { setBurgerOpen } from '../../redux/openSlice/openSlice'
import { categories, categoryUkr } from "../../utils";
import { Social } from '../Social/Social'
import Plus from '../../../public/images/svg/plus.svg?react'
import Logo from '../../../public/images/svg/logo.svg?react'
import styles from './BurgerMenu.module.scss'

export const BurgerMenu = ({ state }) => {
  const dispatch = useDispatch()
  const { burger } = useSelector(state => state.open)
  const ref = useRef()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (burger && !isOpen) {
      setTimeout(() => {
        ref.current.classList.add(`${styles.open}`)
      }, 50)
    }
    
    else if(isOpen){
      ref.current.classList.remove(`${styles.open}`)
      setTimeout(() => {
        dispatch(setBurgerOpen(false))
      }, 350)
    }

  }, [isOpen, burger])

  const handleClick = () => {
    setIsOpen(true)
    document.body.classList.remove('no-scroll')
  }

  return (
    <div className={`${styles.burger} ${state}`} ref={ref}>
      <header className={styles.header}>
        <button className={styles.button} onClick={handleClick}>
          <Plus className={styles.plus} />
        </button>
        <Link to="/" onClick={handleClick} className={styles.logo} >
          <Logo fill={'#1E1E1E'} opacity={'0.2'} />
        </Link>
      </header>

      <main className={styles.main}>
        <aside className={styles.aside}>
          <div className={styles.menu}>
            <span className={styles.title}>меню</span>
            <nav className={styles.menu__list}>
              <Link to="/return" onClick={handleClick}>Повернення та обмін</Link>
              <Link to="/payment" onClick={handleClick}>Доставка та оплата</Link>
              <Link to="/guarantee" onClick={handleClick}>Гарантії</Link>
              <Link to="/contacts" onClick={handleClick}>Контакти</Link>
            </nav>
          </div>
        </aside>
        <section className={styles.categories}>
          <span className={styles.title}>категорії mollen</span>
          <nav className={styles.categories__list}>
            {
              categories?.map((el, index) => {
                return (
                  <Link
                    to={`/catalog?category=${el}`}
                    key={index}
                    onClick={handleClick}
                    className='heading'
                  >
                    {categoryUkr(el)}
                  </Link>
                )
              })
            }
          </nav>
        </section>
      </main>

      <footer className={styles.footer}>
        <Social />
        <a href="tel:88002222222" className={styles.phone}>8 800 222 22 22</a>
      </footer>
    </div >
  )
}
