import { useEffect, useRef, useState } from 'react'

import plus from '/public/images/svg/plus.svg'
import styles from './Accordion.module.scss'

export const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false)
  const [isToggle, setIsToggle] = useState(false)
  const ref = useRef()

  useEffect(() => {
    setIsActive(true)

    if (isToggle) {
      setTimeout(() => {
        ref.current.classList.add(`${styles.open}`)
      }, 50)
    }

    else if (!isToggle && ref.current) {
      ref.current.classList.remove(`${styles.open}`)
      setTimeout(() => {
        setIsActive(false)
      }, 550)
    }

  }, [isToggle])

  return (
    <div>
      <div className={styles.item}>
        <div className={styles.title} onClick={() => setIsToggle(!isToggle)}>
          <div className={styles.text}>{title}</div>
          <div className={styles.icon} style={isToggle ? { transform: 'rotate(45deg)' } : null}>
            <img src={plus} alt='plus' />
          </div>
        </div>
        {
          isActive &&
          <div className={styles.body} ref={ref} >
            <div className='overflow-hidden'>
              <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
              {/* вставка текста с переносом строк как в innerHTML*/}
            </div>
          </div>
        }
      </div >
    </div>
  )
}
