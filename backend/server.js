const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();

const port = process.env.PORT;
const key = process.env.key;


const app = express();

//middle ware 

app.use(cors());
app.use(express.json());

// create connection to mysql

const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.db
});


db.connect((err) => {

    if (err) {
        console.log(err);
    } else {
        console.log('Connected to MySQL');
    }

});
//insert new user 

app.post("/register", async (req, res) => {
    const { UserName, Email, Password } = req.body;
    try     {

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(Password, 10);

        const sql = `
            INSERT INTO users (UserName, Email, Password)
            VALUES (?, ?, ?)
        `;

        db.query(
            sql,
            [UserName, Email, hashedPassword],
            (err, result) => {

                if (err) {
                    return res.json(err);
                }


                return res.json({
                    message: "User registered successfully", result


                }
                );
            });

    } catch (error) {

        return res.json(error);

    }

});

app.post("/login", (req, res) => {

    const { Email, Password } = req.body;

    // check if email and password is empty

    if (!Email || !Password) {
        return res.status(400).json({
            message: "Email and Password are required"
        });
    }

    // Check user by email
    db.query(
        "SELECT * FROM users WHERE Email = ?",
        [Email],
        async (err, result) => {

            // Database error
            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: "Database error"
                });
            }

            // User not found

            if (result.length === 0) {

                return res.status(404).json({
                    message: "User not found"
                });
            }

            const user = result[0];

            // Compare passwords

            const validPassword = await bcrypt.compare(
                Password,
                user.Password
            );

            // Wrong password
            if (!validPassword) {

                return res.status(400).json({
                    message: "Invalid credentials"
                });
            }

            // Generate token
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.Email
                },
                process.env.key,
                {
                    expiresIn: "1d"
                }
            );

            // Success
            return res.status(200).json({
                message: "Login successful",
                token,
                user: {
                    id: user.id,
                    Name: user.Name,
                    Email: user.Email
                }
            });
        }
    );
});
//ADD SPARE PART

app.post("/addsparepart", (req, res) => {

    console.log("REQUEST RECEIVED");

    console.log(req.body);

    const {
        name,
        category,
        quantity,
        unitprice
    } = req.body;

    const totalprice = quantity * unitprice;

    const sql = `
        INSERT INTO spare_part
        (Name, Category, Quantity, UnitPrice, TotalPrice)
        VALUES (?, ?, ?, ?, ?)
    `;

    console.log("BEFORE MYSQL");

    db.query(
        sql,
        [name, category, quantity, unitprice, totalprice],
        (err, result) => {

            console.log("INSIDE MYSQL CALLBACK");

            if (err) {

                console.log("MYSQL ERROR:", err);

                return res.status(500).json(err);
            }

            console.log("SUCCESS");

            return res.status(200).json({
                message: "Spare part added successfully"
            });
        }
    );
});
// RETRIEVE SPAREPART
app.get("/sparepart/:id", (req, res) => {
    const id = req.params.id;

    db.query(
        "SELECT * FROM spare_part WHERE id = ?",
        [id],
        (err, result) => {
            if (err) return res.status(500).json(err);

            return res.json(result[0]);
        }
    );
});

