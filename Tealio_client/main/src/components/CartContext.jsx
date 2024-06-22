
import React, { createContext, useState, useContext } from 'react';
import api from '../API/cart.api';

const CartContext = createContext();


export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };


  const [cartItems, setCartItems] = useState([]);

  const toggleCart = () => setCartOpen(!cartOpen);

  const getCart = (item) => {
    console.log(item);
    const {orderno}=item;
    
    api.get('/get_cart',orderno)
      .then(response => {
        if (response.status === 200) {
          console.log('Cart fetched:', response.data);
          setCartItems(response.data);
        }
      })
      .catch(error => {
        console.error("There was an error fetching the cart!", error);
        if (error.response) {
          console.error('Error response data:', error.response.data);
        } else if (error.request) {
          console.error('Error request:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
      });
  };
  

  const addToCart = (item) => {
    const { orderno, product_name,size, quantity, price } = item;
    const productdetails = [{ product_name,size, quantity, price }];
    const payload = { orderno, productdetails };
  
    console.log('Adding item to cart:', payload); // Log the payload to check orderno value
  
    api.post('/add_cart', payload)
      .then(response => {
        setCartItems(prevItems => {
          const newItems = [...prevItems, payload];
          console.log('Updated cart items:', newItems); // Log updated state
          return newItems;
        });
        //getCart(orderno); // Fetch cart items after adding an item
      })
      .catch(error => {
        console.error("There was an error adding the item to the cart!", error);
      });
  };
  
  


  const removeFromCart = (item) => {
   
    console.log("Removing item:", item);
  
    api.delete('/delete_cart',item)
      .then(response => {
        if (response.status === 200) {
          setCartItems(cartItems.filter(item => item.orderno !== orderno));
        }
      })
      .catch(error => {
        console.error("There was an error removing the item from the cart!", error);
        console.error('Error response data:', error.response.data);
        console.error('Error request:', error.request);
        console.error('Error message:', error.message);
      });
  };

  return (
    <CartContext.Provider value={{
      cartOpen,
      toggleCart,
      cartItems,
      addToCart,
      getCart,
      removeFromCart,
      openCart,
      closeCart
    }}>
     {children}
    </CartContext.Provider>
  );
};

