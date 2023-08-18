import { createContext, useState } from 'react';

export const BiddingsContext = createContext();

const BiddingsContextProvider = ({ children }) => {

    const [cart, setCart] = useState({
        items: [],    // Each item should include product and biddingPrice
        quantity: 0,
        total: 0,
    });


    const addToCart = (vehicle, biddingPrice) => {
        const existingItemIndex = cart.items.findIndex(
          (cartItem) => cartItem.vehicle.id === vehicle.id
        );
      
        if (existingItemIndex !== -1) {
          const updatedItems = [...cart.items];
          updatedItems[existingItemIndex].biddingPrice = biddingPrice;
      
          setCart({
            ...cart,
            items: updatedItems,
            total: cart.total + biddingPrice - cart.items[existingItemIndex].biddingPrice,
          });
        } else {
          const newItem = {
            vehicle: vehicle,
            biddingPrice: biddingPrice,
            cartQuantity: 1,
          };
          setCart({
            ...cart,
            items: [...cart.items, newItem],
            quantity: cart.quantity + 1,
            total: cart.total + biddingPrice,
          });
        }
    };

  return (
    <BiddingsContext.Provider value={{ cart, addToCart }}>
      {children}
    </BiddingsContext.Provider>
  );
};

export default BiddingsContextProvider;
