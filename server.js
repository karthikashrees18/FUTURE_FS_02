require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// --- 1. Middleware ---
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests
app.use(express.static('public')); // Serves your frontend files automatically

// --- 2. Database Connection ---
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/crmDB';
mongoose.connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB via Compass"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// --- 3. Lead Model ---
const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  source: { type: String, default: 'Website Form' },
  status: { type: String, default: 'New' }, // New, Contacted, Converted
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', leadSchema);

// --- 4. API Routes (The "Logic") ---

// GET: Fetch all leads for the Admin Dashboard
app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }); // Newest first
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: "Error fetching leads" });
  }
});

// POST: Create a new lead (when a customer fills the form)
app.post('/api/leads', async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (err) {
    res.status(400).json({ message: "Error saving lead" });
  }
});

// PUT: Update lead status or notes (for the Admin to manage)
app.put('/api/leads/:id', async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(updatedLead);
  } catch (err) {
    res.status(400).json({ message: "Error updating lead" });
  }
});

// DELETE: Remove a lead (Optional but helpful)
app.delete('/api/leads/:id', async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting lead" });
  }
});

// --- 5. Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});