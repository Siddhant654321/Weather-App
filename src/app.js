const express = require("express");
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'hbs');

const staticPath = path.join(__dirname, '../public');

const viewspath = path.join(__dirname, '../templates/views');

const partialPaths = path.join(__dirname, '../templates/partials');

app.use(express.static(staticPath));

hbs.registerPartials(partialPaths);

app.set('views', viewspath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        menu1: '#',
        menu2: '/about',
        menu3:'/help'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Help',
        menu1: '/',
        menu2: '/about',
        menu3:'#'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        menu1: '/',
        menu2: '#',
        menu3:'/help'
    })
})

app.get('/weather', (req, res) => {
    if(req.query.address) {
        return forecast(req.query.address, ({loc, temp, feelslike, weather_descriptions, err, err2})=> {
            if(err2){
                res.send({error:err2})
            } else if (err){
                res.send({error:err})
            } else {
                res.send({
                    address: req.query.address,
                    forecast: `Weather right now in ${loc}: ${weather_descriptions}. The temperature is ${temp} degree Celcius and it currently feels like ${feelslike} degree Celcius out there.`, 
                })
            }            
        })
    }
    res.send({error:'Please provide ?address parameter with the URL'})
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        message: 'Help article not found',
        menu1: '/',
        menu2: '/about',
        menu3: '/help'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        menu1: '/',
        menu2: '/about',
        menu3: '/help'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

