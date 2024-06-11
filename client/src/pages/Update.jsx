import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const Update = () => {
    // product state variable array 
    const [product, setProduct] = useState({
        name: "",
        cost: "",
        quantity: "",
        expiration: null,
        img: null
    })

    const location = useLocation()          // get location to get id of product to update
    const navigate = useNavigate()
    
    
    const productId = location.pathname.split("/")[2]; // 3rd element is the id of the product to update

    // handleChange function to handle changes in the input fields when the user types in the fields
    const handleChange = (e) => {
        setProduct((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    // handleClick function to update a product in the database when the "Update Product" button is clicked
    const handleClick = async (e) => {
        e.preventDefault()
        try{
            await axios.put(`http://localhost:5000/products/${productId}`, product)
            navigate("/")
        }
        catch(err){
            console.log(err)
        }
    }



    console.log(product)


  return (
    // form for updating a product
    <div className='form'>
        <h1>Update Product</h1>
            <input type="text" placeholder="name" name = "name" onChange={handleChange}/>
            <input type="text" placeholder="cost" name = "cost" onChange={handleChange}/>
            <input type="number" placeholder="quantity" name = "quantity" onChange={handleChange}/>
            <input type="text" placeholder="expiration" name = "expiration" onChange={handleChange}/>
            <input type="text" placeholder="img" name = "img" onChange={handleChange}/>
            <button className="formButton" onClick={handleClick}>Update </button>
    </div>
  )
}

export default Update