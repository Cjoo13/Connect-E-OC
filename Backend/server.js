const express = require('express');
const cors = require('cors');
require('dotenv').config();

let DB = require('./db-config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require('./routes/user');

app.use('/api/auth', userRoutes);

DB.authenticate()
    .then(() => console.log('Connexion à la base de données réussie'))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Running on port ${process.env.SERVER_PORT}`)
        });
    })
    .catch(err => console.log('Erreur de connexion à la base de données'))