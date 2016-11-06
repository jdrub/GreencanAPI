var express = require('express');
var fs = require('fs');

module.exports = function getRouter(shell) {

    var router = express.Router();

    router.post('/classify', function(req, res){

        // need to create a unique filename and throw that bad boy into the greencan db
        var filename = 'sample.wav';

        fs.writeFile('GreenCan/Main/' + filename, req.body, function(err) {
            if (err) console.log(err);
        });

        req.app.set('output', '');

        shell.send(filename);

        // TODO: get rid of this horrendous code and do this actually asynchronously somehow..
        checkOutput();

        function checkOutput() {
            if (req.app.get('output') === '') {
                setTimeout(checkOutput, 100);
            } else {
                return res.status(200).send(JSON.stringify(req.app.get('output')));
            }
        }

    });

    return router;

}
