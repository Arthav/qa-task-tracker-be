const db = require('../../services/db');

exports.getTasks = async (req, res, next) => {
    try {
        const { projectId } = req.query;
        let query = 'SELECT * FROM qa_tasks';
        const params = [];

        if (projectId) {
            query += ' WHERE project_id = $1';
            params.push(projectId);
        }

        const { rows } = await db.query(query, params);
        res.status(200).json({ status: 'success', data: rows });
    } catch (error) {
        next(error);
    }
};

exports.getTaskById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const taskQuery = 'SELECT * FROM qa_tasks WHERE id = $1';
        const repairLoopsQuery = 'SELECT * FROM repair_loops WHERE task_id = $1 ORDER BY date DESC';

        const [taskResult, repairLoopsResult] = await Promise.all([
            db.query(taskQuery, [id]),
            db.query(repairLoopsQuery, [id])
        ]);

        if (taskResult.rows.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Task not found' });
        }

        const task = taskResult.rows[0];
        task.repairLoops = repairLoopsResult.rows;

        res.status(200).json({ status: 'success', data: task });
    } catch (error) {
        next(error);
    }
};

exports.createTask = async (req, res, next) => {
    try {
        const {
            project_id, scenario, category, test_case, test_steps, data,
            expected_result, actual_result, kategori, status,
            catatan_from_qa, respon_from_programmer,
            status_perbaikan_from_programmer, status_selesai_from_qa,
            assigned_qa_id, assigned_dev_id
        } = req.body;

        const query = `
            INSERT INTO qa_tasks (
                project_id, scenario, category, test_case, test_steps, data,
                expected_result, actual_result, kategori, status,
                catatan_from_qa, respon_from_programmer,
                status_perbaikan_from_programmer, status_selesai_from_qa,
                assigned_qa_id, assigned_dev_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            RETURNING *
        `;

        const values = [
            project_id, scenario, category, test_case, test_steps, data,
            expected_result, actual_result, kategori, status,
            catatan_from_qa, respon_from_programmer,
            status_perbaikan_from_programmer, status_selesai_from_qa,
            assigned_qa_id, assigned_dev_id
        ];

        const { rows } = await db.query(query, values);
        res.status(201).json({ status: 'success', data: rows[0] });
    } catch (error) {
        next(error);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const keys = Object.keys(updates);
        const values = Object.values(updates);

        if (keys.length === 0) {
            return res.status(400).json({ status: 'error', message: 'No updates provided' });
        }

        const setClause = keys.map((key, index) => `${key} = $${index + 2}`).join(', ');
        const query = `UPDATE qa_tasks SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`;

        const { rows } = await db.query(query, [id, ...values]);

        if (rows.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Task not found' });
        }

        res.status(200).json({ status: 'success', data: rows[0] });
    } catch (error) {
        next(error);
    }
};

exports.addRepairLoop = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, notes } = req.body;

        const query = `
            INSERT INTO repair_loops (task_id, status, notes)
            VALUES ($1, $2, $3)
            RETURNING *
        `;

        const { rows } = await db.query(query, [id, status, notes]);
        res.status(201).json({ status: 'success', data: rows[0] });
    } catch (error) {
        next(error);
    }
};
