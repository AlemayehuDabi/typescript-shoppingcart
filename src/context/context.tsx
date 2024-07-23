import { ReactNode, createContext, useContext, useState } from "react";
import { ShoppingCartOpen } from "../component/ShoppingCartOpen";
import axios from "axios";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type cartItem = {
  id: number;
  quantity: number;
};

interface StoreItemType {
  id: number;
  title: string;
  price: number;
  image: string;
}

type ShoppingCartContextProps = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  fetchData: () => void;
  cartItem: cartItem[];
  cartQuantity: number;
  isOpen: boolean;
  storeItems: StoreItemType[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export const useShoppingContext = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  // state to manage quantity of the object

  const [cartItem, setCartItem] = useState<cartItem[]>([]);

  const [storeItems, setStoreItems] = useState<StoreItemType[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const cartQuantity = cartItem.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const fetchData = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setStoreItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getItemQuantity = (id: number) => {
    return cartItem.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseCartQuantity = (id: number) => {
    setCartItem((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (id: number) => {
    setCartItem((currItems) => {
      const item = currItems.find((item) => item.id === id);
      if (item && item.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItem((currItem) => {
      return currItem.filter((item) => item.id !== id);
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItem,
        cartQuantity,
        openCart,
        closeCart,
        isOpen,
        storeItems,
        fetchData,
      }}
    >
      {children}
      <ShoppingCartOpen />
    </ShoppingCartContext.Provider>
  );
};
