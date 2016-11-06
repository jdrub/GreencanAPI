var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var express = require('express');
var getRouter = require('./routes');
var PythonShell = require('python-shell');

const shell = new PythonShell('GreenCan.Main.app.py', {
  pythonOptions: ['-m'],
  mode: 'text'
});

shell.on('message', (message) => {
    app.set('output', message);
    console.log('message: ', message);
});

const router = getRouter(shell);
const app = express();

app.use(morgan('dev'));
app.use(bodyParser());
app.use('/', router);

require('http').createServer(app).listen(3000, function(){
    console.log('Listening on 3000');
});
