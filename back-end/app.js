//-----------------------------------------------------------------------------------------------------------
// Bibliotecas utilizadas no projeto.
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dbPool = require('./middleware/dbPool');

//-----------------------------------------------------------------------------------------------------------
// Inicialização e configurações do express.
let app = express();
app.use(express.json());
app.use(logger('dev'));
app.use(cors());
app.use(dbPool);

app.models = require('./models');
app.controllers = require('./controllers')(app);
require('./routes')(app);

//----------------------------------------------------------------------------------------------------------
//
app.listen(3000, () => {
    console.log('App Iniciado');
});












/*

//-----------------------------------------------------------------------------------------------------------
// Retorna Lista de alunos
app.get('/aluno', (req, res) => {
    new Aluno(req.dbConn)
        .selectAll()
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ error: err }));
});

//-----------------------------------------------------------------------------------------------------------
// Retorna aluno com id
app.get('/aluno/:id', (req, res) => {
    new Aluno(req.dbConn)
        .selectOne(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ error: err }));
});

//-----------------------------------------------------------------------------------------------------------
// Cria um aluno com os campos do body
app.post('/aluno', (req, res) => {
    new Aluno(req.dbConn, req.body)
        .insert()
        .then(() => res.status(201).json({ message: 'Dados armazenados com sucesso' }))
        .catch(err => res.status(500).json({ error: String(err) }));
});

//-----------------------------------------------------------------------------------------------------------
// Atualiza um aluno pelo id com os campos do body
app.put('/aluno/:id', (req, res) => {
    new Aluno(req.dbConn, req.body)

    
        .update(req.params.id)
        .then(() => res.status(201).json({ message: 'Dados armazenados com sucesso' }))
        .catch(err => res.status(500).json({ error: String(err) }))
});

//-----------------------------------------------------------------------------------------------------------
// Remove um aluno pelo ID
app.delete('/aluno/:id', (req, res) => {
    new Aluno(req.dbConn)
        .delete(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ error: err }));
});


*/