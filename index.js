const express = require ('express');

const app = express();

const PORT = process.env.PORT || 3001;

const db = require ('./config/connection');

const run = require ('./src/app');


db.connect (err => {
    if (err) throw err
    console.log ('connected')
    app.listen(PORT, () => {
        console.log (`server run on port ${PORT} `);
        run()
    })
})
