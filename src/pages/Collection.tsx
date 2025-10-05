import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

type MapProuctType = {
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

const Collection = () => {

  const shopContext = useContext(ShopContext);

if (!shopContext) {
  throw new Error("Component must be wrapped with ShopContextProvider");
}
  
  const { products, search, showSearch } = shopContext
  const [showfilter, setShowFilter] = React.useState(true);
  const [filteredProducts, setFilteredProducts] = React.useState<MapProuctType[]>([]);
  const [categoryFilter, setCategoryFilter] = React.useState<string[]>([]);
  const [subCategoryFilter, setSubCategoryFilter] = React.useState<string[]>([]); 
  const [sortType, setSortType] = React.useState('relavent');

  const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (categoryFilter.includes(value)) {
      setCategoryFilter(categoryFilter.filter(item => item !== value));
    } else {
      setCategoryFilter(prev => [...prev, value]);
    }
  }

  const toggleSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (subCategoryFilter.includes(value)) {
      setSubCategoryFilter(subCategoryFilter.filter(item => item !== value));
    } else {
      setSubCategoryFilter(prev => [...prev, value]);
    }
  }

  const applyFilters = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((product : MapProuctType) => product.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (categoryFilter.length > 0) {
      productsCopy = productsCopy.filter((product : MapProuctType) => categoryFilter.includes(product.category));
    }

    if (subCategoryFilter.length > 0) {
      productsCopy = productsCopy.filter((product : MapProuctType) => subCategoryFilter.includes(product.subCategory));
    }

    setFilteredProducts(productsCopy);
  }

  const sortProductList = (sortType: string) => {
    let productsCopy = filteredProducts.slice();
  
    switch (sortType) {
      case 'low-high':
        setFilteredProducts(productsCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilteredProducts(productsCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilters();
        break;
    }
  }

  React.useEffect(() => {
    applyFilters();
  }, [categoryFilter, subCategoryFilter, search, showSearch]);


  React.useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  React.useEffect(() => {
    sortProductList(sortType);
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Option */}
      <div className=' min-w-60'>
        <p onClick={()=>setShowFilter(!showfilter)} className=' my-2 text-xl flex items-center cursor-pointer gap-2'>Filters
          <img className={`h-3 sm:hidden ${showfilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? '' : 'hidden'}`}>
          <p className=' mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className=' flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>

        {/* Subcategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-6 ${showfilter ? '' : 'hidden'}`}>
          <p className=' mb-3 text-sm font-medium'>TYPE</p>
          <div className=' flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTION'} />
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-200 text-sm px-2' name="" id="">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

              {/* Map Products */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
              {filteredProducts.map((item, index) => (
                <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
              ))}
            </div>

      </div>



    </div>
  )
}

export default Collection;