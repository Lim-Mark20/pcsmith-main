import express from "express";
import Build from "../models/Build.js";
import Part from "../models/Part.js";

const router = express.Router();

//get all builds
router.get("/", async (req, res) => {
  try {
    const builds = await Build.find(); // Removed .populate("parts")
    res.json(builds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get 1 build
router.get("/:id", async (req, res) => {
  try {
    const build = await Build.findById(req.params.id); // Removed .populate("parts")
    if (!build) return res.status(404).json({ message: "Build not found" });
    res.json(build);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//add 1 build
router.post("/", async (req, res) => {
  try {
    const newBuild = new Build(req.body);
    const savedBuild = await newBuild.save();
    // No need to populate embedded components, they are already part of the document
    res.status(201).json(savedBuild);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.keys(err.errors).map(key => err.errors[key].message);
      return res.status(400).json({ message: 'Validation Error', errors });
    }
    res.status(500).json({ error: err.message });
  }
});

//update 1 build
router.put("/:id", async (req, res) => {
  try {
    const updatedBuild = await Build.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Removed .populate("parts")
    if (!updatedBuild) return res.status(404).json({ message: "Build not found" });
    res.json(updatedBuild);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//delete 1 build
router.delete("/:id", async (req, res) => {
  try {
    const deletedBuild = await Build.findByIdAndDelete(req.params.id);
    if (!deletedBuild) return res.status(404).json({ message: "Build not found" });
    res.json({ message: "Build deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;