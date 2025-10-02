import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';

const Product = () => {

  const productss = useContext(ShopContext);

  if (!productss) {
    throw new Error("Component must be wrapped with ShopContextProvider");
  }

  const {productId} = useParams();
  const {products} = productss;
  const [image, setImage] = React.useState('');
  const [productData, setProductData] = React.useState<
    | {
        _id: string;
        name: string;
        description: string;
        price: number;
        image: string[];
        category: string;
        subCategory: string;
        sizes: string[];
        date: number;
        bestseller: boolean;
      }
    | undefined
  >(undefined);


  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    })
  }

  React.useEffect(() => {
    fetchProductData();
  }, [products, productId]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row '>
        {/* Product Image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row '>
          <div className=' flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img src={item} key={index} alt='' className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default Product