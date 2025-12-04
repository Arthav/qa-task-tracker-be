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

exports.addMember = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ status: 'error', message: 'User ID is required' });
        }

        // Check if project exists
        const projectCheck = await db.query('SELECT * FROM projects WHERE id = $1', [id]);
        if (projectCheck.rows.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Project not found' });
        }

        // Check if user exists
        const userCheck = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        // Check if already a member
        const memberCheck = await db.query(
            'SELECT * FROM project_members WHERE project_id = $1 AND user_id = $2',
            [id, userId]
        );

        if (memberCheck.rows.length > 0) {
            return res.status(400).json({ status: 'error', message: 'User is already a member of this project' });
        }

        // Add member
        await db.query(
            'INSERT INTO project_members (project_id, user_id) VALUES ($1, $2)',
            [id, userId]
        );

        res.status(201).json({ status: 'success', message: 'Member added successfully' });
    } catch (error) {
        next(error);
    }
};
