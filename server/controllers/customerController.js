import Customer from '../models/Customer.js';

export const createCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.create({
      ...req.body,
      owner: req.user._id,
    });

    res.status(201).json({
      message: 'Customer created successfully',
      customer,
    });
  } catch (error) {
    next(error);
  }
};

export const getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find({ owner: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({ customers });
  } catch (error) {
    next(error);
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!customer) {
      res.status(404);
      throw new Error('Customer not found');
    }

    res.status(200).json({
      message: 'Customer updated successfully',
      customer,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!customer) {
      res.status(404);
      throw new Error('Customer not found');
    }

    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    next(error);
  }
};
