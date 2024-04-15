import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import styles from './Gallery.module.scss'
import { NavigationBtn } from '../NavigationBtn/NavigationBtn'

export const Gallery = ({ singleGood }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const isLaptop = useMediaQuery({ maxWidth: 992 })

  const handleClick = (index) => {
    setImageIndex(index)
  }

  const handlePrevClick = () => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    }
  }

  const handleNextClick = () => {
    if (imageIndex < singleGood?.images.length - 1) {
      setImageIndex(imageIndex + 1);
    }
  }

  return (
    <div className={styles.gallery} style={{ userSelect: 'none' }}>
      <div className={styles.navigation}>
        {
          !isLaptop &&
          <div className={styles.navigation__buttons}>
            <div onClick={handleNextClick}>
              <NavigationBtn />
            </div>
            <div onClick={handlePrevClick}>
              <NavigationBtn rotate={true} />
            </div>
          </div>
        }
        <div className={styles.previos}>
          {
            singleGood?.preview.map((el, index) => {
              return (
                <div
                  key={index}
                  style={index === imageIndex
                    ? { border: '1px solid #2C2D2E' }
                    : { border: '1px solid transparent' }}
                  className={styles.previos__box}
                >
                  <img
                    src={el}
                    onClick={() => handleClick(index)}
                    className={styles.previos__img}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
      <div className={styles.image}>
        <img src={singleGood?.images[imageIndex]} className={styles.image__img} />
      </div>
    </div >
  )
}
