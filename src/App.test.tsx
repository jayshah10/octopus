import { render, screen, fireEvent } from '@testing-library/react';
import {TestApp} from './App';
import { MockedProvider } from '@apollo/client/testing';
import {productQuery} from './queries';
import { getMockProduct } from './testMocks';

const mocks:any = [
  {
    request: {
      query: productQuery,
      variables: {
        productId: '1',
      },
    },
    result: {
      data: {
        product: getMockProduct(),
      },
    },
  },
]; 

const addToCartElements =  {
  currentQuantity: () => screen.getByTestId('currentQuantity'),
  addToCartButton: () => screen.getByTestId('addToCartButton'),
  plusButton: () => screen.getByTestId('addButton'),
  subtractButton: () => screen.getByTestId('subtractButton')
}

const basketElements =  {
  basketCount: () => screen.getByTestId('basketCount'),
  basketIcon:() => screen.getByTestId('basketIcon')
}

test('App renders correctly', () => {
  render(<MockedProvider mocks={mocks} addTypename={false}>
      <TestApp/>
  </MockedProvider>,
  );
});

test('should be able to increase and decrease product quantity', async () => {
  render(<MockedProvider mocks={mocks} addTypename={false}>
    <TestApp/>
  </MockedProvider>);

  // wait for mock provider to send back the mock result and product info page to load 
  await screen.findByTestId('productInfoPage');

  const currentQuantity = addToCartElements.currentQuantity(); 
  const plusButton = addToCartElements.plusButton(); 
  const subtractButton = addToCartElements.subtractButton();

  expect(currentQuantity).toHaveTextContent('0');

  fireEvent.click(plusButton)

  expect(currentQuantity).toHaveTextContent('1');

  fireEvent.click(subtractButton);

  expect(currentQuantity).toHaveTextContent('0');

});

test('should be able to add items to the basket', async () => {
  render(<MockedProvider mocks={mocks} addTypename={false}>
    <TestApp/>
  </MockedProvider>);
  

  // wait for mock provider to send back the mock result and product info page to load 
  await screen.findByTestId('productInfoPage');

  const currentQuantity = addToCartElements.currentQuantity(); 
  const plusButton = addToCartElements.plusButton(); 
  const addToCartButton = addToCartElements.addToCartButton();
  
  expect(currentQuantity).toHaveTextContent('0');
  fireEvent.click(plusButton)
  expect(currentQuantity).toHaveTextContent('1');
  fireEvent.click(addToCartButton);

  await screen.findByTestId('basketCount'); // waiting for the sceen to refresh with the basket count element displayed
  const basketCount = basketElements.basketCount();
  expect(basketCount).toHaveTextContent('1');
});