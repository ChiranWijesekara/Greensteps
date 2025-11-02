const express = require('express');
const router = express.Router();
const Action = require('../models/Action');


router.get('/',async (req, res) => {
    try {
        const actions = await Action.find();
        res.json(actions);
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const action = new Action({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const newAction = await action.save();
        res.status(201).json(newAction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const action = await Action.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!action) {
            return res.status(404).json({ message: 'Action not found' });
        }
        res.json(action);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const action = await Action.findByIdAndDelete(req.params.id);
        if (!action) {
            return res.status(404).json({ message: 'Action not found' });
        }   
        res.json({ message: 'Action deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
