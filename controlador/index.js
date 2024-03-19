//importaciones
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pg = require('pg');

//agregarlo a variable
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '/../vista')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../vista', 'index.html'));
});


app.use(express.static(path.join(__dirname, '/../vista')));

app.get('/createAccount', (req, res) => {
    res.sendFile(path.join(__dirname, '/../vista', 'createAccount.html'));
});


//Conexión a BD
app.use(bodyParser.json());

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'pizzeria',
    password : '452408',
    port: 5432,
})


//Query de Crear cuenta
app.post('/insertarUsuario', (req, res) => {
    const { name1, email1, password1 } = req.body;
    const query = 'INSERT INTO public.pzz_user (name, email, password) VALUES ($1, $2, $3)';

    pool.query(query, [name1, email1, password1], (error, result) => {
        if (error) {
            console.error('Error al insertar datos:', error);
            res.status(500).send('Error en el servidor');
        } else {
            console.log('Datos insertados correctamente');
            //res.status(200).json({ success: true, message: 'Datos insertados correctamente' });
            res.sendFile(path.join(__dirname, '/../vista', 'index.html'));
        }
    });
    
});

//Query de login
app.post('/buscarUsuario', (req, res) => {
    const { name1, password1 } = req.body;
    const query = 'SELECT * FROM public.pzz_user WHERE name = $1 AND password = $2';

    pool.query(query, [name1, password1], (error, result) => {
        if (error) {
            console.error('Error al buscar datos:', error);
            res.status(500).send('Error en el servidor');
        } else {
            if (result.rowCount > 0) {
                console.log('Usuario encontrado');
                res.sendFile(path.join(__dirname, '/../vista', 'home.html'));
            } else {
                console.log('Usuario no encontrado');
                res.status(404).send('Usuario no encontrado');
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});