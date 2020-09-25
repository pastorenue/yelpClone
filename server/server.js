require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const db = require('./db');

const app = express();

// middlewares goes here
app.use(morgan('tiny'))
app.use(express.json())

// all routes goes here
app.get('/api/v1/restaurants', async (req,res) => {
    try {
        const results = await db.query('SELECT * FROM restaurants');
        res.status(200).json({
            status: 200,
            count: results.rows.length,
            data: results.rows,
        })
    } catch (error) {
        console.log(error)
    }
})

app.get('/api/v1/restaurants/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const queryText = 'SELECT * FROM restaurants WHERE id = $1';
        const results = await db.query(queryText,[id])
        res.status(200).json({
            success: `${results.rows.length} record(s) retrieved`,
            data: {
                restaurant: results.rows[0],
            }
        })
    } catch (error) {
        res.status(error.status).json({
            status: error.message,
        })
    }
})

app.post('/api/v1/restaurants', (req,res) => {
    res.status(200).json({
        success: "API endpoint reached!"
    })
})

app.put('/api/v1/restaurants/:id', (req,res) => {
    res.status(200).json({
        data: {
            ...req.body,
        }
    })
})

app.delete('/api/v1/restaurants/:id', (req,res) => {
    res.status(200).json({
        ...req.params
    })
})

// run our server here
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://locahost:${PORT}`)
})