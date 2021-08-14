
import { render, screen, fireEvent } from '@testing-library/react';
import {AddToCart} from '.';
import { getMockProduct } from '../../testMocks';
import { CartContext, ICartContext } from '..';


const addToCartElements =  {
    currentQuantity: () => screen.getByTestId('currentQuantity'),
    addToCartButton: () => screen.getByTestId('addToCartButton'),
    plusButton: () => screen.getByTestId('addButton'),
    subtractButton: () => screen.getByTestId('subtractButton')
}

const getMockContext = () => ({
    products:[],
    addProducts:jest.fn(),
} as ICartContext)


test('add to cart correctly renders', () => { 
    const mockContext:ICartContext = getMockContext();

    render(<CartContext.Provider value={mockContext}>
        <AddToCart product={getMockProduct()}/>
    </CartContext.Provider>)

    const section = screen.getByTestId('addToCartSection');

    expect(section).toBeInTheDocument();

});

test('add to cart button is disabled if no quantity selected', async () => {
    const mockContext:ICartContext = getMockContext();
   
    render(<CartContext.Provider value={mockContext}>
        <AddToCart product={getMockProduct()}/>
    </CartContext.Provider>)

    const currentQuantityElement = addToCartElements.currentQuantity();
    const addToCartButton = addToCartElements.addToCartButton();
    const plusButton = addToCartElements.plusButton();

    expect(addToCartButton).toBeDisabled();
    expect(currentQuantityElement).toHaveTextContent('0');
    fireEvent.click(plusButton);
    expect(addToCartButton).not.toBeDisabled();
});

test('subtract button is disabled when no quantity selected', async () => {
    const mockContext:ICartContext = getMockContext();
   
    render(<CartContext.Provider value={mockContext}>
        <AddToCart product={getMockProduct()}/>
    </CartContext.Provider>)

    const currentQuantityElement = addToCartElements.currentQuantity();
    const subtractButton = addToCartElements.subtractButton();
    const plusButton = addToCartElements.plusButton();

    expect(subtractButton).toBeDisabled();
    expect(currentQuantityElement).toHaveTextContent('0');
    fireEvent.click(plusButton);
    expect(subtractButton).not.toBeDisabled();
});

test('pressing add button increases quantity', async () => {
    const mockContext:ICartContext = getMockContext();
   
    render(<CartContext.Provider value={mockContext}>
        <AddToCart product={getMockProduct()}/>
    </CartContext.Provider>)

    const currentQuantityElement = addToCartElements.currentQuantity();
    const plusButton = addToCartElements.plusButton();

    expect(currentQuantityElement).toHaveTextContent('0');
    fireEvent.click(plusButton);
    expect(currentQuantityElement).toHaveTextContent('1');
});

test('pressing subtract button decreases quantity', async () => {
    const mockContext:ICartContext = getMockContext();
   
    render(<CartContext.Provider value={mockContext}>
        <AddToCart product={getMockProduct()}/>
    </CartContext.Provider>)

    const currentQuantityElement = addToCartElements.currentQuantity();
    const plusButton = addToCartElements.plusButton();
    const subtractButton = addToCartElements.subtractButton();

    expect(currentQuantityElement).toHaveTextContent('0');
    fireEvent.click(plusButton);
    expect(currentQuantityElement).toHaveTextContent('1');
    fireEvent.click(subtractButton);
    expect(currentQuantityElement).toHaveTextContent('0');
});

test('pressing add to cart button correctly calls the add products function', async () => {
    const mockContext:ICartContext = getMockContext();
    const product = getMockProduct();
   
    render(<CartContext.Provider value={mockContext}>
        <AddToCart product={product}/>
    </CartContext.Provider>)

    const currentQuantityElement = addToCartElements.currentQuantity();
    const plusButton = addToCartElements.plusButton();
    const addToCartButton = addToCartElements.addToCartButton();

    expect(currentQuantityElement).toHaveTextContent('0');
    fireEvent.click(plusButton);
    expect(currentQuantityElement).toHaveTextContent('1');
    fireEvent.click(addToCartButton);
    expect(mockContext.addProducts).toBeCalledWith({product, quantity:1})
});
