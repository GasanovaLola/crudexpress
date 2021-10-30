let users = require('./data/dataUser.json')

const express = require('express');
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json())

const host = 'localhost'
const port = 5000

// READ
app.get('/', function (req, res) {
    res.status(200).json(users);
});

// READ
app.get('/:id', function (req, res) {
    let found = users.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

// CREATE
app.post('/', function (req, res) {
    let newId = users.length + 1;

    console.log(req.body);

    let newUser = {
        id: newId,
        balance: req.body.balance,
        picture: req.body.picture,
        age: req.body.age,
        name: req.body.name,
        gender: req.body.gender,
        company: req.body.company,
        email: req.body.email
    };

    users.push(newUser);

    res.status(201).json(newUser);
});


// UPDATE
app.put('/:id', function (req, res) {
    let found = users.find(function (user) {
        return user.id === parseInt(req.params.id);
    });
    console.log(req.body.balance);
    if (found) {
        let updated = {
            id: found.id,
            balance: req.body.balance,
            picture: req.body.picture,
            age: req.body.age,
            name: req.body.name,
            gender: req.body.gender,
            company: req.body.company,
            email: req.body.email
        };
        let targetIndex = users.indexOf(found);
        users.splice(targetIndex, 1, updated);

        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

// DELETE
app.delete('/:id', function (req, res) {
    let found = users.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        let targetIndex = users.indexOf(found);

        users.splice(targetIndex, 1);
    }
    res.sendStatus(204);
});

app.listen(port, host, function () {
    console.log(`Server listens http://${host}:${port}`)
});