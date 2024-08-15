const { getAllBills, getBillById } = require('../models/billingModel');

const getBills = async (req, res, next) => {
    try {
        const bills = await getAllBills();
        res.status(200).json(bills);
    } catch (err) {
        next(err);
    }
};

// Additional controller methods...

module.exports = { getBills };
