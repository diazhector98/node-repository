const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now} : ${req.method} ${req.path}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if(error) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});


// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
//     next();
// });

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello there!'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Not found'
    })
});
app.listen(port, () => {
    console.log(`Server is up in ${port}`);
});