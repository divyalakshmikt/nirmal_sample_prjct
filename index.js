const express = require('express');
const app = express();
const pool = require('./db');

app.use(express.json());

//get all staffs
app.get('/staffs', async (req, res, next) => {


    const page = req.query.page;
    const limit = req.query.limit;

    const startIndex = ( page -1 ) * limit;
    const endIndex = page * limit;

    try {
        const allstaffs = await pool.query("SELECT * FROM staff");
        // const result = allstaffs.slice(startIndex, endIndex)
        res.json(allstaffs.rows);
    } catch (error) {
        console.log(error);
    }
});

//get a single staff info
app.get('/staffs/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        const staff = await pool.query("SELECT * FROM staff WHERE staff_id = $1",[id]);
        res.json(staff.rows[0]);
    } catch (error) {
        console.log(error);
    }
});

//create a new staff entry
app.post('/newstaff', async (req, res, next) => {
    try {
        const {name, designation} = req.body;

        const newStaff = await pool.query("INSERT INTO staff (name, designation) VALUES ($1,$2) RETURNING *",
        [name, designation]);

        res.json(newStaff.rows[0]);
    } catch (error) {
        console.log(error);
    }
});

//update a staff
app.put('/updateStaff/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const { name, designation} = req.body;

        const updatestaff = await pool.query("UPDATE staff SET name = $1, designation = $2 WHERE staff_id = $3",
        [name, designation, id]);

        res.json('Staff updated');
    } catch (error) {
        console.log(error);
    }
});

//remove staff
app.delete('/remove/:id', async (req, res, next) => {
    try {
        const {id} = req.params;

        const rmstaff =  await pool.query("DELETE FROM staff WHERE staff_id = $1",
         [id]);

         res.json('staff removed');
        
    } catch (error) {
        console.log(error);
    }
})


app.listen(5500, () => {
    console.log('Server is live on port 5500...');
});