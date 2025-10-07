import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate, type NavigateFunction } from "react-router-dom";

type ShopContextType = {
  products: typeof products;
  currency: string;
  delivery_fee: number;
  search: string;
  setSearch: (value: string) => void;
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
  cartItems: CartType;
  addToCart: (itemId: string, size: string) => Promise<void>;
  getCartCount: () => number;
  updateQuantity: (itemId: string, size: string, quantity: number) => void;
  getCartAmount: () => number;
  navigate: NavigateFunction;
};

type CartType = {
  [itemId: string]: {
    [size: string]: number;
  };
};

export const ShopContext = createContext<ShopContextType | undefined>(undefined);

type ShopContextProviderProps = {
  children: ReactNode;
};

const ShopContextProvider = ({ children }: ShopContextProviderProps) => {
  const currency = "$";
  const delivery_fee = 10;

  // 👇 tambahin state di sini
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState<CartType>({});
  const navigate = useNavigate();

  // Fungsi untuk menambahkan produk ke keranjang belanja (cart)
  const addToCart = async (itemId: string, size: string) => {

    if (!size) {
      toast.error("Select Product Size First");
      return;
    }

    // Membuat salinan dari state cartItems agar tidak langsung mengubah state asli (menghindari mutasi langsung)
    let cartData = structuredClone(cartItems);

    // Mengecek apakah item dengan ID tertentu sudah ada di dalam cart
    if (cartData[itemId]) {

      // Jika item dengan ID tersebut sudah ada, cek apakah ukuran (size) tertentu juga sudah ada
      if (cartData[itemId][size]) {
        // Jika ukuran sudah ada, tambahkan jumlah (quantity) item tersebut sebanyak 1
        cartData[itemId][size] += 1;
      } else {
        // Jika ukuran belum ada, buat ukuran baru dengan jumlah awal 1
        cartData[itemId][size] = 1;
      }

    } else {
      // Jika item dengan ID ini belum ada di cart, buat objek baru untuk item tersebut
      cartData[itemId] = {};

      // Tambahkan ukuran (size) pertama dengan jumlah 1
      cartData[itemId][size] = 1;
    }

    // Update state cartItems dengan data cart terbaru
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {

        }
      }
    }
    return totalCount;

  }

  const updateQuantity = (itemId: string, size: string, quantity: number) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  }

  const getCartAmount = (): number => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find(product => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0 && itemInfo) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {

        }
      }
    }
    return totalAmount;
  }


  useEffect(() => {
    console.log(cartItems)
  }, [cartItems])

  const value: ShopContextType = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
