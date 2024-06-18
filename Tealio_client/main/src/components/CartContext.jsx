/*
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../API/carts.api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.get('/get_all_cart');
        setCartItems(response.data);
      } catch (error) {
        console.error("There was an error fetching the cart items!", error);
      }
    };

    fetchCartItems();
  }, []);
  const toggleCart = () => setCartOpen(!cartOpen);

  const addToCart = (item) => {
    const { product_name, quantity, size, price, status, added_at, user_id } = item;
    const payload = { product_name, quantity, size, price, status, added_at, user_id };

    console.log('Adding item to cart:', payload);

    api.post('/add_cart', payload)
      .then(response => {
        console.log('Item added:', response.data);
        setCartItems(prevItems => {
          const newItems = [...prevItems, response.data];
          console.log('Updated cart items:', newItems); // Log updated state
          return newItems;
        });
      })
      .catch(error => {
        console.error("There was an error adding the item to the cart!", error);
        if (error.response) {
          console.error('Error response data:', error.response.data);
        } else {
          console.error('Error message:', error.message);
        }
      });
  };

  const removeFromCart = (id) => {
    console.log(`Attempting to remove item with id: ${id}`);
    console.log('Current cart items:', cartItems); // Log current cart items
    if (id === undefined) {
      console.error("Attempted to remove item with undefined id");
      return;
    }

    // Optimistically update the local state
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));

    api.delete(`/delete_cart/${id}`)
      .then(() => {
        console.log(`Item with id ${id} successfully removed from the backend`);
      })
      .catch(error => {
        console.error("There was an error removing the item from the cart!", error);
        if (error.response) {
          console.error('Error response data:', error.response.data);
        }
        // Revert the local state update if the API call fails
        setCartItems(prevItems => [...prevItems, { id }]);
      });
  };

  const incrementQuantity = (id) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      const updatedItem = { ...item, quantity: item.quantity + 1 };
      const { product_name, quantity, size, price, status, added_at, user_id } = updatedItem;
      const payload = { product_name, quantity, size, price, status, added_at, user_id };

      api.post('/add_cart', payload)
        .then(response => {
          setCartItems(prevItems => prevItems.map(item => item.id === id ? response.data : item));
        })
        .catch(error => {
          console.error("There was an error updating the item quantity!", error);
          if (error.response) {
            console.error('Error response data:', error.response.data);
          }
        });
    }
  };

  const decrementQuantity = (id) => {
    const item = cartItems.find(item => item.id === id && item.quantity > 1);
    if (item) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      const { product_name, quantity, size, price, status, added_at, user_id } = updatedItem;
      const payload = { product_name, quantity, size, price, status, added_at, user_id };

      api.post('/add_cart', payload)
        .then(response => {
          setCartItems(prevItems => prevItems.map(item => item.id === id ? response.data : item));
        })
        .catch(error => {
          console.error("There was an error updating the item quantity!", error);
          if (error.response) {
            console.error('Error response data:', error.response.data);
          }
        });
    }
  };

  return (
    <CartContext.Provider value={{ cartOpen, toggleCart, cartItems, addToCart, removeFromCart, incrementQuantity, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
*/
