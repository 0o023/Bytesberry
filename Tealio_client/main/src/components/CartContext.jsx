import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../API/cart.api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    // Initialize cartItems from sessionStorage if available
    const storedCartItems = sessionStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    // Store cartItems in sessionStorage whenever it changes
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const openCart = () => {
    setCartOpen(true);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  const toggleCart = () => setCartOpen(!cartOpen);

  const getCart = (orderno) => {
    console.log('Order number:', orderno);

    api.get(`/get_cart/${orderno}`)
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
    const { orderno, product_name, productid, variety_id, size, quantity, price } = item;
    const newProductDetail = { product_name, productid, variety_id, size, quantity, price };

    setCartItems(prevItems => {
      // Find the cart item with the matching order number (orderno)
      const cartItem = prevItems.find(cartItem => cartItem.orderno === orderno);

      if (cartItem) {
        // Check if the product already exists in the productdetails array based on variety_id
        const existingProduct = cartItem.productdetails.find(detail => detail.variety_id === variety_id);

        if (existingProduct) {
          // Increment the quantity of the existing product and update the cart
          const updatedProductDetails = cartItem.productdetails.map(detail => {
            if (detail.variety_id === variety_id) {
              return { ...detail, quantity: detail.quantity + 1 }; // Increment quantity by 1
            }
            return detail;
          });

          const updatedCartItem = { ...cartItem, productdetails: updatedProductDetails };
          const updatedItems = prevItems.map(item => item.orderno === orderno ? updatedCartItem : item);

          // Update cart on the server using API call
          const updatedDetail = updatedProductDetails.find(detail => detail.variety_id === variety_id);
          api.put('/update_cart', { orderno, variety_id, new_details: updatedDetail })
            .then(response => {
              console.log('Updated cart items:', updatedItems);
            })
            .catch(error => {
              console.error("There was an error updating the cart!", error.message);
              if (error.response) {
                console.error('Error response data:', error.response.data);
              }
            });

          return updatedItems;
        } else {
          // Add the new product detail to the existing cart item
          const updatedCartItem = {
            ...cartItem,
            productdetails: [...cartItem.productdetails, newProductDetail]
          };
          const updatedItems = prevItems.map(item => item.orderno === orderno ? updatedCartItem : item);

          // Update cart on the server using API call
          api.post('/add_cart', { orderno, productdetails: [newProductDetail] })
            .then(response => {
              console.log('Updated cart items:', updatedItems);
            })
            .catch(error => {
              console.error("There was an error adding the item to the cart!", error.message);
              if (error.response) {
                console.error('Error response data:', error.response.data);
              }
            });

          return updatedItems;
        }
      } else {
        // If orderno does not exist, proceed to add the new item
        const updatedItems = [...prevItems, { orderno, productdetails: [newProductDetail] }];

        // Add new item to the cart on the server using API call
        api.post('/add_cart', { orderno, productdetails: [newProductDetail] })
          .then(response => {
            console.log('Updated cart items:', updatedItems);
          })
          .catch(error => {
            console.error("There was an error adding the item to the cart!", error.message);
            if (error.response) {
              console.error('Error response data:', error.response.data);
            }
          });

        return updatedItems;
      }
    });
  };

  const removeFromCart = (orderno, varietyid) => {
    // Remove item from cartItems
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.orderno === orderno) {
          const updatedProductdetails = item.productdetails.filter(detail => detail.variety_id !== varietyid);
          return { ...item, productdetails: updatedProductdetails };
        }
        return item;
      });

      // Update cart on the server using API call
      api.delete('/delete_cart', { data: { orderno, varietyid } })
        .then(response => {
          console.log('Updated cart items:', updatedItems);
        })
        .catch(error => {
          console.error("There was an error deleting the item from the cart!", error.message);
          if (error.response) {
            console.error('Error response data:', error.response.data);
          }
        });

      return updatedItems;
    });
  };

  const incrementQuantity = (orderno, variety_id) => {
    // Increment quantity of the item in cartItems
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.orderno === orderno) {
          const updatedProductdetails = item.productdetails.map(detail => {
            if (detail.variety_id === variety_id) {
              return { ...detail, quantity: detail.quantity + 1 };
            }
            return detail;
          });
          return { ...item, productdetails: updatedProductdetails };
        }
        return item;
      });

      // Update cart on the server using API call
      const updatedDetail = updatedItems.find(item => item.orderno === orderno)?.productdetails.find(detail => detail.variety_id === variety_id);
      api.put('/update_cart', { orderno, variety_id, new_details: updatedDetail })
        .then(response => {
          console.log('Updated cart items:', updatedItems);
        })
        .catch(error => {
          console.error("There was an error updating the item quantity in the cart!", error.message);
          if (error.response) {
            console.error('Error response data:', error.response.data);
          }
        });

      return updatedItems;
    });
  };

  const decrementQuantity = (orderno, variety_id) => {
    // Decrement quantity of the item in cartItems
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.orderno === orderno) {
          const updatedProductdetails = item.productdetails.map(detail => {
            if (detail.variety_id === variety_id && detail.quantity > 1) {
              return { ...detail, quantity: detail.quantity - 1 };
            }
            return detail;
          });
          return { ...item, productdetails: updatedProductdetails };
        }
        return item;
      });

      // Update cart on the server using API call
      const updatedDetail = updatedItems.find(item => item.orderno === orderno)?.productdetails.find(detail => detail.variety_id === variety_id);
      api.put('/update_cart', { orderno, variety_id, new_details: updatedDetail })
        .then(response => {
          console.log('Updated cart items:', updatedItems);
        })
        .catch(error => {
          console.error("There was an error updating the item quantity in the cart!", error.message);
          if (error.response) {
            console.error('Error response data:', error.response.data);
          }
        });

      return updatedItems;
    });
  };

  return (
    <CartContext.Provider value={{ cartOpen, toggleCart, cartItems, openCart, closeCart, getCart, addToCart, removeFromCart, incrementQuantity, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
