import express from 'express';
import Part from '../models/Part.js';

const router = express.Router();

// Route to add a new part
router.post('/parts', async (req, res) => {
    try {
        const newPart = new Part(req.body);
        await newPart.save();
        res.status(201).json(newPart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to delete a part
router.delete('/parts/:id', async (req, res) => {
    try {
        const deletedPart = await Part.findByIdAndDelete(req.params.id);
        if (!deletedPart) {
            return res.status(404).json({ message: 'Part not found' });
        }
        res.json({ message: 'Part deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
