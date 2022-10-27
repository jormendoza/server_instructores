const express = require('express');
const app = express();
// Settings
app.set('port', 3004);

// Middlewares
app.use(express.json());


// Control CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

// Routes
app.use(require('./routes/instructores'));
app.use(require('./routes/cursos'));
app.use(require('./routes/asistencias'));
app.use(require('./routes/alumnos'));


// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})