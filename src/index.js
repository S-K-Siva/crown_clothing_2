import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/user/user.context';
import { ProductProvider } from './contexts/products/product.context';
import { CartProvider } from './contexts/cart/cart.context';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingSpinner from './components/loadingComponent/loadingComponent.component';


const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time with a 10-second delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <BrowserRouter>
              <UserProvider>
                <ProductProvider>
                  <CartProvider>
                    <App />
                  </CartProvider>
                </ProductProvider>
              </UserProvider>
            </BrowserRouter>
          )}
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
