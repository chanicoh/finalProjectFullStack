const billingModel = require('../models/billingModel');

const getAllBilling = async (req, res) => {
  try {
    const billing = await billingModel.getAllBilling();
    res.status(200).json(billing);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createBilling = async (req, res, next) => {
  try {
    const billingId = await billingModel.createBilling(req.body);
    res.status(201).json({ billingId });
  } catch (err) {
    next(err);
  }
};

const getBillingById = async (req, res, next) => {
  try {
    const billing = await billingModel.getBillingById(req.params.id);
    if (billing) {
      res.json(billing);
    } else {
      res.status(404).json({ message: 'Billing record not found' });
    }
  } catch (err) {
    next(err);
  }
};

const updateBilling = async (req, res, next) => {
  try {
    await billingModel.updateBilling(req.params.id, req.body);
    res.json({ message: 'Billing record updated successfully' });
  } catch (err) {
    next(err);
  }
};

const deleteBilling = async (req, res, next) => {
  try {
    await billingModel.deleteBilling(req.params.id);
    res.json({ message: 'Billing record deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {getAllBilling, createBilling, getBillingById, updateBilling, deleteBilling };
