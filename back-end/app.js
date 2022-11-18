//-----------------------------------------------------------------------------------------------------------
// Bibliotecas utilizadas no projeto.
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dbPool = require('./middleware/dbPool');

//-----------------------------------------------------------------------------------------------------------
// Inicialização e configurações do express.
let app = express();
app.use(express.json({
    type: ['application/json', 'text/plain']
}));
app.use(logger('dev'));
app.use(cors());
app.use(dbPool);

app.models = require('./models');
app.controllers = require('./controllers')(app);
require('./routes')(app);

//----------------------------------------------------------------------------------------------------------
//
app.listen(2222, () => {
    console.log('Server initialized in port: http://127.0.0.1:2222');
});