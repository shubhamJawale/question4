const { param } = require("express/lib/request");

var createDB = (Connection) => {
    Connection.query("CREATE DATABSE QUE", (err, result) => {
        if (err) console.log(err);
        console.log("DATBASE CREATED AS NAMED QUE");
    })
}


var createTables = (connection) => {
    try {
        var table1 = "CREATE TABLE User (name VARCHAR(255), email VARCHAR(255), bio VARCHAR(255), profilePic BLOB)";
        connection.query(table1, function (err, result) {
            if (err) console.log("User Table already exists");
            else
                console.log("User Table created");
        });

    } catch (error) {
        console.log(error);
    }

    var table2 = "CREATE TABLE Buiesness (name VARCHAR(255), email VARCHAR(255), Registration_no VARCHAR(255))";
    connection.query(table2, function (err, result) {
        if (err) console.log(" Buinsess Table already exists");
        else
            console.log("Buisness Table created");
    });

    var table2 = "CREATE TABLE Product (name VARCHAR(255), mrp VARCHAR(255), description VARCHAR(255))";
    connection.query(table2, function (err, result) {
        if (err) console.log("Product Table already exists");
        else
            console.log("Product Table created");
    });

};

var getProduct = (connection, resp) => {
    var sql = "SELECT * FROM PRODUCT";
    connection.query(sql, function (err, result) {
        if (err) console.log(err);
        else {
            console.log(result);
            resp.send(result);
        }
    });

}

var insertProduct = (connection, body, resp) => {
    let querry = `INSERT INTO product(name,mrp,description)
        VALUES(?,?,?)`;
    let params = [body.name, body.mrp, body.description];
    connection.query(querry, params, function (err, result) {
        if (err) console.log(err);
        else {
            console.log("inserted into database");


        }
    });
}

var UpdateProduct = (connection, body, resp) => {
    let querry = `Update product set name = ? , mrp = ? , description = ? where name = ?`;
    let params = [body.name, body.mrp, body.description, body.name];
    connection.query(querry, params, function (err, result) {
        if (err) console.log(err);
        else {
            console.log("updated into database");
        }
    });
}

var DeleteProduct = (connection, name, resp) => {
    let querry = `delete from product where name = ?`;
    let params = [name];
    connection.query(querry, params, function (err, result) {
        if (err) console.log(err);
        else {
            console.log("deleted from database");
        }
    });
}



module.exports = { createDB, createTables, getProduct, insertProduct, UpdateProduct, DeleteProduct };