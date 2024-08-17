const pool = require('../config/db');

const getAllRequests = async () => {
    const [rows] = await pool.query('SELECT * FROM servicerequests');
    return rows;
};
const createServiceRequest = async (serviceRequest) => {
    const { user_id, room_id, request_type, description, status } = serviceRequest;
    const [result] = await pool.query(
      `INSERT INTO service_requests (user_id, room_id, request_type, description, status)
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, room_id, request_type, description, status]
    );
    return result.insertId;
  };
  
  const getServiceRequestById = async (request_id) => {
    const [rows] = await pool.query(`SELECT * FROM service_requests WHERE request_id = ?`, [request_id]);
    return rows[0];
  };
  
  const updateServiceRequest = async (request_id, updatedFields) => {
    const { request_type, description, status } = updatedFields;
    await pool.query(
      `UPDATE service_requests SET request_type = ?, description = ?, status = ? 
       WHERE request_id = ?`,
      [request_type, description, status, request_id]
    );
  };
  
  const deleteServiceRequest = async (request_id) => {
    await pool.query(`DELETE FROM service_requests WHERE request_id = ?`, [request_id]);
  };
  
  module.exports = {getAllRequests, createServiceRequest, getServiceRequestById, updateServiceRequest, deleteServiceRequest };