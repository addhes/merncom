import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';

const Product = () => {

  const productss = useContext(ShopContext);

  if (!productss) {
    throw new Error("Component must be wrapped with ShopContextProvider");
  }

  const {productId} = useParams();
  const {products} = productss;
  const [image, setImage] = React.useState('');
  const [size, setSize] = React.useState('');
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
                <img onClick={()=>setImage(item)} src={item} key={index} alt='' className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} alt='' className='w-full h-auto' />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_dull_icon} alt="" className='w-3 5' />
              <p className='pl-2'>(122)</p>
            </div>
            <p className='font-semibold text-xl mt-4'>${productData.price}</p>
            <p className=' mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
            <div className=' flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-3'>
                {productData.sizes.map((item, index) => (
                  <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 cursor-pointer ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                ))}

              </div>
            </div>
            <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer'>ADD TO CART</button>
            <hr className=' mt-8 sm:w-4/5' />
            <div className=' text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                <p>100% Original Product</p>
                <p>Free Delivery on order above $50</p>
                <p>Cash on delivery is available on this product.</p>
            </div>
        </div>
      </div>

      {/* Descriptiomm& Review Section */}
      <div className='mt-20'>
        <div className='flex'>
            <b className='border px-5 py-3 text-sm'>Decription</b>
            <p className=' border px-5 py-3 text-sm'>Review (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
            <p>An e-commerce is an online platform that facilitates the buying and popularty due to their conveniencem accesssibillty, and the global reach thery offer</p>
            <p>E-commerce platforms allow businesses to showcase their products or services, manage inventory, process payments securely, and handle shipping and logistics. Customers can browse through a wide range of products, read reviews, compare prices, and make purchases from the comfort of their homes.</p>
        </div>
      </div>
    </div>
  ) : null;
}

export default Product