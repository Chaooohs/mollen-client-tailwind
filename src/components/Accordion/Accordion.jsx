import { useEffect, useRef, useState } from "react";

import plus from "/public/images/svg/plus.svg";
import styles from "./Accordion.module.scss";

export const Accordion = ({ title, content }) => {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [isToggle, setIsToggle] = useState(false);

  useEffect(() => {
    setIsOpen(true);

    if (isToggle) {
      setTimeout(() => {
        ref.current.classList.add("accordion__open");
      }, 50);
    }

    else if (!isToggle && ref.current) {
      ref.current.classList.remove("accordion__open");
      setTimeout(() => {
        setIsOpen(false);
      }, 550);
    }

  }, [isToggle]);

  return (
    <div>
      <div className={styles.item}>
        <div className={styles.title} onClick={() => setIsToggle(!isToggle)}>
          <div className={styles.text}>{title}</div>
          <div className={styles.icon} style={isToggle ? { transform: "rotate(45deg)" } : null}>
            <img src={plus} alt="plus" />
          </div>
        </div>
        {
          isOpen &&
          <div className="accordion" ref={ref}>
            <div className="accordion__hidden">
              <div className={styles.popup} dangerouslySetInnerHTML={{ __html: content }} />
              {/* вставка текста с переносом строк как в innerHTML*/}
            </div>
          </div>
        }
      </div>
    </div>
  );
};
