const path = require('path')
const express = require('express')
const request = require('request');
const hbs = require('hbs')
const forecast =require('./utils/forecast');
const geocoding = require('./utils/geocoding');
const app  = express();
const port = process.env.PPORT || 3000


//path for directories
const viewsPath = path.join(__dirname, '../templates/views')
const directoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

//setting up views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(directoryPath))
app.get('', (req, res)=>{
    res.render('index',{
        title: "Weather app",
        name: 'nasir'
    })
})


    app.get('/about',(req, res)=>{
        res.render('about',
        {
            title:"about",
            name: "nasir"
        }
        )
    })

    app.get('/help', (req, res)=>{
        res.render('help', {
            text:"i need help from this page",
            title:'help',
            name :'nasir'
        })
    })
    app.get('/weather', (req,res)=>{
    
        if (!req.query.address){
           return res.send({err:'provide an address'})
        }
        geocoding(req.query.address, (err,resp)=>{
            if (err){
                res.send({err})
            }else{
                forecast(resp.latitude, resp.longitude,(error, response)=>{
                    if (error){
                        res.send({error})
                    }else{
                        res.send({
                            forecast: response,
                            location:resp.location,
                            address:req.query.address
                        })
                    }
                })
            }
        })

        
    })
    
    // app.get('/weather', (req, res)=>{
       
    // if(!req.query.address){
    //     res.send("please provide a valid address")
    // }
    // else{
    //     geocoding('swabi,kpk,pakistan', (err, res)=>{
    //         if(err){
    //             console.log(err)
    //         }else{
    //             console.log('result')
    //         }
    //     })
    // }
    // })

    app.get('/help/*', (req, res)=>{
        res.render('404', {
            title:"help page not found"
        })
    })

    app.get('*', (req, res)=>{
        res.render('404', {
            title:"404 page not found"
        })
    })
app.listen(port, ()=>{
    console.log("server is up and running on port"+ port)
})