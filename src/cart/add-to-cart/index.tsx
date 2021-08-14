import { useCallback, useContext, useState } from "react";
import { CartContext, ICartContext, ICartProduct} from "../context";
import { IProduct } from "../../types";
import { Button, Typography, withStyles } from "@material-ui/core";
import { Panel } from '../../components';



const QTYButton = withStyles({
    root: {
        width:'32px', 
        height:'32px', 
        minWidth:0,
    },
    label: {
      fontWeight:'bolder',
      fontSize: '20px',
    },
  })(Button);

const formatter = Intl.NumberFormat('en-GB', {style:'currency', currency:'GBP'})

export const AddToCart = (props:{product:IProduct}) => { 
    const cartContext:ICartContext = useContext(CartContext);
    const [currentQuantity, setCurrentQuantity] = useState<number>(0); 

    const add = useCallback(() => { 
        setCurrentQuantity(qty => qty + 1)
    }, [])

    const remove = useCallback(() => { 
        setCurrentQuantity(qty => qty > 0 ? qty - 1 : 0)
    }, [])

    const addCurrentQtyToCart = useCallback(() => {
        const items:ICartProduct = {product:props.product, quantity:currentQuantity};
        cartContext.addProducts(items)
    }, [currentQuantity, cartContext, props.product]);

    const getFormattedPrice =  () => formatter.format(props.product.price/100);

    const renderQtySelector = useCallback(() => {
        return <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                    <Typography style={{lineHeight:'1'}} variant="caption">QTY</Typography>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'42px'}}>
                    <QTYButton data-testid="subtractButton" disabled={currentQuantity === 0} color={'secondary'} variant="contained" onClick={remove}>-</QTYButton>
                        <Typography data-testid="currentQuantity" style={{padding:'12px'}} variant={'h4'}>
                            {currentQuantity}
                        </Typography>
                    <QTYButton data-testid="addButton" style={{width:'32px', height:'32px', minWidth:0}} color={'secondary'} variant="contained" onClick={add}>+</QTYButton>
                    </div>
        </div>
    }, [currentQuantity, add, remove])

    return <Panel> 
        <div data-testid="addToCartSection" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <Typography data-testid="currentPrice" variant={'h2'}>
            {getFormattedPrice()}
        </Typography>
        {renderQtySelector()}
        </div>
        <Button disabled={currentQuantity === 0} data-testid="addToCartButton" color={'primary'} variant="contained" onClick={addCurrentQtyToCart}>Add To Cart</Button>
    </Panel>
}