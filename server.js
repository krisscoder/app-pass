const express = require('express')
const app = express();
//const hbs = require('hbs');
const acciones = require('./app');
const bodyParser = require('body-parser'); //para recibir parametros por POST
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

//middleware para servir cualquier archivo en la carpeta /public
app.use(express.static(__dirname + '/public'));

//HBS engine: libreria para usar templates 
//hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine', 'hbs');

//genera pagina principal del sitio publico
app.post('/', function(req, res) {
    /* let salida = {
            nombre: 'Cristian',
            edad: 45,
            str: req.url
        } */

    //res.send(salida);
    //res.end(); //return console.log('escuchando');
    /* res.render('home.hbs', {
        //define variables para usar en el template HBS
        nombre: 'Cristian'
    }) */
})

//genera pagina /about
/* app.get('/about', function(req, res) {
    res.render('about.hbs')
}) */

//listar contraseñas
app.get('/listar', function(req, res) {
    let listado = acciones.mostrarListado();
    //console.log(listado);
    /* for (let item of listado) {
        console.log('Titulo: ', item.titulo);
        console.log('Usuario: ', item.user);
        console.log('Hash: ', item.hash);
        console.log('========================');
    } */
    res.json(listado);
});


//agregar contraseñas
app.post('/agregar', function(req, res) {
    let body = req.body; //recibe parametros de la peticion y arma el objeto Body

    //condicional para mostrar error en la respuesta si algo no sale como era esperado
    if (body.titulo === undefined || body.user === undefined || body.pass === undefined) { //si no existe el nombre....
        res.status(400).json({
            error: 'Faltan datos o no son correctos'
        });
    } else {
        let agregarItem = acciones.agregar(body.titulo, body.user, body.pass);
        //si el objeto devuelto tiene un item "error" entonces API devuelve error
        if (agregarItem.error) {
            res.status(400).json({
                error: agregarItem.error
            });
        } else {
            //si no hay errores entonces API devuelve objeto agregado
            res.json({
                agregarItem
            })
        }

    }

});

app.listen(port, () => {
    console.log('Escuchando en', port);
});