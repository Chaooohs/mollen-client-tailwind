import { Link, useNavigate } from "react-router-dom";
import styles from './Breadcrumbs.module.scss'

export const Breadcrumbs = ({ subfolder, current }) => {
  const navigate = useNavigate()

  const currentFolder = current.split(" ").slice(0, 1)

  const handleClick = () => { 
    navigate(-1)
  }

  return (
    <div className={styles.breadcrumbs}>
      <ul className={styles.ul}>
        <li>
          <Link to="/">
            <span  className={styles.link}>головна</span>
          </Link>
          <span>/</span>
        </li>
        {
          subfolder &&
          <li>
            <span className={styles.link} onClick={handleClick}>{subfolder}</span>
            <span>/</span>
          </li>
        }
        <li>
          <span>{currentFolder}</span>
        </li>
      </ul>
    </div>
  );
};
