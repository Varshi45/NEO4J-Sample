const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const neo4j = require('neo4j-driver');
const path = require('path');


const app = express();
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const neo4jUri = 'bolt://127.0.0.1:7687';
const neo4jUser = 'neo4j';
const neo4jPassword = '12345678';
const driver = neo4j.driver(neo4jUri, neo4j.auth.basic(neo4jUser, neo4jPassword));
const session = driver.session();

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await session.run(
        'CREATE (a:User {username: $username, password: $password}) RETURN a',
        { username, password: hashedPassword }
    );
    if (result.records.length > 0) {
        res.send('User registered successfully');
    } else {
        res.send('Failed to register user');
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await session.run(
            'MATCH (u:User {username: $username}) RETURN u.password AS password', { username }
        );
        const user = result.records[0];
        if (!user) {
            return res.status(404).send('User not found.');
        }
        const hashedPassword = user.get('password');

        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        if (passwordMatch) {
            return res.status(200).send('Login successful.');
        } else {
            return res.status(401).send('Invalid credentials.');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in.');
    }
});



const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});