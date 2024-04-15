import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

import { CartSidebar, Breadcrumbs, CartItem, } from "../../components";
import { setCartModalOpen } from "../../redux";
import ClearIcon from "/public/images/svg/delete.svg?react";
import styles from "./CartPage.module.scss";

export const CartPage = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.items)
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const handleClearCartItems = () => {
    dispatch(setCartModalOpen(true))
    document.body.classList.add('no-scroll')
  };

  return (
    <main className="main">
      <div className={styles.layout}>
        <section className={styles.section}>
          <header className={styles.header}>
            <Breadcrumbs current={"кошик"} />
            <div className={styles.chapter}>
              <h1 className="heading">кошик</h1>
              {
                cartItems.length > 0 &&
                <div className={styles.clear} onClick={handleClearCartItems} >
                  <div className="flex gap-x-2">
                    <span>очистити</span>
                    {
                      !isMobile &&
                      <span>кошик</span>
                    }
                  </div>
                  <ClearIcon className={styles.icon} />
                </div>
              }
            </div>
          </header>
          <CartItem />
        </section>
        <CartSidebar />
      </div>
    </main>
  );
};
