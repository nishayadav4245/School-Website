const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(
  'mongodb+srv://Nisha_Yadav:nishayadav062@cluster0.3ydtf3g.mongodb.net/admissions?retryWrites=true&w=majority&appName=Cluster0'
)
.then(() => console.log('✅ MongoDB Atlas connected'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// Schema
const InquirySchema = new mongoose.Schema({
  student: String,
  parent: String,
  contact: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Inquiry = mongoose.model('Inquiry', InquirySchema);

// Create
app.post('/api/inquiry', async (req, res) => {
  const { student, parent, contact, email, message } = req.body;

  if (!student || !parent || !contact || !email || !message) {
    return res.status(400).send({ success: false, error: 'All fields are required.' });
  }

  if (!/^\d{10}$/.test(contact)) {
    return res.status(400).send({ success: false, error: 'Invalid contact number.' });
  }

  try {
    const inquiry = new Inquiry({ student, parent, contact, email, message });
    await inquiry.save();
    res.status(201).send({ success: true });
  } catch (err) {
    res.status(500).send({ success: false, error: 'Failed to save inquiry.' });
  }
});

// Read all
app.get('/api/inquiries', async (req, res) => {
  const inquiries = await Inquiry.find().sort({ createdAt: -1 });
  res.json(inquiries);
});

// Delete one
app.delete('/api/inquiry/:id', async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ success: false, error: 'Failed to delete inquiry.' });
  }
});

app.get('/', (req, res) => {
  res.send('🟢 Admission Inquiry Server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
