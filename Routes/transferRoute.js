const express = require('express');
const router = express.Router();
const User = require('../Models/User');

router.post('/transfer', async (req, res) => {
  const { mynumber, senderNumber, amount } = req.body;

  if (!mynumber || !senderNumber || !amount) {
    return res.status(400).send("All fields (SenderNumber, Amount) are required");
  }

  try {
    const sender = await User.findOne({ phone: mynumber });
    if (!sender) {
      return res.status(404).send("Sender number not found");
    }

    const receiver = await User.findOne({ phone: senderNumber });
    if (!receiver) {
      return res.status(404).send(`Receiver ${senderNumber} not found`);
    }

    const transferAmount = Number(amount);
    const senderBalance = Number(sender.balance);
    const receiverBalance = Number(receiver.balance);

    if (senderBalance < transferAmount) {
      return res.status(400).send("Sender does not have enough balance");
    }

    sender.balance = senderBalance - transferAmount;
    receiver.balance = receiverBalance + transferAmount;

    await sender.save();
    await receiver.save();

    return res.status(200).send("Transfer successful");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;
