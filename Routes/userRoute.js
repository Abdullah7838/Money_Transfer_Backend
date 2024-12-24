const express = require('express');
const router = express.Router(); 
const User = require('../Models/User'); 

router.post('/signup', async (req, res) => {
    const { name, phone, passcode } = req.body;
    if (!name || !phone || !passcode) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newUser = new User({
            name,
            phone,
            passcode
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while saving data' });
    }
});


router.post('/login', async (req, res) => {
    const { phone, passcode } = req.body;
    if (!phone || !passcode) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {

        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.passcode !== passcode) {
            return res.status(400).json({ message: 'Invalid passcode' });
        }

        res.status(200).json({
            message: 'Login successful',
            balance: user.balance, 
            name: user.name,
            phone: user.phone,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/g', (req, res) => {
    res.send('Hello, world!');
  });

module.exports = router;
