const mysql = require('mysql')
const express = require('express')
let app = express()
const body_parser = require('body-parser')
const port = 3000
const cors = require('cors')

app.use(body_parser.json())
app.use(cors())

// Configuração para não expor dados sensíveis =)
const env = require('dotenv').config({ path: './.env' })
const db_user = env.parsed.DB_USER
const db_pass = env.parsed.DB_PASSWORD
const db_schema = env.parsed.DB_SCHEMA

// Criando conexão com banco
const connection = mysql.createConnection({
  host: 'localhost',
  user: db_user,
  password: db_pass,
  database: db_schema,
  multipleStatements: true
})

// Conectando ao banco
connection.connect((err) => {
  if (!err) {
    console.log('conectou')
  } else {
    console.log('ops: ' + err)
  }
})

// rodando aplicação na porta pré-definida
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))

// GET todos os Usuarios
app.get('/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuarios', (err, rows, fields) => {
    if (err) {
      return send(req, res, err, 500);
    }
    res.send(rows)
  })
})

// GET um Usuario
app.get('/usuarios/:id', (req, res) => {
  connection.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id], (err, rows, fields) => {
    if (err) {
      throw err
    }
    res.send(rows)
  })
})

// DELETE um Usuario
app.delete('/usuarios/deletar/:id', (req, res) => {
  connection.query('DELETE FROM usuarios WHERE id = ?',
    [req.params.id], (err, rows, fields) => {
      if (err) {
        throw err
      }
      res.send('Usuário deletado com sucesso!')
    })
})

// CREATE Usuario
app.post('/usuarios/criar', (req, res) => {
  let usuario = req.body

  // Tratando campos obrigatórios
  if (usuario.nome === '' || usuario.nome === null || usuario.nome === undefined) {
    const erro = {
      status: 500,
      msg: 'O campo "Nome" é obrigatório'
    }
    
    return res.send(erro)
  }
  if (usuario.email === '' || usuario.email === null || usuario.email === undefined) {
    const erro = {
      status: 500,
      msg: 'O campo "E-mail" é obrigatório'
    }
    
    return res.send(erro)
  }

  const sql = `insert into ${db_schema}.usuarios (nome, email) VALUES ('${usuario.nome}', '${usuario.email}');`
  connection.query(sql, [usuario.nome, usuario.email], (err, rows, fields) => {
    if (err) {
      throw err
    }
    res.send('Usuário criado com sucesso!')
  })
})

// UPDATE Usuario
app.put('/usuarios/editar/:id', (req, res) => {
  let usuario = req.body

  // Tratando campos obrigatórios
  if (usuario.nome === '' || usuario.nome === null || usuario.nome === undefined) {
    const erro = {
      status: 500,
      msg: 'O campo "Nome" é obrigatório'
    }
    
    return res.send(erro)
  }
  if (usuario.email === '' || usuario.email === null || usuario.email === undefined) {
    const erro = {
      status: 500,
      msg: 'O campo "E-mail" é obrigatório'
    }
    
    return res.send(erro)
  }
  
  const sql = `UPDATE ${db_schema}.usuarios SET nome = '${usuario.nome}', email = '${usuario.email}' WHERE id = ?;`
  connection.query(sql, [parseInt(req.params.id)], (err, rows, fields) => {
    if (err) {
      throw err
    }
    res.send(`Usuário ${usuario.nome} editado com sucesso!`)
  })
})