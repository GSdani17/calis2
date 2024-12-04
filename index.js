const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})
app.use(bodyParser.json())
const PUERTO = 3000

const conexion = mysql.createConnection(
    {


        host: 'localhost',
        database: 'pruebas',
        user: 'root',
        password: ''
    }
)
app.listen(PUERTO, () => {


    console.log(`Servidor corriendo en el puerto: ${PUERTO}`)

})

conexion.connect(error => {
    if (error) throw error
    console.log('Conexiòn exitosa a la base de datos');

})

app.get('/', (req, res) => {

    res.send('API')
})

app.get('/usuarios', (req, res) => {
    const query = `SELECT  * FROM usuarios`
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)
        if (resultado.length > 0) {
            res.json(resultado)

        } else {
            res.json('No hay registros')

        }
    })
})

app.get('/usuarios/:id', (req, res) => {
 const { id } = req.params
    const query = `SELECT * FROM usuarios WHERE id_usuario=${id}`
    conexion.query(query, (error, resultado) => {
        if (error) return console.error(error.message)
        if (resultado.length > 0) {
            res.json(resultado)
        } else {
            res.json(`No hay registros con ese id`)
        }
    })
})


app.post('/usuarios/agregar', (req, res) => {
console.log('req.body.nombre :>> ', req.body.nombre);
    const usuario = {

        nombre: req.body.nombre,
        email: req.body.email
    }

    const query = `INSERT INTO usuarios SET ?`
    conexion.query(query, usuario, (error, resultado) => {
        if (error) return console.error(error.message)
        res.json(`Se Inserto correctamente el usuario`)
    })
})

app.put('/usuarios/actualizar/:id', (req, res) => {
console.log(req.params+"actualizar")
    const { id } = req.params
    const { nombre, email } = req.body

    const query = `UPDATE usuarios SET nombre='${nombre}', email='${email}' WHERE id_usuario='${id}'`
    conexion.query(query, (error, resultado) => {

        if (error) return console.error(error.message)
        res.json(`Se actualizò correctamente el usuario`)
    })
})

app.delete('/usuarios/borrar/:id', (req, res) => {
    const { id } = req.params

    const query = `DELETE FROM usuarios WHERE id_usuario=${id}`
    conexion.query(query, (error, resultado) => {


        if (error) return console.error(error.message)
        res.json(`Se eliminò correctamente el usuario`)
    })


})









