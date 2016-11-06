var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();

var PythonShell = require('python-shell');
let shell;
let output = '';

router.get('/', function(req, res) {
  res.send('home page');
});

router.get('/upload', function(req, res){

    output = '';
    shell.send('yo');

    // TODO: get rid of this horrendous code and do this actually asynchronously somehow..
    checkOutput();

    function checkOutput() {
        if (output === '') {
            setTimeout(checkOutput, 100);
        } else {
            return res.status(200).send(JSON.stringify(req.body.val + ': ' + output));
        }
    }

});




const app = express();

app.use(morgan('dev'));
app.use(bodyParser());
app.use('/', router);

require('http').createServer(app).listen(3000, function(){

    console.log('loading model...');

    var options = {
      pythonOptions: ['-m'],
      mode: 'text'
    };

    shell = new PythonShell('GreenCan.Main.app.py', options);
    shell.on('message', (message) => {
        output = message;
        console.log(message);
    });
    console.log('Listening on 3000');
});
