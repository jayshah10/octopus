
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import { ComponentType, useCallback, useState } from 'react';
import { ICartProduct, CartContext } from './cart';
import {BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";
import { ProductPage } from './pages';


/*
  providing the appolo client using a HOC so we can replace it with a mock provider when testing 
*/
const withApolloClient = (Component:ComponentType) => {
  const client = new ApolloClient({
    uri: 'http://127.0.0.1:8000/graphql',
    cache: new InMemoryCache()
  });
  
  return (props:any) =>  <ApolloProvider client={client}>
      <Component {...props}/>
  </ApolloProvider>
}


function App() {
  const [cartProducts, setCartProducts] = useState<Array<ICartProduct>>([]); 
  
  const addProducts = useCallback((product:ICartProduct) => {
    setCartProducts(products => [...products, product])
  }, [setCartProducts])

  const CartProvider = CartContext.Provider;

  return  <ThemeProvider theme={theme}>
            <CartProvider value={{products:cartProducts, addProducts}}>
              <Router>
                <Switch>
                  <Route path="/product/:productId">
                    <ProductPage/>
                  </Route>
                  <Route path="/">
                    <Redirect to="/product/1" />
                  </Route>
                </Switch>
              </Router>
            </CartProvider>
          </ThemeProvider>
}

export default withApolloClient(App)
export const TestApp = App; 
