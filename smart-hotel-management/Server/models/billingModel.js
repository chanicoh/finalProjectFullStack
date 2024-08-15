const pool = require('../config/db');

const getAllBills = async () => {
    const [rows] = await pool.query('SELECT * FROM billing');
    return rows;
};

const getBillById = async (bill_id) => {
    const [rows] = await pool.query('SELECT * FROM billing WHERE bill_id = ?', [bill_id]);
    return rows[0];
};

// Additional CRUD operations...

module.exports = { getAllBills, getBillById };
