// controllers/inquiriesController.js (CommonJS)
const fs   = require('fs');
const path = require('path');

const INQUIRIES_PATH = path.join(__dirname, '../data/inquiries.json');

const getInquiries  = () => JSON.parse(fs.readFileSync(INQUIRIES_PATH, 'utf-8'));
const saveInquiries = (d) => fs.writeFileSync(INQUIRIES_PATH, JSON.stringify(d, null, 2));

const createInquiry = (req, res) => {
  try {
    const { name, email, phone, message, propertyId, agentId } = req.body;

    if (!name || !email || !message)
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ success: false, message: 'Invalid email address' });

    const inquiry = {
      id:         `inq-${Date.now()}`,
      name,
      email,
      phone:      phone      || '',
      message,
      propertyId: propertyId || null,
      agentId:    agentId    || null,
      status:     'pending',
      createdAt:  new Date().toISOString(),
    };

    const list = getInquiries();
    list.push(inquiry);
    saveInquiries(list);

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted! An agent will contact you soon.',
      data: inquiry,
    });
  } catch (err) {
    console.error('createInquiry:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createInquiry };
