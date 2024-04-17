import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import { useSelector } from "react-redux";

import { Aside, BurgerMenu, ClearCart, ErrorModal, Footer, Header, LimitGoodsModal, RemoveCartItem } from "../components";

export const Root = () => {
  const location = useLocation()
  const isLaptop = useMediaQuery({ maxWidth: 1025 })
  const { cartModalOpen, cartItemModalOpen, limitGoodsModal } = useSelector(state => state.modal)
  const { sidebar, burger } = useSelector(state => state.open)
  const error = useSelector(state => state.error.errorModal)

  return (
    <div className="page">
      <Header />
      <Outlet />
      {
        location.pathname !== "/cart" || !isLaptop ?
          < Footer /> : null
      }
      {
        cartModalOpen &&
        <ClearCart />
      }
      {
        cartItemModalOpen &&
        <RemoveCartItem />
      }
      {
        sidebar &&
        <Aside />
      }
      {
        limitGoodsModal &&
        <LimitGoodsModal />
      }

      { 
        burger &&
        <BurgerMenu />
      }

      {
        error &&
        <ErrorModal text={'Необхідно обрати розмір'} />
      }
    </div>
  );
};
