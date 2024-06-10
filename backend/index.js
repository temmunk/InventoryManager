import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import 'dotenv/config'


const app = express();
// middleware
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});



app.get("/", (req, res) => {
    res.json("Hello World");

});

app.get("/products", (req, res) => {
    const q = "SELECT * FROM products";
    db.query(q, (err, result) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(result);
    });
});

app.post("/products", (req, res) => {
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

app.delete("/products/:id", (req, res) => {
    const productId = req.params.id;
    console.log("Product ID: ", productId);


    const q = "DELETE FROM products WHERE id = ? ";
    db.query(q, [productId], (err, result) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        return res.json(result);
    });
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');

});