//ADD TO STOCKIN
app.post("/stockin", (req, res) => {

    const { id, quantity } = req.body;

    // 1. update main stock
    const updateSql = `
        UPDATE spare_part
        SET Quantity = Quantity + ?
        WHERE id = ?
    `;

    db.query(updateSql, [quantity, id], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Spare part not found"
            });
        }

        // 2. INSERT INTO stock_in TABLE (HISTORY)
        const insertSql = `
            INSERT INTO stock_in
            (id, stockinquantity, stockinunitprice, stockintotalprice, stockindate)
            VALUES (?, ?, 
                (SELECT UnitPrice FROM spare_part WHERE id = ?),
                (SELECT UnitPrice * ? FROM spare_part WHERE id = ?),
                NOW()
            )
        `;

        db.query(
            insertSql,
            [id, quantity, id, quantity, id],
            (err2, result2) => {

                if (err2) {
                    console.log(err2);
                    return res.status(500).json(err2);
                }

                return res.status(200).json({
                    message: "Stock added and recorded successfully"
                });
            }
        );
    });
});
// DELETE SPARE PART
app.delete("/sparepart/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM spare_part WHERE id = ?",
        [id],
        (err, result) => {

            if (err) return res.status(500).json(err);

            return res.json({
                message: "Deleted successfully"
            });
        }
    );
});
// STOCKOUT
app.post("/stockout", (req, res) => {

    const { id, quantity } = req.body;

    // 1. CHECK CURRENT STOCK
    const checkSql = `
        SELECT Quantity, UnitPrice
        FROM spare_part
        WHERE id = ?
    `;

    db.query(checkSql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Spare part not found"
            });
        }

        const currentQuantity = result[0].Quantity;
        const unitPrice = result[0].UnitPrice;

        // PREVENT NEGATIVE STOCK
        if (quantity > currentQuantity) {
            return res.status(400).json({
                message: "Not enough stock"
            });
        }

        //  UPDATE STOCK
        const updateSql = `
            UPDATE spare_part
            SET Quantity = Quantity - ?
            WHERE id = ?
        `;

        db.query(updateSql, [quantity, id], (err2, updateResult) => {

            if (err2) {
                return res.status(500).json(err2);
            }

            //  INSERT INTO STOCK_OUT TABLE 
            const totalPrice = quantity * unitPrice;

            const insertSql = `
                INSERT INTO stock_out
                (id, stockoutquantity, stockoutunitprice, stockouttotalprice, stockoutdate)
                VALUES (?, ?, ?, ?, NOW())
            `;

            db.query(
                insertSql,
                [id, quantity, unitPrice, totalPrice],
                (err3, result3) => {

                    if (err3) {
                        return res.status(500).json(err3);
                    }

                    return res.status(200).json({
                        message: "Stock out successful and recorded"
                    });
                }
            );
        });
    });
});
// RETRIEVE/FETCH  REPORT
app.get("/report", (req, res) => {

    const sql = `
        SELECT * FROM spare_part
    `;

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json(err);
        }

        return res.status(200).json(result);
    });
});

app.get("/dashboard", (req, res) => {

    // TOTAL SPARE PARTS
    const totalPartsSql = `
        SELECT COUNT(*) AS totalParts
        FROM spare_part
    `;

    // TOTAL QUANTITY
    const totalStockSql = `
        SELECT SUM(Quantity) AS totalStock
        FROM spare_part
    `;

    // TOTAL INVENTORY VALUE
    const totalValueSql = `
        SELECT SUM(TotalPrice) AS totalValue
        FROM spare_part
    `;

    db.query(totalPartsSql, (err, partsResult) => {

        if (err) {
            return res.status(500).json(err);
        }

        db.query(totalStockSql, (err, stockResult) => {

            if (err) {
                return res.status(500).json(err);
            }

            db.query(totalValueSql, (err, valueResult) => {

                if (err) {
                    return res.status(500).json(err);
                }

                return res.status(200).json({

                    totalParts:
                        partsResult[0].totalParts,

                    totalStock:
                        stockResult[0].totalStock,

                    totalValue:
                        valueResult[0].totalValue
                });
            });
        });
    });
});


//retrieve stock out 
app.get("/stockout", (req, res) => {

    const sql = `
        SELECT * FROM stock_out
        ORDER BY StockOutDate DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        return res.status(200).json(result);
    });
});

//update in stock out


app.put("/stockout/:id", (req, res) => {

    const id = req.params.id;
    const { quantity, unitprice } = req.body;

    const totalprice = quantity * unitprice;

    const sql = `
        UPDATE stock_out
        SET StockOutQuantity = ?,
            StockOutUnitPrice = ?,
            StockOutTotalPrice = ?
        WHERE id = ?
    `;

    db.query(sql, [quantity, unitprice, totalprice, id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        return res.status(200).json({
            message: "Stock out updated successfully"
        });
    });
});

//delete in stock out
app.delete("/stockout/:id", (req, res) => {

    const id = req.params.id;

    const sql = `
        DELETE FROM stock_out
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        return res.status(200).json({
            message: "Stock out deleted successfully"
        });
    });
});
app.listen(port, () => {
    console.log("server run on port", port);
})
