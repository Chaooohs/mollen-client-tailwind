import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/goodsAPI";
import { useDispatch, useSelector } from "react-redux";

import { Breadcrumbs, Gallery, LastSeen, Select, StarRating } from "../../components";
import { setCartItems, setErrorModal, setLastSeen, setLimitGoodsModalOpen, } from "../../redux";
import { getDiscount, categoryUkr } from "../../utils";
import styles from "./SingleGoodPage.module.scss";

export const SingleGoodPage = () => {
  const { state } = useLocation();
  const countRef = useRef()
  const plusRef = useRef()
  const cartBtnRef = useRef()
  const params = useParams();
  const dispatch = useDispatch()
  const size = useSelector(state => state.sizeSinglePage.size)

  const { data: singleGood } = useGetSingleProductQuery(`/catalog/${params.id}`);

  const [count, setCount] = useState(1);

  useEffect(() => {
    singleGood &&
      dispatch(setLastSeen(singleGood))
  }, [singleGood]);

  useEffect(() => {
    setCount(1)
  }, [size])

  useEffect(() => window.scrollTo(0, 0), [])

  const increment = () => {
    const stock = singleGood.stock

    if (count < stock) {
      setCount(count + 1)
      countRef.current.focus()
    } else {
      dispatch(setLimitGoodsModalOpen({ open: true, stock }))
      countRef.current.blur()
      plusRef.current.blur()
    }
  };

  const decrement = () => setCount(Math.max(1, count - 1))

  const handleChange = (e) => {
    const value = parseInt(e.target.value)
    const stock = singleGood.stock

    if (value <= stock) {
      setCount(value)
    } else {
      dispatch(setLimitGoodsModalOpen({ open: true, stock }))
      setCount(stock)
      document.body.classList.add('no-scroll')
      countRef.current.blur()
    }
  }

  const handleClickAddToCart = (id, thumbnail, title, price, discountPercentage, stock, size) => {

    const cartItem = {
      id,
      thumbnail,
      title,
      price,
      discountPrice: getDiscount(price, discountPercentage),
      count,
      stock,
      size,
    };

    if (size === "") {
      dispatch(setErrorModal(true))
      cartBtnRef.current.blur()
    } else {
      dispatch(setCartItems(cartItem))
    }
  };

  return (
    <main className="main grid grid-rows-[1fr_auto_auto] m-0">
      <div className={styles.layout}>

        <div className={styles.gallery}>
          <Gallery singleGood={singleGood} />
        </div>

        {singleGood && (
          <>
            <header className={styles.header}>
              <Breadcrumbs subfolder={categoryUkr(state?.subfolder)} current={singleGood.title} />
              <h1 className={styles.heading}>{singleGood.title}</h1>
            </header>
            <div className={styles.brand}>
              <div className={styles.wrap}>
                {singleGood.brand}
              </div>
            </div>
            <div className={styles.id}>
              <div className={styles.wrap}>
                {`id: ${singleGood.id}`}
              </div>
            </div>
            <div className={styles.description}>
              <div className={styles.wrap}>
                {singleGood.description}
              </div>
            </div>
            <div className={styles.rating}>
              <div className={styles.wrap}>
                <StarRating singleGood={singleGood} />
              </div>
            </div>
            <div className={styles.stock}>
              <div className={styles.wrap}>
                <span className={styles.stocktext}>в наявностi</span>
                <span className={styles.stocknum}>{singleGood.stock > 10 ? "(10+)" : singleGood.stock}</span>
              </div>
            </div>
            <div className={styles.price}>
              <div className={styles.wrap}>
                <div className={styles.price__box}>
                  <span>
                    {`${(getDiscount(singleGood.price, singleGood.discountPercentage) * count).toLocaleString("ru")} ₴`}
                  </span>
                  {
                    singleGood.discountPercentage > 0 &&
                    <span className={styles.through}>{(singleGood.price * count).toLocaleString("ru")}</span>
                  }
                </div>
              </div>
            </div>
            <div
              className={styles.box}
            >
              <div className={styles.counter} >
                <button
                  className={styles.minus}
                  onClick={decrement}
                >
                  -
                </button>

                <input
                  ref={countRef}
                  className={styles.number}
                  value={count}
                  onChange={handleChange}
                />

                <button
                  ref={plusRef}
                  className={styles.plus}
                  onClick={increment}
                >
                  +
                </button>
              </div>
              <button
                ref={cartBtnRef}
                className={styles.button}
                onClick={() => handleClickAddToCart(singleGood.id, singleGood.thumbnail, singleGood.title, singleGood.price, singleGood.discountPercentage, singleGood.stock, size)}
              >
                <span>у кошик</span>
              </button>
            </div>
            <div className={styles.wrap}>
              <div className={styles.color}>
                <div className="font-circe text-middle text-color-text-secondary">Колір</div>
                <div className="capitalize tracking-[1px] ml-16">{categoryUkr(singleGood.color)}</div>
              </div>
              <div className={styles.size}>
                <Select data={singleGood.size} />
              </div>
            </div>
          </>
        )}
      </div>
      <LastSeen />
    </main >
  );
};
