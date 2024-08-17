const pool = require('../config/db');


const getAllBilling = async () => {
  const [rows] = await pool.query('SELECT *FROM billing;');
  return rows;
};

const createBilling = async (billing) => {
  const { reservation_id, amount, payment_method, status } = billing;
  const [result] = await pool.query(
    `INSERT INTO billing (reservation_id, amount, payment_method, status)
     VALUES (?, ?, ?, ?)`,
    [reservation_id, amount, payment_method, status]
  );
  return result.insertId;
};

const getBillingById = async (billing_id) => {
  const [rows] = await pool.query(`SELECT * FROM billing WHERE billing_id = ?`, [billing_id]);
  return rows[0];
};

const updateBilling = async (billing_id, updatedFields) => {
  const { amount, payment_method, status } = updatedFields;
  await pool.query(
    `UPDATE billing SET amount = ?, payment_method = ?, status = ? 
     WHERE billing_id = ?`,
    [amount, payment_method, status, billing_id]
  );
};

const deleteBilling = async (billing_id) => {
  await pool.query(`DELETE FROM billing WHERE billing_id = ?`, [billing_id]);
};

module.exports = {getAllBilling, createBilling, getBillingById, updateBilling, deleteBilling };
