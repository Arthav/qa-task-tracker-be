const healthRoutes = require('../src/health/routes');
const usersRoutes = require('../src/users/routes');
const projectsRoutes = require('../src/projects/routes');
const tasksRoutes = require('../src/tasks/routes');
const authRoutes = require('../src/auth/routes');

module.exports = (app) => {
    app.use('/status', healthRoutes);
    app.use('/users', usersRoutes);
    app.use('/projects', projectsRoutes);
    app.use('/tasks', tasksRoutes);
    app.use('/auth', authRoutes);

    app.use('*', (req, res) => {
        res.send('Not found!!!');
    });
};