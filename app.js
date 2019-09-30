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
    console.log('Hash: ', hash)
});

//desencripta
let hash = 'Þ119ê115é118ï118í107Ü128î111àŬÜ¬­®';
enigma.Desencriptar(hash, function(err, des) {
    if (err) return console.log(err);
    console.log(des); //return desencriptacion
});