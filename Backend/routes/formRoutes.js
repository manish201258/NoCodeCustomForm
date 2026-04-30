const express = require("express");
const router = express.Router();
const Form = require("../models/formmodel");

// Create Form
router.post("/", async (req, res) => {
  try {
    const form = new Form(req.body);
    await form.save();
    res.json(form);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get All Forms
router.get("/", async (req, res) => {
  const forms = await Form.find();
  res.json(forms);
});

// Get Single Form
router.get("/:id", async (req, res) => {
  const form = await Form.findById(req.params.id);
  res.json(form);
});

// Delete Form
router.delete("/:id", async (req, res) => {
  await Form.findByIdAndDelete(req.params.id);
  res.json({ message: "Form deleted" });
});

module.exports = router;