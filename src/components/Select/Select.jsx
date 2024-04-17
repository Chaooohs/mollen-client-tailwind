import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setSizeSinglePage } from '../../redux'
import bird from '/public/images/svg/bird.svg'
import styles from './Select.module.scss'


export const Select = ({ data }) => {
  const dispatch = useDispatch()
  const { size } = useSelector(state => state.sizeSinglePage)
  const [isToggle, setIsToggle] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isLength, setIsLength] = useState(true)
  const ref = useRef()

  useEffect(() => {
    dispatch(setSizeSinglePage(""))
  }, [])

  useEffect(() => {
    if (Array.isArray(data) && data.length === 1) {
      data.map(el => dispatch(setSizeSinglePage(el)))
      setIsLength(false)
    }
  }, [data])

  useEffect(() => {
    setIsOpen(true)

    if (isToggle) {
      setTimeout(() => {
        ref.current.classList.add("accordion__open")
      }, 50)
    }

    else if (!isToggle && ref.current) {
      ref.current.classList.remove("accordion__open")
      setTimeout(() => {
        setIsOpen(false)
      }, 550)
    }

  }, [isToggle])


  return (
    <div
      onClick={() => setIsToggle(!isToggle)}
      className={`${styles.box} ${Array.isArray(data) && isLength ? styles.border : ""}`}
    >
      <div className={styles.label}>
        <div >{Array.isArray(data) && isLength ? "Оберiть ромiр" : "Розмiр"}</div>
        <div className={styles.value}>{size}</div>
        {
          Array.isArray(data) && isLength &&
          <div
            className={styles.icon}
            style={isOpen ? { transform: 'rotate(180deg)' } : null}>
            <img src={bird} alt='arrow' />
          </div>
        }
      </div>

      {
        isOpen && isLength &&
        <div className="accordion" ref={ref} >
          <div className="accordion__hidden">
            <div className={styles.popup} >
              <ul className={styles.list}>
                {
                  Array.isArray(data) && isOpen &&
                  data.map(el => {
                    return (
                      <li
                        key={el}
                        className={styles.item}
                        onClick={() => dispatch(setSizeSinglePage(el))}
                      >
                        {el}
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
      }
    </div >
  )
}