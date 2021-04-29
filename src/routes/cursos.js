const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); //bodyParser nos permite reicibir parametros por POST



const mysqlConnection = require('../database.js');

// GET all cursos
router.get('/cursos', (req, res) => {
    mysqlConnection.query('SELECT * FROM cursos', (err, rows, fields) => {
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

// GET An curso por Id
router.get('/cursos/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM cursos WHERE id_cursos = ?', [id], (err, rows, fields) => {
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
// GET An curso por id de subrubro
router.get('/cursos/subrubro/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM cursos WHERE id_subrubros = ?', [id], (err, rows, fields) => {
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

// DELETE An curso por id
router.delete('/cursos/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('DELETE FROM cursos WHERE id_cursos = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({ 
                ok: true 
            });
        } else {
            res.json({ 
                ok: false,
                error: err
            });
        }
    });
});


// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// INSERT An curso
router.post('/cursos/', urlencodedParser, (req, res) => {
    const { nombre, descripcion, publico_destinado, requisitos, url_imagen_presentacion, url_video_presentacion, precio_inscripcion, precio_cuota, cantidad_cuotas, id_subrubros } = req.body;


    let sql = 'INSERT INTO cursos(nombre, descripcion, publico_destinado, requisitos, url_imagen_presentacion, url_video_presentacion, precio_inscripcion, precio_cuota, cantidad_cuotas, id_subrubros) VALUES (?,?,?,?,?,?,?,?,?,?)';
    var valores = [nombre, descripcion, publico_destinado, requisitos, url_imagen_presentacion, url_video_presentacion, precio_inscripcion, precio_cuota, cantidad_cuotas, id_subrubros];

    mysqlConnection.query(sql, valores, (err, rows, fields) => {
        if (!err) {
            res.json({ 
                ok: true 
            });
        } else {
            res.json({ 
                ok: false,
                error: err
            });
        }
    });
});



// Update un curso
router.put('/cursos/:id', urlencodedParser, (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion, publico_destinado, requisitos, url_imagen_presentacion, url_video_presentacion, precio_inscripcion, precio_cuota, cantidad_cuotas, id_subrubros } = req.body;
   
    let sql = 'UPDATE cursos SET nombre=?, descripcion=?, publico_destinado=?, requisitos=?, url_imagen_presentacion=?, url_video_presentacion=?, precio_inscripcion=?, precio_cuota=?, cantidad_cuotas=?, id_subrubros=? WHERE id_cursos=' + id;
    var valores = [nombre, descripcion, publico_destinado, requisitos, url_imagen_presentacion, url_video_presentacion, precio_inscripcion, precio_cuota, cantidad_cuotas, id_subrubros];
    
    mysqlConnection.query(sql, valores, (err, rows, fields) => {
        if (!err) {
            res.json({ 
                ok: true 
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