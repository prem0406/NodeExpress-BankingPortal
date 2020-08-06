const express = require('express');
const {accounts, writeJSON} = require('../data');

const router = express.Router();

router.get('/transfer', (req, res) => {
    res.render('transfer');
})

router.post('/transfer', (req, res) => {
    let from = req.body.from;
    let to = req.body.to;
    let amount = parseInt(req.body.amount);
    
    accounts[from].balance = accounts[from].balance - amount;
    accounts[to].balance = accounts[to].balance + amount;
    
    writeJSON();
    
    res.render('transfer', {message: "Transfer Completed"});
});

router.get('/payment', (req, res) => {
    res.render('payment', {account: accounts.credit});
});

router.post('/payment', (req, res) => {
    accounts.credit.balance = accounts.credit.balance - parseInt(req.body.amount);
    accounts.credit.available = accounts.credit.available + parseInt(req.body.amount);

    writeJSON();

    res.render('payment', {message: "Payment Successful", account: accounts.credit});

});

module.exports = router;