const status = require("../src/health/routes");

module.exports = (app) => {
    app.use('/status', status);

    app.use('*', (req, res) => {
        res.send('Not found!!!');
    });
};