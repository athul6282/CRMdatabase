const emailPattern = /^\S+@\S+\.\S+$/;

export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ message: 'Name must be at least 2 characters long' });
  }

  if (!email || !emailPattern.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !emailPattern.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid email address' });
  }

  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }

  next();
};

export const validateCustomer = (req, res, next) => {
  const { name, email, phone, status, notes, company } = req.body;
  const allowedStatuses = ['Lead', 'Active', 'Inactive'];

  if (!name || !name.trim()) {
    return res.status(400).json({ message: 'Customer name is required' });
  }

  if (!email || !emailPattern.test(email)) {
    return res.status(400).json({ message: 'Please provide a valid customer email address' });
  }

  if (!phone || !phone.trim()) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  if (status && !allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Customer status is invalid' });
  }

  if (notes && notes.length > 300) {
    return res.status(400).json({ message: 'Notes cannot exceed 300 characters' });
  }

  if (company && company.length > 80) {
    return res.status(400).json({ message: 'Company name cannot exceed 80 characters' });
  }

  next();
};
