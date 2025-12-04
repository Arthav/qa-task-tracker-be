const status = require("../src/health/routes");

module.exports = (app) => {
    app.use('/status', status);
    app.use('/users', require('../src/users/routes'));
    app.use('/projects', require('../src/projects/routes'));
    app.use('/tasks', require('../src/tasks/routes'));

    app.use('*', (req, res) => {
        res.send('Not found!!!');
    });
};