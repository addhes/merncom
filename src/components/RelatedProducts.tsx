import React from 'react'

const RelatedProducts = () => {

    const {products} = useContext(ShopContext);
    const [related, setRelated] = React.useState(products);

    React.useEffect(() => {
        const filtered = products.filter(item => item.bestseller === true);
        setRelated(filtered);
    }, [products]);
  return (
    <div>RelatedProducts</div>
  )
}

export default RelatedProducts