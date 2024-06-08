import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
// middleware
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'temuulen1',
    database: 'produce'
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



app.listen(5000, () => {
    console.log('Server is running on port 5000');

});