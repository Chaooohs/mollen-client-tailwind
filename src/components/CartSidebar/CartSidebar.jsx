import { useSelector } from 'react-redux'
import { getDiscount } from '../../utils'
import styles from './CartSidebar.module.scss'

export const CartSidebar = () => {
  const cartItem = useSelector(state => state.cart.items)

  let toralPriceWithDiscount = cartItem.map(el => el.count * el.discountPrice)
    .reduce((sum, el) => sum + el, 0)

  let totalPrice = cartItem.map(el => el.count * el.price)
    .reduce((sum, el) => sum + el, 0)


  return (
    <aside className={styles.aside}>
      <div className='pb-8'>
        <div>Разом</div>
        <div className={`heading ${styles.totalprice}`}>
          {`${toralPriceWithDiscount.toLocaleString("ru")} ₴`}
        </div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.price}>
        <span>Товарів на</span>
        <span className={styles.num}>
          {`${totalPrice.toLocaleString("ru")} ₴`}
        </span>
      </div>
      <div className={styles.discount}>
        <span>Знижка</span>
        <span className={styles.num}>
          {`${(totalPrice - toralPriceWithDiscount).toLocaleString("ru")} ₴`}
        </span>
      </div>
      <button className="btn w-72 mt-8 laptop:fixed laptop:bottom-0 laptop:left-0" >замовити</button>
    </aside>
  )
}
