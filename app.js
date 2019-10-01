const fs = require('fs');
// encriptar passwords
/* var bcrypt = require('bcrypt');

function hashPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function comparePassword(inputPass, hashedPass) {
    return bcrypt.compareSync(inputPass, hashedPass);
}

console.log(hashPassword('123'));
console.log(comparePassword('123', hashPassword('123'))); */


//encriptar y desencriptar contraseñas
//encripta
const enigma = require('enigma-code'); //llama el modulo 
const valorEncriptacion = 10; //puede ser cualquier numero
let key = 'millave'; //No debe tener espacios
enigma.genHash(valorEncriptacion, key, 'contraseña123', function(err, hash) {
    if (err) return console.log(err);
    //console.log('Hash: ', hash)
    //return hash;
});

//desencripta
/* 
let hash = 'ç119Ü115é118â118ê107î128ï111Ü';
enigma.Desencriptar(hash, function(err, des) {
    if (err) return console.log(err);
    //console.log(des);
    //return desencriptacion
}); */

//acciones
let listado = [];

const cargarDB = () => {
    //se fija si hay algo en el JSON, 
    try {
        //carga JSON en la variable listadoPorHacer
        listado = require('./db.json');
        //console.log(listado);
    } catch (error) { //si esta vacio, lo setea como array vacio
        listado = [];
    }
}

const guardarDB = () => {
    //convierte un objeto a JASON
    let data = JSON.stringify(listado);

    //guarda JSON file
    fs.writeFile('db.json', data, (err) => {
        if (err)
            return (console.log(err));
        else {
            return (console.log(`DB guardada`))
        }
    });
}

const mostrarListado = () => {

    cargarDB();
    let nuevoListado = [];
    for (let item of listado) {
        let nuevoItem = {
            titulo: item.titulo,
            user: enigma.Desencriptar(item.user, function(err, usr) {
                return (usr);
            }),
            pass: enigma.Desencriptar(item.hash, function(err, des) {
                return (des);
            })

        }
        nuevoListado.push(nuevoItem);
    }
    return (nuevoListado); //devuelve listado con pass desencriptadas
}

const agregar = (titulo, userplano, passplano) => {
    cargarDB();
    // console.log(titulo, userplano, passplano);
    let hash = enigma.genHash(valorEncriptacion, key, passplano, function(err, hash) {
        return hash
    });
    let userHash = enigma.genHash(valorEncriptacion, key, userplano, function(err, userHash) {
        return userHash
    });
    //console.log('user: ', userHash);
    let itemAgrega = {
        titulo,
        user: userHash,
        hash: hash

    }
    if (titulo && userHash && hash) {
        //si existen user y pass encriptado, y el titulo, entonces guarda base y devuelve ok
        listado.push(itemAgrega);
        guardarDB(listado);
        return (itemAgrega);
    } else {
        return ({
            error: 'ERROR: falto algun parametro para poder guardar el item.'
        })
    }

}

module.exports = {
    mostrarListado,
    agregar
};
//console.log(generaHash('passssssss'));
//desencripta('Þ119ê115é118ï118í107Ü128î111àŬÜ¬­®');
//mostrarListado();
//agregar('mi sitio', 'cristian', 'langosta')