import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom' 
const Products = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const res = await axios.get("http://localhost:5000/products")
                setProducts(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchProducts()
    }, [])
  return <div>
    <h1> Products </h1>
    <div className='products'>
        {products.map(product => (
            <div key={product.id} className='product'>
                <img src={product.img} alt={product.name} />
                <h2>{product.name}</h2>
                <h3>${product.cost}</h3>
                <h3>Expiration: {product.expiration}</h3>
                <h3>Quantity: {product.quantity}</h3>
                <button className='delete'>Delete</button>
                <button className='update'>Update</button>
            </div>
        ))}
    </div>
    <button><Link to="/add">Add Product</Link></button>
    
</div>
}

export default Products