require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const db = require('./db');
const { Pool } = require('pg');
const { json } = require('express');
const cors = require('cors');

const app = express();

// middlewares goes here
app.use(cors());
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

        // restaurant request
        const restaurant = 'SELECT * FROM restaurants WHERE id = $1';
        const restaurantResult = await db.query(restaurant,[id])

        // reviews request
        const reviews = 'SELECT * FROM reviews WHERE restaurant_id = $1';
        const reviewsResults = await db.query(reviews,[id])
        res.status(200).json({
            success: `${restaurantResult.rows.length} record(s) retrieved`,
            data: {
                restaurant: restaurantResult.rows[0],
                reviews: reviewsResults.rows
            }
        })
    } catch (error) {
        res.status(error.status).json({
            status: error.message,
        })
    }
})

app.post('/api/v1/restaurants', async (req,res) => {
    try {
        const queryText = 'INSERT INTO restaurants (full_name,location,rating) VALUES($1,$2,$3)';
        const { full_name,location,rating } = req.body;
        const result = await db.query(queryText, [full_name,location, rating]);
        console.log(result)
        res.status(200).json({
            status: "Restaurant added sucessfully!",
            data: {
                status: 200,
                message: "One record successfully added!",
                restaurant: req.body,
            }
        })
    } catch (err) {
        res.json({
            message: err.message
        })
    }
})

app.put('/api/v1/restaurants/:id/update', async (req,res) => {
    try {
        const{id} = req.params;
        const queryText = 'UPDATE restaurants SET full_name = $2, location = $3, rating = $4 WHERE id = $1';
        const { full_name,location,rating } = req.body;
        const result = await db.query(queryText, [id,full_name,location, rating]);
        console.log(result)
        res.status(200).json({
            status: "Restaurant added sucessfully!",
            data: {
                status: 200,
                message: "One record successfully added!",
                restaurant: req.body,
            }
        })
    } catch (err) {
        res.json({
            message: err.message
        })
    }
})

app.delete('/api/v1/restaurants/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const queryText = 'DELETE FROM restaurants WHERE id = $1';
        const result = await db.query(queryText, [id]);
        res.status(200).json({
            status: 200,
            message: "Successfully deleted the restaurant with id of " + id 
        })
    } catch (err) {
        
    }
})

/**
 * Add New Review
 */
app.post('/api/v1/restaurants/:id/addReview', (req,res) => {
    try {
        const {name, review, rating} = req.body;
        const queryText = 'INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4)';
        const newReview = db.query(queryText, [req.params.id, name, review, rating ])
        res.status(200).json({
            status: "Success", 
            data: {
                review: newReview.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})
// run our server here
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://locahost:${PORT}`)
})