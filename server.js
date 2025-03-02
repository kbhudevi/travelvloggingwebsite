const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Dummy user data for example
let users = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/pages/register.html');
});

app.post('/register', (req, res) => {
    const { username, email } = req.body;
    const password = bcrypt.hashSync(req.body.password, 10);
    users.push({ username, email, password });
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/pages/login.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
        res.send('Login successful');
    } else {
        res.send('Invalid username or password');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
