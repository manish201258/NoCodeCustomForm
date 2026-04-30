// src/routes/responseRoutes.js
const express = require("express");
const router = express.Router();
const Response = require("../models/responsemodel");

// Submit Response
router.post("/", async (req, res) => {
  try {
    const response = new Response(req.body);
    await response.save();
    res.json({ message: "Response saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Responses
router.get("/:formId", async (req, res) => {
  const responses = await Response.find({
    formId: req.params.formId
  });
  res.json(responses);
});

module.exports = router;