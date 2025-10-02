import { createContext, useState } from "react";
import type { ReactNode } from "react";
import { products } from "../assets/assets";

type ShopContextType = {
  products: typeof products;
  currency: string;
  delivery_fee: number;
  search: string;
  setSearch: (value: string) => void;
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
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

  const value: ShopContextType = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
