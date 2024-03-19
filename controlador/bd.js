//importaciones
const express = require('express');
const pg = require('pg');

const app = express();
const port = 3000;

//codigo

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'pizzeria',
    password : '452408',
    port: 5432,
})

app.get('/usuarios', (req, res) => {
    pool.query('SELECT * FROM public.pzz_user', (error, result) => {
      if (error) {
        console.error('Error al ejecutar consulta:', error);
        res.status(500).send('Error en el servidor');
      } else {
        res.json(result.rows);
      }
    });
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});