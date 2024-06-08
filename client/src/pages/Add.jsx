import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Add = () => {

    const [product, setProduct] = useState({
        name: "",
        price: "",
        quantity: "",
        expiration: null,
        image: null
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setProduct((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    const handleClick = async (e) => {
        e.preventDefault()
        try{
            await axios.post("http://localhost:5000/products", product)
            navigate("/")
        }
        catch(err){
            console.log(err)
        }
    }



    console.log(product)


  return (
    <div className='form'>
        <h1>Add Product</h1>
            <input type="text" placeholder="name" name = "name" onChange={handleChange}/>
            <input type="text" placeholder="price" name = "price" onChange={handleChange}/>
            <input type="number" placeholder="quantity" name = "quantity" onChange={handleChange}/>
            <input type="text" placeholder="expiration" name = "expiration" onChange={handleChange}/>
            <input type="text" placeholder="image" name = "image" onChange={handleChange}/>
            <button onClick={handleClick}>Add Product</button>
    </div>
  )
}

export default Add