import express from "express";
import Part from "../models/Part.js";

const router = express.Router();

//get all parts
router.get("/", async (req, res) => {
  try {
    const parts = await Part.find();
    res.json(parts);
  } catch (err) {
    res.status(500).json({ message: "Error getting parts", error: err.message });
  }
});

//add 1 part
router.post("/", async (req, res) => {
  try {
    const newPart = new Part(req.body);
    await newPart.save();
    res.status(201).json(newPart);
  } catch (err) {
    res.status(400).json({ message: "Error adding part", error: err.message });
  }
});

//get 1 part
router.get("/:id", async (req, res) => {
  try {
    const part = await Part.findById(req.params.id);
    if (!part) return res.status(404).json({ message: "Part not found" });
    res.json(part);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//update 1 part
router.put("/:id", async (req, res) => {
  try {
    const updatedPart = await Part.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } 
    );
    if (!updatedPart) return res.status(404).json({ message: "Part not found" });
    res.json(updatedPart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//delete 1 part
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Part.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Part not found" });
    res.json({ message: "Part deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;