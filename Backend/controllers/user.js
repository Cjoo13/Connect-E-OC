const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');

exports.getAllAccounts = (req, res, next) => {
    User.findAll()
        .then(users => res.json({ data: users }))
        .catch(err => res.status(500).json({ error }));
};

exports.getOneAccount = (req, res, next) => {
    User.findOne({ where: { id: req.params.id }, raw: true })
        .then(user => {
            if (user === null) {
                return res.status(404).json({ message: 'Utilisateur introuvable' })
            }

            return res.json({ data: user })
        })
        .catch(err => res.status(500).json({ error }));
};

exports.modifyAccount = (req, res, next) => {
    User.findOne({ where: { id: req.params.id }, raw: true })
        .then((user) => {
            name = req.body.name;
            firstname = req.body.firstname;
            User.update()         
        .then(() => res.status(201).json({ message: 'Compte modifié !' }))
        .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.deleteInTrash = (req, res, next) => {
    User.findOne({ where: { id: req.params.id }, raw: true })
        .then((user) => {
            User.destroy({ id: req.params.id })
                .then(() => res.status(200).json({ message: 'Compte mis à la poubelle' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch (error => res.status(500).json({ error }));

};

exports.restoreAccount = (req, res, next) => {
    User.findOne({ where: { id: req.params.id }, raw: true })
        .then((user) => {
            User.restore({ id: req.params.id })
                .then(() => res.status(200).json({ message: 'Compte restauré' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch (error => res.status(500).json({ error }));
        
};

exports.deleteAccount = (req, res, next) => {
    User.findOne({ where: { id: req.params.id }, raw: true })
        .then((user) => {
            User.destroy({ where: {id: req.params.id}, force: true })
                .then(() => res.status(200).json({ message: 'Compte supprimé' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch (error => res.status(500).json({ error }));
};

exports.signup = (req, res, next) => {
    if (req.body.name == null || req.body.firstName == null || req.body.mail == null || req.body.password == null) {
        return res.status(400).json({ 'error': 'Données incomplètes' });
    }
    User.findOne({ where: { mail: req.body.mail }, raw: true })
        .then(user => {

            if (user !== null) {
                return res.status(409).json({ message: 'Cet utilisateur existe déjà' })
            }
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    req.body.password = hash
                    User.create(req.body)
                        .then(user => res.json({ message: 'Utilisateur crée' }))
                        .catch(err => res.status(500).json({ error: err }))
                })
                .catch(err => res.status(500).json({ message: 'Problème lors du hash du mot de passe' }))
        })
        .catch(err => res.status(500).json({ error: err }))
};

exports.login = (req, res, next) => {
    User.findOne({ mail: req.body.mail })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.SECRET_TOKEN,
                            { expiresIn: '1h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};