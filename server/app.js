const mysql = require('mysql')
const express = require('express')
let app = express()
const body_parser = require('body-parser')
const port = 3000

app.use(body_parser.json())

// Configuração para não expor dados sensíveis =)
const env = require('dotenv').config({ path: './.env'})
const db_user = env.parsed.DB_USER
const db_pass = env.parsed.DB_PASSWORD
const db_schema = env.parsed.DB_SCHEMA

// Criando conexão com banco
const connection = mysql.createConnection({
  host : 'localhost',
  user : db_user,
  password : db_pass,
  database : db_schema
})

// Conectando ao banco
connection.connect((err) => {
  if (!err) {
    console.log('conectou')
  } else {
    console.log('ops: ' + err)
  }
})

// CREATE TABLE `crud_vue`.`usuarios` (
//   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
//   `nome` VARCHAR(100) NOT NULL,
//   `email` VARCHAR(100) NOT NULL,
//   PRIMARY KEY (`id`));

// 
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))

// GET todos os Usuarios
app.get('/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuarios', (err, rows, fields) => {
    if (err){ 
      return send(req,res,err,500);
    }
    res.send(rows)
  })
})

// GET um Usuario
app.get('/usuarios/:id', (req, res) => {
  connection.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id], (err, rows, fields) => {
    if (err){ 
      return send(req,res,err,500);
    }
    res.send(rows)
  })
})

// DELETE um Usuario
app.get('/usuarios/:id', (req, res) => {
  connection.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id], (err, rows, fields) => {
    if (err){ 
      return send(req,res,err,500);
    }
    res.send(rows)
  })
})