import { useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import plus from '/public/images/svg/plus.svg'
import styles from './Accordion.module.scss'

export const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div>
      <div className={styles.item}>
        <div className={styles.title} onClick={() => setIsActive(!isActive)}>
          <div className={styles.text}>{title}</div>
          <div className={styles.icon} style={isActive ? { transform: 'rotate(45deg)' } : null}>
            <img src={plus} alt='plus' />
          </div>
        </div>

        <CSSTransition
          in={isActive}
          timeout={250}
          classNames={"accordion-open"}
          unmountOnExit
        >
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
          {/* вставка текста с переносом строк как в innerHTML*/}
        </CSSTransition>
      </div >
    </div>
  )
}
