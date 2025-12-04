const db = require('../../../services/db');

exports.getProjects = async (req, res, next) => {
    try {
        const { rows } = await db.query('SELECT * FROM projects');
        res.status(200).json({ status: 'success', data: rows });
    } catch (error) {
        next(error);
    }
};

exports.getProjectById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const projectQuery = 'SELECT * FROM projects WHERE id = $1';
        const membersQuery = `
            SELECT u.* 
            FROM users u
            JOIN project_members pm ON u.id = pm.user_id
            WHERE pm.project_id = $1
        `;

        const [projectResult, membersResult] = await Promise.all([
            db.query(projectQuery, [id]),
            db.query(membersQuery, [id])
        ]);

        if (projectResult.rows.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Project not found' });
        }

        const project = projectResult.rows[0];
        project.members = membersResult.rows;

        res.status(200).json({ status: 'success', data: project });
    } catch (error) {
        next(error);
    }
};
