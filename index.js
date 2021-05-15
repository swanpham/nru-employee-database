const express = require ('express');

const app = express();

const PORT = process.env.PORT || 3001;

const sequelize = require ('./config/connection');

const run = require ('./src/app');

sequelize.sync ({ force: false}).then (() => {
    app.listen (PORT, () => console.log ('listening'))
    run()
})

