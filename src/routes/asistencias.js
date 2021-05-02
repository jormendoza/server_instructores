const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); //bodyParser nos permite reicibir parametros por POST



const mysqlConnection = require('../database.js');


// GET registra una asistencias en la tabla asistencias
router.get('/asistencias/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('INSERT INTO asistencias (identificador) values (?)', [id], (err, rows, fields) => {
        if (!err) {
            res.json({ 
                ok: true,
                rows: rows
            });
        } else {
            res.json({ 
                ok: false,
                error: err
            });
        }
    });
});



module.exports = router;