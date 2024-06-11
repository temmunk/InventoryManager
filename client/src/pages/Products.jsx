import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom' 
const Products = () => {
    // product state variable array
    const [products, setProducts] = useState([]);

    // fetch products from database and update state
    useEffect(() => {
        const fetchProducts = async () => {
            try{
                // get products using axios get request 
                const res = await axios.get("http://localhost:5000/products")
                console.log("Response data: ", res.data); // Log the response data
                setProducts(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        // fetch all products on page load
        fetchProducts()
    }, [])

    // delete product from database
    const handleDelete = async (id) => {
        try{
            // delete product using axios delete request
            await axios.delete(`http://localhost:5000/products/${id}`);
            window.location.reload()
        }
        catch(err){
            console.log(err)
        }
    }
  return (
  <div>
    <h1> Inventory </h1>  
    <div className='products'>
        {products.map(product  => (                          // map through products and display them
            <div key={product.id} className='product' >       
                <h2>{product.name}</h2>                        
                <h3>${product.cost}</h3>
                <h3>Expiration: {product.expiration}</h3>
                <h3>Quantity: {product.quantity}</h3>
                <button className='delete' onClick={() => handleDelete(product.id)}>Delete</button> 
                <button className='update'><Link to ={`/update/${product.id}`}>Update</Link></button>  
            </div>
        ))}
    </div>
    <button><Link to="/add">Add Product</Link></button>
    
</div>
  )
}

export default Products