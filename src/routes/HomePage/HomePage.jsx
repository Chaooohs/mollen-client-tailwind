import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetPopularGoodsQuery } from "../../redux";

import { setCategory } from "../../redux";
import { categories, categoryUkr } from "../../utils";
import { Cards } from "../../components";
import Circle from "/public/images/svg/circle.svg?react";
import Flover from "/public/images/svg/flover.svg";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
  const dispatch = useDispatch();

  const { data: popular } = useGetPopularGoodsQuery();

  const handlerClick = (category) => {
    dispatch(setCategory(category));
  };

  return (
    <main className={styles.main}>
      <div
        className={styles.categories}>
        <nav className={styles.list}>
          {categories?.map((el, index) => {
            return (
              <Link
                key={index}
                to={`/catalog?category=${el}`}
                className={styles.link}
                onClick={() => handlerClick(el)}>
                <Circle className={styles.circle} />
                <span>{categoryUkr(el)}</span>
              </Link>
            );
          })}
        </nav>
        <img src={Flover} className={styles.flover} />
      </div>
      <div className={styles.popular}>
        <h1 className={styles.title}>популярнi товари</h1>
        <div className="cards-lt">
          {popular?.map((el) => {
            return (
              <Link key={el.id} to={`/${el.id}`}>
                <Cards el={el} />
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
};
