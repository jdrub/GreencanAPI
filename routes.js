var express = require('express');

module.exports = function getRouter(shell) {

    var router = express.Router();

    router.post('/upload', function(req, res){

        req.app.set('output', '');

        shell.send('yo');

        // TODO: get rid of this horrendous code and do this actually asynchronously somehow..
        checkOutput();

        function checkOutput() {
            if (req.app.get('output') === '') {
                setTimeout(checkOutput, 100);
            } else {
                return res.status(200).send(JSON.stringify(req.body.val + ': ' + req.app.get('output')));
            }
        }

    });

    return router;

}
