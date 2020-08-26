const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDierctoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const  partialsPth = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPth)




// setup static directory to serve
app.use(express.static(publicDierctoryPath))

app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather App',
        name: 'TZACH AGAM'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        body:'who made this website',
        name: 'TZACH AGAM'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        helpText:'help everyone',
        name: 'TZACH AGAM'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Help 404',
        name:'Help article not found'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'You must enter an address'
        })
    }
    const address = req.query.address
    geocode(address,(error,{longitude,altitude,location} = {}) => {
            if(error){
                return res.send({error})
            }
    forecast(longitude,altitude, (error, forecastData) => {
            if(error){
                return res.send(error)
            }
            res.send({
                forecast:forecastData,
                location,
                address
            })
        })
    })
})  



app.get('*',(req,res)=>{
    res.render('404',{
        title: 'Error 404',
        name:'Page article not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on  port 3000')
})