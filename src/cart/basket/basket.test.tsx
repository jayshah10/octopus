
import { render, screen } from '@testing-library/react';
import {Basket} from '.';
import { getMockProduct } from '../../testMocks';
import { CartContext, ICartContext } from '..';

const basketElements =  {
    basketCount: () => screen.getByTestId('basketCount'),
    basketIcon:() => screen.getByTestId('basketIcon')
}

const getMockContext = () => ({
    products:[],
    addProducts:jest.fn(),
} as ICartContext)


test('basket correctly renders', () => { 
    const mockContext:ICartContext = getMockContext();

    render(<CartContext.Provider value={mockContext}>
        <Basket/>
    </CartContext.Provider>)

    const section = basketElements.basketIcon();
    expect(section).toBeInTheDocument();
});

test('basket item count badge not visible if no products in cart context', async () => {
    const mockContext:ICartContext = getMockContext();

    render(<CartContext.Provider value={mockContext}>
        <Basket/>
    </CartContext.Provider>)

    expect(screen.queryByTestId('basketCount')).toBeNull();
})

test('basket count shows correct ammount', async () => {
    const mockContext:ICartContext = getMockContext();
    mockContext.products.push({quantity:5, product:getMockProduct()})
    mockContext.products.push({quantity:1, product:getMockProduct()})

    render(<CartContext.Provider value={mockContext}>
        <Basket/>
    </CartContext.Provider>)

   const basketCount = basketElements.basketCount();
   expect(basketCount).toHaveTextContent('6')
})