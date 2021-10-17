const express = require('express');
const toDoRouter = express.Router();
const pool = require('../modules/pool.js');
// DB CONNECTION
//we put this in modules --> pool.js

// GET
toDoRouter.get('/', (req, res) => {
    let queryText = `
    SELECT * FROM "tasks"
    ORDER BY task;
    `;
    pool.query(queryText)

        .then((result) => {
            res.send(result.rows)
        })
        .catch((error) => {
            console.log(error)
            res.sendStatus(500)
        })
})

// POST
toDoRouter.post('/', (req, res) => {
    console.log(req.body)

    let queryText = `
INSERT INTO tasks ("complete", "task")
VALUES ($1, $2);
`
    let values = [req.body.complete, req.body.task];
    pool.query(queryText, values).then(result => {

        console.log('added values', result.rows);
    }).then((response) => {
        res.sendStatus(201);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
});

// PUT
toDoRouter.put('/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);

    let queryText = `
    UPDATE "tasks"
    SET "complete" = true
    WHERE "id" = $1
    `

    let values = [id];

    pool.query(queryText, values).then(result => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
    
});


// DELETE

module.exports = toDoRouter;