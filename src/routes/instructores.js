const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); //bodyParser nos permite reicibir parametros por POST

const mysqlConnection = require('../database.js');

// GET all
router.get('/instructores', (req, res) => {
    mysqlConnection.query('SELECT * FROM instructores', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// GET An instructor por Id
router.get('/instructores/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM instructores WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            res.status(400).json({
                ok: false,
                mensaje: 'Hubo un problema para generar la respuesta'
            });
        }
    });
});
// GET An instructor por dni
router.get('/instructores/dni/:dni', (req, res) => {
    const { dni } = req.params;
    mysqlConnection.query('SELECT * FROM instructores WHERE dni = ?', [dni], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
});

// DELETE An instructor
router.delete('/instructores/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM instructores WHERE id = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({ ok: true });
        } else {
            console.log(err);
        }
    });
});
// DELETE An instructor por dni
router.delete('/instructores/dni/:dni', (req, res) => {
    const { dni } = req.params;
    mysqlConnection.query('DELETE FROM instructores WHERE dni = ?', [dni], (err, rows, fields) => {
        if (!err) {
            res.json({ ok: true });
        } else {
            console.log(err);
        }
    });
});

// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// INSERT An instructor
router.post('/instructores/', urlencodedParser, (req, res) => {
    const { nombre, apellido, dni, email, fecha_nacimiento, provinciaUbicacion, usuario, clave, saldo } = req.body;

    let sql = 'INSERT INTO instructores(nombre, apellido, dni, email, fecha_nacimiento, provinciaUbicacion, usuario, clave, saldo) VALUES (?,?,?,?,?,?,?,?,?)';
    var valores = [nombre, apellido, dni, email, fecha_nacimiento, provinciaUbicacion, usuario, clave, saldo];

    mysqlConnection.query(sql, valores, (err, rows, fields) => {
        if (!err) {
            res.json({ ok: true });
        } else {
            console.log(err);
        }
    });
});



// Update un instructor
router.put('/instructores/dni/:dni', urlencodedParser, (request, response) => {
    const dni = request.params.dni;
    const { saldo } = request.body;
    /* response.json({
        dni: dni,
        saldo: saldo
    }); */
    let sql = 'UPDATE instructores SET saldo=' + saldo + ' WHERE dni=' + dni;
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err) {
            response.json({ ok: true });
        } else {
            console.log(err);
        }
    });

});

module.exports = router;