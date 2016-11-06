// with express 3.x
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import config from './webpack.config.js';
import PythonShell from 'python-shell';

const router = express.Router();

let shell;
let output = '';

router.get('/', function(req, res) {
    res.send('hey');
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
const compiler = webpack(config);

app.use(morgan('dev'));
app.use(bodyParser());
app.use('/', router);
app.use(webpackMiddleware(compiler));

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
