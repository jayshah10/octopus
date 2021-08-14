import { withStyles, Badge, IconButton } from "@material-ui/core";
import { useCallback, useContext } from "react";
import { CartContext, ICartContext } from "../context";

const CartBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    padding: '0 4px',
  },
}))(Badge);

export const Basket = () => {
    const cartContext:ICartContext  = useContext(CartContext);

    const getCartImg = useCallback(() => <img src={'/assets/basket.svg'} height={'28px'} alt={'basket icon'}/>, []);

    const getTotalProductCount = () => { 
      return cartContext.products.reduce((total, cartProduct) => {
        return total + cartProduct.quantity;
      }, 0);
    }

    return (
        <IconButton data-testid={'basketIcon'} aria-label="cart">
          {cartContext.products.length === 0 ? getCartImg() : 
          <CartBadge data-testid={"basketCount"} badgeContent={getTotalProductCount()} color="primary">
              {getCartImg()}
          </CartBadge>}
        </IconButton>
    );
}