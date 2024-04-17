import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Rating from '@mui/material/Rating';

import { getDiscount } from "../../utils";
import styles from "./Cards.module.scss";

export const Cards = ({ el }) => {
  const isLaptop = useMediaQuery({ maxWidth: 992 })
  let [isMouse, setIsMouse] = useState(false)
  let [isOpen, setIsOpen] = useState(false)
  const ref = useRef()

  useEffect(() => {
    setIsOpen(true)

    if (isMouse) {
      setTimeout(() => {
        ref.current.classList.add(`${styles.open}`)
      }, 50)
    }

    else if (!isMouse && ref.current) {
      ref.current.classList.remove(`${styles.open}`)
      setTimeout(() => {
        setIsOpen(false)
      }, 250)
    }

  }, [isMouse])

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsMouse(true)}
      onMouseLeave={() => setIsMouse(false)}
    >
      {
        el.discountPercentage > 0 &&
        <div className={styles.percents}>{`-${el.discountPercentage}%`}</div>
      }
      <div className={styles.image}>
        <img
          src={el.thumbnail}
        />
      </div>
      <div className={styles.descr}>
        <h3 className={styles.title}>
          <strong className={styles.name}>{el.title}</strong>
          <strong className={styles.brand}>{el.brand}</strong>
        </h3>
        <Rating
          name="half-rating-read"
          defaultValue={el.rating}
          precision={0.1}
          size="smile"
          readOnly
          style={{ color: '#a1a09d', margin: '0 auto', fontSize: '18px' }}
        />
        {
          el.discountPercentage > 0
            ?
            <div className={styles.price}>
              <span className={styles.through}>{el.price.toLocaleString('ru')}</span>
              <span
                className={styles.discount}
                style={{ color: '#4E76C6' }}
              >
                {`${getDiscount(el.price, el.discountPercentage)} ₴`}
              </span>
            </div>
            :
            <div className={styles.discount}>{`${el.price} ₴`}</div>
        }
      </div>
      {
        !isLaptop && isOpen &&
        <div className={styles.body} ref={ref}>
          <div className="overflow-hidden">
            <div className={styles.elem} >
              <button className={styles.button} >
                Детальніше
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  );
};
