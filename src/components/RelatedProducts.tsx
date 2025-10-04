import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';

const RelatedProducts = ({category,subCategory}) => {

  const productss = useContext(ShopContext);
  
    if (!productss) {
      throw new Error("Component must be wrapped with ShopContextProvider");
    }

    const {products} = productss;
    const [related, setRelated] = useState(products);

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();

            productsCopy = productsCopy.filter((item) => category === item.category);
            productsCopy = productsCopy.filter((item) => category === item.subCategory);
        } 

    }, [products]);
  return (
    <div>RelatedProducts</div>
  )
}

export default RelatedProducts