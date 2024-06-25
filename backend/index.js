import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import 'dotenv/config'


const app = express();
// middleware to handle requests and responses
app.use(express.json());
app.use(cors());

// connect to database, use environment variables for security
const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});


// Test connection to database
app.get("/", (req, res) => {
    res.json("Hello from the backend!");

});

// Get all products from database and return them as JSON response to the client 
app.get("/products", (req, res) => {

    // Query the database to get all products
    const q = "SELECT * FROM products";
    db.query(q, (err, result) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(result);
    });
});

// Add a new product to the database
app.post("/products", (req, res) => {

    // Query the database to insert the new product
    const q = "INSERT INTO products (`name`, `cost`, `expiration`, `quantity`, `img`) VALUES (?)";
    const values = [req.body.name, req.body.cost, req.body.expiration, req.body.quantity, req.body.img];
    console.log("Values to insert: ", values); // Log the values
    db.query(q, [values], (err, result) => {
        if (err) {
            console.error("Database error: ", err); // Log the error
            res.json(err);
        }
        console.log("Insert result: ", result); // Log the result
        return res.json(result);
    });
});
// Delete a product from the database by its ID
app.delete("/products/:id", (req, res) => {
    // Get the product ID from the request parameters
    const productId = req.params.id;
    console.log("Product ID: ", productId);

    // Query the database to delete the product
    const q = "DELETE FROM products WHERE id = ? ";
    db.query(q, [productId], (err, result) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        return res.json(result);
    });
});

// Update a product in the database by its ID
app.put("/products/:id", (req, res) => {
    // Get the product ID from the request parameters
    const productId = req.params.id;
    console.log("Product ID: ", productId);

    // Query the database to update the product
    const q = "UPDATE products SET `name` = ?, `cost` = ?, `expiration` = ?, `quantity` = ?, `img` = ? WHERE id = ? ";
    
    const values = [req.body.name, req.body.cost, req.body.expiration, req.body.quantity, req.body.img];

    db.query(q, [...values, productId], (err, result) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        return res.json(result);
    });
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');

});