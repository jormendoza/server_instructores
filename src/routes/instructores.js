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

router.get('/alumnos2', (req, res) => {
    mysqlConnection.query('SELECT dni, apellidos FROM alumnos', (err, rows, fields) => {
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



router.post('/instructores2', function(req, res) {
    const { name, description } = req.body;
    res.send(`Name ${name}, desc ${description}`);
});



// INSERT An instructor
router.post('/instructores/', function (req, res) {
    console.log(req.body);
    const { nombres, apellidos, dni, titulo, celular, foto_perfil, cv_corto, mp_public_key, mp_access_token } = req.body;
    let sql = 'INSERT INTO instructores(nombres, apellidos, dni, titulo, celular, foto_perfil, cv_corto, mp_public_key, mp_access_token) VALUES (?,?,?,?,?,?,?,?,?)';
    var valores = [nombres, apellidos, dni, titulo, celular, foto_perfil, cv_corto, mp_public_key, mp_access_token];

    mysqlConnection.query(sql, valores, (err, rows, fields) => {
        if (!err) {
            res.json({ ok: true });
        } else {
            console.log(err);
        }
    });
});



// Update un instructor
router.put('/instructores/dni/:dni', function (request, response){
    const dni = request.params.dni;
    const { celular } = request.body;
    let sql = 'UPDATE instructores SET celular =' + celular + ' WHERE dni=' + dni;
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err) {
            response.json({ ok: true });
        } else {
            console.log(err);
        }
    });

});

module.exports = router;