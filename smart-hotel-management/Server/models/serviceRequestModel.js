const pool = require('../config/db');

const getAllRequests = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM servicerequests');
    return rows;
  } catch (error) {
    console.error('Error executing query:', error); // Log the error
    throw error;
  }
};


const createServiceRequest = async (serviceRequest) => {
  const { user_id, room_id, request_type, description, status } = serviceRequest;
  const [result] = await pool.query(
    `INSERT INTO servicerequests (user_id, room_id, request_type, description, status)
     VALUES (?, ?, ?, ?, ?)`,
    [user_id, room_id, request_type, description, status]
  );
  return result.insertId;
};

const getServiceRequestById = async (request_id) => {
  const [rows] = await pool.query('SELECT * FROM servicerequests WHERE request_id = ?', [request_id]);
  return rows[0];
};

const updateServiceRequest = async (request_id, updatedFields) => {
  const { status } = updatedFields;

  try {
    const [result] = await pool.query(
      `UPDATE servicerequests 
       SET status = ? 
       WHERE request_id = ?`,
      [status, request_id]
    );

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      console.log(`No rows updated. Possibly, the request_id ${request_id} does not exist.`);
      return { success: false, message: 'No rows updated' };
    }

    console.log(`Service request ${request_id} updated successfully.`);
    return { success: true, message: 'Update successful' };
  } catch (error) {
    console.error('Error updating service request:', error);
    return { success: false, message: 'Error updating service request', error };
  }
};





const deleteServiceRequest = async (request_id) => {
  await pool.query('DELETE FROM servicerequests WHERE request_id = ?', [request_id]);
};

module.exports = {
  getAllRequests,
  createServiceRequest,
  getServiceRequestById,
  updateServiceRequest,
  deleteServiceRequest,
};
