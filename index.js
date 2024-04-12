import express from 'express'
import { engine } from 'express-handlebars';

import { services } from './data/services.data.js'

import path from 'path'

const app = express();
const __dirname = import.meta.dirname
// console.log(__dirname + "/views/layout/main.hbs")
// console.log(path.join(__dirname, "/views/layout/main.hbs"))


//public directory
app.use(express.static(path.join(__dirname , '/public')))

app.use('/css', express.static(path.join(__dirname ,'/node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname ,'/node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname ,'/node_modules/jquery/dist')))



//handlebars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname , './views'));

app.get('/', (req, res) => {
    res.render('home', { title: "Home page 2.0" });
});


app.get('/services', (req, res) => {
res.render('services', {services: services})
})
 
app.get('/services/:name', (req, res) => {
    
    
    const nameURL = req.params.name

    //cómo buscar algo dentro de un array? re: find

    const service = services.find((item) => item.url === `/services/${nameURL}` )
    console.log(service)

    //undefined
    if(!service){
        return res.render('404', { title: "No se encuentra el servicio"})
    }

        res.render('service', {service})

    
});

//404

app.get ('*', (req, res) => {
    res.status(404).send('Página no encontrada');
});


app.listen(3001, () => console.log(`Servidor encendido http://localhost:${3001}`))