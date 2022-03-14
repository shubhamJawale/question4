const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./dbconfig');
const app = express();
app.use(express.json())
const { createDB, createTables, getProduct, insertProduct, UpdateProduct, DeleteProduct } = require('./db');
const Pool = require('mysql/lib/Pool');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "cdac",
    database: "que",
    port: 3306
});


connection.connect((err) => {
    if (err) console.log(err);
    console.log("Connected to db");
    // createDB(connection);
    createTables(connection);

})

app.get('/product/get', async (req, resp) => {

    getProduct(connection, resp);

})

app.post('/product/post', (req, resp) => {

    const body = {
        name: req.body.name,
        mrp: req.body.mrp,
        description: req.body.description
    };

    insertProduct(connection, body, resp);
    resp.send('inserted into daatabase');
    resp.end();
})

app.put('/product/put', (req, resp) => {

    const body = {
        name: req.body.name,
        mrp: req.body.mrp,
        description: req.body.description
    };

    UpdateProduct(connection, body, resp);
    resp.send('updated into daatabase');
    resp.end();
})

app.delete('/product/delete/:name', (req, resp) => {
    let namekey = req.params.name;
    DeleteProduct(connection, namekey, resp);
    resp.end();

})

app.listen(3000, () => { console.log("App is Listning On port 3000") })