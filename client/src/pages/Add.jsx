import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Add = () => {

    // product state variable array
    const [product, setProduct] = useState({
        name: "",
        cost: "",
        quantity: "",
        expiration: null,
        img: null
    })

    // useNavigate hook for navigation to different pages in the app
    const navigate = useNavigate()

    // handleChange function to handle changes in the input fields when the user types in the fields
    const handleChange = (e) => {
        setProduct((prev) => ({
            ...prev,
            [e.target.name]: e.target.value 
        }))
    }

    // handleClick function to add a new product to the database when the "Add Product" button is clicked
    const handleClick = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:5000/products", product)
            // go to home page after product is added
            navigate("/")
        }
        catch(err){
            console.log(err)
        }
    }



    console.log(product)


  return (
    // form for adding a new product
    <div className='form'>
        <h1>Add</h1>
            <input type="text" placeholder="name" name = "name" onChange={handleChange}/>
            <input type="text" placeholder="cost" name = "cost" onChange={handleChange}/>
            <input type="number" placeholder="quantity" name = "quantity" onChange={handleChange}/>
            <input type="text" placeholder="expiration" name = "expiration" onChange={handleChange}/>
            <input type="text" placeholder="img" name = "img" onChange={handleChange}/>
            <button className="formButton" onClick={handleClick}>Add Product</button>
    </div>
  )
}

export default Add